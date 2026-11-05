/* Procedural pieces of the Rawlins world (three.js). Everything is built
   from code: terrain, roads, city, bridges, airport, harbor, rail, drone,
   connected-systems network. Static parts are merged per material so the
   whole landscape draws in a handful of calls (phones included). */
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/* ── Palette (light-forward; color comes from the scene, not blankets) ── */
export const PAL = {
  blue: "#2F7BF5", blueSoft: "#6FA5FF", navy: "#203864", slate: "#4D688C",
  paper: "#F7F9FC", panel: "#DCE6F2", panel2: "#C4D8F2",
  grass: "#c3d5ab", grass2: "#adc595", forest: "#8fae7e", rock: "#c8cfd8", snow: "#f4f6f9",
  sand: "#e8e1cf", concrete: "#e2e6ec", asphalt: "#9ca7b5", asphaltDark: "#86919f", line: "#f5f7fa",
  water: "#9cc0e4", white: "#f4f6f9", b1: "#eef1f5", b2: "#d6dee9", b3: "#c3d0e0", b4: "#a9bbd2", warm: "#ece5d8", warm2: "#ddd3c2",
  glass: "#a9c6ea", hivis: "#e6d44c", orange: "#ee8b45", yellow: "#e8b94c", trunk: "#9a8a76",
};

/* ── Small math helpers ── */
export const sstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const hash = (x: number, z: number) => {
  const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453;
  return s - Math.floor(s);
};
const vnoise = (x: number, z: number) => {
  const xi = Math.floor(x), zi = Math.floor(z), xf = x - xi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = zf * zf * (3 - 2 * zf);
  const a = hash(xi, zi), b = hash(xi + 1, zi), c = hash(xi, zi + 1), d = hash(xi + 1, zi + 1);
  return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
};
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rect = (x: number, z: number, cx: number, cz: number, hx: number, hz: number, f: number) =>
  sstep(f, 0, Math.max(Math.abs(x - cx) - hx, Math.abs(z - cz) - hz));

/* ── World layout (shared with the engine's camera stations) ── */
export const L = {
  highwayZ: 280, riverX: 420, railZ: 95, rebuildZ: 49, rebuildX: -205, coastZ: 565,
  capitol: new THREE.Vector3(-92, 0, -112), office: new THREE.Vector3(92, 0, -66),
  site: new THREE.Vector3(350, 0, 368), airport: new THREE.Vector3(-420, 0, -420),
  crossingZ: -262, newSpanZ: 322, mapY: 650, globe: new THREE.Vector3(420, 3200, -262),
};

function rawGround(x: number, z: number) {
  let h = 3 + (vnoise(x * 0.006, z * 0.006) - 0.5) * 8 + (vnoise(x * 0.02 + 7, z * 0.02 + 3) - 0.5) * 2;
  h += sstep(-380, -720, x) * (16 + 48 * vnoise(x * 0.008 + 20, z * 0.008 + 5));
  h += sstep(-560, -1150, z) * (90 + 140 * vnoise(x * 0.004 + 40, z * 0.004));
  h += sstep(1350, 1800, x) * (60 + 80 * vnoise(x * 0.005, z * 0.005 + 9));
  h += sstep(-900, -1500, x) * (60 + 90 * vnoise(x * 0.004 + 3, z * 0.004 + 11));
  return h;
}
function flatness(x: number, z: number) {
  let f = sstep(340, 260, Math.hypot(x, z + 20));
  f = Math.max(f, sstep(58, 34, Math.abs(z - L.highwayZ)));
  f = Math.max(f, sstep(48, 26, Math.abs(x)) * sstep(680, 640, z) * sstep(120, 170, z));
  f = Math.max(f, rect(x, z, L.airport.x, L.airport.z + 5, 210, 90, 50));
  f = Math.max(f, sstep(48, 30, Math.hypot(x - L.site.x, z - L.site.z)));
  f = Math.max(f, rect(x, z, 260, 520, 170, 50, 30));
  f = Math.max(f, rect(x, z, 920, 290, 140, 80, 40));
  f = Math.max(f, rect(x, z, 420, L.crossingZ, 260, 26, 40));
  f = Math.max(f, rect(x, z, 0, L.highwayZ, 190, 190, 50)); // interchange
  return f;
}
export function groundH(x: number, z: number) {
  let h = rawGround(x, z) * (1 - flatness(x, z));
  const rv = sstep(72, 34, Math.abs(x - L.riverX)) * sstep(560, 520, z);
  h = h * (1 - rv) - 9 * rv;
  const coast = sstep(L.coastZ, 650, z);
  h = h * (1 - coast) - 14 * coast;
  return h;
}
/* Road surfaces (bridges lift them over the river) */
export const roadEW = (x: number) =>
  Math.max(groundH(x, L.highwayZ), 5 * sstep(330, 372, x) * sstep(512, 468, x)) + 0.25;
export const roadNS = (z: number) =>
  Math.max(groundH(0, z), 0) + 8.5 * sstep(78, 30, Math.abs(z - L.highwayZ)) + 0.25;
export const crossingY = (x: number) =>
  Math.max(groundH(x, L.crossingZ), 14 * sstep(250, 345, x) * sstep(595, 500, x)) + 0.25;

