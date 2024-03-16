class Node {
  x: number;
  y: number;
  vy: number;
  vx: number;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
  }
}

class Line {
  spring: number;
  friction: number;
  nodes: Node[];

  constructor(e: { spring: number }) {
    this.spring = e.spring + 0.1 * Math.random() - 0.05;
    this.friction = E.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];
    for (let n = 0; n < E.size; n++) {
      const t = new Node();
      t.x = pos.x!;
      t.y = pos.y!;
      this.nodes.push(t);
    }
  }

  update() {
    let e = this.spring;
    let t = this.nodes[0];
    t.vx += (pos.x! - t.x) * e;
    t.vy += (pos.y! - t.y) * e;
    for (let i = 0, a = this.nodes.length; i < a; i++) {
      if (i > 0) {
        const n = this.nodes[i - 1];
        t = this.nodes[i];
        t.vx += (n.x - t.x) * e;
        t.vy += (n.y - t.y) * e;
        t.vx += n.vx * E.dampening;
        t.vy += n.vy * E.dampening;
      }
      t.vx *= this.friction;
      t.vy *= this.friction;
      t.x += t.vx;
      t.y += t.vy;
      e *= E.tension;
    }
  }

  draw() {
    let n = this.nodes[0].x;
    let i = this.nodes[0].y;
    ctx.beginPath();
    ctx.moveTo(n, i);
    for (let a = 1, o = this.nodes.length - 2; a < o; a++) {
      const e = this.nodes[a];
      const t = this.nodes[a + 1];
      n = 0.5 * (e.x + t.x);
      i = 0.5 * (e.y + t.y);
      ctx.quadraticCurveTo(e.x, e.y, n, i);
    }
    const e = this.nodes[this.nodes.length - 2];
    const t = this.nodes[this.nodes.length - 1];
    ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
    ctx.stroke();
    ctx.closePath();
  }
}

class N {
  phase: number = 0;
  offset: number = 0;
  frequency: number = 0.001;
  amplitude: number = 1;

  constructor(e: {
    phase?: number;
    offset?: number;
    frequency?: number;
    amplitude?: number;
  }) {
    this.init(e || {});
  }

  init(e: {
    phase?: number;
    offset?: number;
    frequency?: number;
    amplitude?: number;
  }) {
    this.phase = e.phase || 0;
    this.offset = e.offset || 0;
    this.amplitude = e.amplitude || 1;
  }

  update() {
    this.phase += this.frequency;
    return this.offset + Math.sin(this.phase) * this.amplitude;
  }

  value() {
    return this.phase;
  }
}

let ctx: CanvasRenderingContext2D & { running?: boolean };
let f: N;
let pos: { x?: number; y?: number } = {};
let lines: Line[] = [];
const E = {
  debug: true,
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98,
};

function onMousemove(e: MouseEvent | TouchEvent) {
  function o() {
    lines = [];
    for (let e = 0; e < E.trails; e++)
      lines.push(new Line({ spring: 0.45 + (e / E.trails) * 0.025 }));
  }

  function c(e: MouseEvent | TouchEvent) {
    if ((e as TouchEvent).touches) {
      pos.x = (e as TouchEvent).touches[0].pageX;
      pos.y = (e as TouchEvent).touches[0].pageY;
    } else {
      pos.x = (e as MouseEvent).clientX;
      pos.y = (e as MouseEvent).clientY;
    }
    e.preventDefault();
  }

  function l(e: TouchEvent) {
    if (e.touches.length === 1) {
      pos.x = e.touches[0].pageX;
      pos.y = e.touches[0].pageY;
    }
  }

  document.removeEventListener("mousemove", onMousemove);
  document.removeEventListener("touchstart", onMousemove);
  document.addEventListener("mousemove", c);
  document.addEventListener("touchmove", c);
  document.addEventListener("touchstart", l);
  c(e);
  o();
  render();
}

function render() {
  if (ctx.running) {
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = "hsla(" + Math.round(f.update()) + ",90%,50%,0.25)";
    ctx.lineWidth = 1;
    for (let t = 0; t < E.trails; t++) {
      const e = lines[t];
      e.update();
      e.draw();
    }
    window.requestAnimationFrame(render);
  }
}

function resizeCanvas() {
  ctx.canvas.width = window.innerWidth - 20;
  ctx.canvas.height = window.innerHeight;
}

export const renderCanvas = function () {
  ctx = (document.getElementById("canvas") as HTMLCanvasElement).getContext(
    "2d"
  )!;
  ctx.running = true;
  f = new N({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });
  document.addEventListener("mousemove", onMousemove);
  document.addEventListener("touchstart", onMousemove);
  document.body.addEventListener("orientationchange", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("focus", () => {
    if (!ctx.running) ctx.running = true;
    render();
  });
  window.addEventListener("blur", () => {
    ctx.running = false;
  });
  resizeCanvas();
};
