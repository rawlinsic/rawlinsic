/* The preview text editor's guard (Nicole, Nov 11: "a save can never change code"). A save once swapped
   "and" for "&" inside code (d94d08a: slug helpers' .replace(/&/g, "and") and a JSX line), so every edit
   now passes two checks, using the TypeScript parser:
     1. where: each spot it changes must be page text: words between JSX tags, or a string that holds
        wording. Strings that do a job in the code never count: imports, types, codes (slugs, paths, file
        names, single lowercase words like "panel"), arguments to text and lookup functions (.replace,
        .split, .includes, .get, fetch...), and JSX attributes like className or href. A wording the code
        uses as a label (an object key, or a comparison like k !== "Thought leadership") changes along
        with the page text, so the two stay matched.
     2. what: after the edit, the file must read as the same code, with only page text different, and it
        must parse as cleanly as before.
   An edit that fails either check isn't saved; it goes on EDITS-PENDING.md with the reason. */
import ts from "typescript";

const kindOf = (path: string) => (path.endsWith(".tsx") ? ts.ScriptKind.TSX : path.endsWith(".ts") ? ts.ScriptKind.TS : ts.ScriptKind.JS);
const parse = (path: string, src: string) => ts.createSourceFile(path, src, ts.ScriptTarget.Latest, true, kindOf(path));

/* functions whose string arguments are code, not wording */
const CODE_CALLS = new Set([
  "replace", "replaceAll", "split", "join", "startsWith", "endsWith", "includes", "indexOf", "lastIndexOf", "test", "match", "matchAll",
  "search", "padStart", "padEnd", "localeCompare", "get", "set", "has", "delete", "getItem", "setItem", "removeItem", "querySelector",
  "querySelectorAll", "getElementById", "getElementsByClassName", "closest", "matches", "addEventListener", "removeEventListener",
  "dispatchEvent", "getAttribute", "setAttribute", "removeAttribute", "hasAttribute", "toggle", "createElement", "fetch", "require",
  "RegExp", "encodeURIComponent", "decodeURIComponent", "postMessage", "redirect", "notFound", "permanentRedirect", "useState",
  "matchMedia", "getComputedStyle", "getPropertyValue", "setProperty", "scrollTo", "open", "slugify", "serviceById", "caseById",
  "serviceHref", "rosterFor", "themeStyle",
]);
/* JSX attributes that hold wording; every other attribute with a fixed string is treated as code
   unless its value reads like wording (has a space or a capital letter) */