/* ── Geometry batching ── */
class Batch {
  geos: THREE.BufferGeometry[] = [];
  private m = new THREE.Matrix4();
  private q = new THREE.Quaternion();
  private e = new THREE.Euler();
  private s = new THREE.Vector3();
  private p = new THREE.Vector3();
  private c = new THREE.Color();
  add(g: THREE.BufferGeometry, color: string, x: number, y: number, z: number, sx = 1, sy = 1, sz = 1, ry = 0, rx = 0, rz = 0) {
    const geo = (g.index ? g.toNonIndexed() : g.clone()) as THREE.BufferGeometry;
    this.e.set(rx, ry, rz); this.q.setFromEuler(this.e);
    this.m.compose(this.p.set(x, y, z), this.q, this.s.set(sx, sy, sz));
    geo.applyMatrix4(this.m);
    this.paint(geo, color);
    this.geos.push(geo);
    return geo;
  }
  push(geo: THREE.BufferGeometry, color?: string) {
    const g = (geo.index ? geo.toNonIndexed() : geo) as THREE.BufferGeometry;
    if (color) this.paint(g, color);
    for (const k of Object.keys(g.attributes)) if (!["position", "normal", "color"].includes(k)) g.deleteAttribute(k);
    if (!g.attributes.normal) g.computeVertexNormals();
    this.geos.push(g);
  }
  /* darker toward the ground: reads like soft ambient occlusion */
  shade(g: THREE.BufferGeometry, y0: number, y1: number, dark = 0.74) {
    const pos = g.attributes.position, col = g.attributes.color;
    for (let i = 0; i < pos.count; i++) {
      const k = dark + (1 - dark) * Math.min(1, Math.max(0, (pos.getY(i) - y0) / (y1 - y0)));
      col.setXYZ(i, col.getX(i) * k, col.getY(i) * k, col.getZ(i) * k);
    }
  }
  paint(g: THREE.BufferGeometry, color: string) {
    this.c.set(color);
    const n = g.attributes.position.count, arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { arr[i * 3] = this.c.r; arr[i * 3 + 1] = this.c.g; arr[i * 3 + 2] = this.c.b; }
    g.setAttribute("color", new THREE.BufferAttribute(arr, 3));
    for (const k of Object.keys(g.attributes)) if (!["position", "normal", "color"].includes(k)) g.deleteAttribute(k);
  }
  build(mat: THREE.Material) {
    const merged = mergeGeometries(this.geos, false);
    this.geos.forEach((g) => g.dispose());
    this.geos = [];
    const mesh = new THREE.Mesh(merged!, mat);
    mesh.matrixAutoUpdate = false;
    return mesh;
  }
}

const BOX = new THREE.BoxGeometry(1, 1, 1);
const CYL = new THREE.CylinderGeometry(1, 1, 1, 10);
const CYL6 = new THREE.CylinderGeometry(1, 1, 1, 6);
const CONE = new THREE.ConeGeometry(1, 1, 7);
const SPH = new THREE.SphereGeometry(1, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2);
const CAPS = new THREE.CapsuleGeometry(0.45, 1.1, 2, 6);

/* Ribbon along a polyline (roads, lane lines, rails) */
function ribbon(pts: THREE.Vector3[], width: number, lift = 0) {
  const pos: number[] = [], idx: number[] = [];
  for (let i = 0; i < pts.length; i++) {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const dx = b.x - a.x, dz = b.z - a.z, len = Math.hypot(dx, dz) || 1;
    const nx = -dz / len * width / 2, nz = dx / len * width / 2;
    const p = pts[i];
    pos.push(p.x + nx, p.y + lift, p.z + nz, p.x - nx, p.y + lift, p.z - nz);
    if (i > 0) { const k = i * 2; idx.push(k - 2, k, k - 1, k - 1, k, k + 1); }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}
function offsetLine(pts: THREE.Vector3[], off: number) {
  return pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const dx = b.x - a.x, dz = b.z - a.z, len = Math.hypot(dx, dz) || 1;
    return new THREE.Vector3(p.x - dz / len * off, p.y, p.z + dx / len * off);
  });
}
function dashes(pts: THREE.Vector3[], width: number, on: number, off: number, lift: number) {
  const out: THREE.BufferGeometry[] = [];
  let acc = 0, run: THREE.Vector3[] = [], drawing = true;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i], seg = a.distanceTo(b);
    let t = 0;
    while (t < seg) {
      const lim = drawing ? on : off, step = Math.min(lim - acc, seg - t);
      const p0 = a.clone().lerp(b, t / seg), p1 = a.clone().lerp(b, (t + step) / seg);
      if (drawing) { if (!run.length) run.push(p0); run.push(p1); }
      t += step; acc += step;
      if (acc >= lim - 1e-6) { if (drawing && run.length > 1) out.push(ribbon(run, width, lift)); run = []; drawing = !drawing; acc = 0; }
    }
  }
  return out;
}
const pathPts = (f: (t: number) => THREE.Vector3, n: number) => Array.from({ length: n + 1 }, (_, i) => f(i / n));

/* ── Terrain ── */
export function buildTerrain(mobile: boolean) {
  const seg = mobile ? 120 : 190, size = 3800;
  const g = new THREE.PlaneGeometry(size, size, seg, seg);
  g.rotateX(-Math.PI / 2);
  g.translate(200, 0, 100);
  const pos = g.attributes.position, col = new Float32Array(pos.count * 3);
  const c = new THREE.Color(), tmp = new THREE.Color();
  const road = ruralRoad();
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i);
    let h = groundH(x, z);
    /* keep the coarse terrain under the rural road so it never pokes through */
    if (x < -380 && x > -1000 && z < 340 && z > -120) {
      let best = 1e9, by = 0;
      for (const p of road) { const d = (p.x - x) ** 2 + (p.z - z) ** 2; if (d < best) { best = d; by = p.y; } }
      const d = Math.sqrt(best), sz = mobile ? 46 : 30;
      if (d < sz) h = Math.min(h, by - 0.8 * (1 - d / sz)) * (d / sz) + (by - 0.8) * (1 - d / sz);
    }
    pos.setY(i, h);
    const city = sstep(300, 230, Math.hypot(x, z + 20));
    c.set(PAL.grass).lerp(tmp.set(PAL.grass2), vnoise(x * 0.01, z * 0.01));
    if (h > 30) c.lerp(tmp.set(PAL.forest), sstep(30, 70, h) * 0.6);
    if (h > 90) c.lerp(tmp.set(PAL.rock), sstep(90, 150, h));
    if (h > 175) c.lerp(tmp.set(PAL.snow), sstep(175, 215, h));
    if (h < 1.5) c.lerp(tmp.set(PAL.sand), sstep(1.5, -1.5, h));
    c.lerp(tmp.set(PAL.concrete), city * 0.85);
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  g.setAttribute("color", new THREE.BufferAttribute(col, 3));
  g.computeVertexNormals();
  const mesh = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true }));
  mesh.matrixAutoUpdate = false;
  const water = new THREE.Mesh(
    new THREE.PlaneGeometry(size, size).rotateX(-Math.PI / 2).translate(200, -2, 100),
    new THREE.MeshPhongMaterial({ color: PAL.water, shininess: 70, specular: new THREE.Color("#ffffff") }),
  );
  water.matrixAutoUpdate = false;
  return { mesh, water };
}

/* ── Static world (one merged mesh) + the moving parts ── */
export type Movers = {
  cars: THREE.InstancedMesh; trails: THREE.InstancedMesh; carState: { lane: number; s: number; v: number }[];
  train: THREE.Group; plane: THREE.Group; ship: THREE.Group; jib: THREE.Group;
  drones: THREE.Group[]; rotors: THREE.Mesh[]; lamps: THREE.Points; office: THREE.Mesh;
};

