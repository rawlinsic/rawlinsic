/* The Rawlins world: one real-time 3D landscape the camera flies through.
   The home journey drives it from scroll; the menu drives it from whatever
   the visitor points at. One renderer, one canvas, shared by both. */
import * as THREE from "three";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import {
  PAL, L, sstep, groundH, roadEW, roadNS, crossingY, ruralRoad, placeCar,
  buildTerrain, buildWorld, buildNetwork, buildConstellation, CloudLayer, glowTexture, cloudTexture, type Movers,
} from "./build";

/* ── Sky presets ── */
type Sky = { top: string; hor: string; bot: string; sun: string; sunI: number; sunDir: [number, number, number]; hemiS: string; hemiG: string; hemiI: number; fogN: number; fogF: number };
const SKY: Record<string, Sky> = {
  dawn: { top: "#86ade2", hor: "#f6d9c4", bot: "#f1e5da", sun: "#ffd2a6", sunI: 3.0, sunDir: [0.75, 0.3, -0.35], hemiS: "#dfe8f6", hemiG: "#eadccd", hemiI: 1.55, fogN: 300, fogF: 2400 },
  day: { top: "#6d9fe2", hor: "#e3edf9", bot: "#edf2f8", sun: "#fff3e2", sunI: 3.1, sunDir: [0.45, 0.62, 0.4], hemiS: "#e6effa", hemiG: "#d9dfd0", hemiI: 1.6, fogN: 320, fogF: 2600 },
  calm: { top: "#9fc1ec", hor: "#f1f6fc", bot: "#f7f9fc", sun: "#ffffff", sunI: 2.6, sunDir: [0.35, 0.75, 0.35], hemiS: "#eef4fc", hemiG: "#e2e6dc", hemiI: 1.9, fogN: 500, fogF: 3200 },
  dusk: { top: "#203561", hor: "#e69f78", bot: "#3c3f58", sun: "#ff9a68", sunI: 1.5, sunDir: [-0.85, 0.12, -0.2], hemiS: "#7584ab", hemiG: "#3d3b45", hemiI: 1.3, fogN: 260, fogF: 2000 },
  high: { top: "#4f8ce2", hor: "#dde9f9", bot: "#f3f7fc", sun: "#ffffff", sunI: 2.9, sunDir: [0.4, 0.8, 0.3], hemiS: "#e8f0fb", hemiG: "#dfe6ef", hemiI: 1.8, fogN: 700, fogF: 4200 },
};

/* ── Stations: where the camera sits for each scene ── */
type Fx = { cloudO: number; cloudPart: number; dusk: number; network: number; sea: number; stars: number; map: number; mapDraw: number; globe: number; spin: number };
const FX0: Fx = { cloudO: 0, cloudPart: 0, dusk: 0, network: 0, sea: 0, stars: 0, map: 0, mapDraw: 0, globe: 0, spin: 0 };
type Station = { pos: THREE.Vector3; look: THREE.Vector3; sky: keyof typeof SKY; fx: Fx; line?: string };

const G = (x: number, dy: number, z: number) => new THREE.Vector3(x, Math.max(groundH(x, z), 0) + dy, z);
const A = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const st = (pos: THREE.Vector3, look: THREE.Vector3, sky: keyof typeof SKY, fx: Partial<Fx> = {}, line?: string): Station =>
  ({ pos, look, sky, fx: { ...FX0, ...fx }, line });

const MY = L.mapY, GL = L.globe;
export const STATIONS: Record<string, Station> = {
  hero0: st(A(80, 330, 690), A(0, 0, 130), "dawn", { cloudO: 1, cloudPart: 0.3 }),
  hero1: st(A(40, 170, 505), A(0, 8, 150), "dawn", { cloudO: 1, cloudPart: 1 }, "hero"),
  people0: st(A(9, 10, 228), A(5, 11, 120), "day"),
  people1: st(A(10, 12, 118), A(3, 18, 0), "day", {}, "people"),
  grid0: st(A(50, 520, 150), A(0, 0, -40), "calm"),
  grid1: st(A(16, 450, 70), A(-6, 0, -62), "calm", {}, "grid"),
  interchange: st(A(130, 130, 420), A(0, 4, 280), "day", {}, "hero"),
  capitol: st(A(-178, 92, -34), A(-92, 10, -112), "dawn", {}, "capitol"),
  construction: st(G(326, 36, 418), A(440, 8, 324), "day", {}, "construction"),
  dusk: st(A(600, 22, 320), A(790, 5, 280), "dusk", { dusk: 1 }, "dusk"),
  network: st(A(848, 60, 392), A(925, 12, 272), "dusk", { dusk: 0.85, network: 1 }, "network"),
  drone: st(A(1018, 52, 356), A(1100, 36, 272), "day", {}, "drone"),
  rural: st(G(-455, 46, 340), A(-640, 0, 160), "day", {}, "rural"),
  crossing: st(A(615, 70, -105), A(415, 22, -262), "day", {}, "crossing"),
  airport: st(G(-282, 36, -522), A(-445, 6, -420), "dawn", {}, "airport"),
  rail: st(A(300, 40, 140), A(150, 3, 95), "day", {}, "rail"),
  harbor: st(A(410, 36, 728), A(250, 8, 590), "day", {}, "harbor"),
  street: st(A(-276, 24, 60), A(-212, 0, 49), "day", {}, "street"),
  site: st(G(316, 19, 424), A(382, 4, 346), "day", {}, "site"),
  office: st(A(178, 72, 14), A(92, 56, -66), "calm", {}, "office"),
  map0: st(A(0, MY + 1150, 650), A(0, MY, 70), "high", { map: 1, mapDraw: 0.06, sea: 1 }),
  map1: st(A(0, MY + 830, 400), A(0, MY, 30), "high", { map: 1, mapDraw: 1, sea: 1 }),
  rise0: st(A(640, 16, -250), A(430, 26, -262), "day", {}, "rise"),
  rise1: st(A(600, 62, -255), A(430, 58, -262), "day", {}, "rise"),
  rise2: st(A(568, 150, -250), A(450, 122, -255), "day", { sea: 0.7 }, "rise"),
  rise3: st(A(575, 445, -240), A(310, 455, -290), "high", { sea: 1, stars: 1 }, "rise"),
  globe0: st(A(GL.x, GL.y + 300, GL.z + 1350), GL.clone(), "high", { globe: 1, spin: 0 }),
  globe1: st(A(GL.x, GL.y + 150, GL.z + 720), A(GL.x, GL.y + 40, GL.z), "calm", { globe: 1, spin: 1 }),
};

