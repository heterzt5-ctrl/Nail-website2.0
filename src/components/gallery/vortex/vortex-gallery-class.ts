import * as THREE from "three";
import gsap from "gsap";
import normalizeWheel from "normalize-wheel";

const instancedVertexShader = `
#define PI 3.14159265359

attribute float aAngle;
attribute float aHeight;
attribute float aRadius;
attribute float aAspectRatio;
attribute float aSpeed;
attribute vec4 aTextureCoords;
attribute vec2 aImageRes;

varying vec4 vTextureCoords;
varying vec2 vUv;
varying float vAspectRatio;

uniform float uMaxZ;
uniform float uZrange;
uniform float uScrollY;
uniform float uSpeedY;
uniform float uDirection;

vec4 getQuaternionFromAxisAngle(vec3 axis, float angle) {
  float halfAngle = angle * 0.5;
  return vec4(axis.xyz * sin(halfAngle), cos(halfAngle));
}

void main() {
  vec3 scaledPosition = position;
  scaledPosition.y /= aAspectRatio;

  float zPos = aHeight + uScrollY;
  float zRange = uZrange;
  float minZ = (uMaxZ - uZrange);

  zPos = mod(zPos - minZ, zRange) + minZ;

  float theta = aAngle + uSpeedY * 0.4 * aSpeed;

  vec3 instancePosition = vec3(cos(theta) * aRadius, zPos, sin(theta) * aRadius);

  float angle = atan(instancePosition.x, instancePosition.z);

  vec4 rotation = getQuaternionFromAxisAngle(vec3(0.0, 1.0, 0.0), angle);

  vec3 finalPosition = scaledPosition + 2.0 * cross(rotation.xyz, cross(rotation.xyz, scaledPosition) + rotation.w * scaledPosition);

  vec4 modelPosition = modelMatrix * vec4(instancePosition + finalPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;

  vUv = uv;
  vTextureCoords = aTextureCoords;
  vAspectRatio = aAspectRatio;
}
`;

const instancedFragmentShader = `
varying vec4 vTextureCoords;
varying vec2 vUv;

uniform sampler2D uAtlas;

void main() {
  float xStart = vTextureCoords.x;
  float xEnd = vTextureCoords.y;
  float yStart = vTextureCoords.z;
  float yEnd = vTextureCoords.w;

  vec2 atlasUV;
  atlasUV.x = mix(xStart, xEnd, vUv.x);
  atlasUV.y = mix(yStart, yEnd, 1.0 - vUv.y);

  vec4 color = texture2D(uAtlas, atlasUV);
  gl_FragColor = color;
}
`;

const centeredVertexShader = `
varying vec2 vUv;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
  vUv = uv;
}
`;

const centeredFragmentShader = `
varying vec2 vUv;

uniform sampler2D uAtlas;
uniform vec4 uTextureCoords;

void main() {
  float xStart = uTextureCoords.x;
  float xEnd = uTextureCoords.y;
  float yStart = uTextureCoords.z;
  float yEnd = uTextureCoords.w;

  vec2 atlasUV;
  atlasUV.x = mix(xStart, xEnd, vUv.x);
  atlasUV.y = mix(yStart, yEnd, 1.0 - vUv.y);

  vec4 color = texture2D(uAtlas, atlasUV);
  gl_FragColor = color;
}
`;

export default class VortexGallery {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  imageInfos: {
    width: number;
    height: number;
    aspectRatio: number;
    uvs: { xStart: number; xEnd: number; yStart: number; yEnd: number };
  }[] = [];
  atlasTexture: THREE.Texture | null = null;
  instancedMaterial!: THREE.ShaderMaterial;
  centerMaterial!: THREE.ShaderMaterial;
  centerMesh: THREE.Mesh | null = null;
  scrollY = {
    speedTarget: 0,
    speedCurrent: 0,
    target: 0,
    current: 0,
    direction: 1,
  };
  private lastScrollTime = 0;
  textureIndex = 0;
  time = 0;
  paused = false;

  instanceData: {
    angles: Float32Array;
    heights: Float32Array;
    radiuses: Float32Array;
    speeds: Float32Array;
    aspectRatios: Float32Array;
    imageIndices: Uint16Array;
  } | null = null;
  instanceCount = 0;
  private uMaxZ = 0;
  private uZrange = 0;