export function buildWorld(mobile: boolean, avoid: THREE.Vector3[] = []) {
  const r = rng(7);
  const B = new Batch();
  const group = new THREE.Group();

  /* Highways */
  const ew = pathPts((t) => { const x = -1500 + t * 3200; return new THREE.Vector3(x, roadEW(x), L.highwayZ); }, mobile ? 260 : 420);
  B.push(ribbon(ew, 27, 0.02), PAL.asphalt);
  for (const o of [-11.2, 11.2]) B.push(ribbon(offsetLine(ew, o), 0.5, 0.06), PAL.line);
  for (const o of [-5.5, 5.5]) for (const d of dashes(offsetLine(ew, o), 0.45, 6, 9, 0.06)) B.push(d, PAL.line);
  for (const p of ew.filter((_, i) => i % 2 === 0)) B.add(BOX, PAL.b2, p.x, p.y + 0.5, p.z, 7.6, 0.9, 0.7);
  for (let x = 380; x <= 462; x += 41) B.add(BOX, PAL.b3, x, -6, L.highwayZ, 3, 2 * (roadEW(x) + 6), 22);
  B.add(BOX, PAL.b3, 421, 4.2, L.highwayZ, 120, 1.4, 27);

  const ns = pathPts((t) => { const z = 690 - t * 520; return new THREE.Vector3(0, roadNS(z), z); }, 160);
  B.push(ribbon(ns, 22, 0.08), PAL.asphalt);
  for (const o of [-9.5, 9.5]) B.push(ribbon(offsetLine(ns, o), 0.45, 0.14), PAL.line);
  for (const d of dashes(ns, 0.45, 6, 9, 0.14)) B.push(d, PAL.line);
  B.add(BOX, PAL.b3, 0, 7.5, L.highwayZ, 24, 1.6, 64);
  for (const z of [254, 306]) B.add(BOX, PAL.b3, 0, 3.6, z, 2.4, 7.4, 16);

  /* Interchange ramps: four swooping connectors */
  for (const [sx, sz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
    const a = new THREE.Vector3(sx * 13, 0, L.highwayZ + sz * 170), c = new THREE.Vector3(sx * 22, 0, L.highwayZ + sz * 22), d = new THREE.Vector3(sx * 170, 0, L.highwayZ + sz * 15);
    const q = new THREE.QuadraticBezierCurve3(a, c, d);
    const ramp = q.getPoints(48).map((p) => p.setY(Math.max(groundH(p.x, p.z), 0) + 0.22));
    B.push(ribbon(ramp, 7.5, 0.02), PAL.asphalt);
    B.push(ribbon(offsetLine(ramp, 3.3), 0.3, 0.08), PAL.line);
    B.push(ribbon(offsetLine(ramp, -3.3), 0.3, 0.08), PAL.line);
  }

  /* City */
  const towers: [number, number, number, number, number, string][] = [];
  for (let gx = -5; gx <= 5; gx++) for (let gz = -5; gz <= 4; gz++) {
    const xc = gx * 46, zc = -20 + gz * 46;
    if (gx === 0) continue;
    const rr = Math.hypot(xc, zc + 10);
    if (rr > 250 || zc > 175) continue;
    if (gx === -2 && gz === -2) continue; // capitol block
    if (gx === 2 && gz === -1) continue; // office tower block
    const core = Math.exp(-((rr / 130) ** 2));
    const n = rr < 110 ? 1 + Math.floor(r() * 2) : 2 + Math.floor(r() * 3);
    for (let k = 0; k < n; k++) {
      const w = n === 1 ? 26 + r() * 6 : 12 + r() * 8, d = n === 1 ? 26 + r() * 6 : 12 + r() * 8;
      const ox = n === 1 ? 0 : (k % 2 ? 1 : -1) * (8 + r() * 2), oz = n === 1 ? 0 : (k < 2 ? -1 : 1) * (8 + r() * 2) * (n > 2 ? 1 : 0);
      const nearCapitol = Math.abs(xc - L.capitol.x) < 50 && Math.abs(zc - L.capitol.z) < 50;
      const h = nearCapitol ? 6 + r() * 9 : 8 + r() * 14 + core * (40 + r() * 70) * (n === 1 ? 1.2 : 0.7);
      const col = [PAL.b1, PAL.b2, PAL.b3, PAL.white, PAL.b4, PAL.warm, PAL.warm2][Math.floor(r() * 7)];
      towers.push([xc + ox, zc + oz, w, d, h, col]);
    }
  }
  for (const [x, z, w, d, h, col] of towers) {
    B.shade(B.add(BOX, col, x, h / 2, z, w, h, d), 0, Math.min(h, 40));
    if (h > 30) B.add(BOX, PAL.b4, x, h + 1.2, z, w * 0.45, 2.4, d * 0.45);
    if (h > 55) B.add(BOX, PAL.b3, x, h * 0.5, z, w + 0.6, 1.2, d + 0.6);
  }
  /* Streets in the grid */
  for (let k = -6; k <= 5; k++) {
    const x = k * 46 + 23;
    B.add(BOX, PAL.asphalt, x, 0.12, -20, 11, 0.2, 470);
    const z = -20 + k * 46 + 23;
    if (z < 190) B.add(BOX, PAL.asphalt, 0, 0.12, z, 520, 0.2, 11);
  }
  B.add(BOX, PAL.asphalt, 0, 0.14, -20, 24, 0.2, 470);
  for (let z = -230; z < 170; z += 18) {
    B.add(CYL6, PAL.trunk, 0, 1.5, z, 0.35, 3, 0.35);
    B.add(CONE, PAL.forest, 0, 5, z, 2.6, 6, 2.6);
  }
  /* Capitol */
  const cp = L.capitol;
  B.add(BOX, "#e5ecdf", cp.x, 0.2, cp.z, 40, 0.3, 40);
  B.add(BOX, PAL.white, cp.x, 6, cp.z, 30, 12, 16);
  B.add(BOX, PAL.white, cp.x, 4.5, cp.z + 9, 12, 9, 4);
  for (let i = -2; i <= 2; i++) B.add(CYL6, PAL.white, cp.x + i * 2.6, 4.5, cp.z + 11.4, 0.5, 9, 0.5);
  B.add(CYL, PAL.white, cp.x, 15, cp.z, 7.5, 6, 7.5);
  B.add(SPH, PAL.white, cp.x, 18, cp.z, 7.5, 7.5, 7.5);
  B.add(CYL6, PAL.white, cp.x, 26.5, cp.z, 0.6, 3, 0.6);
  /* Light rail along the rail street */
  for (const o of [-1.4, 1.4]) B.add(BOX, PAL.slate, 0, 0.35, L.railZ + o, 600, 0.25, 0.3);
  B.add(BOX, PAL.b3, 0, 0.22, L.railZ, 600, 0.2, 5);
  for (let x = -290; x <= 290; x += 30) {
    B.add(BOX, PAL.b4, x, 3.5, L.railZ - 3.4, 0.35, 7, 0.35);
    B.add(BOX, PAL.b4, x, 7, L.railZ - 1.6, 0.25, 0.25, 3.8);
  }
  /* Street rebuild (Government & Public Works) */
  const rx = L.rebuildX;
  B.add(BOX, "#c4b195", rx, 0.24, L.rebuildZ, 80, 0.2, 7);
  for (let i = 0; i < 18; i++) B.add(CONE, PAL.orange, rx - 40 + i * 4.8, 0.7, L.rebuildZ + (i % 2 ? 4.3 : -4.3), 0.45, 1.4, 0.45);
  for (let i = 0; i < 5; i++) B.add(BOX, i % 2 ? PAL.white : PAL.orange, rx - 36 + i * 18, 0.7, L.rebuildZ + 5.2, 5, 1.2, 0.5);
  addExcavator(B, rx + 14, L.rebuildZ - 1, 0.6);
  addPeople(B, r, rx - 10, L.rebuildZ, 5, 6);
  addPickup(B, rx - 30, L.rebuildZ - 1.5, PAL.white);
  /* Glass office tower (Private Sector); its facade is a separate mesh */
  B.add(BOX, PAL.b4, L.office.x, 1, L.office.z, 32, 2, 32);
  B.add(BOX, PAL.b3, L.office.x, 124, L.office.z, 20, 4, 20);

  /* River crossings */
  const ns2 = L.newSpanZ;
  for (const x of [385, 420, 455]) B.add(BOX, PAL.b3, x, -3.5, ns2, 3.4, 17, 16);
  B.add(BOX, PAL.b3, 394, 4.4, ns2, 58, 1.5, 24);
  for (const o of [-6, 0, 6]) B.add(BOX, PAL.slate, 443, 3.3, ns2 + o, 22, 1.4, 1.2);
  /* tower crane base and construction site (Contractors) */
  B.add(BOX, PAL.concrete, 486, 0.4, 352, 12, 1, 12);
  const mastH = 64;
  for (let y = 0; y < mastH; y += 4) {
    B.add(BOX, PAL.yellow, 486, y + 2, 352, 2.6, 0.35, 2.6);
  }
  for (const [ox, oz] of [[-1.2, -1.2], [1.2, -1.2], [-1.2, 1.2], [1.2, 1.2]]) B.add(BOX, PAL.yellow, 486 + ox, mastH / 2, 352 + oz, 0.35, mastH, 0.35);
  const s = L.site;
  B.add(BOX, PAL.concrete, s.x, 0.2, s.z, 60, 0.3, 46);
  B.add(BOX, PAL.white, s.x - 14, 2.2, s.z - 8, 14, 4, 5);
  B.add(BOX, PAL.b3, s.x - 14, 0.4, s.z - 8, 14.4, 0.6, 5.4);
  B.add(BOX, PAL.white, s.x + 6, 2, s.z - 12, 10, 3.6, 4.5);
  B.add(BOX, "#c7b28a", s.x - 2, 1.1, s.z + 2, 4, 0.2, 2.4);
  for (const [ox, oz] of [[-3.6, 1], [-0.4, 1], [-3.6, 3], [-0.4, 3]]) B.add(BOX, PAL.trunk, s.x + ox, 0.55, s.z + oz, 0.2, 1, 0.2);
  addPeople(B, r, s.x - 2, s.z + 2, 6, 3.5);
  for (const [ox, oz, c] of [[10, 6, PAL.white], [16, 7, PAL.slate]] as [number, number, string][]) addPickup(B, s.x + ox, s.z + oz, c);
  for (let i = 0; i < 6; i++) B.add(BOX, PAL.slate, s.x + 18, 0.5 + i * 0.7, s.z - 2, 20, 0.6, 1.2);

  /* Cable-stayed crossing (Bridges & Structures) */
  const cz = L.crossingZ;
  const deck = pathPts((t) => { const x = 160 + t * 520; return new THREE.Vector3(x, crossingY(x), cz); }, 120);
  B.push(ribbon(deck, 16, 0.02), PAL.asphalt);
  for (const o of [-7, 7]) B.push(ribbon(offsetLine(deck, o), 0.4, 0.08), PAL.line);
  for (const d of dashes(deck, 0.4, 5, 7, 0.08)) B.push(d, PAL.line);
  B.add(BOX, PAL.b2, 422, 13.4, cz, 250, 1.6, 17);
  const pylons = [385, 455];
  for (const px of pylons) {
    for (const o of [-8.5, 8.5]) B.add(BOX, PAL.white, px, 26, cz + o, 2.6, 80, 2.6);
    B.add(BOX, PAL.white, px, 66, cz, 2.6, 2.4, 19);
    B.add(BOX, PAL.white, px, 10, cz, 2.6, 1.8, 19);
    B.add(BOX, PAL.b3, px, -4, cz, 6, 10, 22);
  }
  /* Approach roads to the crossing */
  const appr = pathPts((t) => { const x = -60 + t * 220; return new THREE.Vector3(x, Math.max(groundH(x, cz), 0) + 0.25, cz); }, 30);
  B.push(ribbon(appr, 12, 0.02), PAL.asphalt);

  /* Airport (Aviation & Airports) */
  const ap = L.airport;
  B.add(BOX, PAL.asphaltDark, ap.x, 0.18, ap.z - 20, 340, 0.2, 24);
  B.add(BOX, PAL.asphalt, ap.x, 0.16, ap.z + 16, 300, 0.2, 10);
  for (let i = 0; i < 16; i++) B.add(BOX, PAL.line, ap.x - 150 + i * 20, 0.3, ap.z - 20, 8, 0.1, 0.6);
  for (let i = 0; i < 6; i++) for (const e of [-1, 1]) B.add(BOX, PAL.line, ap.x + e * 160, 0.3, ap.z - 28 + i * 3.2, 6, 0.1, 1.2);
  B.add(BOX, PAL.b1, ap.x - 10, 5, ap.z + 50, 96, 10, 22);
  B.add(BOX, PAL.glass, ap.x - 10, 6, ap.z + 38.9, 92, 5, 0.4);
  B.add(BOX, PAL.b2, ap.x - 10, 10.4, ap.z + 50, 98, 0.8, 24);
  B.add(CYL, PAL.white, ap.x + 70, 17, ap.z + 52, 2.8, 34, 2.8);
  B.add(CYL, PAL.glass, ap.x + 70, 36, ap.z + 52, 5.6, 4.6, 5.6);
  B.add(CYL, PAL.b3, ap.x + 70, 38.9, ap.z + 52, 6.2, 1.2, 6.2);
  B.add(BOX, PAL.b2, ap.x - 110, 7, ap.z + 48, 40, 14, 28);
  addPlane(B, ap.x - 40, 0, ap.z + 26, 0);
  addPlane(B, ap.x + 10, 0, ap.z + 26, 0);

  /* Harbor (Ports & Harbors) */
  B.add(BOX, PAL.concrete, 260, -5, 585, 260, 14, 44);
  B.add(BOX, PAL.concrete, 260, 0.2, 530, 300, 0.3, 70);
  for (let i = 0; i < 3; i++) {
    const x = 190 + i * 62;
    for (const [ox, oz] of [[-7, 568], [7, 568], [-7, 596], [7, 596]]) B.add(BOX, PAL.b2, x + ox, 18, oz, 1.6, 36, 1.6);
    B.add(BOX, PAL.b2, x, 36.5, 582, 16, 2, 30);
    B.add(BOX, PAL.blue, x, 41, 600, 2.4, 2, 90);
    B.add(BOX, PAL.white, x, 38.5, 585, 4, 3, 5);
  }
  const ccol = ["#7fa6d9", "#2f5f9e", "#e3e7ec", "#c76f4d", "#9fb8a0", "#4D688C"];
  for (let gx = 0; gx < 14; gx++) for (let gz = 0; gz < 4; gz++) {
    const h = 1 + Math.floor(r() * 3);
    for (let k = 0; k < h; k++) B.add(BOX, ccol[Math.floor(r() * ccol.length)], 140 + gx * 17, 1.6 + k * 2.7, 506 + gz * 9, 15, 2.6, 2.6);
  }
  /* Trees on hills and around the edges */
  const trees: THREE.Vector3[] = [];
  const rural = ruralRoad();
  const want = mobile ? 700 : 1500;
  for (let tries = 0; trees.length < want && tries < want * 8; tries++) {
    const x = -1300 + r() * 2700, z = -900 + r() * 1500;
    const h = groundH(x, z);
    if (h < 0.8 || h > 120) continue;
    if (Math.abs(z - L.highwayZ) < 30 || (Math.abs(x) < 26 && z > 160)) continue;
    if (Math.hypot(x, z + 20) < 270) continue;
    const inside = (cx: number, cz: number, hx: number, hz: number) => Math.abs(x - cx) < hx && Math.abs(z - cz) < hz;
    if (inside(L.airport.x, L.airport.z, 220, 90)) continue;
    if (Math.abs(z - L.crossingZ) < 16) continue;
    if (Math.hypot(x - L.site.x, z - L.site.z) < 50 || inside(260, 530, 175, 60) || inside(920, 290, 140, 80)) continue;
    let near = avoid.some((a) => Math.hypot(a.x - x, a.z - z) < 48);
    for (let i = 0; i < rural.length && !near; i += 3) if (Math.hypot(rural[i].x - x, rural[i].z - z) < 14) { near = true; break; }
    if (near) continue;
    const dens = 0.25 + sstep(-300, -600, x) * 0.7 + sstep(-500, -800, z) * 0.5;
    if (r() > dens) continue;
    trees.push(new THREE.Vector3(x, h, z));
  }
  for (const t of trees) {
    const s2 = 0.8 + r() * 0.8;
    B.add(CYL6, PAL.trunk, t.x, t.y + 1.2 * s2, t.z, 0.35 * s2, 2.4 * s2, 0.35 * s2);
    B.add(CONE, r() > 0.5 ? PAL.forest : "#a9c39a", t.x, t.y + 5.4 * s2, t.z, 2.8 * s2, 7 * s2, 2.8 * s2);
  }
  /* Rural highway (Highways & Roads) */
  B.push(ribbon(rural, 11, 0.3), PAL.asphalt);
  for (const o of [-4.8, 4.8]) B.push(ribbon(offsetLine(rural, o), 0.35, 0.36), PAL.line);
  for (const d of dashes(rural, 0.35, 4, 6, 0.36)) B.push(d, PAL.yellow);

  /* Network station: gantry, sensors, operations center */
  B.add(BOX, PAL.b3, 900, 9, L.highwayZ - 14.5, 0.8, 18, 0.8);
  B.add(BOX, PAL.b3, 900, 9, L.highwayZ + 14.5, 0.8, 18, 0.8);
  B.add(BOX, PAL.b3, 900, 17.6, L.highwayZ, 0.8, 0.8, 30);
  B.add(BOX, "#2a6c4f", 900.6, 14.8, L.highwayZ - 6, 0.3, 4.4, 9);
  B.add(BOX, "#2a6c4f", 900.6, 14.8, L.highwayZ + 6, 0.3, 4.4, 9);
  for (const x of [840, 960, 1010]) { B.add(CYL6, PAL.b3, x, 6, L.highwayZ - 17, 0.3, 12, 0.3); B.add(BOX, PAL.white, x, 12, L.highwayZ - 17, 1.2, 1, 1.2); }
  B.add(BOX, PAL.b1, 935, 5, 338, 34, 10, 20);
  B.add(BOX, PAL.glass, 935, 6, 327.9, 30, 4, 0.4);
  B.add(SPH, PAL.white, 948, 10, 342, 3, 3, 3);
  for (const [x, z, w, h] of [[880, 225, 18, 22], [905, 210, 14, 34], [965, 225, 20, 18], [990, 208, 16, 28]]) B.add(BOX, PAL.b2, x, h / 2, z, w, h, w);
  /* Streetlights along the dusk stretch */
  const lampPts: number[] = [];
  for (let x = 500; x <= 1150; x += 34) for (const side of [-1, 1]) {
    const z = L.highwayZ + side * 15.5, y = roadEW(x);
    B.add(CYL6, PAL.b4, x, y + 5, z, 0.2, 10, 0.2);
    B.add(BOX, PAL.b4, x, y + 10, z - side * 1.6, 0.3, 0.3, 3.2);
    lampPts.push(x, y + 9.8, z - side * 3);
  }

  const solid = B.build(new THREE.MeshLambertMaterial({ vertexColors: true }));
  group.add(solid);

  /* Glass office tower facade (texture + dusk glow) */
  const office = new THREE.Mesh(new THREE.BoxGeometry(26, 120, 26), officeMaterial());
  office.position.set(L.office.x, 62, L.office.z);
  group.add(office);

  /* Lamp glows */
  const lg = new THREE.BufferGeometry();
  lg.setAttribute("position", new THREE.Float32BufferAttribute(lampPts, 3));
  const lamps = new THREE.Points(lg, new THREE.PointsMaterial({ size: 9, map: glowTexture(), color: "#ffd9a8", transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 }));
  group.add(lamps);

  /* Cars and light trails */
  const nCars = mobile ? 90 : 170;
  const carGeo = new THREE.BoxGeometry(4.4, 1.6, 2.1);
  const cars = new THREE.InstancedMesh(carGeo, new THREE.MeshLambertMaterial(), nCars);
  const trails = new THREE.InstancedMesh(new THREE.BoxGeometry(14, 0.35, 0.5), new THREE.MeshBasicMaterial({ transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0 }), nCars);
  const carCols = ["#f4f6f9", "#c9d5e4", "#4D688C", "#203864", "#9aa6b5", "#e3e7ec", "#7fa6d9"];
  const carState: { lane: number; s: number; v: number }[] = [];
  for (let i = 0; i < nCars; i++) {
    const lane = i < nCars * 0.82 ? Math.floor(r() * 4) : 4 + Math.floor(r() * 4);
    carState.push({ lane, s: r(), v: 0.012 + r() * 0.01 });
    cars.setColorAt(i, new THREE.Color(carCols[Math.floor(r() * carCols.length)]));
    trails.setColorAt(i, new THREE.Color(lane % 4 < 2 ? "#ff5a4a" : "#fff1d6"));
  }
  cars.frustumCulled = false; trails.frustumCulled = false;
  group.add(cars, trails);

  /* Train */
  const train = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const car = new THREE.Mesh(new THREE.BoxGeometry(17, 3.8, 3.2), new THREE.MeshLambertMaterial({ color: PAL.white }));
    car.position.set(i * 18, 2.4, 0);
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(17.1, 0.7, 3.3), new THREE.MeshBasicMaterial({ color: PAL.blue }));
    stripe.position.set(i * 18, 2.8, 0);
    const win = new THREE.Mesh(new THREE.BoxGeometry(16, 1.1, 3.25), new THREE.MeshLambertMaterial({ color: PAL.slate }));
    win.position.set(i * 18, 3.6, 0);
    train.add(car, stripe, win);
  }
  train.position.set(0, 0.3, L.railZ);
  group.add(train);

  /* Plane taking off */
  const plane = planeGroup();
  group.add(plane);

  /* Ship */
  const ship = new THREE.Group();
  const hull = new THREE.Mesh(new THREE.BoxGeometry(120, 9, 20), new THREE.MeshLambertMaterial({ color: PAL.navy }));
  hull.position.y = 1.5; ship.add(hull);
  const deckM = new THREE.Mesh(new THREE.BoxGeometry(120, 0.6, 20), new THREE.MeshLambertMaterial({ color: "#c76f4d" }));
  deckM.position.y = 6.2; ship.add(deckM);
  const bridgeH = new THREE.Mesh(new THREE.BoxGeometry(10, 14, 18), new THREE.MeshLambertMaterial({ color: PAL.white }));
  bridgeH.position.set(-50, 13, 0); ship.add(bridgeH);
  const shipB = new Batch();
  for (let gx = 0; gx < 13; gx++) for (let gz = 0; gz < 6; gz++) for (let k = 0; k < 1 + ((gx + gz) % 3); k++)
    shipB.add(BOX, ccol[(gx * 7 + gz * 3 + k) % ccol.length], -38 + gx * 7.4, 7.9 + k * 2.6, -7.5 + gz * 3, 7, 2.5, 2.8);
  ship.add(shipB.build(new THREE.MeshLambertMaterial({ vertexColors: true })));
  ship.position.set(250, -1, 632);
  group.add(ship);

  /* Tower crane jib (turns slowly) */
  const jib = new THREE.Group();
  const jb = new Batch();
  jb.add(BOX, PAL.yellow, -14, 0, 0, 50, 1.4, 1.6);
  jb.add(BOX, PAL.b4, 7, -1.5, 0, 5, 3, 3);
  jb.add(BOX, PAL.slate, 8, 0.6, 0, 2.4, 2.4, 2.4);
  jb.add(BOX, PAL.b4, -26, -10, 0, 0.12, 20, 0.12);
  jb.add(BOX, PAL.slate, -26, -20.5, 0, 14, 1, 1.2);
  jib.add(jb.build(new THREE.MeshLambertMaterial({ vertexColors: true })));
  jib.position.set(486, mastH + 1, 352);
  group.add(jib);

  /* Drones (corridor + rise) */
  const rotors: THREE.Mesh[] = [];
  const drones = [droneGroup(rotors), droneGroup(rotors)];
  group.add(...drones);

  const movers: Movers = { cars, trails, carState, train, plane, ship, jib, drones, rotors, lamps, office };
  return { group, movers };
}

