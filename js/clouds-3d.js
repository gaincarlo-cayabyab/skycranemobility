/**
 * SkyCrane Mobility — js/clouds-3d.js
 * ============================================================
 * Full procedural Three.js scene:
 *  - Realistic DJI FlyCart 100-inspired drone built from geometry
 *  - Animated rotor discs with motion blur effect
 *  - Volumetric cloud sprites (3D billboard clouds)
 *  - Dynamic sky gradient background
 *  - Mouse parallax on drone + camera
 *  - Hover glow lighting on CTAs proximity
 *  - Scroll-based drone descent animation
 * ============================================================
 */

(function () {
  "use strict";

  var scene, camera, renderer;
  var drone, rotorGroupFL, rotorGroupFR, rotorGroupRL, rotorGroupRR;
  var rotorBlurFL, rotorBlurFR, rotorBlurRL, rotorBlurRR;
  var clouds = [];
  var mouse = { x: 0, y: 0 };
  var targetMouse = { x: 0, y: 0 };
  var animFrame;
  var clock;
  var droneHover = 0;
  var canvas;

  // ── Colours ──────────────────────────────────────────────
  var COL = {
    sky1:      0x05070B,   // void black
    sky2:      0x0A1628,   // midnight blue
    droneBody: 0x111827,   // dark body
    droneMid:  0x1E2A3A,   // panel grey
    droneAccBlue:  0x0EA5E9,
    droneAccOrange:0xF97316,
    rotorDark: 0x0D1220,
    rotorBlade:0x1a2537,
    blurDisc:  0x60A5FA,   // motion blur ring
    cloud:     0xE0EEFF,
    cloudShadow:0x90B4D0,
    cargo:     0xF97316,
    ambient:   0x1a2a4a,
    sun:       0xFFE6B0,
    rim:       0x0EA5E9,
  };

  // ── Entry ─────────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    canvas = document.getElementById("drone-canvas");
    if (!canvas) return;

    // Check WebGL support
    try {
      var ctx = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!ctx) throw new Error("no webgl");
    } catch (e) {
      applyFallback();
      return;
    }

    if (typeof THREE === "undefined") {
      applyFallback();
      return;
    }

    clock = new THREE.Clock();
    buildScene();
    buildLights();
    buildDrone();
    buildClouds();
    buildSkyMesh();
    bindEvents();
    animate();
  }

  // ── Scene / Camera / Renderer ─────────────────────────────
  function buildScene() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0A1628, 0.018);

    camera = new THREE.PerspectiveCamera(52, getAspect(), 0.1, 1000);
    camera.position.set(0, 2.5, 14);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.parentElement.clientWidth, canvas.parentElement.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
  }

  function getAspect() {
    var w = (canvas.parentElement || canvas).clientWidth  || window.innerWidth;
    var h = (canvas.parentElement || canvas).clientHeight || window.innerHeight;
    return w / h;
  }

  // ── Lights ────────────────────────────────────────────────
  function buildLights() {
    // Ambient sky light
    var ambient = new THREE.HemisphereLight(0x224466, 0x050a12, 0.8);
    scene.add(ambient);

    // Main sun key light
    var sun = new THREE.DirectionalLight(COL.sun, 2.2);
    sun.position.set(8, 12, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.near = 0.1;
    sun.shadow.camera.far  = 60;
    sun.shadow.camera.left = sun.shadow.camera.bottom = -10;
    sun.shadow.camera.right = sun.shadow.camera.top  =  10;
    scene.add(sun);

    // Rim / fill light (blue)
    var rim = new THREE.DirectionalLight(COL.rim, 1.2);
    rim.position.set(-6, 2, -5);
    scene.add(rim);

    // Orange underbelly accent
    var belly = new THREE.PointLight(COL.droneAccOrange, 1.5, 12);
    belly.position.set(0, -2.5, 0);
    scene.add(belly);

    // Cyan engine glow (added to drone later)
    var engineGlow = new THREE.PointLight(COL.droneAccBlue, 2.5, 8);
    engineGlow.position.set(0, 0.5, 0);
    scene.add(engineGlow);
  }

  // ── Drone Build ───────────────────────────────────────────
  function buildDrone() {
    drone = new THREE.Group();
    drone.position.set(2.5, 0.3, 0);

    var matBody     = droneMatStd(COL.droneBody, 0.3, 0.8);
    var matPanel    = droneMatStd(COL.droneMid,  0.2, 0.7);
    var matBlue     = droneMatStd(COL.droneAccBlue,   0.1, 0.95);
    var matOrange   = droneMatStd(COL.droneAccOrange, 0.1, 0.9);
    var matArm      = droneMatStd(0x151E2B, 0.35, 0.75);
    var matRotor    = droneMatStd(COL.rotorBlade, 0.2, 0.6);
    var matCargo    = droneMatStd(COL.cargo, 0.15, 0.85);
    var matCargoDark= droneMatStd(0xC2571A,  0.15, 0.85);

    // ── Main Body ──────────────────────────────────────────
    var bodyGeo = new THREE.BoxGeometry(2.8, 0.55, 1.2, 1, 1, 1);
    var body    = new THREE.Mesh(bodyGeo, matBody);
    body.position.y = 0;
    body.castShadow = true;
    drone.add(body);

    // Top panel / avionics cover
    var topGeo = new THREE.BoxGeometry(2.2, 0.18, 0.9);
    var top    = new THREE.Mesh(topGeo, matPanel);
    top.position.set(0, 0.365, 0);
    drone.add(top);

    // Camera dome (LiDAR sphere)
    var domeGeo = new THREE.SphereGeometry(0.22, 12, 8);
    var dome    = new THREE.Mesh(domeGeo, droneMatStd(0x0A5E8A, 0.0, 1.0));
    dome.position.set(1.3, 0, 0);
    drone.add(dome);

    // Blue accent stripe front
    var stripeGeo = new THREE.BoxGeometry(2.5, 0.06, 1.22);
    var stripe    = new THREE.Mesh(stripeGeo, matBlue);
    stripe.position.set(0, 0.19, 0);
    drone.add(stripe);

    // Safety orange side bumpers
    [-1.42, 1.42].forEach(function (x) {
      var bumperGeo = new THREE.BoxGeometry(0.12, 0.5, 1.22);
      var bumper    = new THREE.Mesh(bumperGeo, matOrange);
      bumper.position.set(x, 0, 0);
      drone.add(bumper);
    });

    // ── Arms ───────────────────────────────────────────────
    // Diagonal arms to 4 motor positions
    var armPositions = [
      [-3.2,  0,  2.2],  // Front-Left
      [ 3.2,  0,  2.2],  // Front-Right
      [-3.2,  0, -2.2],  // Rear-Left
      [ 3.2,  0, -2.2],  // Rear-Right
    ];
    armPositions.forEach(function (pos) {
      // Arm tube
      var armGeo  = new THREE.CylinderGeometry(0.1, 0.09, 3.8, 6);
      var arm     = new THREE.Mesh(armGeo, matArm);
      arm.position.set(pos[0] * 0.42, pos[1], pos[2] * 0.42);
      // Rotate arm to point toward motor
      arm.lookAt(new THREE.Vector3(pos[0], pos[1], pos[2]));
      arm.rotateX(Math.PI / 2);
      drone.add(arm);

      // Motor nacelle at end
      var nacGeo  = new THREE.CylinderGeometry(0.28, 0.24, 0.32, 12);
      var nacelle = new THREE.Mesh(nacGeo, matPanel);
      nacelle.position.set(pos[0], pos[1], pos[2]);
      drone.add(nacelle);
    });

    // ── Rotor Groups ───────────────────────────────────────
    rotorGroupFL = buildRotorGroup(matRotor); rotorGroupFL.position.set(-3.2, 0.18, 2.2);  drone.add(rotorGroupFL);
    rotorGroupFR = buildRotorGroup(matRotor); rotorGroupFR.position.set( 3.2, 0.18, 2.2);  drone.add(rotorGroupFR);
    rotorGroupRL = buildRotorGroup(matRotor); rotorGroupRL.position.set(-3.2, 0.18, -2.2); drone.add(rotorGroupRL);
    rotorGroupRR = buildRotorGroup(matRotor); rotorGroupRR.position.set( 3.2, 0.18, -2.2); drone.add(rotorGroupRR);

    // ── Rotor Blur Discs (transparent) ─────────────────────
    rotorBlurFL = makeBlurDisc(); rotorBlurFL.position.set(-3.2, 0.2, 2.2);  drone.add(rotorBlurFL);
    rotorBlurFR = makeBlurDisc(); rotorBlurFR.position.set( 3.2, 0.2, 2.2);  drone.add(rotorBlurFR);
    rotorBlurRL = makeBlurDisc(); rotorBlurRL.position.set(-3.2, 0.2, -2.2); drone.add(rotorBlurRL);
    rotorBlurRR = makeBlurDisc(); rotorBlurRR.position.set( 3.2, 0.2, -2.2); drone.add(rotorBlurRR);

    // ── Landing Gear ───────────────────────────────────────
    [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(function (p) {
      var legGeo  = new THREE.CylinderGeometry(0.05, 0.05, 0.65, 6);
      var leg     = new THREE.Mesh(legGeo, matArm);
      leg.position.set(p[0] * 0.95, -0.62, p[1] * 0.52);
      drone.add(leg);
    });
    // Skid bars
    [[-0.52], [0.52]].forEach(function (z) {
      var skidGeo  = new THREE.CylinderGeometry(0.045, 0.045, 2.2, 6);
      var skid     = new THREE.Mesh(skidGeo, matArm);
      skid.rotation.z = Math.PI / 2;
      skid.position.set(0, -0.97, z[0]);
      drone.add(skid);
    });

    // ── Winch Cable + Cargo ────────────────────────────────
    var cableGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.4, 4);
    var cable    = new THREE.Mesh(cableGeo, droneMatStd(0x94A3B8, 0.4, 0.2));
    cable.position.set(0, -1.42, 0);
    drone.add(cable);

    // Cargo box
    var cargoGeo  = new THREE.BoxGeometry(1.1, 0.75, 0.85);
    var cargoBox  = new THREE.Mesh(cargoGeo, matCargo);
    cargoBox.position.set(0, -2.25, 0);
    cargoBox.castShadow = true;
    drone.add(cargoBox);

    // Cargo darker face
    var cargoDarkGeo = new THREE.BoxGeometry(1.08, 0.38, 0.83);
    var cargoDark    = new THREE.Mesh(cargoDarkGeo, matCargoDark);
    cargoDark.position.set(0, -2.06, 0);
    drone.add(cargoDark);

    // ── Subtle engine-glow rings ───────────────────────────
    [rotorGroupFL, rotorGroupFR, rotorGroupRL, rotorGroupRR].forEach(function (rg) {
      var ringGeo = new THREE.RingGeometry(0.24, 0.30, 20);
      var ringMat = new THREE.MeshBasicMaterial({ color: 0x30D5C8, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
      var ring    = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = -0.04;
      rg.add(ring);
    });

    drone.castShadow = true;
    drone.scale.setScalar(0.68); // scale to fit viewport nicely
    scene.add(drone);
  }

  function buildRotorGroup(mat) {
    var g = new THREE.Group();
    // 2 crossed blades
    for (var i = 0; i < 2; i++) {
      var bladeGeo = new THREE.BoxGeometry(1.7, 0.04, 0.22);
      var blade    = new THREE.Mesh(bladeGeo, mat);
      blade.rotation.y = (Math.PI / 2) * i;
      g.add(blade);
    }
    // Central hub
    var hubGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.09, 8);
    var hub    = new THREE.Mesh(hubGeo, new THREE.MeshStandardMaterial({ color: 0x0D1220, roughness: 0.3, metalness: 0.9 }));
    g.add(hub);
    return g;
  }

  function makeBlurDisc() {
    var geo = new THREE.CircleGeometry(1.0, 32);
    var mat = new THREE.MeshBasicMaterial({
      color: COL.blurDisc,
      transparent: true,
      opacity: 0.07,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    var disc = new THREE.Mesh(geo, mat);
    disc.rotation.x = -Math.PI / 2;
    return disc;
  }

  function droneMatStd(color, roughness, metalness) {
    return new THREE.MeshStandardMaterial({ color: color, roughness: roughness, metalness: metalness });
  }

  // ── Volumetric Cloud Sprites ──────────────────────────────
  function buildClouds() {
    var cloudData = [
      // [x, y, z, scaleX, scaleY, opacity]
      [-12, 3,  -18, 9, 4, 0.55],
      [  8, 5,  -22, 11, 4.5, 0.45],
      [-18, 1,  -12, 7, 3.5, 0.5],
      [ 16, 4,  -16, 9, 3, 0.40],
      [  2, 7,  -28, 14, 5, 0.35],
      [-8,  2,  -8,  5, 2.5, 0.30],
      [ 20, 2,  -8,  6, 3, 0.28],
      [-22, 5,  -25, 10, 5, 0.25],
      [  5, -1, -6,  4, 2, 0.18],
    ];

    var tex = makeCloudTexture();

    cloudData.forEach(function (d, idx) {
      var mat = new THREE.SpriteMaterial({
        map: tex,
        color: idx % 2 === 0 ? COL.cloud : COL.cloudShadow,
        transparent: true,
        opacity: d[5],
        depthWrite: false,
        blending: THREE.NormalBlending,
      });
      var sprite = new THREE.Sprite(mat);
      sprite.position.set(d[0], d[1], d[2]);
      sprite.scale.set(d[3], d[4], 1);
      clouds.push({ sprite: sprite, speed: 0.008 + idx * 0.002, baseX: d[0] });
      scene.add(sprite);
    });
  }

  function makeCloudTexture() {
    var size = 256;
    var cv = document.createElement("canvas");
    cv.width = cv.height = size;
    var ctx = cv.getContext("2d");

    // Multiple radial gradients to simulate cloud puffiness
    var draws = [
      { x: 0.5, y: 0.5, r: 0.42 },
      { x: 0.3, y: 0.55, r: 0.30 },
      { x: 0.7, y: 0.55, r: 0.30 },
      { x: 0.5, y: 0.35, r: 0.25 },
      { x: 0.2, y: 0.60, r: 0.20 },
      { x: 0.8, y: 0.60, r: 0.20 },
    ];

    ctx.clearRect(0, 0, size, size);
    draws.forEach(function (d) {
      var grd = ctx.createRadialGradient(
        d.x * size, d.y * size, 0,
        d.x * size, d.y * size, d.r * size
      );
      grd.addColorStop(0,   "rgba(230, 238, 255, 1.0)");
      grd.addColorStop(0.4, "rgba(210, 225, 245, 0.85)");
      grd.addColorStop(0.8, "rgba(180, 205, 230, 0.35)");
      grd.addColorStop(1,   "rgba(150, 185, 215, 0.0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, size, size);
    });

    var tex = new THREE.CanvasTexture(cv);
    tex.needsUpdate = true;
    return tex;
  }

  // ── Sky Background Mesh ───────────────────────────────────
  function buildSkyMesh() {
    // Large gradient sphere behind everything
    var skyGeo = new THREE.SphereGeometry(200, 24, 12);
    var skyMat = new THREE.ShaderMaterial({
      uniforms: {
        topColor:    { value: new THREE.Color(0x03060F) },
        bottomColor: { value: new THREE.Color(0x0A1A35) },
        offset:      { value: 22 },
        exponent:    { value: 0.55 },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + offset).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
        }
      `,
      side: THREE.BackSide,
    });
    var sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);

    // Horizon glow plane (the "dawn/dusk" orange tint far away)
    var horizonGeo = new THREE.PlaneGeometry(400, 40);
    var horizonMat = new THREE.MeshBasicMaterial({
      color: 0x0A2040,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    var horizon = new THREE.Mesh(horizonGeo, horizonMat);
    horizon.position.set(0, -5, -80);
    scene.add(horizon);
  }

  // ── Events ────────────────────────────────────────────────
  function bindEvents() {
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize",    onResize,    { passive: true });
    window.addEventListener("scroll",    onScroll,    { passive: true });

    // Pause when tab hidden
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { cancelAnimationFrame(animFrame); }
      else { clock.start(); animate(); }
    });
  }

  function onMouseMove(e) {
    var w = window.innerWidth, h = window.innerHeight;
    targetMouse.x =  (e.clientX / w - 0.5) * 2;
    targetMouse.y = -(e.clientY / h - 0.5) * 2;
  }

  function onScroll() {
    var scrollPct = Math.min(window.scrollY / (window.innerHeight * 0.6), 1);
    // Drone drifts down and fades as user scrolls
    if (drone) drone.position.y = 0.3 - scrollPct * 1.8;
  }

  function onResize() {
    if (!camera || !renderer || !canvas) return;
    var w = canvas.parentElement.clientWidth;
    var h = canvas.parentElement.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  // ── Animation Loop ────────────────────────────────────────
  function animate() {
    animFrame = requestAnimationFrame(animate);
    var dt = clock.getDelta();
    var t  = clock.getElapsedTime();

    // Smooth mouse follow
    mouse.x += (targetMouse.x - mouse.x) * 0.05;
    mouse.y += (targetMouse.y - mouse.y) * 0.05;

    // ── Drone hover float ──────────────────────────────────
    droneHover = Math.sin(t * 1.1) * 0.18;
    if (drone) {
      drone.position.y += (droneHover - (drone.position.y - (drone.userData.baseY || 0.3))) * 0.04;
      drone.userData.baseY = 0.3; // reset each frame from scroll handler

      // Gentle tilt based on mouse
      drone.rotation.x = THREE.MathUtils.lerp(drone.rotation.x, mouse.y * 0.12, 0.06);
      drone.rotation.z = THREE.MathUtils.lerp(drone.rotation.z, -mouse.x * 0.10, 0.06);
      drone.rotation.y = THREE.MathUtils.lerp(drone.rotation.y, mouse.x * 0.18 - 0.25, 0.04);
    }

    // ── Rotor spin ─────────────────────────────────────────
    var rSpeed = 15; // radians/sec
    if (rotorGroupFL) { rotorGroupFL.rotation.y += rSpeed * dt; }
    if (rotorGroupFR) { rotorGroupFR.rotation.y -= rSpeed * dt; }
    if (rotorGroupRL) { rotorGroupRL.rotation.y -= rSpeed * dt; }
    if (rotorGroupRR) { rotorGroupRR.rotation.y += rSpeed * dt; }

    // Pulse blur discs
    var blurOpacity = 0.07 + Math.sin(t * 12) * 0.015;
    [rotorBlurFL, rotorBlurFR, rotorBlurRL, rotorBlurRR].forEach(function (d) {
      if (d && d.material) d.material.opacity = blurOpacity;
    });

    // ── Cloud drift ────────────────────────────────────────
    clouds.forEach(function (c) {
      c.sprite.position.x += c.speed * dt * 0.5;
      if (c.sprite.position.x > c.baseX + 8) c.sprite.position.x = c.baseX - 2;
    });

    // ── Camera parallax ────────────────────────────────────
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 1.5, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2.5 + mouse.y * 0.8, 0.03);
    camera.lookAt(1.5, 0, 0);

    renderer.render(scene, camera);
  }

  // ── Fallback ──────────────────────────────────────────────
  function applyFallback() {
    var wrap = document.getElementById("hero-canvas-wrap");
    if (wrap) {
      wrap.style.background = "linear-gradient(160deg, #03060F 0%, #0A1628 40%, #0D1F3C 70%, #051018 100%)";
    }
    // Use Vanta as secondary fallback if available
    var el = document.getElementById("hero-canvas-wrap");
    if (typeof VANTA !== "undefined" && VANTA.CLOUDS && el) {
      try {
        VANTA.CLOUDS({
          el: el,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          skyColor:         0x0A1628,
          cloudColor:       0x1E3050,
          cloudShadowColor: 0x091426,
          sunColor:         0xF97316,
          sunGlareColor:    0x0A1628,
          sunlightColor:    0x1E3050,
          speed: 0.60
        });
      } catch (_) {}
    }
    console.info("[SkyCrane 3D] Fallback gradient applied.");
  }

  // ── Public API ─────────────────────────────────────────────
  window.SkyCraneClouds = {
    destroy: function () {
      cancelAnimationFrame(animFrame);
      if (renderer) { renderer.dispose(); }
    }
  };

})();