const TEXT_ATTRS = new Set(["title", "alt", "aria-label", "aria-description", "placeholder", "label", "content", "kicker", "lead", "eyebrow", "text", "cta", "intro", "noteLabel", "caption", "heading", "subtitle"]);
/* object keys whose values are codes, not wording */
const CODE_KEYS = new Set(["id", "slug", "scene", "href", "src", "photo", "pos", "tone", "area", "industry", "featuredCase", "color", "ink", "tint", "ends", "type", "icon", "theme", "path", "image", "diagram", "sha", "url"]);
/* a value that reads like a code: a slug, path, address, or file name ("program-delivery", "/about", "team.webp") */
const CODE_LIKE = /^(?:[a-z0-9]+(?:[-_/.:#?=&][a-z0-9]+)+|\/[^\s]*|https?:\/\/\S+|mailto:\S+|tel:\S+|#[\w-]+)$/;
const CODE_ATTRS = new Set(["className", "class", "href", "src", "srcSet", "id", "key", "type", "rel", "target", "role", "style", "method", "action", "htmlFor", "as", "lang", "viewBox", "d", "fill", "stroke", "xmlns", "loading", "decoding", "sizes", "width", "height", "tabIndex", "autoComplete", "inputMode", "pattern", "accept", "encType", "crossOrigin", "referrerPolicy", "sandbox", "allow", "dangerouslySetInnerHTML", "scene", "kind", "tone", "variant", "size", "icon", "color", "photo", "pos", "slug", "area", "theme"]);

const calleeName = (e: ts.Expression): string => (ts.isIdentifier(e) ? e.text : ts.isPropertyAccessExpression(e) ? e.name.text : "");
const isTextLiteral = (n: ts.Node) => ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n) || n.kind === ts.SyntaxKind.TemplateHead || n.kind === ts.SyntaxKind.TemplateMiddle || n.kind === ts.SyntaxKind.TemplateTail;

/* reads like wording: has a space or a capital letter, and isn't a slug, path, or address */
const wording = (t: string) => /\s|[A-Z]/.test(t) && !CODE_LIKE.test(t.trim());

/* is this string or template piece in a spot where it does a job in the code? */
function codeString(n: ts.Node): boolean {
  let lit: ts.Node = n;
  if (n.kind === ts.SyntaxKind.TemplateHead) lit = n.parent; // the template expression
  else if (n.kind === ts.SyntaxKind.TemplateMiddle || n.kind === ts.SyntaxKind.TemplateTail) lit = n.parent.parent;
  const p = lit.parent;
  if (!p) return true;
  const text = ts.isStringLiteral(lit) || ts.isNoSubstitutionTemplateLiteral(lit) ? lit.text : (n as ts.TemplateLiteralLikeNode).text ?? "";
  // always code
  if (ts.isImportDeclaration(p) || ts.isExportDeclaration(p) || ts.isExternalModuleReference(p) || ts.isImportTypeNode(p) || ts.isLiteralTypeNode(p) || ts.isModuleDeclaration(p)) return true;
  if ((ts.isCallExpression(p) || ts.isNewExpression(p)) && p.expression !== lit && CODE_CALLS.has(calleeName(p.expression))) return true;
  if (ts.isTaggedTemplateExpression(p)) return true;
  const plain = ts.isStringLiteral(lit) || ts.isNoSubstitutionTemplateLiteral(lit);
  if (plain && CODE_LIKE.test(text)) return true;
  if (!plain && !wording(text)) return true; // a template's fixed part with no wording in it, like `/services/${slug}`
  // a single lowercase word is a code when it's passed to a function, or sits in a list of codes
  // (svc("ai", ...), leaf(..., "people"), ["dashboards", "asset-mgmt"]); in other spots it can be a word shown
  // on the page ("foundation" in How we've grown)
  const idWord = (t: string) => /^[a-z][a-z0-9]*$/.test(t) || CODE_LIKE.test(t);
  if (plain && /^[a-z][a-z0-9]*$/.test(text)) {
    if (ts.isCallExpression(p) || ts.isNewExpression(p)) return true;
    if (ts.isArrayLiteralExpression(p) && p.elements.every((e) => ts.isStringLiteral(e) && idWord(e.text))) return true;
  }
  if (ts.isPropertyAssignment(p) && p.initializer === lit && CODE_KEYS.has(p.name.getText().replace(/^["']|["']$/g, ""))) return true;
  // a label the code keys or compares on: changes with the page text only when it reads like wording
  if ((ts.isPropertyAssignment(p) || ts.isPropertySignature(p) || ts.isPropertyDeclaration(p) || ts.isMethodDeclaration(p) || ts.isEnumMember(p) || ts.isGetAccessor(p) || ts.isSetAccessor(p)) && p.name === lit) return !wording(text);
  if (ts.isElementAccessExpression(p) && p.argumentExpression === lit) return !wording(text);
  if (ts.isCaseClause(p) && p.expression === lit) return !wording(text);
  if (ts.isBinaryExpression(p)) {
    const op = p.operatorToken.kind;
    if ([ts.SyntaxKind.InKeyword, ts.SyntaxKind.InstanceOfKeyword].includes(op)) return true;
    if ([ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken, ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken].includes(op)) return !wording(text);
  }
  const attr = ts.isJsxAttribute(p) ? p : ts.isJsxExpression(p) && p.parent && ts.isJsxAttribute(p.parent) ? p.parent : null;
  if (attr) {
    const name = attr.name.getText();
    if (TEXT_ATTRS.has(name)) return false;
    if (CODE_ATTRS.has(name) || /^on[A-Z]/.test(name)) return true;
    return !wording(text); // a custom prop or data-/aria- attribute: wording ("Our people") counts, codes ("panel", "true") don't
  }
  return false;
}

/* the page text in a file: [start, end) spans, JSX text and wording strings (inside the quote marks) */
export function textSpans(path: string, src: string): [number, number][] {
  const sf = parse(path, src), out: [number, number][] = [];
  const visit = (n: ts.Node) => {
    if (n.kind === ts.SyntaxKind.JsxText) out.push([n.getStart(sf), n.getEnd()]);
    else if (isTextLiteral(n) && !codeString(n)) {
      const s = n.getStart(sf), e = n.getEnd();
      const open = n.kind === ts.SyntaxKind.TemplateMiddle || n.kind === ts.SyntaxKind.TemplateTail ? 1 : 1; // } or ` or quote
      const close = n.kind === ts.SyntaxKind.TemplateHead || n.kind === ts.SyntaxKind.TemplateMiddle ? 2 : 1; // ${ or closing quote
      out.push([s + open, e - close]);
    }
    ts.forEachChild(n, visit);
  };
  visit(sf);
  return out;
}
export const inText = (spans: [number, number][], from: number, to: number) => spans.some(([a, b]) => from >= a && to <= b);

/* the file as code, with page text left out: two versions that differ only in page text give the same skeleton.
   A line break written as <br /> and characters written as {"..."} inside JSX text count as page text. */
export function skeleton(path: string, src: string): { code: string; errors: number } {
  const sf = parse(path, src), parts: string[] = [];
  const visit = (n: ts.Node) => {
    if (n.kind === ts.SyntaxKind.JsxText) return;
    if (ts.isJsxExpression(n) && n.expression && ts.isStringLiteral(n.expression) && ts.isJsxElement(n.parent)) return;
    if (ts.isJsxSelfClosingElement(n) && n.tagName.getText(sf) === "br" && !n.attributes.properties.length && ts.isJsxElement(n.parent)) return;
    if (isTextLiteral(n)) { parts.push(codeString(n) ? `${n.kind}:${n.getText(sf)}` : `${n.kind}:T`); ts.forEachChild(n, visit); return; }
    if (ts.isIdentifier(n) || ts.isPrivateIdentifier(n) || ts.isNumericLiteral(n) || ts.isBigIntLiteral(n) || n.kind === ts.SyntaxKind.RegularExpressionLiteral || ts.isJsxText(n)) { parts.push(`${n.kind}:${n.getText(sf)}`); return; }
    parts.push(`${n.kind}${ts.isVariableDeclarationList(n) ? `/${n.flags & (ts.NodeFlags.Let | ts.NodeFlags.Const | ts.NodeFlags.Using)}` : ""}`);
    ts.forEachChild(n, visit);
  };
  visit(sf);
  const errors = (sf as unknown as { parseDiagnostics?: unknown[] }).parseDiagnostics?.length ?? 0;
  return { code: parts.join(" "), errors };
}

/* true when `after` is `before` with only page text changed */
export function onlyTextChanged(path: string, before: string, after: string): boolean {
  if (before === after) return true;
  const a = skeleton(path, before), b = skeleton(path, after);
  return a.code === b.code && b.errors <= a.errors;
}