export function ruralRoad() {
  return pathPts((t) => {
    const x = -420 - t * 520;
    const z = 278 - t * 180 + Math.sin(t * Math.PI * 1.6) * 70;
    return new THREE.Vector3(x, groundH(x, z) + 0.05, z);
  }, 140);
}

/* Car lanes: 0-3 east-west highway, 4-7 north-south highway */
export function placeCar(lane: number, s: number, out: THREE.Matrix4, tmpQ: THREE.Quaternion, trail?: THREE.Matrix4) {
  const p = new THREE.Vector3();
  let rot = 0, back = 0;
  if (lane < 4) {
    const dir = lane < 2 ? 1 : -1;
    const x = -900 + s * 2100;
    p.set(dir > 0 ? x : 1200 - (x + 900), 0, L.highwayZ + [8.25, 2.75, -2.75, -8.25][lane]);
    p.y = roadEW(p.x) + 1.05;
    rot = dir > 0 ? 0 : Math.PI; back = -dir * 9;
  } else {
    const dir = lane < 6 ? 1 : -1;
    const z = 660 - s * 480;
    p.set([-7.5, -2.5, 2.5, 7.5][lane - 4], 0, dir > 0 ? z : 180 + (660 - z));
    p.y = roadNS(p.z) + 1.05;
    rot = dir > 0 ? Math.PI / 2 : -Math.PI / 2; back = dir * 9;
  }
  tmpQ.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rot);
  out.compose(p, tmpQ, new THREE.Vector3(1, 1, 1));
  if (trail) {
    const tp = p.clone();
    if (lane < 4) tp.x += back; else tp.z += back;
    tp.y -= 0.2;
    trail.compose(tp, tmpQ, new THREE.Vector3(1, 1, 1));
  }
}

