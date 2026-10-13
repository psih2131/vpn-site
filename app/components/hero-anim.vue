<template>
  <div class="hero-anim" id="heroAnim">
    <canvas class="canvas-pol" ref="canvas"></canvas>
  </div>
</template>

<style lang="scss" scoped>
.hero-anim {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
}

.canvas-pol {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvas = ref(null);

let cancelled = false;
let frameId = 0;
let geometry;
let material;
let renderer;
let canvasEl;
let onPointerMove;
let onPointerLeave;
let onScroll;
let onWindowLoad;
let onWindowResize;
let resizeTimer = 0;
let initGeneration = 0;

const isMobileDevice = () =>
  window.innerWidth < 768
  || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

const isWeakDevice = () => {
  if (isMobileDevice()) return true;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) return true;
  if (navigator.deviceMemory && navigator.deviceMemory <= 4) return true;
  return false;
};

function teardownHeroAnim() {
  cancelAnimationFrame(frameId);
  frameId = 0;

  if (canvasEl && onPointerMove) {
    canvasEl.removeEventListener('pointermove', onPointerMove);
  }
  if (canvasEl && onPointerLeave) {
    canvasEl.removeEventListener('pointerleave', onPointerLeave);
  }
  if (onScroll) {
    window.removeEventListener('scroll', onScroll);
  }

  geometry?.dispose();
  material?.dispose();
  renderer?.dispose();

  geometry = undefined;
  material = undefined;
  renderer = undefined;
  canvasEl = undefined;
  onPointerMove = undefined;
  onPointerLeave = undefined;
  onScroll = undefined;
}