/* Scene keys used by pages and the menu → stations */
export const SCENE_STATION: Record<string, string> = {
  hero: "hero1", people: "people1", grid: "grid1", capitol: "capitol", construction: "construction",
  dusk: "dusk", network: "network", drone: "drone", interchange: "interchange", rural: "rural",
  crossing: "crossing", airport: "airport", rail: "rail", harbor: "harbor", street: "street",
  site: "site", office: "office", map: "map1", rise: "rise1", sky: "rise3", globe: "globe1",
};

/* Lines: the one thin blue line, a 3D path through every scene */
function linePaths(): Record<string, THREE.Curve<THREE.Vector3>> {
  const cr = (pts: THREE.Vector3[], tension = 0.5) => new THREE.CatmullRomCurve3(pts, false, "catmullrom", tension);
  const poly = (pts: THREE.Vector3[]) => {
    const p = new THREE.CurvePath<THREE.Vector3>();
    for (let i = 1; i < pts.length; i++) p.add(new THREE.LineCurve3(pts[i - 1], pts[i]));
    return p;
  };
  const rural = ruralRoad();
  return {
    hero: cr([A(-460, roadEW(-460) + 1.4, 280), A(-220, 1.6, 280), A(-70, 1.6, 281), A(-14, 4.5, 268), A(6, 10.2, 250), A(6, 6, 212), A(7, 1.6, 172), A(7, 1.6, 140)]),
    people: cr([A(7, 1.6, 140), A(7, 1.6, 60), A(7, 1.6, -20), A(7, 1.6, -60)], 0),
    grid: poly([A(7, 1.5, -60), A(7, 1.5, -89), A(-69, 1.5, -89), A(-69, 1.5, -135), A(69, 1.5, -135), A(69, 1.5, -43), A(115, 1.5, -43), A(115, 1.5, 3)]),
    capitol: poly([A(7, 1.5, -43), A(-69, 1.5, -43), A(-69, 1.5, -100), A(-92, 1.5, -100), A(-92, 1.5, -97)]),
    construction: cr([A(330, roadEW(330) + 1.6, 322), A(390, 6.6, 322), A(432, 6.6, 322), A(470, 6.6, 322), A(530, roadEW(530) + 1.6, 322)]),
    dusk: cr([A(520, roadEW(520) + 1.4, 280), A(700, 1.4, 280), A(880, 1.4, 280)], 0),
    network: cr([A(880, 1.4, 280), A(895, 8, 280), A(900, 18.6, 280)]),
    drone: cr([A(900, 18.6, 280), A(960, 28, 277), A(1040, 38, 272), A(1150, 43, 268), A(1260, 52, 262)]),
    rural: cr(rural.slice(10, 120).map((p) => p.clone().setY(p.y + 1.4))),
    crossing: cr([A(250, crossingY(250) + 1.4, L.crossingZ), A(420, 15.6, L.crossingZ), A(600, crossingY(600) + 1.4, L.crossingZ)]),
    airport: cr([A(L.airport.x - 160, 0.9, L.airport.z - 20), A(L.airport.x + 40, 0.9, L.airport.z - 20), A(L.airport.x + 160, 14, L.airport.z - 24), A(L.airport.x + 320, 70, L.airport.z - 40)]),
    rail: cr([A(260, 0.9, L.railZ + 3.4), A(0, 0.9, L.railZ + 3.4), A(-240, 0.9, L.railZ + 3.4)], 0),
    harbor: cr([A(230, 3, 571), A(270, -0.6, 640), A(380, -0.6, 720), A(600, -0.6, 800), A(900, -0.6, 840)]),
    street: cr([A(L.rebuildX - 60, 1.1, L.rebuildZ), A(L.rebuildX, 1.1, L.rebuildZ), A(L.rebuildX + 60, 1.1, L.rebuildZ)], 0),
    site: cr([A(L.site.x - 14, 1.2, L.site.z - 4), A(L.site.x + 8, 1.2, L.site.z - 22), A(380, 3.5, 336), A(394, 6.6, 322)]),
    office: poly([A(115, 1.5, -43), A(104, 1.5, -51), A(104, 1.5, -52.6), A(104, 124, -52.6)]),
    rise: cr([A(575, crossingY(575) + 1.4, -262), A(520, crossingY(520) + 1.4, -262), A(458, 15.5, -262), A(456, 64, -262), A(452, 118, -255), A(420, 300, -262), A(330, 470, -262)]),
  };
}
/* Journey order of stations, and where each line draws (in that order) */
export const SEQ = ["hero0", "hero1", "people0", "people1", "grid0", "grid1", "capitol", "construction", "dusk", "network", "drone",
  "rural", "crossing", "airport", "rail", "harbor", "street", "site", "office", "map0", "map1", "rise0", "rise1", "rise2", "rise3", "globe0", "globe1"];