function addPeople(B: Batch, r: () => number, cx: number, cz: number, n: number, spread: number) {
  for (let i = 0; i < n; i++) {
    const x = cx + (r() - 0.5) * spread * 2, z = cz + (r() - 0.5) * spread;
    B.add(CAPS, i % 2 ? PAL.hivis : PAL.orange, x, 1.1, z, 1, 1, 1);
    B.add(SPH, PAL.white, x, 2.05, z, 0.45, 0.4, 0.45);
  }
}
function addPickup(B: Batch, x: number, z: number, c: string) {
  B.add(BOX, c, x, 1.1, z, 5.4, 1.2, 2.3);
  B.add(BOX, c, x - 0.8, 2.1, z, 2.4, 1, 2.2);
  B.add(BOX, PAL.slate, x - 0.8, 2.1, z, 2.5, 0.6, 2.25);
}
function addExcavator(B: Batch, x: number, z: number, y: number) {
  B.add(BOX, PAL.slate, x, y + 0.6, z, 6, 1.2, 4);
  B.add(BOX, PAL.yellow, x, y + 2.2, z, 4.4, 2, 3.4);
  B.add(BOX, PAL.glass, x - 1, y + 3.8, z + 0.6, 1.8, 1.6, 1.8);
  B.add(BOX, PAL.yellow, x + 4, y + 4, z, 6, 0.8, 0.8, 0, 0, -0.55);
  B.add(BOX, PAL.yellow, x + 7.5, y + 3, z, 0.8, 4, 0.8, 0, 0, 0.35);
}
function addPlane(B: Batch, x: number, y: number, z: number, ry: number) {
  B.add(CYL, PAL.white, x, y + 3, z, 1.9, 30, 1.9, ry, 0, Math.PI / 2);
  B.add(BOX, PAL.white, x + 1, y + 2.4, z, 5, 0.5, 30, ry);
  B.add(BOX, PAL.blue, x - 13, y + 7, z, 4, 6, 0.4, ry);
  B.add(BOX, PAL.white, x - 13, y + 3.6, z, 3, 0.3, 9, ry);
  for (const o of [-6, 6]) B.add(CYL, PAL.b3, x + 2, y + 1.6, z + o, 0.8, 3, 0.8, ry, 0, Math.PI / 2);
}
function planeGroup() {
  const g = new THREE.Group();
  const B = new Batch();
  addPlane(B, 0, 0, 0, 0);
  g.add(B.build(new THREE.MeshLambertMaterial({ vertexColors: true })));
  return g;
}
function droneGroup(rotors: THREE.Mesh[]) {
  const g = new THREE.Group();
  const B = new Batch();
  B.add(BOX, PAL.white, 0, 0, 0, 3.2, 0.9, 3.2);
  B.add(BOX, PAL.b4, 0, 0, 0, 7.2, 0.35, 0.45, Math.PI / 4);
  B.add(BOX, PAL.b4, 0, 0, 0, 7.2, 0.35, 0.45, -Math.PI / 4);
  B.add(SPH, PAL.navy, 0, -0.5, 0.6, 0.7, -0.7, 0.7);
  for (const [x, z] of [[2.5, 2.5], [-2.5, 2.5], [2.5, -2.5], [-2.5, -2.5]]) B.add(CYL6, PAL.slate, x, 0.4, z, 0.3, 0.8, 0.3);
  g.add(B.build(new THREE.MeshLambertMaterial({ vertexColors: true })));
  const rg = new THREE.CircleGeometry(1.6, 18).rotateX(-Math.PI / 2);
  const rm = new THREE.MeshBasicMaterial({ color: "#dfe8f5", transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false });
  for (const [x, z] of [[2.5, 2.5], [-2.5, 2.5], [2.5, -2.5], [-2.5, -2.5]]) {
    const ro = new THREE.Mesh(rg, rm);
    ro.position.set(x, 0.85, z);
    g.add(ro); rotors.push(ro);
  }
  g.scale.setScalar(2.2);
  return g;
}