  private disposed = false;
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement, imagePaths: string[]) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xF0EEE9);

    // FIX 1: Dùng offsetWidth/offsetHeight thay vì clientWidth/clientHeight
    // để đọc kích thước thực sau khi layout xong
    const w = canvas.offsetWidth || canvas.clientWidth;
    const h = canvas.offsetHeight || canvas.clientHeight;

    this.camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 200);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: false,
      antialias: true,
    });
    this.renderer.setSize(w, h, false);
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

    this.setupEvents(canvas);
    this.init(imagePaths);
  }

  async init(imagePaths: string[]) {
    await this.loadTextureAtlas(imagePaths);
    this.buildInstancedMesh();
    this.buildCenterMesh();
    // FIX 2: Sau khi build xong, resize lại 1 lần để đảm bảo
    // canvas đã có kích thước đúng (đặc biệt quan trọng trên mobile)
    this.handleResize();
    this.render();
  }

  async loadTextureAtlas(paths: string[]) {
    const images = await Promise.all(
      paths.map(
        (path) =>
          new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load: ${path}`));
            img.src = path;
          })
      )
    );

    const CELL_W = 256;
    const CELL_H = 320;
    const cols = Math.ceil(Math.sqrt(images.length));
    const rows = Math.ceil(images.length / cols);

    const atlasWidth = cols * CELL_W;
    const atlasHeight = rows * CELL_H;

    const cvs = document.createElement("canvas");
    cvs.width = atlasWidth;
    cvs.height = atlasHeight;

    const ctx = cvs.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, atlasWidth, atlasHeight);

    this.imageInfos = images.map((img, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const destX = col * CELL_W;
      const destY = row * CELL_H;

      const imgAspect = img.width / img.height;
      const cellAspect = CELL_W / CELL_H;
      let drawW: number, drawH: number, offsetX: number, offsetY: number;

      if (imgAspect > cellAspect) {
        drawW = CELL_W;
        drawH = CELL_W / imgAspect;
        offsetX = 0;
        offsetY = (CELL_H - drawH) / 2;
      } else {
        drawH = CELL_H;
        drawW = CELL_H * imgAspect;
        offsetX = (CELL_W - drawW) / 2;
        offsetY = 0;
      }

      ctx.drawImage(img, destX + offsetX, destY + offsetY, drawW, drawH);

      const aspectRatio = img.width / img.height;

      const xStart = (destX + offsetX) / atlasWidth;
      const xEnd = (destX + offsetX + drawW) / atlasWidth;
      const yStart = 1 - (destY + offsetY) / atlasHeight;
      const yEnd = 1 - (destY + offsetY + drawH) / atlasHeight;

      return {
        width: img.width,
        height: img.height,
        aspectRatio,
        uvs: { xStart, xEnd, yStart, yEnd },
      };
    });

    this.atlasTexture = new THREE.CanvasTexture(cvs);
    this.atlasTexture.needsUpdate = true;
    this.atlasTexture.generateMipmaps = true;
    this.atlasTexture.minFilter = THREE.LinearMipmapLinearFilter;
    this.atlasTexture.magFilter = THREE.LinearFilter;
    this.atlasTexture.colorSpace = THREE.SRGBColorSpace;
  }

  buildInstancedMesh() {
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 0.075);

    const RADIUS = 6;
    const HEIGHT = 120;
    const COUNT = 600;
    const CIRCLE_COUNT = HEIGHT / 3;
    const CIRCLE_HEIGHT = HEIGHT / CIRCLE_COUNT;

    this.uMaxZ = HEIGHT * 0.5;
    this.uZrange = HEIGHT;
    this.instanceCount = COUNT;

    this.instancedMaterial = new THREE.ShaderMaterial({
      vertexShader: instancedVertexShader,
      fragmentShader: instancedFragmentShader,
      transparent: true,
      uniforms: {
        uAtlas: { value: this.atlasTexture },
        uScrollY: { value: 0 },
        uZrange: { value: HEIGHT },
        uMaxZ: { value: HEIGHT * 0.5 },
        uSpeedY: { value: 0 },
        uDirection: { value: 1 },
      },
    });

    const instancedMesh = new THREE.InstancedMesh(
      geometry,
      this.instancedMaterial,
      COUNT
    );

    const aAngles = new Float32Array(COUNT);
    const aHeights = new Float32Array(COUNT);
    const aRadiuses = new Float32Array(COUNT);
    const aAspectRatios = new Float32Array(COUNT);
    const aSpeeds = new Float32Array(COUNT);
    const aTextureCoords = new Float32Array(COUNT * 4);
    const imageIndices = new Uint16Array(COUNT);

    const speeds = new Float32Array(CIRCLE_COUNT).map(
      () => Math.random() * 0.2 + 0.8
    );

    for (let i = 0; i < COUNT; i++) {
      const angle = (i / COUNT) * Math.PI * 2;
      const imgIdx = Math.floor(Math.random() * this.imageInfos.length);
      const { xStart, xEnd, yStart, yEnd } = this.imageInfos[imgIdx].uvs;

      aTextureCoords.set([xStart, xEnd, yStart, yEnd], i * 4);
      aAngles[i] = angle;
      aHeights[i] = (i % CIRCLE_COUNT) * CIRCLE_HEIGHT - HEIGHT / 2;
      aRadiuses[i] = RADIUS;
      aAspectRatios[i] = this.imageInfos[imgIdx].aspectRatio;
      aSpeeds[i] = speeds[i % CIRCLE_COUNT];
      imageIndices[i] = imgIdx;
    }

    this.instanceData = {
      angles: aAngles,
      heights: aHeights,
      radiuses: aRadiuses,
      speeds: aSpeeds,
      aspectRatios: aAspectRatios,
      imageIndices,
    };

    geometry.setAttribute(
      "aAngle",
      new THREE.InstancedBufferAttribute(aAngles, 1)
    );
    geometry.setAttribute(
      "aHeight",
      new THREE.InstancedBufferAttribute(aHeights, 1)
    );
    geometry.setAttribute(
      "aRadius",
      new THREE.InstancedBufferAttribute(aRadiuses, 1)
    );
    geometry.setAttribute(
      "aAspectRatio",
      new THREE.InstancedBufferAttribute(aAspectRatios, 1)
    );
    geometry.setAttribute(
      "aSpeed",
      new THREE.InstancedBufferAttribute(aSpeeds, 1)
    );
    geometry.setAttribute(
      "aTextureCoords",
      new THREE.InstancedBufferAttribute(aTextureCoords, 4)
    );

    this.scene.add(instancedMesh);
  }

  buildCenterMesh() {
    const geometry = new THREE.PlaneGeometry(1.7, 2.3);

    this.centerMaterial = new THREE.ShaderMaterial({
      vertexShader: centeredVertexShader,
      fragmentShader: centeredFragmentShader,
      uniforms: {
        uAtlas: { value: this.atlasTexture },
        uTextureCoords: {
          value: new THREE.Vector4(
            this.imageInfos[0].uvs.xStart,
            this.imageInfos[0].uvs.xEnd,
            this.imageInfos[0].uvs.yStart,
            this.imageInfos[0].uvs.yEnd
          ),
        },
      },
      transparent: true,
    });

    this.centerMesh = new THREE.Mesh(geometry, this.centerMaterial);
    this.scene.add(this.centerMesh);
  }

  // FIX 3: Tách handleResize ra thành method riêng để gọi được từ nhiều chỗ
  private handleResize = () => {
    const canvas = this.canvas;
    // Dùng offsetWidth để lấy kích thước CSS thực, không phải buffer size
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (w === 0 || h === 0) return;

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    // false = không set style, chỉ set buffer size
    this.renderer.setSize(w, h, false);
  };

  setupEvents(canvas: HTMLCanvasElement) {
    // FIX 4: Dùng ResizeObserver thay vì window resize
    // ResizeObserver fires khi canvas element thay đổi kích thước,
    // chính xác hơn nhiều trên mobile (vd: orientation change, safe area insets)
    const resizeObserver = new ResizeObserver(() => {
      this.handleResize();
    });
    resizeObserver.observe(canvas);

    // Giữ lại window resize làm fallback
    window.addEventListener("resize", this.handleResize);

    // FIX 5: Thêm wheel event (dùng passive: false để có thể preventDefault)
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const normalized = normalizeWheel(e);
      this.addScrollDelta(normalized.pixelY * 0.01);
    };
    canvas.addEventListener("wheel", onWheel, { passive: false });

    // FIX 6: Thêm touch events cho mobile swipe
    let touchStartY = 0;
    let touchLastY = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (this.paused) return;
      touchStartY = e.touches[0].clientY;
      touchLastY = touchStartY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (this.paused) return;
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const delta = touchLastY - currentY; // vuốt lên → delta dương
      touchLastY = currentY;
      this.addScrollDelta(delta * 0.04);
    };

    const onTouchEnd = () => {
      // Momentum decay tự nhiên qua lerp trong render loop
    };

    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd, { passive: true });

    this._cleanupEvents = () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", this.handleResize);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }

  private _cleanupEvents?: () => void;

  addScrollDelta(delta: number) {
    if (this.paused) return;

    this.lastScrollTime = performance.now();
    const dir = Math.sign(delta) || this.scrollY.direction;
    this.scrollY.direction = dir;

    this.scrollY.speedTarget += delta;
    this.scrollY.target += delta;
  }

  render = () => {
    if (this.disposed) return;

    requestAnimationFrame(this.render);

    if (!this.paused) {
      if (performance.now() - this.lastScrollTime > 2000) {
        this.scrollY.target += 0.005 * this.scrollY.direction;
        this.scrollY.speedTarget += 0.005 * this.scrollY.direction;
      }

      this.scrollY.current = gsap.utils.interpolate(
        this.scrollY.current,
        this.scrollY.target,
        0.1
      );
      this.scrollY.speedCurrent = gsap.utils.interpolate(
        this.scrollY.speedCurrent,
        this.scrollY.speedTarget,
        0.1
      );
    }

    if (this.instancedMaterial) {
      this.instancedMaterial.uniforms.uScrollY.value = this.scrollY.current;
      this.instancedMaterial.uniforms.uSpeedY.value = this.scrollY.speedCurrent;
      this.instancedMaterial.uniforms.uDirection.value = this.scrollY.direction;
    }

    if (this.centerMaterial && this.imageInfos.length > 0) {
      this.textureIndex = Math.abs(
        Math.floor(this.scrollY.speedTarget % (this.imageInfos.length - 1))
      );
      const uvs = this.imageInfos[this.textureIndex].uvs;
      this.centerMaterial.uniforms.uTextureCoords.value.set(
        uvs.xStart,
        uvs.xEnd,
        uvs.yStart,
        uvs.yEnd
      );
    }

    this.renderer.render(this.scene, this.camera);
  };

  setPaused(paused: boolean) {
    this.paused = paused;
  }

  pickAtScreen(
    clientX: number,
    clientY: number,
    canvasRect: DOMRect
  ): number | null {
    const ndcX = ((clientX - canvasRect.left) / canvasRect.width) * 2 - 1;
    const ndcY = -(((clientY - canvasRect.top) / canvasRect.height) * 2 - 1);

    if (this.centerMesh) {
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), this.camera);
      const hit = raycaster.intersectObject(this.centerMesh);
      if (hit.length > 0) {
        return this.textureIndex;
      }
    }

    if (!this.instanceData) return null;

    const w = canvasRect.width;
    const h = canvasRect.height;
    const clickX = clientX - canvasRect.left;
    const clickY = clientY - canvasRect.top;

    const minZ = this.uMaxZ - this.uZrange;
    const zRange = this.uZrange;
    const scrollY = this.scrollY.current;
    const speedY = this.scrollY.speedCurrent;

    // FIX 7: Tăng PIXEL_RADIUS trên mobile vì touch area cần lớn hơn
    const isMobile = w < 768;
    const PIXEL_RADIUS = isMobile ? 75 : 55;

    let bestIdx: number | null = null;
    let bestNdcZ = Infinity;

    const pos = new THREE.Vector3();
    const { angles, heights, radiuses, speeds, imageIndices } = this.instanceData;

    for (let i = 0; i < this.instanceCount; i++) {
      let zPos = heights[i] + scrollY;
      const shifted = zPos - minZ;
      zPos = ((shifted % zRange) + zRange) % zRange + minZ;
      const theta = angles[i] + speedY * 0.4 * speeds[i];

      pos.set(
        Math.cos(theta) * radiuses[i],
        zPos,
        Math.sin(theta) * radiuses[i]
      );
      pos.project(this.camera);

      if (pos.z < -1 || pos.z > 1) continue;
      if (pos.x < -1.2 || pos.x > 1.2 || pos.y < -1.2 || pos.y > 1.2) continue;

      const sx = (pos.x + 1) * 0.5 * w;
      const sy = (1 - pos.y) * 0.5 * h;
      const dx = sx - clickX;
      const dy = sy - clickY;
      const dist2 = dx * dx + dy * dy;

      if (dist2 < PIXEL_RADIUS * PIXEL_RADIUS && pos.z < bestNdcZ) {
        bestNdcZ = pos.z;
        bestIdx = imageIndices[i];
      }
    }

    return bestIdx;
  }

  destroy() {
    this.disposed = true;
    this._cleanupEvents?.();
    this.renderer.dispose();
    if (this.atlasTexture) this.atlasTexture.dispose();
    if (this.instancedMaterial) this.instancedMaterial.dispose();
    if (this.centerMaterial) this.centerMaterial.dispose();
  }
}