const IDX = (k: string) => SEQ.indexOf(k);
const LINE_SPAN: Record<string, [number, number]> = (() => {
  const s: Record<string, [number, number]> = {
    hero: [IDX("hero0") + 0.1, IDX("hero1")], people: [IDX("people0"), IDX("people1")], grid: [IDX("grid0"), IDX("grid1")],
    rise: [IDX("rise0") - 0.3, IDX("rise3")],
  };
  for (const k of ["capitol", "construction", "dusk", "network", "drone", "rural", "crossing", "airport", "rail", "harbor", "street", "site", "office"])
    s[k] = [IDX(k) - 0.42, IDX(k) - 0.02];
  return s;
})();

const FAR = 380; // farther than this → pass through haze instead of flying

/* ── Engine ── */
export type WorldOptions = { mobile: boolean; reducedMotion: boolean };

export class World {
  canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private sky: THREE.Mesh;
  private hemi: THREE.HemisphereLight;
  private sun: THREE.DirectionalLight;
  private fog: THREE.Fog;
  private haze: THREE.Mesh;
  private movers: Movers;
  private network: ReturnType<typeof buildNetwork>;
  private stars: ReturnType<typeof buildConstellation>;
  private heroClouds: CloudLayer;
  private sea: CloudLayer;
  private lines: Record<string, { mesh: THREE.Mesh; glow: THREE.Mesh; head: THREE.Sprite; seg: number; radial: number; reveal: number; target: number; curve: THREE.Curve<THREE.Vector3> }> = {};
  private map!: { group: THREE.Group; outline: LineSegments2; mat: LineMaterial; segs: number; borders: THREE.LineSegments; fills: Map<string, THREE.Mesh>; markers: THREE.Points; base: THREE.Mesh };
  private globe!: { group: THREE.Group; land: THREE.Points; us: THREE.Points; halo: THREE.Sprite };
  private opts: WorldOptions;
  private last = 0;
  private raf = 0;
  private running = false;
  private time = 0;
  private dpr = 1;
  private frameAvg = 16;
  private lastResize = { w: 0, h: 0 };

  /* targets and current (damped) values */
  private tPos = new THREE.Vector3(); private tLook = new THREE.Vector3();
  private cPos = new THREE.Vector3(); private cLook = new THREE.Vector3();
  private tFx: Fx = { ...FX0 }; private cFx: Fx = { ...FX0 };
  private tSky = { a: "dawn", b: "dawn", m: 0 };
  private cSkyCols = { top: new THREE.Color(), hor: new THREE.Color(), bot: new THREE.Color(), sun: new THREE.Color(), hemiS: new THREE.Color(), hemiG: new THREE.Color() };
  private cSkyNum = { sunI: 2, hemiI: 2, fogN: 300, fogF: 2400, dir: new THREE.Vector3(0.5, 0.5, 0.2) };
  private hazeT = 0; private hazeFlash = 0;
  private first = true;
  private mode: "journey" | "menu" = "journey";
  private menuFrom = "hero1"; private menuTo = "hero1"; private menuM = 1;
  private journeyG = 0;
  private mouse = new THREE.Vector2(); private mouseS = new THREE.Vector2();
  private highlighted = new Set<string>(); private activeState: string | null = null;
  private dirty = true;