/* ── Textures made in code ── */
let _glow: THREE.Texture | null = null;
export function glowTexture() {
  if (_glow) return _glow;
  const c = document.createElement("canvas"); c.width = c.height = 64;
  const x = c.getContext("2d")!;
  const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.25, "rgba(255,255,255,0.75)"); g.addColorStop(1, "rgba(255,255,255,0)");
  x.fillStyle = g; x.fillRect(0, 0, 64, 64);
  _glow = new THREE.CanvasTexture(c);
  return _glow;
}
let _cloud: THREE.Texture | null = null;
export function cloudTexture() {
  if (_cloud) return _cloud;
  const c = document.createElement("canvas"); c.width = c.height = 128;
  const x = c.getContext("2d")!;
  const r = rng(3);
  for (let i = 0; i < 22; i++) {
    const px = 30 + r() * 68, py = 42 + r() * 44, rad = 14 + r() * 26;
    const g = x.createRadialGradient(px, py, 0, px, py, rad);
    g.addColorStop(0, "rgba(255,255,255,0.55)"); g.addColorStop(1, "rgba(255,255,255,0)");
    x.fillStyle = g; x.fillRect(0, 0, 128, 128);
  }
  _cloud = new THREE.CanvasTexture(c);
  _cloud.colorSpace = THREE.SRGBColorSpace;
  return _cloud;
}
function officeMaterial() {
  const c = document.createElement("canvas"); c.width = 64; c.height = 256;
  const x = c.getContext("2d")!;
  x.fillStyle = "#b9d0ee"; x.fillRect(0, 0, 64, 256);
  for (let y = 0; y < 256; y += 8) { x.fillStyle = "#93b3dd"; x.fillRect(0, y, 64, 2); }
  for (let xx = 0; xx < 64; xx += 16) { x.fillStyle = "#a3bfe4"; x.fillRect(xx, 0, 1, 256); }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const e = document.createElement("canvas"); e.width = 64; e.height = 256;
  const ex = e.getContext("2d")!;
  ex.fillStyle = "#000"; ex.fillRect(0, 0, 64, 256);
  const r = rng(11);
  for (let y = 2; y < 256; y += 8) for (let xx = 0; xx < 64; xx += 16) if (r() > 0.45) { ex.fillStyle = "#ffe3b8"; ex.fillRect(xx + 2, y, 12, 5); }
  const et = new THREE.CanvasTexture(e);
  et.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshLambertMaterial({ map: t, emissiveMap: et, emissive: new THREE.Color("#ffffff"), emissiveIntensity: 0 });
}