async function initHeroAnim() {
  if (cancelled || !canvas.value) return;

  const generation = ++initGeneration;
  teardownHeroAnim();

  const THREE = await import('three');
  if (cancelled || generation !== initGeneration || !canvas.value) return;

  canvasEl = canvas.value;
  const scene = new THREE.Scene();

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const mobile = isMobileDevice();
  const weak = isWeakDevice();
  const count = mobile ? 2000 : 3000;
  const radiusSphere = 1.35;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const color = new THREE.Color();
  const colorA = new THREE.Color('#b8ffdc');
  const colorB = new THREE.Color('#00e88a');

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;

    positions[i * 3] = Math.cos(theta) * r * radiusSphere;
    positions[i * 3 + 1] = y * radiusSphere;
    positions[i * 3 + 2] = Math.sin(theta) * r * radiusSphere;
  }

  const original = new Float32Array(positions);

  geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  material = new THREE.PointsMaterial({
    vertexColors: true,
    size: mobile ? 0.02 : 0.015,
    sizeAttenuation: true,
    transparent: true,
    opacity: 1,
    depthWrite: false,
  });

  const points = new THREE.Points(geometry, material);
  points.position.set(1.2, 0.2, 0);
  scene.add(points);

  const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height);
  camera.position.set(0, 0.15, 3.9);
  camera.lookAt(0, 0, 0);
  scene.add(camera);

  renderer = new THREE.WebGLRenderer({
    canvas: canvasEl,
    antialias: !weak,
    alpha: true,
  });
  renderer.setPixelRatio(weak || mobile ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.setSize(sizes.width, sizes.height);
  renderer.setClearColor(0x000000, 0);

  const pointer = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane();
  const mouseWorld = new THREE.Vector3();
  const camDir = new THREE.Vector3();
  let hovered = false;

  const radius = 1;
  const strength = 0.28;
  const ease = 0.14;

  onPointerMove = (event) => {
    const rect = canvasEl.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    hovered = true;
  };

  onPointerLeave = () => {
    hovered = false;
  };

  canvasEl.addEventListener('pointermove', onPointerMove);
  canvasEl.addEventListener('pointerleave', onPointerLeave);

  const targetPoints = new THREE.Vector3(1.2, 0.2, 0);
  const targetCamera = new THREE.Vector3(0, 0.15, 3.9);
  const fromPoints = new THREE.Vector3();
  const fromCamera = new THREE.Vector3();
  const moveDuration = 1800;
  let moveStart = 0;
  let moving = false;

  const easeInOutQuart = (t) => (
    t < 0.5
      ? 8 * t * t * t * t
      : 1 - ((-2 * t + 2) ** 4) / 2
  );

  const getCheckpoint = window.innerWidth > 1300
    ? (y) => {
      if (y < 600) return 0;
      if (y < 3400) return 1;
      if (y < 5400) return 2;
      return 3;
    }
    : (y) => {
      if (y < 400) return 0;
      if (y < 3400) return 1;
      if (y < 5400) return 2;
      return 3;
    };

  const applyCheckpoint = (index, instant = false) => {
    if (window.innerWidth > 1300) {
      if (index === 0) {
        targetPoints.set(1.2, 0.2, 0);
        targetCamera.set(0, 0.15, 3.9);
      } else if (index === 1) {
        targetPoints.set(0, 0, 0);
        targetCamera.set(0, 0.15, 4.2);
      } else if (index === 2) {
        targetPoints.set(-2.2, 0.05, 0);
        targetCamera.set(0, 0, 4);
      } else {
        targetPoints.set(2, 0, 0);
        targetCamera.set(0, 0, 4.8);
      }
    } else if (index === 0) {
      targetPoints.set(0, -2.2, 0);
      targetCamera.set(0, 0, 4.9);
    } else if (index === 1) {
      targetPoints.set(0, 0, 0);
      targetCamera.set(0, 0.15, 4.2);
    } else if (index === 2) {
      targetPoints.set(-1.5, 0.05, 0);
      targetCamera.set(0, 0, 4);
    } else {
      targetPoints.set(1.5, -1, 0);
      targetCamera.set(0, 0, 4.8);
    }

    if (instant) return;

    fromPoints.copy(points.position);
    fromCamera.copy(camera.position);
    moveStart = performance.now();
    moving = true;
  };

  let checkpoint = getCheckpoint(window.scrollY);
  applyCheckpoint(checkpoint, true);
  points.position.copy(targetPoints);
  camera.position.copy(targetCamera);
  camera.lookAt(0, 0, 0);

  onScroll = () => {
    const next = getCheckpoint(window.scrollY);
    if (next !== checkpoint) {
      checkpoint = next;
      applyCheckpoint(checkpoint);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const pos = geometry.attributes.position.array;
  const col = geometry.attributes.color.array;

  const tick = () => {
    if (cancelled || generation !== initGeneration) return;

    if (moving) {
      const t = Math.min(1, (performance.now() - moveStart) / moveDuration);
      const k = easeInOutQuart(t);
      points.position.lerpVectors(fromPoints, targetPoints, k);
      camera.position.lerpVectors(fromCamera, targetCamera, k);
      if (t >= 1) moving = false;
    }
    camera.lookAt(0, 0, 0);

    points.rotation.y += 0.003;
    const rotC = Math.cos(points.rotation.y);
    const rotS = Math.sin(points.rotation.y);

    plane.setFromNormalAndCoplanarPoint(
      camDir.copy(camera.position).normalize(),
      points.position,
    );

    let hasMouse = false;
    if (hovered) {
      raycaster.setFromCamera(pointer, camera);
      hasMouse = raycaster.ray.intersectPlane(plane, mouseWorld) !== null;
      if (hasMouse) points.worldToLocal(mouseWorld);
    }

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      let tx = original[i3];
      let ty = original[i3 + 1];
      let tz = original[i3 + 2];

      if (hasMouse) {
        const dx = tx - mouseWorld.x;
        const dy = ty - mouseWorld.y;
        const dz = tz - mouseWorld.z;
        const dist = Math.hypot(dx, dy, dz) || 0.0001;
        if (dist < radius) {
          const f = (1 - dist / radius) * strength;
          tx += (dx / dist) * f;
          ty += (dy / dist) * f;
          tz += (dz / dist) * f;
        }
      }

      pos[i3] += (tx - pos[i3]) * ease;
      pos[i3 + 1] += (ty - pos[i3 + 1]) * ease;
      pos[i3 + 2] += (tz - pos[i3 + 2]) * ease;

      const worldX = original[i3] * rotC - original[i3 + 2] * rotS;
      color.lerpColors(colorA, colorB, (worldX / radiusSphere + 1) / 2);
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
    renderer.render(scene, camera);
    frameId = requestAnimationFrame(tick);
  };

  tick();
}

onMounted(() => {
  onWindowLoad = () => {
    initHeroAnim().catch(() => {});
  };

  onWindowResize = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (cancelled) return;
      initHeroAnim().catch(() => {});
    }, 1000);
  };

  if (document.readyState === 'complete') {
    onWindowLoad();
  } else {
    window.addEventListener('load', onWindowLoad, { once: true });
  }

  window.addEventListener('resize', onWindowResize, { passive: true });
});

onUnmounted(() => {
  cancelled = true;
  window.clearTimeout(resizeTimer);
  if (onWindowLoad) {
    window.removeEventListener('load', onWindowLoad);
  }
  if (onWindowResize) {
    window.removeEventListener('resize', onWindowResize);
  }
  teardownHeroAnim();
});
</script>