  constructor(canvas: HTMLCanvasElement, opts: WorldOptions) {
    this.canvas = canvas;
    this.opts = opts;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: !opts.mobile, alpha: false, powerPreference: "high-performance" });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.dpr = Math.min(window.devicePixelRatio || 1, opts.mobile ? 1.5 : 1.75);
    this.renderer.setPixelRatio(this.dpr);
    this.camera = new THREE.PerspectiveCamera(48, 1, 1, 12000);
    this.scene.add(this.camera);

    /* sky dome follows the camera */
    this.sky = new THREE.Mesh(
      new THREE.SphereGeometry(9000, 32, 16),
      new THREE.ShaderMaterial({
        side: THREE.BackSide, depthWrite: false, fog: false,
        uniforms: { top: { value: new THREE.Color() }, hor: { value: new THREE.Color() }, bot: { value: new THREE.Color() }, sunDir: { value: new THREE.Vector3() }, sunCol: { value: new THREE.Color() } },
        vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `uniform vec3 top; uniform vec3 hor; uniform vec3 bot; uniform vec3 sunDir; uniform vec3 sunCol; varying vec3 vDir;
          void main(){ float y = vDir.y; vec3 c = y > 0.0 ? mix(hor, top, pow(clamp(y,0.0,1.0), 0.5)) : mix(hor, bot, pow(clamp(-y,0.0,1.0), 0.35));
          float s = max(dot(normalize(vDir), normalize(sunDir)), 0.0);
          c += sunCol * (pow(s, 600.0) * 0.9 + pow(s, 12.0) * 0.18);
          gl_FragColor = vec4(c, 1.0); }`,
      }),
    );
    this.sky.renderOrder = -10;
    this.scene.add(this.sky);

    this.hemi = new THREE.HemisphereLight("#ffffff", "#ffffff", 2);
    this.sun = new THREE.DirectionalLight("#ffffff", 2.5);
    this.scene.add(this.hemi, this.sun, this.sun.target);
    if (!opts.mobile) {
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.sun.castShadow = true;
      this.sun.shadow.mapSize.set(2048, 2048);
      const sc = this.sun.shadow.camera;
      sc.left = -280; sc.right = 280; sc.top = 280; sc.bottom = -280; sc.near = 10; sc.far = 1800;
      this.sun.shadow.bias = -0.0006;
      this.sun.shadow.normalBias = 0.6;
    }
    this.fog = new THREE.Fog("#ffffff", 300, 2400);
    this.scene.fog = this.fog;

    const terr = buildTerrain(opts.mobile);
    this.scene.add(terr.mesh, terr.water);
    /* keep trees out of every camera's line of sight */
    const sight: THREE.Vector3[] = [];
    for (const s2 of Object.values(STATIONS)) for (let k = 0; k <= 6; k++) sight.push(s2.pos.clone().lerp(s2.look, k / 8));
    const w = buildWorld(opts.mobile, sight);
    this.scene.add(w.group);
    if (!opts.mobile) {
      terr.mesh.receiveShadow = true;
      w.group.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh && !(m.material as THREE.Material).transparent) { m.castShadow = true; m.receiveShadow = true; }
      });
    }
    this.movers = w.movers;
    this.network = buildNetwork();
    this.scene.add(this.network.group);
    this.stars = buildConstellation();
    this.scene.add(this.stars.group);

    /* hero clouds (part as you scroll) and the cloud sea (rise, map) */
    this.heroClouds = new CloudLayer(opts.mobile ? 46 : 80, (i, r) => {
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 260;
      return [A(40 + Math.cos(a) * d * 1.4, 250 + r() * 90, 540 + Math.sin(a) * d * 0.9 - 80), 90 + r() * 120];
    }, 5);
    this.sea = new CloudLayer(opts.mobile ? 70 : 140, (i, r) => {
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 1300;
      return [A(300 + Math.cos(a) * d, 270 + r() * 60, -150 + Math.sin(a) * d), 160 + r() * 200];
    }, 9);
    this.scene.add(this.heroClouds.mesh, this.sea.mesh);

    this.buildLines();
    this.buildMap();
    this.buildGlobe();

    /* haze: full-screen veil used for scene changes */
    this.haze = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        transparent: true, depthTest: false, depthWrite: false,
        uniforms: { uH: { value: 0 }, uC: { value: new THREE.Color("#ffffff") }, uT: { value: 0 }, map: { value: cloudTexture() } },
        vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
        fragmentShader: `uniform float uH; uniform vec3 uC; uniform float uT; uniform sampler2D map; varying vec2 vUv;
          void main(){ float n = texture2D(map, fract(vUv * vec2(1.3, 0.9) + vec2(uT * 0.02, 0.0))).a;
          float n2 = texture2D(map, fract(vUv * vec2(0.8, 1.4) - vec2(0.0, uT * 0.015))).a;
          float a = uH >= 0.97 ? 1.0 : clamp(uH * (0.75 + 0.6 * (n + n2)), 0.0, 1.0);
          gl_FragColor = vec4(uC, a); }`,
      }),
    );
    this.haze.frustumCulled = false;
    this.haze.renderOrder = 999;
    this.camera.add(this.haze);

    this.setTargetsFromStations("hero0", "hero0", 0);
    window.addEventListener("pointermove", this.onPointer, { passive: true });
    document.addEventListener("visibilitychange", this.onVis);
    this.resize();
  }

  /* ── public API ── */
  /** Journey: g is a float position in SEQ (0 … SEQ.length-1). */
  setJourney(g: number) {
    this.journeyG = Math.max(0, Math.min(SEQ.length - 1, g));
    if (this.mode === "journey") this.applyJourney();
  }
  /** Menu / pages: show a scene (SceneKey or station name). */
  focus(key: string) {
    const target = STATIONS[key] ? key : SCENE_STATION[key] || "hero1";
    if (this.mode === "menu" && target === this.menuTo) return;
    this.menuFrom = this.mode === "menu" ? (this.menuM > 0.5 ? this.menuTo : this.menuFrom) : SEQ[Math.round(this.journeyG)];
    this.menuTo = target;
    this.menuM = this.opts.reducedMotion ? 1 : 0;
    if (this.opts.reducedMotion) this.hazeFlash = 1;
    this.mode = "menu";
    this.dirty = true;
  }
  /** Back to the journey (home) after the menu closes. */
  release() {
    if (this.mode === "journey") return;
    this.mode = "journey";
    this.hazeFlash = this.opts.reducedMotion ? 1 : 0.0;
    this.applyJourney();
    this.dirty = true;
  }
  highlightStates(names: string[], active: string | null) {
    this.highlighted = new Set(names);
    this.activeState = active;
    this.dirty = true;
  }
  start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    const loop = () => {
      if (!this.running) return;
      this.raf = requestAnimationFrame(loop);
      this.frame();
    };
    this.raf = requestAnimationFrame(loop);
  }
  stop() { this.running = false; cancelAnimationFrame(this.raf); }
  resize = () => {
    const w = this.canvas.clientWidth || window.innerWidth, h = this.canvas.clientHeight || window.innerHeight;
    if (Math.abs(w - this.lastResize.w) < 2 && Math.abs(h - this.lastResize.h) < 90 && !this.first) return;
    this.lastResize = { w, h };
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    /* keep a steady horizontal view; clamp so phones don't fisheye */
    const hfov = 72 * Math.PI / 180;
    const v = 2 * Math.atan(Math.tan(hfov / 2) / this.camera.aspect) * 180 / Math.PI;
    this.camera.fov = Math.min(74, Math.max(40, v));
    this.camera.updateProjectionMatrix();
    if (this.map) this.map.mat.resolution.set(w * this.dpr, h * this.dpr);
    this.dirty = true;
  };
  dispose() {
    this.stop();
    window.removeEventListener("pointermove", this.onPointer);
    document.removeEventListener("visibilitychange", this.onVis);
    this.renderer.dispose();
  }

  /* ── internals ── */
  private onPointer = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    this.mouse.set(e.clientX / window.innerWidth * 2 - 1, e.clientY / window.innerHeight * 2 - 1);
  };
  private onVis = () => { if (document.hidden) this.stop(); else this.start(); };

  private applyJourney() {
    const g = this.journeyG;
    if (this.opts.reducedMotion) {
      const k = SEQ[Math.round(g)];
      if (this.tSky.b !== STATIONS[k].sky || !this.tPos.equals(STATIONS[k].pos)) this.hazeFlash = Math.max(this.hazeFlash, 0.9);
      this.setTargetsFromStations(k, k, 0);
    } else {
      const i = Math.min(SEQ.length - 2, Math.floor(g));
      this.setTargetsFromStations(SEQ[i], SEQ[i + 1], g - i);
    }
    for (const [k, l] of Object.entries(this.lines)) {
      const span = LINE_SPAN[k];
      l.target = span ? Math.max(0, Math.min(1, (g - span[0]) / (span[1] - span[0]))) : 0;
      if (this.opts.reducedMotion) l.target = l.target > 0.5 ? 1 : 0;
    }
    this.dirty = true;
  }

  /** Blend two stations: fly if close, pass through haze if far. */
  private setTargetsFromStations(ka: string, kb: string, m: number) {
    const a = STATIONS[ka], b = STATIONS[kb];
    const far = a.pos.distanceTo(b.pos) > FAR || a.look.distanceTo(b.look) > FAR;
    const portrait = this.camera.aspect < 0.85;
    const pull = portrait ? 1 + (0.85 - this.camera.aspect) * 0.55 : 1;
    if (!far || ka === kb) {
      const e = m * m * (3 - 2 * m);
      this.tPos.lerpVectors(a.pos, b.pos, e);
      this.tLook.lerpVectors(a.look, b.look, e);
      for (const k of Object.keys(FX0) as (keyof Fx)[]) this.tFx[k] = a.fx[k] + (b.fx[k] - a.fx[k]) * e;
      this.tSky = { a: a.sky, b: b.sky, m: e };
      this.hazeT = 0;
    } else {
      const d = Math.abs(m - 0.5);
      this.hazeT = 1 - sstep(0.03, 0.13, d);
      const s = m < 0.5 ? a : b;
      const push = m < 0.5 ? m / 0.5 : -(1 - m) / 0.5; // drift forward out of a, settle into b
      const dir = new THREE.Vector3().subVectors(s.look, s.pos);
      this.tPos.copy(s.pos).addScaledVector(dir, push * 0.16);
      this.tLook.copy(s.look);
      for (const k of Object.keys(FX0) as (keyof Fx)[]) this.tFx[k] = s.fx[k];
      this.tSky = { a: a.sky, b: b.sky, m: sstep(0.35, 0.65, m) };
    }
    if (pull !== 1) this.tPos.sub(this.tLook).multiplyScalar(pull).add(this.tLook);
  }

  private frame() {
    const now = performance.now();
    const dtRaw = (now - this.last) / 1000;
    this.last = now;
    const dt = Math.min(0.05, dtRaw);
    const reduced = this.opts.reducedMotion;
    if (!reduced) this.time += dt;

    /* menu transition runs on time */
    if (this.mode === "menu") {
      if (this.menuM < 1) this.menuM = Math.min(1, this.menuM + dt / 1.1);
      this.setTargetsFromStations(this.menuFrom, this.menuTo, this.menuM);
      for (const [k, l] of Object.entries(this.lines)) l.target = STATIONS[this.menuTo].line === k ? (this.menuM > 0.6 ? 1 : 0) : 0;
    }

    /* damping, with a snap when the target jumps (a haze change) */
    const jump = this.cPos.distanceTo(this.tPos);
    if (jump > 160 && this.hazeT < 0.5 && !this.first) this.hazeFlash = Math.max(this.hazeFlash, 0.85);
    const k = this.first || jump > 160 || reduced ? 1 : 1 - Math.exp(-dt * 4.2);
    this.first = false;
    this.cPos.lerp(this.tPos, k);
    this.cLook.lerp(this.tLook, k);
    for (const f of Object.keys(FX0) as (keyof Fx)[]) this.cFx[f] += (this.tFx[f] - this.cFx[f]) * (jump > 160 ? 1 : k);
    this.blendSky(k);

    /* camera with idle drift and pointer parallax (not when reduced) */
    this.mouseS.lerp(this.mouse, 1 - Math.exp(-dt * 3));
    const dist = this.cPos.distanceTo(this.cLook);
    const drift = reduced ? 0 : dist * 0.012;
    const pos = this.cPos.clone().add(new THREE.Vector3(Math.sin(this.time * 0.13) * drift, Math.sin(this.time * 0.17) * drift * 0.5, Math.cos(this.time * 0.11) * drift));
    this.camera.position.copy(pos);
    const look = this.cLook.clone();
    if (!reduced) {
      const right = new THREE.Vector3().subVectors(look, pos).cross(new THREE.Vector3(0, 1, 0)).normalize();
      look.addScaledVector(right, this.mouseS.x * dist * 0.035).add(new THREE.Vector3(0, -this.mouseS.y * dist * 0.02, 0));
    }
    this.camera.lookAt(look);
    this.sky.position.copy(this.camera.position);

    /* haze veil */
    if (reduced) this.hazeFlash = Math.max(0, this.hazeFlash - dt / 0.35); else this.hazeFlash = Math.max(0, this.hazeFlash - dt * 1.5);
    const hz = Math.max(this.hazeT, this.hazeFlash);
    const hm = this.haze.material as THREE.ShaderMaterial;
    hm.uniforms.uH.value = hz;
    hm.uniforms.uT.value = this.time;
    hm.uniforms.uC.value.copy(this.cSkyCols.hor).lerp(new THREE.Color("#ffffff"), 0.45);
    this.haze.visible = hz > 0.005;

    this.updateObjects(dt);
    this.updateLines(dt);
    this.updateMap(dt);
    this.updateGlobe();

    if (reduced && !this.dirty && this.hazeFlash <= 0) return;
    this.dirty = false;
    this.renderer.render(this.scene, this.camera);
    this.adapt(dtRaw);
  }

  private blendSky(k: number) {
    const a = SKY[this.tSky.a], b = SKY[this.tSky.b], m = this.tSky.m;
    const c = new THREE.Color(), d = new THREE.Color();
    const mixC = (x: string, y: string, target: THREE.Color) => target.lerp(c.set(x).lerp(d.set(y), m), k);
    const C = this.cSkyCols;
    mixC(a.top, b.top, C.top); mixC(a.hor, b.hor, C.hor); mixC(a.bot, b.bot, C.bot); mixC(a.sun, b.sun, C.sun);
    mixC(a.hemiS, b.hemiS, C.hemiS); mixC(a.hemiG, b.hemiG, C.hemiG);
    const N = this.cSkyNum, mix = (x: number, y: number) => x + (y - x) * m;
    N.sunI += (mix(a.sunI, b.sunI) - N.sunI) * k; N.hemiI += (mix(a.hemiI, b.hemiI) - N.hemiI) * k;
    N.fogN += (mix(a.fogN, b.fogN) - N.fogN) * k; N.fogF += (mix(a.fogF, b.fogF) - N.fogF) * k;
    N.dir.lerp(new THREE.Vector3(...a.sunDir).lerp(new THREE.Vector3(...b.sunDir), m).normalize(), k);
    const u = (this.sky.material as THREE.ShaderMaterial).uniforms;
    u.top.value.copy(C.top); u.hor.value.copy(C.hor); u.bot.value.copy(C.bot); u.sunDir.value.copy(N.dir); u.sunCol.value.copy(C.sun);
    this.hemi.color.copy(C.hemiS); this.hemi.groundColor.copy(C.hemiG); this.hemi.intensity = N.hemiI;
    this.sun.color.copy(C.sun); this.sun.intensity = N.sunI;
    /* the sun's shadow box follows what the camera looks at */
    const focus = this.cLook.clone().lerp(this.camera.position, 0.25);
    this.sun.position.copy(focus).addScaledVector(N.dir, 800);
    this.sun.target.position.copy(focus);
    this.fog.color.copy(C.hor);
    /* above the clouds the fog reaches farther */
    const alt = Math.max(0, this.camera.position.y - 200);
    this.fog.near = N.fogN + alt * 0.6; this.fog.far = N.fogF + alt * 1.2;
    for (const cl of [this.heroClouds, this.sea]) {
      const cu = cl.material.uniforms;
      cu.fogColor.value.copy(C.hor); cu.fogNear.value = this.fog.near; cu.fogFar.value = this.fog.far * 1.3;
      cu.uShade.value.copy(C.hor).lerp(new THREE.Color("#c9d6e8"), 0.4);
    }
  }

  private tmpM = new THREE.Matrix4(); private tmpM2 = new THREE.Matrix4(); private tmpQ = new THREE.Quaternion();
  private updateObjects(dt: number) {
    const t = this.time, mv = this.movers, fx = this.cFx;
    /* traffic */
    for (let i = 0; i < mv.carState.length; i++) {
      const c = mv.carState[i];
      c.s = (c.s + c.v * dt * 0.35) % 1;
      placeCar(c.lane, c.s, this.tmpM, this.tmpQ, this.tmpM2);
      mv.cars.setMatrixAt(i, this.tmpM);
      mv.trails.setMatrixAt(i, this.tmpM2);
    }
    mv.cars.instanceMatrix.needsUpdate = true;
    mv.trails.instanceMatrix.needsUpdate = true;
    (mv.trails.material as THREE.MeshBasicMaterial).opacity = fx.dusk * 0.95;
    mv.trails.visible = fx.dusk > 0.02;
    (mv.lamps.material as THREE.PointsMaterial).opacity = fx.dusk;
    mv.lamps.visible = fx.dusk > 0.02;
    (mv.office.material as THREE.MeshLambertMaterial).emissiveIntensity = fx.dusk * 0.9;
    /* train ping-pongs along the rail street */
    const ph = (t / 46) % 2, pp = ph < 1 ? ph : 2 - ph, e = pp * pp * (3 - 2 * pp);
    mv.train.position.x = -200 + e * 400;
    /* plane: roll, lift off, climb, reset */
    const ap = L.airport, pt = (t % 30) / 30;
    if (pt < 0.45) { const s = pt / 0.45; mv.plane.position.set(ap.x - 160 + s * s * 230, 0.2, ap.z - 20); mv.plane.rotation.z = 0; }
    else { const s = (pt - 0.45) / 0.55; mv.plane.position.set(ap.x + 70 + s * 380, 0.2 + s * s * 120, ap.z - 20 - s * 30); mv.plane.rotation.z = 0.16; }
    mv.plane.visible = pt < 0.98;
    /* ship bobs, crane turns, drones hover */
    mv.ship.position.y = -1 + Math.sin(t * 0.6) * 0.25;
    mv.jib.rotation.y = Math.sin(t * 0.08) * 0.7 + 0.4;
    const d0 = mv.drones[0];
    d0.position.set(1060 + Math.sin(t * 0.16) * 70, 38 + Math.sin(t * 0.9) * 1.2, 272 + Math.sin(t * 0.31) * 8);
    d0.rotation.y = Math.cos(t * 0.16) * 0.5;
    mv.drones[1].position.set(452 + Math.sin(t * 0.4) * 3, 118 + Math.sin(t * 1.1) * 1.4, -255);
    for (const r of mv.rotors) r.rotation.y += dt * 40;
    /* connected systems */
    const n = this.network;
    (n.lines.material as THREE.MeshBasicMaterial).opacity = fx.network * 0.95;
    (n.glow.material as THREE.PointsMaterial).opacity = fx.network;
    (n.pulses.material as THREE.PointsMaterial).opacity = fx.network;
    n.group.visible = fx.network > 0.02;
    if (n.group.visible) {
      const arr = n.pulses.geometry.attributes.position as THREE.BufferAttribute;
      n.curves.forEach((c, i) => { const p = c.getPoint((t * 0.35 + i * 0.37) % 1); arr.setXYZ(i, p.x, p.y, p.z); });
      arr.needsUpdate = true;
    }
    (this.stars.lines.material as THREE.LineBasicMaterial).opacity = fx.stars * 0.7;
    (this.stars.glow.material as THREE.PointsMaterial).opacity = fx.stars;
    this.stars.group.visible = fx.stars > 0.02;
    this.stars.group.rotation.y = Math.sin(t * 0.05) * 0.04;
    /* hero clouds part outward; sea of clouds for the rise and the map */
    const hc = this.heroClouds, part = fx.cloudPart;
    hc.mesh.visible = fx.cloudO > 0.02;
    if (hc.mesh.visible) {
      hc.material.uniforms.uOpacity.value = fx.cloudO * (1 - part * 0.35);
      for (let i = 0; i < hc.base.length; i++) {
        const b = hc.base[i], dx = b.x - 40, dz = b.z - 460, len = Math.hypot(dx, dz) || 1;
        const push = part * (220 + (i % 5) * 30);
        this.tmpM.makeScale(hc.scales[i], hc.scales[i], hc.scales[i]).setPosition(b.x + dx / len * push + Math.sin(t * 0.05 + i) * 6, b.y + part * 40, b.z + dz / len * push * 0.6);
        hc.mesh.setMatrixAt(i, this.tmpM);
      }
      hc.mesh.instanceMatrix.needsUpdate = true;
    }
    this.sea.mesh.visible = fx.sea > 0.02;
    this.sea.material.uniforms.uOpacity.value = fx.sea;
  }

  private buildLines() {
    const paths = linePaths();
    const mat = new THREE.MeshBasicMaterial({ color: PAL.blue });
    const gmat = new THREE.MeshBasicMaterial({ color: PAL.blueSoft, transparent: true, opacity: 0.32, blending: THREE.AdditiveBlending, depthWrite: false });
    for (const [k, curve] of Object.entries(paths)) {
      const len = curve.getLength();
      const seg = Math.min(this.opts.mobile ? 220 : 420, Math.max(24, Math.round(len / 3)));
      const radius = k === "rise" ? 1.1 : 0.62, radial = 6;
      const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, seg, radius, radial, false), mat);
      const glow = new THREE.Mesh(new THREE.TubeGeometry(curve, seg, radius * 2.8, radial, false), gmat);
      const head = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), color: "#cfe0ff", transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
      head.scale.setScalar(k === "rise" ? 16 : 9);
      mesh.geometry.setDrawRange(0, 0); glow.geometry.setDrawRange(0, 0);
      this.scene.add(mesh, glow, head);
      this.lines[k] = { mesh, glow, head, seg, radial, reveal: 0, target: 0, curve };
    }
  }
  private updateLines(dt: number) {
    for (const l of Object.values(this.lines)) {
      const speed = this.mode === "menu" ? 1.2 : 6;
      l.reveal += (l.target - l.reveal) * Math.min(1, dt * speed);
      if (this.opts.reducedMotion) l.reveal = l.target;
      const r = l.reveal < 0.002 ? 0 : l.reveal;
      const n = Math.floor(r * l.seg) * l.radial * 6;
      l.mesh.geometry.setDrawRange(0, n); l.glow.geometry.setDrawRange(0, n);
      l.mesh.visible = l.glow.visible = n > 0;
      l.head.visible = r > 0.01 && r < 0.995;
      if (l.head.visible) l.head.position.copy(l.curve.getPoint(r));
    }
  }

  private buildMap() {
    const group = new THREE.Group();
    group.position.set(0, L.mapY, 0);
    const toV = (x: number, y: number, h = 0) => [x - 487.5, h, y - 305];
    const fills = new Map<string, THREE.Mesh>();
    const baseGeos: THREE.BufferGeometry[] = [];
    let data: { nation: number[][][]; borders: number[][][]; states: { name: string; c: number[]; rings: number[][][] }[] } | null = null;
    const outlineGeo = new LineSegmentsGeometry();
    const mat = new LineMaterial({ color: PAL.blue, linewidth: 2.4, transparent: true, opacity: 1, depthWrite: false });
    const outline = new LineSegments2(outlineGeo, mat);
    outline.renderOrder = 4;
    const borders = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: "#9db6d8", transparent: true, opacity: 0 }));
    const markers = new THREE.Points(new THREE.BufferGeometry(), new THREE.PointsMaterial({ size: 26, map: glowTexture(), color: PAL.blue, transparent: true, depthWrite: false, opacity: 0, sizeAttenuation: true }));
    const base = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial({ color: "#eef3fa", transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }));
    group.add(base, borders, outline, markers);
    for (const o of [base, borders, outline, markers]) o.frustumCulled = false;
    /* the map floats above the cloud sea: draw it after the clouds */
    base.renderOrder = 10; borders.renderOrder = 11; outline.renderOrder = 13; markers.renderOrder = 14;
    this.scene.add(group);
    this.map = { group, outline, mat, segs: 0, borders, fills, markers, base };
    fetch("/world/us-map.json").then((r) => r.json()).then((d) => {
      data = d;
      const seg: number[] = [];
      for (const l of d.nation) for (let i = 1; i < l.length; i++) seg.push(...toV(l[i - 1][0], l[i - 1][1], 0.6), ...toV(l[i][0], l[i][1], 0.6));
      outlineGeo.setPositions(seg);
      this.map.segs = seg.length / 6;
      const bs: number[] = [];
      for (const l of d.borders) for (let i = 1; i < l.length; i++) bs.push(...toV(l[i - 1][0], l[i - 1][1], 0.3), ...toV(l[i][0], l[i][1], 0.3));
      borders.geometry.setAttribute("position", new THREE.Float32BufferAttribute(bs, 3));
      for (const s of d.states) {
        const geos = s.rings.map((ring: number[][]) => {
          const shape = new THREE.Shape(ring.map(([x, y]) => new THREE.Vector2(x - 487.5, -(y - 305))));
          const g = new THREE.ShapeGeometry(shape);
          g.rotateX(-Math.PI / 2);
          return g;
        });
        for (const g of geos) baseGeos.push(g.clone());
        if (!geos.length) continue;
        const merged = geos.length > 1 ? geos.reduce((acc: THREE.BufferGeometry | null, g) => (acc ? mergeTwo(acc, g) : g), null)! : geos[0];
        const m = new THREE.Mesh(merged, new THREE.MeshBasicMaterial({ color: PAL.panel2, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }));
        m.position.y = 0.15;
        m.visible = false;
        m.frustumCulled = false;
        m.renderOrder = 12;
        fills.set(s.name, m);
        group.add(m);
      }
      const merged = baseGeos.reduce((acc: THREE.BufferGeometry | null, g) => (acc ? mergeTwo(acc, g) : g), null);
      if (merged) base.geometry = merged;
      (this.map as any).centroids = Object.fromEntries(d.states.map((s: any) => [s.name, toV(s.c[0], s.c[1], 2)]));
      this.dirty = true;
    }).catch(() => {});
    void data;
  }
  private updateMap(dt: number) {
    const m = this.map, f = this.cFx.map;
    m.group.visible = f > 0.02;
    if (!m.group.visible || !m.segs) return;
    const draw = this.cFx.mapDraw;
    (m.outline.geometry as LineSegmentsGeometry).instanceCount = Math.floor(m.segs * Math.min(1, draw * 1.25));
    m.mat.opacity = f;
    (m.borders.material as THREE.LineBasicMaterial).opacity = f * sstep(0.55, 0.95, draw) * 0.8;
    (m.base.material as THREE.MeshBasicMaterial).opacity = f * sstep(0.3, 0.9, draw) * 0.95;
    const cents = (m as any).centroids || {};
    const pts: number[] = [];
    for (const [name, mesh] of m.fills) {
      const on = this.highlighted.has(name);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      const target = on ? (this.activeState === name ? 0.95 : 0.75) * sstep(0.75, 1, draw) * f : 0;
      mat.opacity += (target - mat.opacity) * Math.min(1, dt * 6);
      mat.color.set(this.activeState === name ? PAL.blue : PAL.panel2);
      mesh.visible = mat.opacity > 0.01;
      if (on && cents[name]) pts.push(...cents[name]);
    }
    m.markers.geometry.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    (m.markers.material as THREE.PointsMaterial).opacity = f * sstep(0.8, 1, draw) * (0.75 + Math.sin(this.time * 2.4) * 0.25);
  }

  private buildGlobe() {
    const group = new THREE.Group();
    group.position.copy(L.globe);
    const R = 230;
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(R - 1.5, 48, 32), new THREE.MeshLambertMaterial({ color: "#e4edf8" }));
    const land = new THREE.Points(new THREE.BufferGeometry(), new THREE.PointsMaterial({ size: 3.4, color: "#9db5d6", sizeAttenuation: true }));
    const us = new THREE.Points(new THREE.BufferGeometry(), new THREE.PointsMaterial({ size: 4.2, color: PAL.blue, sizeAttenuation: true }));
    land.frustumCulled = false; us.frustumCulled = false;
    const spin = new THREE.Group();
    spin.add(sphere, land, us);
    group.add(spin);
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), color: "#cfe0f7", transparent: true, opacity: 0.8, depthWrite: false }));
    halo.scale.setScalar(R * 2.9);
    halo.position.z = -60;
    group.add(halo);
    this.scene.add(group);
    this.globe = { group, land, us, halo };
    (this.globe as any).spin = spin;
    fetch("/world/globe.json").then((r) => r.json()).then((d) => {
      const a: number[] = [], b: number[] = [];
      for (let i = 0; i < d.dots.length; i += 3) {
        const lng = d.dots[i] * Math.PI / 180, lat = d.dots[i + 1] * Math.PI / 180;
        const v = [R * Math.cos(lat) * Math.sin(lng), R * Math.sin(lat), R * Math.cos(lat) * Math.cos(lng)];
        (d.dots[i + 2] ? b : a).push(...v);
      }
      land.geometry.setAttribute("position", new THREE.Float32BufferAttribute(a, 3));
      us.geometry.setAttribute("position", new THREE.Float32BufferAttribute(b, 3));
      this.dirty = true;
    }).catch(() => {});
  }
  private updateGlobe() {
    const g = this.globe, f = this.cFx.globe;
    g.group.visible = f > 0.02;
    if (!g.group.visible) return;
    const s = this.cFx.spin, spin = (g as any).spin as THREE.Group;
    spin.rotation.order = "XYZ";
    spin.rotation.y = (98 - (1 - s) * 150) * Math.PI / 180 + (this.opts.reducedMotion ? 0 : Math.sin(this.time * 0.1) * 0.02);
    spin.rotation.x = (14 + s * 18) * Math.PI / 180;
  }

  private adapt(dt: number) {
    if (dt <= 0 || dt > 0.25) return;
    this.frameAvg = this.frameAvg * 0.96 + dt * 1000 * 0.04;
    if (this.frameAvg > 24 && this.dpr > 1) {
      this.dpr = Math.max(1, this.dpr - 0.25);
      this.renderer.setPixelRatio(this.dpr);
      this.first = true; this.resize(); this.first = false;
      this.frameAvg = 16;
    }
  }
}

function mergeTwo(a: THREE.BufferGeometry, b: THREE.BufferGeometry) {
  const ai = a.index ? a : a, bi = b;
  const pa = ai.attributes.position.array as ArrayLike<number>, pb = bi.attributes.position.array as ArrayLike<number>;
  const ia = ai.index ? Array.from(ai.index.array) : Array.from({ length: pa.length / 3 }, (_, i) => i);
  const ib = bi.index ? Array.from(bi.index.array) : Array.from({ length: pb.length / 3 }, (_, i) => i);
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute([...Array.from(pa), ...Array.from(pb)], 3));
  const off = pa.length / 3;
  g.setIndex([...ia, ...ib.map((i) => i + off)]);
  return g;
}