/* ── Clouds: one instanced billboard draw call per layer ── */
export class CloudLayer {
  mesh: THREE.InstancedMesh;
  base: THREE.Vector3[] = [];
  scales: number[] = [];
  alpha: THREE.InstancedBufferAttribute;
  constructor(count: number, place: (i: number, r: () => number) => [THREE.Vector3, number], seed: number) {
    const r = rng(seed);
    const geo = new THREE.PlaneGeometry(1, 1);
    this.alpha = new THREE.InstancedBufferAttribute(new Float32Array(count).fill(1), 1);
    geo.setAttribute("aAlpha", this.alpha);
    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: {
        map: { value: cloudTexture() }, uOpacity: { value: 1 }, uColor: { value: new THREE.Color("#ffffff") },
        uShade: { value: new THREE.Color("#dfe7f2") }, fogColor: { value: new THREE.Color() }, fogNear: { value: 1 }, fogFar: { value: 1000 },
      },
      vertexShader: `
        attribute float aAlpha; varying vec2 vUv; varying float vA; varying float vDepth;
        void main(){
          vUv = uv; vA = aAlpha;
          vec4 c = modelViewMatrix * instanceMatrix * vec4(0.0,0.0,0.0,1.0);
          float s = length(instanceMatrix[0].xyz);
          c.xy += position.xy * s;
          vDepth = -c.z;
          gl_Position = projectionMatrix * c;
        }`,
      fragmentShader: `
        uniform sampler2D map; uniform float uOpacity; uniform vec3 uColor; uniform vec3 uShade;
        uniform vec3 fogColor; uniform float fogNear; uniform float fogFar;
        varying vec2 vUv; varying float vA; varying float vDepth;
        void main(){
          vec4 t = texture2D(map, vUv);
          vec3 col = mix(uShade, uColor, smoothstep(0.2, 0.9, vUv.y));
          float f = smoothstep(fogNear, fogFar, vDepth);
          col = mix(col, fogColor, f * 0.85);
          float a = t.a * uOpacity * vA * (1.0 - f * 0.6);
          if (a < 0.01) discard;
          gl_FragColor = vec4(col, a);
        }`,
    });
    this.mesh = new THREE.InstancedMesh(geo, mat, count);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 5;
    const m = new THREE.Matrix4();
    for (let i = 0; i < count; i++) {
      const [p, s] = place(i, r);
      this.base.push(p); this.scales.push(s);
      m.makeScale(s, s, s).setPosition(p);
      this.mesh.setMatrixAt(i, m);
    }
  }
  get material() { return this.mesh.material as THREE.ShaderMaterial; }
}

/* ── Connected-systems network (Digital Solutions) ── */
export function buildNetwork() {
  const nodes = [
    new THREE.Vector3(900, 18.6, L.highwayZ), new THREE.Vector3(840, 12.8, L.highwayZ - 17), new THREE.Vector3(960, 12.8, L.highwayZ - 17),
    new THREE.Vector3(1010, 12.8, L.highwayZ - 17), new THREE.Vector3(948, 13.5, 342), new THREE.Vector3(905, 34.5, 210),
    new THREE.Vector3(880, 22.5, 225), new THREE.Vector3(965, 18.5, 225), new THREE.Vector3(990, 28.5, 208), new THREE.Vector3(920, 10.5, 338),
  ];
  const pairs = [[0, 1], [0, 2], [2, 3], [0, 4], [4, 9], [9, 1], [5, 6], [5, 7], [7, 8], [6, 0], [8, 3], [5, 0], [7, 2]];
  const curves = pairs.map(([a, b]) => {
    const p = nodes[a], q = nodes[b], mid = p.clone().lerp(q, 0.5);
    mid.y += 8 + p.distanceTo(q) * 0.18;
    return new THREE.QuadraticBezierCurve3(p, mid, q);
  });
  const geos = curves.map((c) => new THREE.TubeGeometry(c, 24, 0.32, 5, false));
  const lines = new THREE.Mesh(mergeGeometries(geos)!, new THREE.MeshBasicMaterial({ color: PAL.blue, transparent: true, opacity: 0 }));
  const ng = new THREE.BufferGeometry().setFromPoints(nodes);
  const glow = new THREE.Points(ng, new THREE.PointsMaterial({ size: 9, map: glowTexture(), color: PAL.blueSoft, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 }));
  const pulseGeo = new THREE.BufferGeometry();
  pulseGeo.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(curves.length * 3), 3));
  const pulses = new THREE.Points(pulseGeo, new THREE.PointsMaterial({ size: 5, map: glowTexture(), color: "#ffffff", transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 }));
  const g = new THREE.Group();
  g.add(lines, glow, pulses);
  return { group: g, curves, lines, glow, pulses };
}

/* ── Frontier constellation above the clouds (data and AI) ── */
export function buildConstellation() {
  const r = rng(21);
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < 70; i++) pts.push(new THREE.Vector3(140 + r() * 320, 380 + r() * 170, -520 + r() * 520));
  const seg: number[] = [];
  pts.forEach((p, i) => {
    const near = pts.map((q, j) => [p.distanceTo(q), j] as [number, number]).filter(([, j]) => j !== i).sort((a, b) => a[0] - b[0]).slice(0, 2);
    for (const [, j] of near) seg.push(p.x, p.y, p.z, pts[j].x, pts[j].y, pts[j].z);
  });
  const lg = new THREE.BufferGeometry();
  lg.setAttribute("position", new THREE.Float32BufferAttribute(seg, 3));
  const lines = new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: PAL.blue, transparent: true, opacity: 0 }));
  const glow = new THREE.Points(new THREE.BufferGeometry().setFromPoints(pts), new THREE.PointsMaterial({ size: 8, map: glowTexture(), color: PAL.blueSoft, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 }));
  const g = new THREE.Group();
  g.add(lines, glow);
  return { group: g, lines, glow };
}
