// ตัวการ์ตูน 3D ของ Pika (MFEC Clay Boy) — ใช้ร่วมกันระหว่างหน้า landing และ /help
// ต้องโหลดหลัง static/three.min.js และหลัง element #blueprintStage / #blueprintUniverse
// (#mascotDragZone ไม่มีก็ได้) — ไม่มี element หรือไม่มี THREE จะไม่ทำอะไร

// 3. 3D HOLOGRAPHIC NEURAL CONNECTOME ENGINE (REAL-TIME 60FPS CANVAS)
// Zero Images • Fibonacci Neural Sphere • Quantum Core • Holographic Beams
/* ══════════════════════════════════════════════════════════════════
   GLASSMORPHIC C4 PRISMATIC DIAMOND ENGINE (60FPS THREE.JS WEBGL)
   Linear/Apple Architectural Crystal • Extruded 3D Pika Lightning Keystone
   Zero Images • Physically Based Glass Transmission & Refraction
   4 Floating C4 Strata Bezels with Real-Time Kinetic Spring Physics
   ══════════════════════════════════════════════════════════════════ */
(function initClayCharacterMascot() {
  const container = document.getElementById('blueprintStage');
  const universe = document.getElementById('blueprintUniverse');
  if (!container || !universe || typeof THREE === 'undefined') return;

  const width = 420;
  const height = 420;

  // 1. Scene & Perspective Camera (Balanced Proportional Framing)
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
  camera.position.set(0, -0.02, 5.92);
  camera.lookAt(0, -0.02, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.NoToneMapping;
  container.appendChild(renderer.domElement);

  const rootGroup = new THREE.Group();
  scene.add(rootGroup);

  function isCurrentLight() {
    return document.documentElement.getAttribute('data-theme') === 'light';
  }

  // 2. Calibrated Studio Clay Shader Material (Exact Subsurface Wrap + Fresnel Clay Shading)
  const clayMaterial = new THREE.ShaderMaterial({
    vertexColors: true,
    side: THREE.DoubleSide,
    vertexShader: `
      varying vec3 vNormalWorld;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vNormalWorld = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormalWorld;
      varying vec3 vColor;
      void main() {
        vec3 N = normalize(vNormalWorld);
        vec3 L_key = normalize(vec3(0.28, 0.24, 0.93));
        vec3 L_fill = normalize(vec3(-0.55, -0.15, 0.82));
        vec3 L_top = normalize(vec3(0.0, 0.95, 0.31));
        float ndotl_key = clamp(dot(N, L_key) * 0.55 + 0.45, 0.0, 1.0);
        float ndotl_fill = clamp(dot(N, L_fill) * 0.50 + 0.50, 0.0, 1.0);
        float ndotl_top = clamp(dot(N, L_top) * 0.50 + 0.50, 0.0, 1.0);
        float view_z = clamp(N.z, 0.0, 1.0);
        float clay_fresnel = 0.80 + 0.20 * pow(view_z, 0.45);
        float shade = (0.34 + 0.52 * ndotl_key + 0.14 * ndotl_fill + 0.05 * ndotl_top) * clay_fresnel;
        vec3 finalCol = clamp(vColor * shade, 0.0, 1.0);
        gl_FragColor = vec4(finalCol, 1.0);
      }
    `
  });

  // High-Resolution 1024x320 MFEC Logo Canvas Texture for the White T-Shirt Chest
  function createMfecLogoTexture() {
    const cvs = document.createElement('canvas');
    cvs.width = 1024;
    cvs.height = 320;
    const ctx = cvs.getContext && cvs.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, 1024, 320);
      const letterGrad = ctx.createLinearGradient(0, 62, 0, 319);
      letterGrad.addColorStop(0.0, '#474c56');
      letterGrad.addColorStop(1.0, '#252b30');
      ctx.fillStyle = letterGrad;

      function fillPoly(pts) {
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.closePath();
        ctx.fill();
      }

      // M, F, E, C exact vector contours
      fillPoly([[0, 62], [70, 62], [142, 214], [215, 62], [285, 62], [285, 319], [213, 319], [213, 203], [158, 319], [127, 319], [72, 203], [72, 319], [0, 319]]);
      fillPoly([[358, 62], [539, 62], [539, 125], [429, 125], [429, 162], [507, 162], [507, 219], [429, 219], [429, 319], [358, 319]]);
      fillPoly([[576, 62], [766, 62], [766, 125], [648, 125], [648, 162], [735, 162], [735, 219], [648, 219], [648, 256], [766, 256], [766, 319], [576, 319]]);
      fillPoly([[803, 175], [815, 124], [827, 103], [839, 89], [851, 79], [863, 71], [875, 65], [887, 61], [899, 58], [911, 55], [923, 54], [935, 54], [947, 54], [959, 55], [971, 57], [983, 60], [995, 63], [1007, 68], [1019, 74], [1023, 79], [1023, 125], [1019, 131], [1007, 132], [995, 128], [983, 125], [971, 122], [959, 120], [947, 118], [935, 118], [923, 120], [911, 125], [899, 132], [887, 145], [875, 173], [874, 186], [875, 198], [887, 226], [899, 239], [911, 247], [923, 252], [935, 254], [947, 254], [959, 253], [971, 250], [983, 246], [995, 242], [1007, 236], [1019, 237], [1023, 243], [1023, 289], [1019, 294], [1007, 302], [995, 308], [983, 313], [971, 316], [959, 318], [947, 319], [935, 319], [923, 318], [911, 316], [899, 314], [887, 310], [875, 305], [863, 298], [851, 289], [839, 278], [827, 264], [815, 243], [803, 197]]);

      // 3 Ascending Blue Right-Angle Chevrons
      function fillRoundRect(x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fill();
      }
      function drawChevron(x0, y0, x1, y1, th, cTop, cBot) {
        const g = ctx.createLinearGradient(x0, y0, x1, y1);
        g.addColorStop(0.0, cTop);
        g.addColorStop(1.0, cBot);
        ctx.fillStyle = g;
        const r = th * 0.5;
        fillRoundRect(x0, y0, x1 - x0, th, r);
        fillRoundRect(x1 - th, y0, th, y1 - y0, r);
      }
      drawChevron(214, 58, 285, 131, 22, '#47a8e5', '#3586d2');
      drawChevron(251, 29, 321, 100, 21, '#2978d8', '#4477c3');
      drawChevron(288,  0, 357,  70, 20, '#6676b6', '#5c6bb5');
    }
    const tex = new THREE.CanvasTexture(cvs);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    return tex;
  }

  const mfecLogoTex = createMfecLogoTexture();
  const shirtClayMaterial = new THREE.ShaderMaterial({
    vertexColors: true,
    side: THREE.DoubleSide,
    uniforms: {
      uLogoTex: { value: mfecLogoTex }
    },
    vertexShader: `
      varying vec3 vNormalWorld;
      varying vec3 vColor;
      varying vec3 vPosObj;
      void main() {
        vColor = color;
        vPosObj = position;
        vNormalWorld = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uLogoTex;
      varying vec3 vNormalWorld;
      varying vec3 vColor;
      varying vec3 vPosObj;
      void main() {
        vec3 N = normalize(vNormalWorld);
        vec3 L_key = normalize(vec3(0.28, 0.24, 0.93));
        vec3 L_fill = normalize(vec3(-0.55, -0.15, 0.82));
        vec3 L_top = normalize(vec3(0.0, 0.95, 0.31));
        float ndotl_key = clamp(dot(N, L_key) * 0.55 + 0.45, 0.0, 1.0);
        float ndotl_fill = clamp(dot(N, L_fill) * 0.50 + 0.50, 0.0, 1.0);
        float ndotl_top = clamp(dot(N, L_top) * 0.50 + 0.50, 0.0, 1.0);
        float view_z = clamp(N.z, 0.0, 1.0);
        float clay_fresnel = 0.80 + 0.20 * pow(view_z, 0.45);
        float shade = (0.34 + 0.52 * ndotl_key + 0.14 * ndotl_fill + 0.05 * ndotl_top) * clay_fresnel;
        vec3 baseCol = vColor;
        if (vPosObj.z > 0.05 && vPosObj.x >= -0.225 && vPosObj.x <= 0.225 && vPosObj.y >= 0.005 && vPosObj.y <= 0.148) {
          vec2 uvLogo = vec2((vPosObj.x + 0.225) / 0.450, (vPosObj.y - 0.005) / 0.143);
          vec4 logoSample = texture2D(uLogoTex, uvLogo);
          baseCol = mix(baseCol, logoSample.rgb, logoSample.a);
        }
        vec3 finalCol = clamp(baseCol * shade, 0.0, 1.0);
        gl_FragColor = vec4(finalCol, 1.0);
      }
    `
  });

  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.28
  });

  const holoGlassMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.0
  });

  const holoRingMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.0
  });

  // 3. Exact Calibrated Studio Clay Palette (RGB 0..1)
  const C_SKIN       = [0.95, 0.70, 0.51];
  const C_SKIN_MID   = [0.86, 0.58, 0.39];
  const C_BLUSH      = [0.90, 0.54, 0.36];
  const C_EAR_IN     = [0.72, 0.42, 0.25];
  const C_NOSE       = [0.92, 0.59, 0.39];
  const C_HAIR       = [0.26, 0.16, 0.09];
  const C_HAIR_DARK  = [0.20, 0.12, 0.06];
  const C_EYE        = [0.07, 0.04, 0.03];
  const C_GLINT      = [0.99, 0.99, 0.99];
  const C_SHIRT      = [0.968, 0.964, 0.952];
  const C_SHIRT_DK   = [0.875, 0.868, 0.848];
  const C_WATCH      = [0.16, 0.14, 0.12];
  const C_SHORTS     = [0.64, 0.52, 0.30];
  const C_SHORTS_CUF = [0.66, 0.54, 0.31];
  const C_SHORTS_DK  = [0.42, 0.32, 0.17];
  const C_SHOE       = [0.91, 0.81, 0.58];
  const C_SHOE_SHAD  = [0.81, 0.71, 0.48];
  const C_SHOE_SOLE  = [0.92, 0.83, 0.61];
  const C_SHOE_LINE  = [0.76, 0.66, 0.45];
  const C_LACE       = [0.95, 0.86, 0.64];

  // 4. Parametric Sculpted Clay Geometry Builders
  function transformVerts(verts, pos, rx, ry, rz, pivotY) {
    const px = pos ? pos[0] : 0;
    const py = (pos ? pos[1] : 0) - (pivotY || 0);
    const pz = pos ? pos[2] : 0;
    const cx = Math.cos(rx || 0), sx = Math.sin(rx || 0);
    const cy = Math.cos(ry || 0), sy = Math.sin(ry || 0);
    const cz = Math.cos(rz || 0), sz = Math.sin(rz || 0);
    const out = new Float32Array(verts.length);
    for (let i = 0; i < verts.length; i += 3) {
      let x = verts[i], y = verts[i + 1], z = verts[i + 2];
      // Rx
      let y1 = y * cx - z * sx;
      let z1 = y * sx + z * cx;
      // Ry
      let x2 = x * cy + z1 * sy;
      let z2 = -x * sy + z1 * cy;
      // Rz
      let x3 = x2 * cz - y1 * sz;
      let y3 = x2 * sz + y1 * cz;
      out[i]     = x3 + px;
      out[i + 1] = y3 + py;
      out[i + 2] = z2 + pz;
    }
    return out;
  }

  function buildClayMesh(verts, indices, colorOrFn, pivotOffsetY) {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(verts, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();

    const count = verts.length / 3;
    const colors = new Float32Array(verts.length);
    const isFn = typeof colorOrFn === 'function';
    const pyOff = pivotOffsetY || 0;

    for (let i = 0; i < count; i++) {
      const x = verts[i * 3];
      const y = verts[i * 3 + 1] + pyOff;
      const z = verts[i * 3 + 2];
      const c = isFn ? colorOrFn(x, y, z) : colorOrFn;
      colors[i * 3]     = c[0];
      colors[i * 3 + 1] = c[1];
      colors[i * 3 + 2] = c[2];
    }
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return new THREE.Mesh(geom, clayMaterial);
  }

  function makeSphereData(rx, ry, rz, uSeg, vSeg, deformFn) {
    const verts = [];
    for (let iv = 0; iv <= vSeg; iv++) {
      const v = iv / vSeg;
      const theta = v * Math.PI;
      const st = Math.sin(theta), ct = Math.cos(theta);
      for (let iu = 0; iu <= uSeg; iu++) {
        const u = iu / uSeg;
        const phi = u * 2.0 * Math.PI;
        let x = -rx * Math.cos(phi) * st;
        let y = ry * ct;
        let z = rz * Math.sin(phi) * st;
        if (deformFn) {
          const d = deformFn(x, y, z, phi, theta);
          x = d[0]; y = d[1]; z = d[2];
        }
        verts.push(x, y, z);
      }
    }
    const indices = [];
    for (let iv = 0; iv < vSeg; iv++) {
      for (let iu = 0; iu < uSeg; iu++) {
        const a = iv * (uSeg + 1) + iu;
        const b = a + 1;
        const c = a + (uSeg + 1);
        const d = c + 1;
        indices.push(a, c, b, b, c, d);
      }
    }
    return { verts: new Float32Array(verts), indices };
  }

  function makeLatheCylData(rTop, rBot, h, uSeg, vSeg, rzScale, profileFn, cap) {
    const verts = [];
    for (let iv = 0; iv <= vSeg; iv++) {
      const v = iv / vSeg;
      let y = (0.5 - v) * h;
      let r = rTop * (1.0 - v) + rBot * v;
      let rz = r * (rzScale || 1.0);
      if (profileFn) {
        const p = profileFn(v, r, rz, y);
        r = p[0]; rz = p[1]; y = p[2];
      }
      for (let iu = 0; iu <= uSeg; iu++) {
        const phi = (iu / uSeg) * 2.0 * Math.PI;
        const x = -r * Math.cos(phi);
        const z = rz * Math.sin(phi);
        verts.push(x, y, z);
      }
    }
    const indices = [];
    for (let iv = 0; iv < vSeg; iv++) {
      for (let iu = 0; iu < uSeg; iu++) {
        const a = iv * (uSeg + 1) + iu;
        const b = a + 1;
        const c = a + (uSeg + 1);
        const d = c + 1;
        indices.push(a, c, b, b, c, d);
      }
    }
    if (cap !== false) {
      const topC = verts.length / 3;
      verts.push(0, h * 0.5, 0);
      const botC = verts.length / 3;
      verts.push(0, -h * 0.5, 0);
      for (let iu = 0; iu < uSeg; iu++) {
        indices.push(topC, iu, iu + 1);
        const b0 = vSeg * (uSeg + 1) + iu;
        indices.push(botC, b0 + 1, b0);
      }
    }
    return { verts: new Float32Array(verts), indices };
  }

  function makeCuffData(rx, rz, h, lip, uSeg, vSeg) {
    return makeLatheCylData(rx, rx, h, uSeg || 36, vSeg || 14, rz / rx, function(v, r, rz_, y) {
      const t = (v - 0.5) * 2.0;
      const bulge = Math.sqrt(Math.max(0.0, 1.0 - Math.pow(t, 6)));
      return [rx - lip * (1.0 - bulge), rz - lip * (1.0 - bulge), y];
    }, true);
  }

  function makeRoundedBoxData(wx, wy, wz, seg) {
    const s = seg || 20;
    return makeSphereData(wx, wy, wz, s * 2, s, function(x, y, z) {
      const nx = x / wx, ny = y / wy, nz = z / wz;
      const p = 5.0;
      const normP = Math.pow(Math.pow(Math.abs(nx), p) + Math.pow(Math.abs(ny), p) + Math.pow(Math.abs(nz), p), 1.0 / p);
      if (normP > 1e-6) {
        const sc = 0.15 + 0.85 * (1.0 / normP);
        x *= sc; y *= sc; z *= sc;
      }
      return [x, y, z];
    });
  }

  function makeCapsuleCurveData(pts, rStart, rEnd, tSeg, rSeg, sz, customRadFn) {
    const tS = tSeg || 20;
    const rS = rSeg || 14;
    const scaleZ = sz !== undefined ? sz : 1.0;
    const r1 = rEnd !== undefined ? rEnd : rStart;
    const cPts = [];
    const nPts = pts.length;

    for (let i = 0; i <= tS; i++) {
      const t = (i / tS) * (nPts - 1);
      const idx = Math.min(Math.floor(t), nPts - 2);
      const f = t - idx;
      const p0 = pts[Math.max(0, idx - 1)];
      const p1 = pts[idx];
      const p2 = pts[idx + 1];
      const p3 = pts[Math.min(nPts - 1, idx + 2)];
      const f2 = f * f, f3 = f2 * f;
      const cx = 0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * f + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * f2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * f3);
      const cy = 0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * f + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * f2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * f3);
      const cz = 0.5 * ((2 * p1[2]) + (-p0[2] + p2[2]) * f + (2 * p0[2] - 5 * p1[2] + 4 * p2[2] - p3[2]) * f2 + (-p0[2] + 3 * p1[2] - 3 * p2[2] + p3[2]) * f3);
      cPts.push([cx, cy, cz]);
    }

    const verts = [];
    for (let i = 0; i <= tS; i++) {
      const u = i / tS;
      let r;
      if (customRadFn) {
        r = customRadFn(u);
      } else {
        let tip = 1.0;
        if (u < 0.12) tip = Math.sin((u / 0.12) * Math.PI * 0.5);
        else if (u > 0.88) tip = Math.sin(((1.0 - u) / 0.12) * Math.PI * 0.5);
        r = (rStart * (1.0 - u) + r1 * u) * tip;
      }

      const pNext = cPts[Math.min(tS, i + 1)];
      const pPrev = cPts[Math.max(0, i - 1)];
      let tx = pNext[0] - pPrev[0], ty = pNext[1] - pPrev[1], tz = pNext[2] - pPrev[2];
      const tLen = Math.max(Math.hypot(tx, ty, tz), 1e-8);
      tx /= tLen; ty /= tLen; tz /= tLen;

      let ux = 0, uy = 0, uz = 1;
      if (Math.abs(tz) >= 0.9) { ux = 0; uy = 1; uz = 0; }
      // norm = tang x up
      let nx = ty * uz - tz * uy;
      let ny = tz * ux - tx * uz;
      let nz = tx * uy - ty * ux;
      const nLen = Math.max(Math.hypot(nx, ny, nz), 1e-8);
      nx /= nLen; ny /= nLen; nz /= nLen;
      // binorm = tang x norm
      const bx = ty * nz - tz * ny;
      const by = tz * nx - tx * nz;
      const bz = tx * ny - ty * nx;

      const cp = cPts[i];
      for (let j = 0; j <= rS; j++) {
        const ang = (j / rS) * 2.0 * Math.PI;
        const ca = Math.cos(ang) * r;
        const sa = Math.sin(ang) * r * scaleZ;
        verts.push(
          cp[0] + nx * ca + bx * sa,
          cp[1] + ny * ca + by * sa,
          cp[2] + nz * ca + bz * sa
        );
      }
    }

    const indices = [];
    for (let i = 0; i < tS; i++) {
      for (let j = 0; j < rS; j++) {
        const a = i * (rS + 1) + j;
        const b = a + 1;
        const c = a + (rS + 1);
        const d = c + 1;
        indices.push(a, b, c, b, d, c);
      }
    }
    return { verts: new Float32Array(verts), indices };
  }

  // Floor Contact Shadow
  const shadowGeo = new THREE.CircleGeometry(0.68, 36);
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = -1.495;
  shadowMesh.scale.set(1.0, 0.42, 1.0);
  rootGroup.add(shadowMesh);

  // 3D Floating Holographic Spec Chip (When inspecting a project)
  const holoGroup = new THREE.Group();
  holoGroup.position.set(0.68, 0.35, 0.25);
  rootGroup.add(holoGroup);

  const chipMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), holoGlassMat);
  holoGroup.add(chipMesh);

  const chipRingGeo = new THREE.TorusGeometry(0.26, 0.010, 12, 36);
  const chipRing1 = new THREE.Mesh(chipRingGeo, holoRingMat);
  chipRing1.rotation.x = Math.PI / 2;
  holoGroup.add(chipRing1);

  const chipRing2 = new THREE.Mesh(chipRingGeo, holoRingMat);
  chipRing2.rotation.y = Math.PI / 2;
  holoGroup.add(chipRing2);

  // Master Mascot Character Group
  const charGroup = new THREE.Group();
  rootGroup.add(charGroup);

  // ============================================================================
  // 1. HEAD & FACE MASTER GROUP (Pivoted at Neck y = 0.42 for natural head look)
  // ============================================================================
  const HEAD_PIVOT_Y = 0.42;
  const headMasterGroup = new THREE.Group();
  headMasterGroup.position.set(0, HEAD_PIVOT_Y, 0);
  charGroup.add(headMasterGroup);

  // Sculpted Chubby Boy Head (World center y = 0.825)
  const headData = makeSphereData(0.404, 0.415, 0.405, 72, 54, function(x, y, z, phi) {
    const ny = y / 0.415;
    const cheek = Math.exp(-Math.pow((ny + 0.24) / 0.42, 2));
    const temple = Math.exp(-Math.pow((ny - 0.35) / 0.40, 2));
    x *= (1.0 + 0.080 * cheek - 0.040 * temple);
    z *= (1.0 + 0.045 * cheek * Math.max(0.0, Math.sin(phi)));
    if (z > 0) z *= 0.95;
    if (ny < -0.35) {
      const jawW = 1.0 + 0.040 * Math.exp(-Math.pow((ny + 0.60) / 0.30, 2));
      x *= jawW;
    }
    return [x, y, z];
  });
  const headVerts = transformVerts(headData.verts, [0, 0.825, 0], 0, 0, 0, HEAD_PIVOT_Y);
  const headMesh = buildClayMesh(headVerts, headData.indices, function(x, y, z) {
    let r = C_SKIN[0], g = C_SKIN[1], b = C_SKIN[2];
    const dl = Math.hypot(x + 0.23, y - 0.715, z - 0.32);
    const dr = Math.hypot(x - 0.23, y - 0.715, z - 0.32);
    const blushW = Math.max(0.0, 1.0 - Math.min(dl, dr) / 0.18) * 0.38;
    r = r * (1.0 - blushW) + C_BLUSH[0] * blushW;
    g = g * (1.0 - blushW) + C_BLUSH[1] * blushW;
    b = b * (1.0 - blushW) + C_BLUSH[2] * blushW;

    const dnose = Math.hypot(x / 0.075, (y - 0.715) / 0.045);
    if (z > 0.30 && dnose < 1.0) {
      const nw = (1.0 - dnose) * 0.28;
      r = r * (1.0 - nw) + C_SKIN_MID[0] * nw;
      g = g * (1.0 - nw) + C_SKIN_MID[1] * nw;
      b = b * (1.0 - nw) + C_SKIN_MID[2] * nw;
    }
    if (y > 1.03) {
      const bw = Math.min(1.0, (y - 1.03) / 0.08) * 0.28;
      r = r * (1.0 - bw) + C_SKIN_MID[0] * bw;
      g = g * (1.0 - bw) + C_SKIN_MID[1] * bw;
      b = b * (1.0 - bw) + C_SKIN_MID[2] * bw;
    }
    const sideW = Math.min(1.0, Math.max(0.0, (Math.abs(x) - 0.27) / 0.17) * 0.25 + Math.max(0.0, (0.465 - y) / 0.08) * 0.25);
    r = r * (1.0 - sideW) + C_SKIN_MID[0] * sideW;
    g = g * (1.0 - sideW) + C_SKIN_MID[1] * sideW;
    b = b * (1.0 - sideW) + C_SKIN_MID[2] * sideW;
    return [r, g, b];
  }, HEAD_PIVOT_Y);
  headMasterGroup.add(headMesh);

  // แก้มแดงตอนดีใจ/เขิน: ระบายสีลงจุดยอดของหัวตรงแก้ม (ตามผิวหน้าพอดี ไม่มีแผ่นลอย)
  // เก็บสีเดิมไว้ คืนค่าเดิมทุกไบต์เมื่อแก้มแดงกลับเป็น 0
  const C_BLUSH_HOT = [0.98, 0.50, 0.46];
  const headColorAttr = headMesh.geometry.getAttribute('color');
  const headBaseColors = headColorAttr.array.slice();
  const headBlushMask = new Float32Array(headColorAttr.count);
  for (let i = 0; i < headColorAttr.count; i++) {
    const x = headVerts[i * 3], y = headVerts[i * 3 + 1] + HEAD_PIVOT_Y, z = headVerts[i * 3 + 2];
    if (z < 0.15) continue;
    const d = Math.min(Math.hypot(x + 0.235, y - 0.705, z - 0.32), Math.hypot(x - 0.235, y - 0.705, z - 0.32));
    const m = Math.max(0.0, 1.0 - d / 0.13);
    headBlushMask[i] = m * m * (3.0 - 2.0 * m);
  }
  let appliedBlush = 0;
  function setBlush(k) {
    if (k < 0.01) k = 0;
    if (Math.abs(k - appliedBlush) < 0.01 && !(k === 0 && appliedBlush !== 0)) return;
    appliedBlush = k;
    const a = headColorAttr.array;
    for (let i = 0; i < headColorAttr.count; i++) {
      const w = headBlushMask[i] * k * 0.72;
      for (let c = 0; c < 3; c++) {
        a[i * 3 + c] = w > 0 ? headBaseColors[i * 3 + c] * (1.0 - w) + C_BLUSH_HOT[c] * w : headBaseColors[i * 3 + c];
      }
    }
    headColorAttr.needsUpdate = true;
  }

  // Large Plump C-Cup Ears
  [-1, 1].forEach(function(sign) {
    const earData = makeSphereData(0.118, 0.138, 0.072, 36, 28, function(x, y, z) {
      const r2 = Math.pow(x / 0.118, 2) + Math.pow(y / 0.138, 2);
      if (z > 0 && r2 < 0.56) {
        const depth = (0.56 - r2) / 0.56;
        z -= 0.052 * Math.pow(depth, 0.75);
      }
      return [x, y, z];
    });
    const earVerts = transformVerts(earData.verts, [sign * 0.415, 0.762, -0.01], 0.04, sign * 0.22, sign * -0.14, HEAD_PIVOT_Y);
    headMasterGroup.add(buildClayMesh(earVerts, earData.indices, function(x, y, z) {
      const lx = Math.abs(x) - 0.402;
      const ly = y - 0.762;
      const r2 = Math.pow(lx / 0.072, 2) + Math.pow(ly / 0.090, 2);
      if (z > -0.015 && r2 < 0.75) {
        const w = Math.max(0.0, 1.0 - r2 / 0.75) * 0.85;
        return [
          C_SKIN[0] * (1.0 - w) + C_EAR_IN[0] * w,
          C_SKIN[1] * (1.0 - w) + C_EAR_IN[1] * w,
          C_SKIN[2] * (1.0 - w) + C_EAR_IN[2] * w
        ];
      }
      return C_SKIN;
    }, HEAD_PIVOT_Y));
  });

  // Eyes (with Blinking Groups) & Eyebrows
  let leftEyeGroup, rightEyeGroup;
  const happyEyeArcs = [];
  const browRigs = [];
  [-1, 1].forEach(function(sign) {
    const eyeG = new THREE.Group();
    eyeG.position.set(sign * 0.125, 0.842 - HEAD_PIVOT_Y, 0.372);

    const ballData = makeSphereData(0.030, 0.044, 0.025, 24, 18);
    const ballVerts = transformVerts(ballData.verts, [0, 0, 0], 0, sign * 0.08, 0, 0);
    eyeG.add(buildClayMesh(ballVerts, ballData.indices, C_EYE, 0));

    const glintData = makeSphereData(0.008, 0.008, 0.008, 12, 10);
    const glintVerts = transformVerts(glintData.verts, [-0.007, 0.014, 0.021], 0, 0, 0, 0);
    eyeG.add(buildClayMesh(glintVerts, glintData.indices, C_GLINT, 0));

    headMasterGroup.add(eyeG);
    if (sign === -1) leftEyeGroup = eyeG;
    else rightEyeGroup = eyeG;

    // ตายิ้ม ^^ : เส้นโค้งคว่ำแทนลูกตาตอนดีใจ (ซ่อนไว้ก่อน) — จุดหมุนอยู่กลางตา ย่อ/ขยายแนวตั้งได้
    const arcDx = [-0.034, -0.017, 0.0, 0.017, 0.034];
    const arcDy = [-0.012, 0.008, 0.015, 0.008, -0.012];
    const arcPts = arcDx.map(function(dx, i) {
      const X = sign * 0.125 + dx;
      return [X, 0.842 + arcDy[i], 0.381 - 0.32 * (Math.abs(X) - 0.125)];
    });
    const arcData = makeCapsuleCurveData(arcPts, 0.0115, 0.0115, 18, 10, 0.6);
    const arcVerts = transformVerts(arcData.verts, [-sign * 0.125, -0.842, -0.372], 0, 0, 0, 0);
    const arcG = new THREE.Group();
    arcG.position.copy(eyeG.position);
    arcG.add(buildClayMesh(arcVerts, arcData.indices, C_EYE, 0));
    arcG.visible = false;
    headMasterGroup.add(arcG);
    happyEyeArcs.push(arcG);

    // Expressive Soft Clay Eyebrows — อยู่ใน group ที่หมุนรอบกลางคิ้ว ยก/ขมวดได้ตามสีหน้า
    // (รูปทรงตอนปกติเหมือนเดิมทุกจุด: แค่ย้ายจุดอ้างอิงจากคอมาไว้กลางคิ้ว)
    const bpts = [
      [sign * 0.090, 0.988, 0.365],
      [sign * 0.142, 0.992, 0.356],
      [sign * 0.194, 0.976, 0.334]
    ];
    const BROW_C = [sign * 0.142, 0.985, 0.352];
    const browData = makeCapsuleCurveData(bpts, 0.019, 0.015, 16, 12, 0.60);
    const browVerts = transformVerts(browData.verts, [-BROW_C[0], -BROW_C[1], -BROW_C[2]], 0, 0, 0, 0);
    const browG = new THREE.Group();
    browG.position.set(BROW_C[0], BROW_C[1] - HEAD_PIVOT_Y, BROW_C[2]);
    browG.add(buildClayMesh(browVerts, browData.indices, C_HAIR, 0));
    headMasterGroup.add(browG);
    browRigs.push({ g: browG, sign: sign, y0: browG.position.y });
  });

  // Cute Round-Oval Button Nose
  const noseData = makeSphereData(0.065, 0.058, 0.060, 28, 22);
  const noseVerts = transformVerts(noseData.verts, [0, 0.762, 0.396], 0, 0, 0, HEAD_PIVOT_Y);
  headMasterGroup.add(buildClayMesh(noseVerts, noseData.indices, C_NOSE, HEAD_PIVOT_Y));

  // Gentle Subtle Smile Mouth (slightly lifted corners, warm friendly expression)
  const mpts = [
    [-0.044, 0.575, 0.374],
    [-0.022, 0.568, 0.379],
    [ 0.000, 0.564, 0.382],
    [ 0.022, 0.568, 0.379],
    [ 0.044, 0.575, 0.374]
  ];
  const mouthData = makeCapsuleCurveData(mpts, 0.0070, 0.0070, 16, 10);
  const mouthVerts = transformVerts(mouthData.verts, [0, 0, 0], 0, 0, 0, HEAD_PIVOT_Y);
  const smileMouthMesh = buildClayMesh(mouthVerts, mouthData.indices, C_HAIR_DARK, HEAD_PIVOT_Y);
  headMasterGroup.add(smileMouthMesh);

  // ปากอ้าตอนพูด: แผ่นรีแบนบนใบหน้า ย่อ/ขยายตามจังหวะพูด (ซ่อนไว้จนกว่าจะพูด)
  const talkMouthData = makeSphereData(0.040, 0.034, 0.010, 20, 14);
  const talkMouthMesh = buildClayMesh(talkMouthData.verts, talkMouthData.indices, C_HAIR_DARK, 0);
  talkMouthMesh.position.set(0, 0.566 - HEAD_PIVOT_Y, 0.378);
  talkMouthMesh.visible = false;
  headMasterGroup.add(talkMouthMesh);

  // ปากยิ้มกว้าง (ตัว D ขอบบนแบน มีฟันบน + ลิ้น) — ใช้ตอนดีใจ
  const C_MOUTH_IN = [0.40, 0.14, 0.12];
  const C_TONGUE   = [0.94, 0.52, 0.50];
  const C_TEETH    = [0.99, 0.98, 0.96];
  const grinData = makeSphereData(0.068, 0.060, 0.012, 32, 20, function(x, y, z) {
    if (y > 0) y *= 0.10;
    return [x, y, z];
  });
  const grinMouthMesh = buildClayMesh(grinData.verts, grinData.indices, function(x, y) {
    if (y > -0.012) return C_TEETH;
    const t = Math.exp(-Math.pow(x / 0.034, 2)) * Math.min(1.0, Math.max(0.0, (-y - 0.030) / 0.014));
    return [
      C_MOUTH_IN[0] * (1.0 - t) + C_TONGUE[0] * t,
      C_MOUTH_IN[1] * (1.0 - t) + C_TONGUE[1] * t,
      C_MOUTH_IN[2] * (1.0 - t) + C_TONGUE[2] * t
    ];
  }, 0);
  grinMouthMesh.position.set(0, 0.588 - HEAD_PIVOT_Y, 0.376);
  grinMouthMesh.visible = false;
  headMasterGroup.add(grinMouthMesh);

  // ปากคว่ำ (มุมปากตก) — ใช้ตอนไม่โอเค/ส่ายหัว
  const fpts = [
    [-0.040, 0.556, 0.375],
    [-0.020, 0.566, 0.380],
    [ 0.000, 0.569, 0.382],
    [ 0.020, 0.566, 0.380],
    [ 0.040, 0.556, 0.375]
  ];
  const frownData = makeCapsuleCurveData(fpts, 0.0070, 0.0070, 16, 10);
  const frownVerts = transformVerts(frownData.verts, [0, 0, 0], 0, 0, 0, HEAD_PIVOT_Y);
  const frownMouthMesh = buildClayMesh(frownVerts, frownData.indices, C_HAIR_DARK, HEAD_PIVOT_Y);
  frownMouthMesh.visible = false;
  headMasterGroup.add(frownMouthMesh);

  // ============================================================================
  // 2. FULL, WIDE-CROWN FLUFFY WAVY HAIR (Zero Face Clipping!)
  // ============================================================================
  const hairDomeData = makeSphereData(0.455, 0.380, 0.435, 96, 64, function(x, y, z, phi, theta) {
    if (y < 0.15 && z > 0.05) {
      const templeDrop = Math.max(0.0, (Math.abs(x) - 0.22) / 0.20) * 0.15;
      const lift = Math.max(0.0, 0.12 - templeDrop - y) * (z / 0.43) * 1.15;
      y += lift;
      const waveY = 0.024 * Math.cos(x * 18.0 + 0.5) + 0.014 * Math.sin(x * 32.0);
      y += waveY;
    }
    if (y > 0.0) {
      const crownW = 1.0 + 0.14 * Math.sin(Math.min(1.0, y / 0.35) * Math.PI * 0.75);
      x *= crownW;
    }
    const w1 = 0.032 * Math.sin(phi * 6.0 + theta * 3.0) * Math.sin(theta * 4.0);
    const w2 = 0.020 * Math.cos(phi * 11.0 - theta * 4.0) * Math.sin(theta * 5.0);
    const scale = 1.0 + w1 + w2;
    if (y > 0.10) {
      const topT = (y - 0.10) / 0.27;
      const asym = Math.exp(-Math.pow((x + 0.10) / 0.24, 2)) * 0.075 + 0.020;
      const tuft = asym * (0.6 + 0.4 * Math.sin(x * 14.0 + 0.8)) * Math.pow(topT, 1.1);
      y += tuft;
    }
    return [x * scale, y * scale, z * scale];
  });
  const hairDomeVerts = transformVerts(hairDomeData.verts, [0, 1.020, -0.01], 0, 0, 0, HEAD_PIVOT_Y);
  headMasterGroup.add(buildClayMesh(hairDomeVerts, hairDomeData.indices, C_HAIR, HEAD_PIVOT_Y));

  const softLocks = [
    [[[-0.32, 1.18, 0.22], [-0.37, 1.04, 0.21], [-0.39, 0.91, 0.16], [-0.38, 0.83, 0.09]], 0.080, 0.025, 0.55],
    [[[-0.36, 1.16, 0.12], [-0.42, 1.02, 0.10], [-0.42, 0.88, 0.04]], 0.088, 0.028, 0.58],
    [[[ 0.32, 1.18, 0.22], [ 0.37, 1.04, 0.21], [ 0.39, 0.91, 0.16], [ 0.38, 0.83, 0.09]], 0.080, 0.025, 0.55],
    [[[ 0.36, 1.16, 0.12], [ 0.42, 1.02, 0.10], [ 0.42, 0.88, 0.04]], 0.088, 0.028, 0.58],
    [[[-0.36, 1.18, 0.08], [-0.42, 1.28, 0.10], [-0.34, 1.38, 0.08]], 0.095, 0.028, 0.55],
    [[[ 0.35, 1.18, 0.08], [ 0.40, 1.27, 0.10], [ 0.32, 1.36, 0.08]], 0.092, 0.028, 0.55],
    [[[-0.27, 1.22, 0.26], [-0.24, 1.13, 0.34], [-0.19, 1.06, 0.37]], 0.080, 0.022, 0.48],
    [[[-0.15, 1.24, 0.28], [-0.10, 1.14, 0.36], [-0.03, 1.06, 0.39]], 0.090, 0.025, 0.46],
    [[[-0.02, 1.25, 0.28], [ 0.04, 1.15, 0.36], [ 0.10, 1.07, 0.38]], 0.086, 0.024, 0.46],
    [[[ 0.16, 1.23, 0.26], [ 0.23, 1.14, 0.33], [ 0.27, 1.08, 0.33]], 0.082, 0.022, 0.48],
    [[[-0.28, 1.28, 0.14], [-0.16, 1.35, 0.20], [-0.04, 1.33, 0.24]], 0.098, 0.032, 0.55],
    [[[ 0.02, 1.29, 0.16], [ 0.14, 1.34, 0.20], [ 0.26, 1.28, 0.18]], 0.098, 0.032, 0.55],
    [[[-0.26, 1.30, 0.04], [-0.22, 1.42, 0.06], [-0.16, 1.48, 0.03]], 0.088, 0.016, 0.50],
    [[[-0.15, 1.34, 0.07], [-0.11, 1.46, 0.08], [-0.05, 1.50, 0.04]], 0.090, 0.016, 0.50],
    [[[-0.05, 1.34, 0.07], [ 0.02, 1.43, 0.08], [ 0.09, 1.46, 0.04]], 0.086, 0.018, 0.50],
    [[[ 0.10, 1.31, 0.05], [ 0.19, 1.38, 0.06], [ 0.27, 1.39, 0.02]], 0.084, 0.020, 0.50],
    [[[-0.39, 1.20, 0.06], [-0.46, 1.24, 0.07], [-0.49, 1.28, 0.05]], 0.042, 0.010, 0.45],
    [[[-0.41, 1.05, 0.06], [-0.47, 1.06, 0.07], [-0.50, 1.10, 0.05]], 0.038, 0.009, 0.45],
    [[[ 0.39, 1.14, 0.06], [ 0.46, 1.15, 0.07], [ 0.50, 1.18, 0.05]], 0.042, 0.010, 0.45],
    [[[ 0.41, 1.00, 0.05], [ 0.46, 0.99, 0.06], [ 0.49, 1.02, 0.04]], 0.036, 0.009, 0.45]
  ];
  softLocks.forEach(function(item) {
    const lockData = makeCapsuleCurveData(item[0], item[1], item[2], 20, 14, item[3]);
    const lockVerts = transformVerts(lockData.verts, [0, 0, 0], 0, 0, 0, HEAD_PIVOT_Y);
    headMasterGroup.add(buildClayMesh(lockVerts, lockData.indices, C_HAIR, HEAD_PIVOT_Y));
  });

  // ============================================================================
  // 3. TORSO, WHITE MFEC T-SHIRT, ARMS, SDF SMOOTH-UNION HANDS & WRISTWATCH
  // ============================================================================
  const torsoGroup = new THREE.Group();
  charGroup.add(torsoGroup);

  // Warm Neck sitting snugly inside the crew-neck collar
  const neckData = makeLatheCylData(0.185, 0.220, 0.18, 32, 10, 0.86);
  const neckVerts = transformVerts(neckData.verts, [0, 0.385, 0.0], 0, 0, 0, 0);
  torsoGroup.add(buildClayMesh(neckVerts, neckData.indices, C_SKIN_MID, 0));

  // White T-Shirt Body with MFEC Chest Logo
  const shirtData = makeLatheCylData(0.420, 0.445, 0.985, 56, 36, 0.67, function(v, r, rz, y) {
    if (v < 0.24) {
      const t = v / 0.24;
      const s = Math.sin(t * Math.PI * 0.5);
      const sp = Math.pow(s, 0.85);
      return [0.190 + (0.420 - 0.190) * sp, 0.160 + (0.290 - 0.160) * sp, y];
    } else {
      const t = (v - 0.24) / 0.76;
      const hemRound = 1.0 - 0.03 * Math.pow(Math.max(0.0, (t - 0.90) / 0.10), 2);
      const curRx = (0.420 + 0.025 * Math.pow(t, 0.7) + 0.012 * Math.sin(t * Math.PI)) * hemRound;
      const curRz = (0.290 + 0.015 * Math.sin(t * Math.PI * 0.7)) * hemRound;
      return [curRx, curRz, y];
    }
  }, true);

  for (let i = 0; i < shirtData.verts.length; i += 3) {
    const vx = shirtData.verts[i];
    const vy = shirtData.verts[i + 1];
    const vz = shirtData.verts[i + 2];
    if (vy > 0.10 && vz > -0.02 && Math.abs(vx) < 0.25) {
      const wy = Math.pow((vy - 0.10) / 0.392, 1.5);
      const wx = Math.pow(Math.cos((Math.abs(vx) / 0.25) * Math.PI * 0.5), 1.5);
      const wz = Math.min(1.0, Math.max(0.0, (vz + 0.02) / 0.20));
      shirtData.verts[i + 1] -= 0.088 * wy * wx * wz;
    }
  }
  const shirtVerts = transformVerts(shirtData.verts, [0, -0.058, 0], 0, 0, 0, 0);
  const shirtMesh = buildClayMesh(shirtVerts, shirtData.indices, function(x, y) {
    const fold = Math.sin(x * 16.0) * Math.max(0.0, (-0.22 - y) / 0.32) * 0.024;
    return [
      Math.min(1.0, Math.max(0.0, C_SHIRT[0] + fold)),
      Math.min(1.0, Math.max(0.0, C_SHIRT[1] + fold)),
      Math.min(1.0, Math.max(0.0, C_SHIRT[2] + fold))
    ];
  }, 0);
  shirtMesh.material = shirtClayMaterial;
  torsoGroup.add(shirtMesh);

  // Ribbed Crew-Neck Collar
  const colPts = [];
  for (let i = 0; i <= 40; i++) {
    const ang = (i / 40) * 2.0 * Math.PI;
    colPts.push([
      -0.198 * Math.cos(ang),
      0.430 - 0.092 * Math.pow(Math.max(0.0, Math.sin(ang)), 1.25),
      0.168 * Math.sin(ang)
    ]);
  }
  const colData = makeCapsuleCurveData(colPts, 0.032, 0.032, 44, 14);
  torsoGroup.add(buildClayMesh(colData.verts, colData.indices, C_SHIRT_DK, 0));

  // SDF Smooth-Union (smin) Clay Hand Evaluators for Ultra-Smooth, Seamless Clay Hands
  function sminClay(a, b, k) {
    const h = Math.max(k - Math.abs(a - b), 0.0) / k;
    return Math.min(a, b) - h * h * k * 0.25;
  }

  function sdTaperedCap(px, py, pz, ax, ay, az, bx, by, bz, ra, rb) {
    const bax = bx - ax, bay = by - ay, baz = bz - az;
    const pax = px - ax, pay = py - ay, paz = pz - az;
    const baba = bax * bax + bay * bay + baz * baz;
    const h = Math.min(1.0, Math.max(0.0, (pax * bax + pay * bay + paz * baz) / baba));
    const dx = pax - h * bax, dy = pay - h * bay, dz = paz - h * baz;
    const r = ra * (1.0 - h) + rb * h;
    return Math.hypot(dx, dy, dz) - r;
  }

  function sdEllipsoidSeg(px, py, pz, ax, ay, az, bx, by, bz, rxa, rza, rxb, rzb) {
    const bax = bx - ax, bay = by - ay, baz = bz - az;
    const pax = px - ax, pay = py - ay, paz = pz - az;
    const h = Math.min(1.0, Math.max(0.0, (pax * bax + pay * bay + paz * baz) / (bax * bax + bay * bay + baz * baz)));
    const dx = pax - h * bax, dy = pay - h * bay, dz = paz - h * baz;
    const rx = rxa * (1.0 - h) + rxb * h + 0.008 * Math.sin(h * Math.PI);
    const rz = rza * (1.0 - h) + rzb * h;
    const rm = Math.sqrt(rx * rz);
    return (Math.hypot(dx / rx, dy / rm, dz / rz) - 1.0) * rm;
  }

  function evalHandSdf(px, py, pz, sign) {
    const dArmPalm = sdEllipsoidSeg(
      px, py, pz,
      sign * 0.504, -0.165, 0.004,
      sign * 0.538, -0.555, 0.014,
      0.118, 0.102, 0.070, 0.040
    );
    const dTh1 = sdTaperedCap(px, py, pz, sign * 0.476, -0.475, 0.020, sign * 0.445, -0.558, 0.032, 0.034, 0.028);
    const dTh2 = sdTaperedCap(px, py, pz, sign * 0.445, -0.558, 0.032, sign * 0.449, -0.638, 0.030, 0.028, 0.025);
    const dThumb = sminClay(dTh1, dTh2, 0.016);
    let d = sminClay(dArmPalm, dThumb, 0.030);

    const fSpecs = [
      [0.502, -0.525, 0.024, 0.495, -0.608, 0.025, 0.482, -0.686, 0.024, 0.028, 0.027, 0.025],
      [0.534, -0.522, 0.021, 0.527, -0.612, 0.022, 0.512, -0.702, 0.021, 0.029, 0.028, 0.026],
      [0.564, -0.526, 0.011, 0.557, -0.608, 0.012, 0.542, -0.684, 0.011, 0.028, 0.027, 0.025],
      [0.588, -0.534, -0.003, 0.581, -0.598, -0.002, 0.566, -0.654, -0.002, 0.025, 0.024, 0.022]
    ];
    let dFingers = 1e9;
    for (let i = 0; i < fSpecs.length; i++) {
      const fs = fSpecs[i];
      const df1 = sdTaperedCap(px, py, pz, sign * fs[0], fs[1], fs[2], sign * fs[3], fs[4], fs[5], fs[9], fs[10]);
      const df2 = sdTaperedCap(px, py, pz, sign * fs[3], fs[4], fs[5], sign * fs[6], fs[7], fs[8], fs[10], fs[11]);
      const df = sminClay(df1, df2, 0.014);
      dFingers = (i === 0) ? df : sminClay(dFingers, df, 0.003);
    }
    return sminClay(d, dFingers, 0.032);
  }

  function evalHandSdfGrad(px, py, pz, sign) {
    const eps = 1e-4;
    const dx = evalHandSdf(px + eps, py, pz, sign) - evalHandSdf(px - eps, py, pz, sign);
    const dy = evalHandSdf(px, py + eps, pz, sign) - evalHandSdf(px, py - eps, pz, sign);
    const dz = evalHandSdf(px, py, pz + eps, sign) - evalHandSdf(px, py, pz - eps, sign);
    const len = Math.max(Math.hypot(dx, dy, dz), 1e-8);
    return [dx / len, dy / len, dz / len];
  }

  function buildSdfHandMesh(sign, elPivotX, elPivotY) {
    const avData = makeLatheCylData(0.118, 0.070, 0.410, 44, 30, 0.86, null, true);
    const avVerts = transformVerts(avData.verts, [sign * 0.520, -0.365, 0.010], 0, 0, 0, 0);

    const tpts = [
      [sign * 0.476, -0.475, 0.020],
      [sign * 0.445, -0.558, 0.032],
      [sign * 0.449, -0.638, 0.030]
    ];
    const tvData = makeCapsuleCurveData(tpts, 0.034, 0.025, 22, 18, 1.0);

    const fSpecs = [
      [[[sign * 0.502, -0.525, 0.024], [sign * 0.495, -0.608, 0.025], [sign * 0.482, -0.686, 0.024]], 0.028, 0.025],
      [[[sign * 0.534, -0.522, 0.021], [sign * 0.527, -0.612, 0.022], [sign * 0.512, -0.702, 0.021]], 0.029, 0.026],
      [[[sign * 0.564, -0.526, 0.011], [sign * 0.557, -0.608, 0.012], [sign * 0.542, -0.684, 0.011]], 0.028, 0.025],
      [[[sign * 0.588, -0.534, -0.003], [sign * 0.581, -0.598, -0.002], [sign * 0.566, -0.654, -0.002]], 0.025, 0.022]
    ];

    const parts = [
      { verts: avVerts, indices: avData.indices },
      { verts: tvData.verts, indices: tvData.indices }
    ];
    fSpecs.forEach(function(fs) {
      parts.push(makeCapsuleCurveData(fs[0], fs[1], fs[2], 22, 18, 1.0));
    });

    let totalFloats = 0;
    parts.forEach(function(p) { totalFloats += p.verts.length; });
    const combVerts = new Float32Array(totalFloats);
    const combIndices = [];
    let vFloatOff = 0;
    let vCountOff = 0;
    parts.forEach(function(p) {
      combVerts.set(p.verts, vFloatOff);
      for (let i = 0; i < p.indices.length; i++) {
        combIndices.push(p.indices[i] + vCountOff);
      }
      vFloatOff += p.verts.length;
      vCountOff += p.verts.length / 3;
    });

    const nVerts = combVerts.length / 3;
    const combNorms = new Float32Array(combVerts.length);
    const combCols = new Float32Array(combVerts.length);

    for (let i = 0; i < nVerts; i++) {
      let px = combVerts[i * 3];
      let py = combVerts[i * 3 + 1];
      let pz = combVerts[i * 3 + 2];
      // 3 Newton steps onto the exact C-infinity SDF Smooth-Union clay surface
      for (let step = 0; step < 3; step++) {
        const d = evalHandSdf(px, py, pz, sign);
        const g = evalHandSdfGrad(px, py, pz, sign);
        px -= d * g[0];
        py -= d * g[1];
        pz -= d * g[2];
      }
      const g = evalHandSdfGrad(px, py, pz, sign);
      let nx = g[0], ny = g[1], nz = g[2];
      if (py < -0.55) {
        nz += 0.08;
        const nl = Math.max(Math.hypot(nx, ny, nz), 1e-8);
        nx /= nl; ny /= nl; nz /= nl;
      }
      combVerts[i * 3]     = px - elPivotX;
      combVerts[i * 3 + 1] = py - elPivotY;
      combVerts[i * 3 + 2] = pz;
      combNorms[i * 3]     = nx;
      combNorms[i * 3 + 1] = ny;
      combNorms[i * 3 + 2] = nz;
      combCols[i * 3]      = C_SKIN[0];
      combCols[i * 3 + 1]  = C_SKIN[1];
      combCols[i * 3 + 2]  = C_SKIN[2];
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(combVerts, 3));
    geom.setAttribute('normal', new THREE.BufferAttribute(combNorms, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(combCols, 3));
    geom.setIndex(combIndices);
    return new THREE.Mesh(geom, clayMaterial);
  }

  // Articulated Sleeves, Forearms, Smooth-Union Clay Hands & Wristwatch
  let leftArmRig, rightArmRig;
  [-1, 1].forEach(function(sign) {
    const armHolder = new THREE.Group();
    const shPivotX = sign * 0.275;
    const shPivotY = 0.195;
    armHolder.position.set(shPivotX, shPivotY, 0);

    // Spherical Shoulder Ball Cap centered at (0,0,0) so rotation never creates a gap or horn
    const shBallData = makeSphereData(0.142, 0.142, 0.122, 24, 18);
    armHolder.add(buildClayMesh(shBallData.verts, shBallData.indices, C_SHIRT, 0));

    // Continuous Shoulder-to-Cuff Sleeve Spline
    const slvPts = [
      [0.0, 0.0, 0.0],
      [sign * 0.34 - shPivotX,  0.17 - shPivotY, 0.0],
      [sign * 0.43 - shPivotX,  0.03 - shPivotY, 0.0],
      [sign * 0.502 - shPivotX, -0.16 - shPivotY, 0.0]
    ];
    const slvData = makeCapsuleCurveData(slvPts, 0.138, 0.198, 28, 28, 0.86, function(u) {
      return 0.138 + 0.060 * Math.pow(u, 0.75);
    });
    armHolder.add(buildClayMesh(slvData.verts, slvData.indices, C_SHIRT, 0));

    // Thick Flat-Band Rolled Sleeve Cuff
    const cuffData = makeCuffData(0.208, 0.185, 0.092, 0.018, 36, 14);
    const cuffVerts = transformVerts(cuffData.verts, [sign * 0.502 - shPivotX, -0.170 - shPivotY, 0.0], 0, 0, sign * 0.27, 0);
    armHolder.add(buildClayMesh(cuffVerts, cuffData.indices, C_SHIRT_DK, 0));

    // Forearm & SDF Smooth-Union Clay Hand Group
    const elPivotX = sign * 0.502;
    const elPivotY = -0.170;
    const forearmGroup = new THREE.Group();
    forearmGroup.position.set(elPivotX - shPivotX, elPivotY - shPivotY, 0);

    // Internal Elbow Ball Joint tucked inside the cuff so forearm rotation never exposes a seam
    const elBallData = makeSphereData(0.112, 0.112, 0.098, 20, 14);
    forearmGroup.add(buildClayMesh(elBallData.verts, elBallData.indices, C_SKIN, 0));

    forearmGroup.add(buildSdfHandMesh(sign, elPivotX, elPivotY));

    // Matte Black Wristwatch on Viewer's RIGHT Wrist (sign === 1, character's left hand)
    if (sign === 1) {
      const wBandData = makeCuffData(0.106, 0.096, 0.056, 0.008, 28, 10);
      const wBandVerts = transformVerts(wBandData.verts, [0.525 - elPivotX, -0.460 - elPivotY, 0.012], 0, 0, 0, 0);
      forearmGroup.add(buildClayMesh(wBandVerts, wBandData.indices, C_WATCH, 0));

      const wCaseData = makeRoundedBoxData(0.044, 0.048, 0.054, 12);
      const wCaseVerts = transformVerts(wCaseData.verts, [0.618 - elPivotX, -0.460 - elPivotY, 0.015], 0, 0, 0, 0);
      forearmGroup.add(buildClayMesh(wCaseVerts, wCaseData.indices, C_WATCH, 0));
    }

    armHolder.add(forearmGroup);
    torsoGroup.add(armHolder);

    if (sign === -1) leftArmRig = { armHolder: armHolder, forearmGroup: forearmGroup };
    else rightArmRig = { armHolder: armHolder, forearmGroup: forearmGroup };
  });

  // ============================================================================
  // 4. KHAKI SHORTS, SHINS & CHUNKY CREAM SNEAKERS
  // ============================================================================
  const shortsGroup = new THREE.Group();
  charGroup.add(shortsGroup);

  const groinData = makeLatheCylData(0.16, 0.12, 0.20, 20, 6, 0.65);
  const groinVerts = transformVerts(groinData.verts, [0, -0.72, -0.03], 0, 0, 0, 0);
  shortsGroup.add(buildClayMesh(groinVerts, groinData.indices, C_SHORTS_DK, 0));

  [-1, 1].forEach(function(sign) {
    // Khaki Shorts Leg
    const slegData = makeLatheCylData(0.202, 0.198, 0.33, 36, 16, 0.92, function(v, r, rz, y) {
      const wHip = 1.0 + 0.11 * Math.pow(1.0 - v, 1.1);
      return [r * wHip, rz, y];
    }, true);
    const slegVerts = transformVerts(slegData.verts, [sign * 0.208, -0.675, 0], 0, 0, 0, 0);
    shortsGroup.add(buildClayMesh(slegVerts, slegData.indices, C_SHORTS, 0));

    // Thick Flat-Band Rolled Shorts Cuff
    const scData = makeCuffData(0.214, 0.200, 0.105, 0.020, 36, 14);
    const scVerts = transformVerts(scData.verts, [sign * 0.214, -0.862, 0], 0, 0, 0, 0);
    shortsGroup.add(buildClayMesh(scVerts, scData.indices, C_SHORTS_CUF, 0));

    // Lower Leg (Shin)
    const shinData = makeLatheCylData(0.130, 0.108, 0.36, 28, 14, 0.95);
    const shinVerts = transformVerts(shinData.verts, [sign * 0.214, -1.07, 0], 0, 0, 0, 0);
    shortsGroup.add(buildClayMesh(shinVerts, shinData.indices, C_SKIN_MID, 0));

    // Sculpted 3/4-Stance Chunky Cream Sneakers
    const footAng = sign * 0.46;
    const fx = sign * 0.275;
    const fz = 0.088;

    // Outsole
    const soleData = makeCuffData(0.182, 0.325, 0.095, 0.016, 44, 12);
    const soleVerts = transformVerts(soleData.verts, [fx, -1.442, fz], 0, footAng, 0, 0);
    shortsGroup.add(buildClayMesh(soleVerts, soleData.indices, C_SHOE_SOLE, 0));

    // Midsole Horizontal Groove Line
    const grooveData = makeCuffData(0.184, 0.327, 0.009, 0.002, 44, 6);
    const grooveVerts = transformVerts(grooveData.verts, [fx, -1.440, fz], 0, footAng, 0, 0);
    shortsGroup.add(buildClayMesh(grooveVerts, grooveData.indices, C_SHOE_LINE, 0));

    // Unified Sneaker Upper
    const upData = makeSphereData(0.172, 0.185, 0.310, 48, 32, function(x, y, z) {
      if (y < -0.05) y = -0.05 + (y + 0.05) * 0.22;
      if (z > 0) x *= (1.0 + 0.08 * Math.sin((z / 0.310) * Math.PI));
      if (y > 0) {
        const tz = Math.min(1.0, Math.max(0.0, (z + 0.02) / 0.30));
        const slope = 1.0 - 0.56 * Math.pow(tz, 0.85);
        y *= slope;
        const dip = Math.exp(-Math.pow((z + 0.05) / 0.085, 2)) * (Math.abs(x) / 0.165);
        y -= 0.032 * dip;
      }
      return [x, y, z];
    });
    const upVerts = transformVerts(upData.verts, [fx, -1.335, fz], 0, footAng, 0, 0);
    shortsGroup.add(buildClayMesh(upVerts, upData.indices, C_SHOE, 0));

    // Sculpted Cream Ankle Collar
    const colSData = makeSphereData(0.148, 0.095, 0.155, 32, 20, function(x, y, z) {
      if (y > 0) {
        y -= (Math.abs(x) / 0.148) * 0.028;
      }
      return [x, y, z];
    });
    const colSVerts = transformVerts(colSData.verts, [sign * 0.220, -1.235, -0.015], 0, footAng, 0, 0);
    shortsGroup.add(buildClayMesh(colSVerts, colSData.indices, C_SHOE, 0));

    // Smooth Rounded Padded Sneaker Tongue in Front of Shin
    const tngData = makeSphereData(0.088, 0.098, 0.038, 28, 20);
    const tngVerts = transformVerts(tngData.verts, [sign * 0.246, -1.168, 0.102], 0.20, footAng, 0, 0);
    shortsGroup.add(buildClayMesh(tngVerts, tngData.indices, C_SHOE, 0));

    // Raised Left & Right Eyestay Panels
    [-1, 1].forEach(function(esSign) {
      const esPts = [
        [esSign * 0.080, -1.185, 0.01],
        [esSign * 0.076, -1.235, 0.08],
        [esSign * 0.068, -1.275, 0.15]
      ];
      const esData = makeCapsuleCurveData(esPts, 0.025, 0.021, 12, 10);
      const esVerts = transformVerts(esData.verts, [fx, 0, fz], 0, footAng, 0, 0);
      shortsGroup.add(buildClayMesh(esVerts, esData.indices, C_SHOE_SHAD, 0));
    });

    // 3 Thick Crisscrossing Cream Shoelaces
    for (let li = 0; li < 3; li++) {
      const ly0 = -1.192 - li * 0.034;
      const lz0 = 0.025 + li * 0.052;
      const ly1 = ly0 - 0.018;
      const lz1 = lz0 + 0.030;
      [-1, 1].forEach(function(lDir) {
        const lpts = [
          [-lDir * 0.072, ly0, lz0],
          [ 0.0, (ly0 + ly1) * 0.5 + 0.020, (lz0 + lz1) * 0.5 + 0.022],
          [ lDir * 0.072, ly1, lz1]
        ];
        const lData = makeCapsuleCurveData(lpts, 0.020, 0.020, 12, 10, 0.65);
        const lVerts = transformVerts(lData.verts, [fx, 0, fz], 0, footAng, 0, 0);
        shortsGroup.add(buildClayMesh(lVerts, lData.indices, C_LACE, 0));
      });
    }
  });

  // 5. Theme Sync
  function applyThemeMode(lightMode) {
    if (lightMode) {
      shadowMat.color.setHex(0x64748b);
      shadowMat.opacity = 0.18;
    } else {
      shadowMat.color.setHex(0x000000);
      shadowMat.opacity = 0.32;
    }
  }

  applyThemeMode(isCurrentLight());

  window.addEventListener('pika-theme-changed', (e) => {
    applyThemeMode(e.detail && e.detail.theme === 'light');
  });

  const themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-theme') {
        applyThemeMode(isCurrentLight());
      }
    });
  });
  themeObserver.observe(document.documentElement, { attributes: true });

  // 6. Interactive Physics & Natural 3D Hand Reach-and-Click Kinematics
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let dragRotY = 0;
  let dragRotX = 0;

  let targetLookY = 0;
  let targetLookX = 0;
  let curLookY = 0;
  let curLookX = 0;

  // 3D Tactile Click Ripple Ring at Fingertip Contact Point
  const tapRippleGroup = new THREE.Group();
  rootGroup.add(tapRippleGroup);
  const tapRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.0, side: THREE.DoubleSide });
  const tapCoreMat = new THREE.MeshBasicMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.0, side: THREE.DoubleSide });
  const tapRingMesh = new THREE.Mesh(new THREE.RingGeometry(0.05, 0.085, 32), tapRingMat);
  const tapCoreMesh = new THREE.Mesh(new THREE.CircleGeometry(0.045, 24), tapCoreMat);
  tapRippleGroup.add(tapRingMesh);
  tapRippleGroup.add(tapCoreMesh);
  let tapRippleTimer = 0;

  let hoveredProjectId = null;
  const projectAngles = {
    'MFEC-TOWER-01': {
      side: 'left', sign: -1, slot: 0,
      armZ: -0.78, armX: -0.18, armY: 0.08,
      foreZ: -0.08, foreX: -0.14, foreY: 0.06,
      bodyRotY: 0.20, bodyLeanZ: 0.055, bodyShiftX: -0.065,
      headY: -0.42, headX: -0.14, headZ: 0.07,
      tapPos: [-1.05, 0.35, 0.30],
      name: 'Transmission Tower AI'
    },
    'ACME-GCP-02': {
      side: 'left', sign: -1, slot: 1,
      armZ: -0.58, armX: -0.16, armY: 0.06,
      foreZ: -0.06, foreX: -0.12, foreY: 0.05,
      bodyRotY: 0.22, bodyLeanZ: 0.045, bodyShiftX: -0.075,
      headY: -0.45, headX: 0.02, headZ: 0.06,
      tapPos: [-1.08, -0.05, 0.30],
      name: 'Acme Corp Cloud'
    },
    'CHRONOS-FIN-03': {
      side: 'left', sign: -1, slot: 2,
      armZ: -0.38, armX: -0.14, armY: 0.05,
      foreZ: -0.04, foreX: -0.10, foreY: 0.04,
      bodyRotY: 0.18, bodyLeanZ: 0.035, bodyShiftX: -0.055,
      headY: -0.38, headX: 0.16, headZ: 0.05,
      tapPos: [-0.98, -0.42, 0.30],
      name: 'Project Chronos Core'
    },
    'ACTION-NEW-PROJECT': {
      side: 'left', sign: -1, slot: 1,
      armZ: -0.62, armX: -0.16, armY: 0.06,
      foreZ: -0.07, foreX: -0.12, foreY: 0.05,
      bodyRotY: 0.23, bodyLeanZ: 0.050, bodyShiftX: -0.078,
      headY: -0.46, headX: 0.02, headZ: 0.06,
      tapPos: [-1.08, -0.05, 0.30],
      name: 'Create New Project'
    },
    'GOV-ZERO-04': {
      side: 'right', sign: 1, slot: 0,
      armZ: 0.78, armX: -0.18, armY: -0.08,
      foreZ: 0.08, foreX: -0.14, foreY: -0.06,
      bodyRotY: -0.20, bodyLeanZ: -0.055, bodyShiftX: 0.065,
      headY: 0.42, headX: -0.14, headZ: -0.07,
      tapPos: [1.05, 0.35, 0.30],
      name: 'GovCloud Zero-Trust'
    },
    'MOPH-MESH-05': {
      side: 'right', sign: 1, slot: 1,
      armZ: 0.58, armX: -0.16, armY: -0.06,
      foreZ: 0.06, foreX: -0.12, foreY: -0.05,
      bodyRotY: -0.22, bodyLeanZ: -0.045, bodyShiftX: 0.075,
      headY: 0.45, headX: 0.02, headZ: -0.06,
      tapPos: [1.08, -0.05, 0.30],
      name: 'MOPH Health Mesh'
    },
    'BOT-SWITCH-06': {
      side: 'right', sign: 1, slot: 2,
      armZ: 0.38, armX: -0.14, armY: -0.05,
      foreZ: 0.04, foreX: -0.10, foreY: -0.04,
      bodyRotY: -0.18, bodyLeanZ: -0.035, bodyShiftX: 0.055,
      headY: 0.38, headX: 0.16, headZ: -0.05,
      tapPos: [0.98, -0.42, 0.30],
      name: 'BOT Settlement Core'
    },
    'ACTION-TOR-INGEST': {
      side: 'right', sign: 1, slot: 1,
      armZ: 0.62, armX: -0.16, armY: -0.06,
      foreZ: 0.07, foreX: -0.12, foreY: -0.05,
      bodyRotY: -0.23, bodyLeanZ: -0.050, bodyShiftX: 0.078,
      headY: 0.46, headX: 0.02, headZ: -0.06,
      tapPos: [1.08, -0.05, 0.30],
      name: 'TOR & Document Ingestion'
    }
  };

  // ท่าเอื้อมมือผูกกับ "ตำแหน่ง" ของการ์ด ไม่ใช่ id — projectAngles ข้างบนมีแค่ id
  // ของข้อมูลตัวอย่าง โปรเจกต์จริง (hospital-project ฯลฯ) จึงตกไปใช้ท่าซ้ายบนทุกตัว
  const SLOT_POSES = {
    left: [projectAngles['MFEC-TOWER-01'], projectAngles['ACME-GCP-02'], projectAngles['CHRONOS-FIN-03']],
    right: [projectAngles['GOV-ZERO-04'], projectAngles['MOPH-MESH-05'], projectAngles['BOT-SWITCH-06']]
  };
  const SLOT_CLASSES = ['slot-top', 'slot-mid', 'slot-bot'];

  function poseFor(pId) {
    if (!pId) return null;
    const card = document.querySelector('.wiki-project-link[data-id="' + CSS.escape(pId) + '"]');
    if (card) {
      const side = card.classList.contains('link-right') ? 'right' : 'left';
      const slot = Math.max(0, SLOT_CLASSES.findIndex(c => card.classList.contains(c)));
      return SLOT_POSES[side][slot];
    }
    return projectAngles[pId] || null;   // การ์ด action ตอนยังไม่มีโปรเจกต์
  }

  // ── ชี้ + มอง ไปที่การ์ดโปรเจกต์ "ตามตำแหน่งจริงบนจอ" ─────────────────────────
  // มุมตายตัวต่อช่องข้างบนจูนกับเลย์เอาต์เก่า วัดบนหน้าจริงแล้วแนวนิ้วเพี้ยน 35–70° และหน้าหันนิดเดียว
  // ตอนนี้: กลางชื่อการ์ดบนจอ → ยิงรังสีจากกล้องไปตัดระนาบหน้าลำตัว (z = AIM_PLANE_Z) ได้เป้าใน 3D
  // → หมุนไหล่ให้แนว ข้อศอก→ปลายนิ้ว ผ่านเป้าพอดี, หันหัว + เลื่อนลูกตาไปทางเดียวกัน
  // หาการ์ดไม่เจอ/วัดไม่ได้ → คืน null แล้วใช้ท่าเดิม (poseFor) แทน
  const AIM_DURATION = 2.5;      // ยกแขนชี้ 0.4 วิ → จิ้ม (การ์ดเปิด) → ค้างชี้ → ลดแขน
  const AIM_PLANE_Z = 0.5;       // เป้าอยู่หน้าลำตัวนิดหน่อย แขนยื่นออกมาหาผู้ชม ไม่แบนติดระนาบ
  const AIM_FORE_BEND = -0.22;   // งอศอกไปข้างหน้านิด ๆ (เหยียดตึงดูแข็ง)
  const AIM_BODY_TURN = 0.16;    // ลำตัวหันเข้าหาการ์ด
  // ก้มได้ลึกกว่าเงย: จอแคบการ์ดอยู่ใต้ตัว ต้องก้มให้เห็นว่ามองลงไป (จอกว้างไม่ถึงเพดานนี้)
  const AIM_HEAD_YAW_MAX = 0.56, AIM_HEAD_PITCH_UP = 0.30, AIM_HEAD_PITCH_DOWN = 0.40;
  const AIM_GAZE_DEPTH = 1.4;    // ระยะสมมติของมุมหัน: หันพอดูออก แต่ไม่หันข้างจนไม่เห็นหน้า
  const EYE_X0 = 0.125, EYE_Y0 = 0.842 - HEAD_PIVOT_Y, EYE_Z0 = 0.372;
  const _tipCache = {};

  function clampN(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  // ปลายนิ้ว (จุดไกลศอกที่สุดของมือ) ในพิกัดท่อนแขนล่าง — คำนวณครั้งเดียวจาก mesh จริง
  function handTipLocal(sign) {
    if (_tipCache[sign]) return _tipCache[sign];
    const rig = sign > 0 ? rightArmRig : leftArmRig;
    let best = null, bd = -1;
    rig.forearmGroup.children.forEach(function(m) {
      const pos = m.geometry && m.geometry.attributes && m.geometry.attributes.position;
      if (!pos) return;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i), y = pos.getY(i);
        if (x * x + y * y > bd) { bd = x * x + y * y; best = new THREE.Vector3(x, y, pos.getZ(i)); }
      }
    });
    return (_tipCache[sign] = best);
  }

  // มุมไหล่ (Euler XYZ ของ armHolder) ที่ทำให้แนว ข้อศอก→ปลายนิ้ว ชี้ผ่านเป้า T (พิกัด torsoGroup)
  function solveArm(sign, T) {
    const rig = sign > 0 ? rightArmRig : leftArmRig;
    const S = rig.armHolder.position, F = rig.forearmGroup.position;
    const qFore = new THREE.Quaternion().setFromEuler(new THREE.Euler(AIM_FORE_BEND, 0, 0));
    const tipA = handTipLocal(sign).clone().applyQuaternion(qFore).add(F);   // ปลายนิ้วในพิกัดแขน ก่อนหมุนไหล่
    const u = tipA.clone().normalize();
    const keepOut = function(d) {
      if (d.x * sign < 0.25) { d.x = sign * 0.25; d.normalize(); }   // ไม่ชี้ข้ามลำตัว/หัว
      // การ์ดอยู่ใต้ตัว (จอแคบ การ์ดเรียงต่อลงไปข้างล่าง): ชี้ลงชันเกิน = แขนห้อยเหมือนท่ายืนเฉย ๆ ดูไม่ออกว่าชี้
      // → กดไว้ที่ลง ~37° แล้วยื่นไปข้างหน้า-ออกข้าง ให้เห็นชัดว่า "ข้างล่างนั่น"
      if (d.y < -0.6) {
        const hx = d.x, hz = Math.max(d.z, Math.abs(d.x) * 0.7), h = Math.hypot(hx, hz) || 1;
        d.set(hx / h * 0.8, -0.6, hz / h * 0.8);
      }
      return d;
    };
    const dir = keepOut(T.clone().sub(S).normalize());
    const q = new THREE.Quaternion();
    // เล็งไหล่→ปลายนิ้วก่อน แล้วแก้ทีละนิดจนแนวท่อนแขนล่าง (ข้อศอก→ปลายนิ้ว) ผ่านเป้า
    for (let k = 0; k < 6; k++) {
      q.setFromUnitVectors(u, dir);
      const E = F.clone().applyQuaternion(q).add(S);
      const P = tipA.clone().applyQuaternion(q).add(S);
      const corr = new THREE.Quaternion().setFromUnitVectors(P.sub(E).normalize(), T.clone().sub(E).normalize());
      keepOut(dir.applyQuaternion(corr).normalize());
    }
    q.setFromUnitVectors(u, dir);
    const e = new THREE.Euler().setFromQuaternion(q, 'XYZ');
    return { x: e.x, y: e.y, z: e.z };
  }

  function aimFor(pId) {
    if (!pId || !leftArmRig || !rightArmRig) return null;
    try {
      const sel = '[data-id="' + CSS.escape(pId) + '"]';
      const card = document.querySelector('.wiki-project-link' + sel + ', .wiki-empty-wing-card' + sel);
      if (!card) return null;
      const label = card.querySelector('.project-name') || card;
      const r = label.getBoundingClientRect(), cv = renderer.domElement.getBoundingClientRect();
      if (!r.width || !r.height || !cv.width || !cv.height) return null;
      // การ์ดอยู่นอกกรอบ canvas ได้ (ndc เกิน ±1) รังสียังตัดระนาบได้ปกติ
      const ndcX = ((r.left + r.right) / 2 - cv.left) / cv.width * 2 - 1;
      const ndcY = 1 - ((r.top + r.bottom) / 2 - cv.top) / cv.height * 2;
      camera.updateMatrixWorld();
      const ray = new THREE.Vector3(ndcX, ndcY, 0.5).unproject(camera).sub(camera.position).normalize();
      if (Math.abs(ray.z) < 1e-6) return null;
      const Pw = camera.position.clone().add(ray.multiplyScalar((AIM_PLANE_Z - camera.position.z) / ray.z));

      // วางท่าลำตัวตอนชี้ชั่วคราว แปลงเป้าเข้าพิกัดลำตัว/ตัวละคร แล้วคืนค่าเดิม (ยังไม่ render ระหว่างนี้)
      const saved = [charGroup.rotation.y, charGroup.position.x, torsoGroup.rotation.z];
      charGroup.rotation.y = dragRotY; charGroup.position.x = 0; torsoGroup.rotation.z = 0;
      charGroup.updateMatrixWorld(true);
      const sign = charGroup.worldToLocal(Pw.clone()).x >= 0 ? 1 : -1;   // ใช้แขนข้างที่ใกล้การ์ด
      const bodyRotY = sign * AIM_BODY_TURN, bodyShiftX = sign * 0.03, bodyLeanZ = -sign * 0.03;
      charGroup.rotation.y = dragRotY + bodyRotY; charGroup.position.x = bodyShiftX; torsoGroup.rotation.z = bodyLeanZ;
      charGroup.updateMatrixWorld(true);
      const Tt = torsoGroup.worldToLocal(Pw.clone());
      const Tc = charGroup.worldToLocal(Pw.clone());
      charGroup.rotation.y = saved[0]; charGroup.position.x = saved[1]; torsoGroup.rotation.z = saved[2];
      charGroup.updateMatrixWorld(true);

      const arm = solveArm(sign, Tt);
      const G = Tc.sub(new THREE.Vector3(0, HEAD_PIVOT_Y + EYE_Y0, EYE_Z0));
      const yawW = Math.atan2(G.x, AIM_GAZE_DEPTH), pitchW = Math.atan2(G.y, AIM_GAZE_DEPTH);
      const headY = clampN(yawW, -AIM_HEAD_YAW_MAX, AIM_HEAD_YAW_MAX);
      const headX = clampN(-pitchW * 0.9, -AIM_HEAD_PITCH_UP, AIM_HEAD_PITCH_DOWN);
      if (![arm.x, arm.y, arm.z, headY, headX].every(Number.isFinite)) return null;
      return {
        id: pId, sign: sign, bodyRotY: bodyRotY, bodyShiftX: bodyShiftX, bodyLeanZ: bodyLeanZ,
        arm: arm, foreX: AIM_FORE_BEND,
        headY: headY, headX: headX, headZ: -sign * 0.05,
        // ลูกตาเลื่อนไปทางเป้า (ส่วนที่หัวหันไม่ถึงก็ให้ตาช่วย)
        eyeDX: clampN(sign * 0.010 + (yawW - headY) * 0.02, -0.016, 0.016),
        eyeDY: clampN(pitchW * 0.02, -0.008, 0.008)
      };
    } catch (err) {
      return null;
    }
  }

  function minJerk(t) {
    const c = Math.min(1.0, Math.max(0.0, t));
    return c * c * c * (10.0 + c * (-15.0 + 6.0 * c));
  }

  let reachAnim = {
    active: false,
    t: 0,
    duration: 0.86,
    firedImpact: false,
    target: null,
    id: null
  };

  // โบกมือทักทายด้วยแขนซ้ายของจอ (กล่องคำพูดอยู่ฝั่งขวา มือจะได้ไม่ลอดหลังกล่อง)
  let waveAnim = { active: false, t: 0, duration: 2.7 };

  // ท่าชี้การ์ดค้างไว้ ~2 วิหลังจิ้ม — ช่วงค้างนี้ท่าอื่น (จิ้มตัวการ์ตูน, login ผิด ฯลฯ) แทรกได้ทันที
  // ช่วงก่อนจิ้มยังกันไว้เหมือนเดิม (ตัดกลางคัน = pika-hand-tapped-card ไม่ยิง การ์ดไม่เปิด)
  function releaseReach() {
    if (!reachAnim.active) return true;
    if (reachAnim.aim && reachAnim.firedImpact) { reachAnim.active = false; return true; }
    return false;
  }

  function startWave() {
    if (waveAnim.active || isDragging || actAnim.name || !releaseReach()) return;
    waveAnim.active = true;
    waveAnim.t = 0;
  }

  // ขยับปากเหมือนกำลังพูดตอนเข้าหน้า พร้อมกล่องคำพูด
  let talkAnim = { active: false, t: 0, duration: 2.4 };

  let activeCompanionTarget = projectAngles['MFEC-TOWER-01'];
  let nodTimer = 0;

  let curCharRotY = 0;
  let curCharShiftX = 0;
  let curTorsoLeanZ = 0;
  let curHeadRotY = 0;
  let curHeadRotX = 0;
  let curHeadRotZ = 0;

  let curLeftArmX = 0, curLeftArmY = 0, curLeftArmZ = 0;
  let curLeftForeX = 0, curLeftForeY = 0, curLeftForeZ = 0, curLeftForeTwist = 0;
  let curRightArmX = 0, curRightArmY = 0, curRightArmZ = 0;
  let curRightForeX = 0, curRightForeY = 0, curRightForeZ = 0, curRightForeTwist = 0;

  // ── ท่าทาง (action) + สีหน้า (expression) ─────────────────────────────────
  // เรียกจากหน้าอื่นได้: window.PikaMascot.play('cheer') หรือ
  // window.dispatchEvent(new CustomEvent('pika-mascot', { detail: { action: 'no' } }))
  // ท่า: cheer ยกสองมือดีใจ, think เท้าคางคิด, point ชี้ (side: 1 ขวาจอ / -1 ซ้ายจอ),
  //      no ส่ายหัว, surprise สะดุ้ง, wave โบกมือ
  // สีหน้า: happy (ตา ^^ ยิ้มกว้าง แก้มแดง), surprised (ตาโต ปาก โอ คิ้วยก),
  //         think (คิ้วเลิกข้างเดียว), no (คิ้วขมวด ปากคว่ำ), shy (แก้มแดง), neutral
  const EXPRESSIONS = {
    neutral:   { mouth: 'smile' },
    happy:     { mouth: 'grin', happyEyes: 1, blush: 1, browUp: [0.014, 0.014] },
    surprised: { mouth: 'o', bigEyes: 1, browUp: [0.030, 0.030] },
    think:     { mouth: 'hmm', browUp: [0.026, -0.004], browTilt: [-0.20, 0.16] },
    no:        { mouth: 'frown', browUp: [-0.010, -0.010], browTilt: [0.30, 0.30] },
    shy:       { mouth: 'smile', blush: 1, browUp: [0.008, 0.008], browTilt: [-0.12, -0.12] },
    // ตอนชี้การ์ด: ตาเปิด (ต้องเห็นว่ามองไปทางไหน) คิ้วยกสนใจ ยิ้มกว้าง
    look:      { mouth: 'grin', browUp: [0.018, 0.018] }
  };
  const ACTIONS = {
    cheer:    { duration: 2.4, expr: 'happy' },
    think:    { duration: 3.0, expr: 'think' },
    point:    { duration: 2.6, expr: 'happy' },
    no:       { duration: 1.6, expr: 'no' },
    surprise: { duration: 1.4, expr: 'surprised' }
  };
  let actAnim = { name: null, t: 0, duration: 0, hold: false, side: 1 };
  let exprState = { name: 'neutral', until: 0 };
  // ค่าปัจจุบันของสีหน้า (ค่อย ๆ เลื่อนเข้าหาเป้าทุกเฟรม)
  let eHappy = 0, eBig = 0, eBlush = 0;
  let eBrowUpL = 0, eBrowUpR = 0, eBrowTiltL = 0, eBrowTiltR = 0;
  let mouthPop = 1, lastMouthKind = 'smile';
  let hopY = 0, extraHeadY = 0;
  let curEyeDX = 0, curEyeDY = 0;   // ลูกตาเลื่อนจากที่เดิม (ชี้/มองการ์ด)
  let hoveredAim = null;

  function express(name, sec) {
    if (!EXPRESSIONS[name]) return;
    exprState.name = name;
    exprState.until = (sec === Infinity || sec === 0) ? Infinity : time + (sec || 2.4);
  }

  function play(name, opts) {
    opts = opts || {};
    // ผู้ใช้ขอลดการเคลื่อนไหว → เปลี่ยนแค่สีหน้า ไม่ขยับตัว (ท่าที่ค้างอยู่ก็หยุด)
    const still = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (still) { actAnim.name = null; waveAnim.active = false; }
    if (name === 'wave') {
      if (still) express('happy', 1.6); else { actAnim.name = null; startWave(); }
      return;
    }
    if (name === 'idle' || name === 'stop') { actAnim.name = null; express('neutral', Infinity); return; }
    const a = ACTIONS[name];
    if (!a || !releaseReach()) return;
    if (still) {
      express(opts.expression || a.expr, opts.duration || a.duration);
      return;
    }
    waveAnim.active = false;
    actAnim = {
      name: name, t: 0,
      duration: opts.duration || a.duration,
      hold: !!opts.hold,
      side: opts.side === -1 ? -1 : 1
    };
    express(opts.expression || a.expr, opts.hold ? Infinity : actAnim.duration + 0.4);
  }

  window.PikaMascot = {
    play: play, express: express,
    actions: Object.keys(ACTIONS), expressions: Object.keys(EXPRESSIONS),
    // ไว้ดู/เทสต์ว่าตอนนี้ทำท่าอะไร สีหน้าอะไร
    state: function() { return { action: actAnim.name, expression: exprState.name, wave: waveAnim.active }; }
  };
  window.addEventListener('pika-mascot', (e) => {
    const d = (e && e.detail) || {};
    if (d.action) play(d.action, d);
    else if (d.expression) express(d.expression, d.duration);
  });

  // Support both 6 floating links and empty state action cards dynamically
  document.addEventListener('mouseover', (e) => {
    const link = e.target.closest('.wiki-project-link, .wiki-empty-wing-card');
    if (!link) return;
    const pId = link.getAttribute('data-id');
    if (pId === hoveredProjectId) return;   // เลื่อนเมาส์ไปมาในการ์ดใบเดิม ไม่ต้องวัดใหม่
    const aim = aimFor(pId);
    const tgt = aim || poseFor(pId);
    // จำไว้แม้กำลังชี้การ์ดใบอื่นอยู่ ชี้เสร็จจะได้หันมาหาใบที่เมาส์อยู่จริง (ท่าชี้มาก่อน hover อยู่แล้ว)
    if (tgt) {
      hoveredProjectId = pId;
      hoveredAim = aim;
      targetLookY = tgt.headY * 0.85;
      targetLookX = tgt.headX * 0.85;
    }
  });

  document.addEventListener('mouseout', (e) => {
    const link = e.target.closest('.wiki-project-link, .wiki-empty-wing-card');
    if (link && hoveredProjectId === link.getAttribute('data-id')) {
      const rel = e.relatedTarget;
      if (!rel || !link.contains(rel)) {
        hoveredProjectId = null;
        hoveredAim = null;
      }
    }
  });

  window.addEventListener('pika-project-reach-click', (e) => {
    const pId = e.detail && e.detail.id;
    const aim = aimFor(pId);
    const tgt = poseFor(pId) || projectAngles['MFEC-TOWER-01'];
    activeCompanionTarget = tgt;
    waveAnim.active = false;
    actAnim.name = null;
    reachAnim.active = true;
    reachAnim.t = 0;
    reachAnim.aim = aim;   // null = วัดตำแหน่งการ์ดไม่ได้ → ท่าเอื้อมแบบเดิม
    reachAnim.duration = aim ? AIM_DURATION : 0.84;
    reachAnim.firedImpact = false;
    reachAnim.target = tgt;
    reachAnim.id = pId;
    if (aim) express('look', AIM_DURATION - 0.3);
  });

  window.addEventListener('pika-modal-closed', () => {
    nodTimer = 0.55;
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      dragRotY += dx * 0.007;
      dragRotX = Math.max(-0.35, Math.min(0.35, dragRotX + dy * 0.007));
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    } else if (hoveredProjectId === null) {   // ระหว่างชี้การ์ดก็จดไว้ (ท่าชี้ไม่ได้ใช้) ชี้เสร็จจะได้มองถูกที่
      // มองตามเมาส์โดยเทียบกับตัวการ์ตูนเอง (เดิมเทียบกลางจอ) — ตอนไปยืนข้างการ์ด login จะหันหาการ์ดถูกทาง
      const ur = universe.getBoundingClientRect();
      const ux = ur.width ? ur.left + ur.width / 2 : window.innerWidth / 2;
      const nx = Math.max(-1, Math.min(1, (e.clientX - ux) / (window.innerWidth / 2)));
      const ny = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      targetLookY = nx * 0.34;
      targetLookX = ny * 0.18;
    }
  });

  // กดที่ตัวการ์ตูนเฉย ๆ (ไม่ได้ลากหมุน) = จิ้ม → ตอบสนองวนไปทีละท่า
  const POKE_REACTIONS = ['surprise', 'cheer', 'think'];
  let pokeIdx = 0;
  let pressX = 0, pressY = 0, pressAt = 0, pressing = false;
  function pressStart(x, y) { pressing = true; pressX = x; pressY = y; pressAt = Date.now(); }
  function pressEnd(x, y) {
    if (!pressing) return;
    pressing = false;
    if (Math.hypot(x - pressX, y - pressY) < 6 && Date.now() - pressAt < 450) {
      play(POKE_REACTIONS[pokeIdx++ % POKE_REACTIONS.length]);
    }
  }

  const dragZone = document.getElementById('mascotDragZone') || universe;
  dragZone.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    pressStart(e.clientX, e.clientY);
  });
  dragZone.addEventListener('mouseenter', startWave);
  window.addEventListener('mouseup', (e) => { isDragging = false; pressEnd(e.clientX, e.clientY); });

  dragZone.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
      pressStart(lastMouseX, lastMouseY);
    }
  }, { passive: true });
  window.addEventListener('touchend', (e) => {
    isDragging = false;
    const t = e.changedTouches && e.changedTouches[0];
    if (t) pressEnd(t.clientX, t.clientY); else pressing = false;
  });
  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) {
      const dx = e.touches[0].clientX - lastMouseX;
      const dy = e.touches[0].clientY - lastMouseY;
      dragRotY += dx * 0.007;
      dragRotX = Math.max(-0.35, Math.min(0.35, dragRotX + dy * 0.007));
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  // 7. 60FPS Kinematic Loop with Natural Biomechanical Hand Reach & Tap
  let time = 0;
  let blinkTimer = 0;
  let eyeScaleY = 1.0;

  function animate() {
    requestAnimationFrame(animate);
    const dt = 0.016;
    time += dt;

    // Eye Blinking
    blinkTimer += dt;
    if (blinkTimer > 4.2) {
      eyeScaleY = 0.08;
      if (blinkTimer > 4.34) {
        eyeScaleY = 1.0;
        blinkTimer = 0;
      }
    } else {
      eyeScaleY = 1.0;
    }
    // สีหน้า: หมดเวลาแล้วกลับหน้าปกติ, ทุกค่าค่อย ๆ เลื่อนเข้าหาเป้า (ไม่กระตุก)
    if (exprState.name !== 'neutral' && time > exprState.until) exprState.name = 'neutral';
    const ex = EXPRESSIONS[exprState.name];
    const eK = 0.18;
    const exBrowUp = ex.browUp || [0, 0], exBrowTilt = ex.browTilt || [0, 0];
    eHappy += ((ex.happyEyes || 0) - eHappy) * eK;
    eBig   += ((ex.bigEyes || 0) - eBig) * eK;
    eBlush += ((ex.blush || 0) - eBlush) * 0.10;
    eBrowUpL   += (exBrowUp[0] - eBrowUpL) * eK;
    eBrowUpR   += (exBrowUp[1] - eBrowUpR) * eK;
    eBrowTiltL += (exBrowTilt[0] - eBrowTiltL) * eK;
    eBrowTiltR += (exBrowTilt[1] - eBrowTiltR) * eK;

    // ตา: ตาโต = ขยายลูกตา, ตายิ้ม = ลูกตาหุบลงแล้วเส้นโค้ง ^^ ขึ้นมาแทน
    const eyeBigS = 1.0 + 0.28 * eBig;
    const eyeSY = eyeScaleY * (1.0 - 0.92 * eHappy);
    [leftEyeGroup, rightEyeGroup].forEach(function(g) {
      if (!g) return;
      g.scale.set(eyeBigS, eyeBigS * eyeSY, 1.0);
      g.visible = eHappy < 0.9;
    });
    happyEyeArcs.forEach(function(a) {
      a.visible = eHappy > 0.05;
      a.scale.set(1.0, Math.max(0.05, eHappy), 1.0);
    });
    browRigs.forEach(function(b) {
      const left = b.sign < 0;
      b.g.position.y = b.y0 + (left ? eBrowUpL : eBrowUpR);
      // ค่าบวก = ขมวด (หัวคิ้วด้านในกดลง), ค่าลบ = คิ้วตก (กังวล/คิด)
      b.g.rotation.z = b.sign * (left ? eBrowTiltL : eBrowTiltR);
    });
    setBlush(eBlush);

    // ปากขยับตามพยางค์ แล้วกลับเป็นยิ้มเมื่อพูดจบ
    let mouthOpen = 0;
    if (talkAnim.active) {
      talkAnim.t += dt;
      const fade = Math.min(1.0, talkAnim.t / 0.15, (talkAnim.duration - talkAnim.t) / 0.25);
      mouthOpen = Math.max(0, fade) * Math.abs(Math.sin(talkAnim.t * 9.0)) * (0.6 + 0.4 * Math.sin(talkAnim.t * 3.1));
      if (talkAnim.t >= talkAnim.duration) talkAnim.active = false;
    }
    const mouthKind = ex.mouth;
    if (mouthKind !== lastMouthKind) { mouthPop = 0; lastMouthKind = mouthKind; }
    mouthPop = Math.min(1.0, mouthPop + dt / 0.16);
    const pop = 0.55 + 0.45 * minJerk(mouthPop);
    talkMouthMesh.visible = false;
    smileMouthMesh.visible = false;
    grinMouthMesh.visible = false;
    frownMouthMesh.visible = false;
    smileMouthMesh.scale.set(1.0, 1.0, 1.0);
    smileMouthMesh.position.x = 0;
    if (mouthKind === 'grin') {
      grinMouthMesh.visible = true;
      grinMouthMesh.scale.set(pop, pop * (0.85 + 0.30 * mouthOpen), 1.0);
    } else if (mouthKind === 'o') {
      talkMouthMesh.visible = true;
      talkMouthMesh.scale.set(0.62 * pop, 0.95 * pop, 1.0);
    } else if (mouthKind === 'frown') {
      frownMouthMesh.visible = true;
    } else if (mouthKind === 'hmm') {
      // ยิ้มมุมปากข้างเดียว: ย่อเส้นยิ้มแล้วเลื่อนไปทางขวา (จุดยึดของเส้นอยู่กลางหน้า ย่อได้แค่แกน x)
      smileMouthMesh.visible = true;
      smileMouthMesh.scale.x = 0.55;
      smileMouthMesh.position.x = 0.018;
    } else {
      talkMouthMesh.visible = mouthOpen > 0.12;
      smileMouthMesh.visible = !talkMouthMesh.visible;
      talkMouthMesh.scale.set(0.8 + 0.2 * mouthOpen, Math.max(0.15, mouthOpen), 1.0);
    }

    // Keep 3D fingertip free of artificial colored rings
    tapRingMat.opacity = 0;
    tapCoreMat.opacity = 0;

    // Target joint angles for this frame
    let tgtBodyRotY = 0, tgtBodyShiftX = 0, tgtTorsoLeanZ = 0;
    let tgtHeadY = 0, tgtHeadX = 0, tgtHeadZ = 0;
    let tgtLArmX = 0, tgtLArmY = 0, tgtLArmZ = 0;
    let tgtLForeX = 0, tgtLForeY = 0, tgtLForeZ = 0, tgtLForeTwist = 0;
    let tgtRArmX = 0, tgtRArmY = 0, tgtRArmZ = 0;
    let tgtRForeX = 0, tgtRForeY = 0, tgtRForeZ = 0, tgtRForeTwist = 0;
    let tgtEyeDX = 0, tgtEyeDY = 0;
    hopY = 0;
    extraHeadY = 0;

    if (reachAnim.active && reachAnim.aim) {
      // ชี้การ์ดตามตำแหน่งจริง: หัว+ตานำ (0.26 วิ) → แขนยกชี้ (0.4 วิ) → จิ้มเบา ๆ ตอน 0.42 วิ (การ์ดเปิด)
      // → ค้างชี้ให้เห็นว่าเลือกใบไหน → ลดแขน (1.95 วิ) แล้วหัวคลายตาม
      reachAnim.t += dt;
      const at = reachAnim.t, A = reachAnim.aim, s = A.sign;
      const headW = at < 2.15 ? minJerk(at / 0.26) : 1.0 - minJerk((at - 2.15) / 0.35);
      const armW = at < 1.95 ? minJerk((at - 0.04) / 0.36) : 1.0 - minJerk((at - 1.95) / 0.50);
      const jab = (at > 0.34 && at < 0.54) ? Math.sin((at - 0.34) / 0.20 * Math.PI) : 0;
      const bob = Math.sin((at - 0.55) * 4.2) * minJerk((at - 0.55) / 0.3) * armW;   // ค้างแบบมีชีวิต ไม่แข็งทื่อ

      if (at >= 0.42 && !reachAnim.firedImpact) {
        reachAnim.firedImpact = true;
        window.dispatchEvent(new CustomEvent('pika-hand-tapped-card', { detail: { id: reachAnim.id } }));
      }

      tgtBodyRotY   = A.bodyRotY * armW;
      tgtBodyShiftX = A.bodyShiftX * armW + s * 0.016 * jab;
      tgtTorsoLeanZ = A.bodyLeanZ * armW - s * 0.012 * jab;
      tgtHeadY = A.headY * headW;
      tgtHeadX = A.headX * headW + 0.035 * jab + 0.010 * bob;
      tgtHeadZ = A.headZ * headW;
      tgtEyeDX = A.eyeDX * headW;
      tgtEyeDY = A.eyeDY * headW;

      const aX = A.arm.x * armW, aY = A.arm.y * armW, aZ = A.arm.z * armW;
      const fX = A.foreX * armW + 0.14 * jab + 0.02 * bob;   // จิ้ม = เหยียดศอกออกไปหาการ์ดชั่วครู่
      if (s < 0) {
        tgtLArmX = aX; tgtLArmY = aY; tgtLArmZ = aZ; tgtLForeX = fX;
        tgtRArmZ = 0.06 * armW; tgtRArmX = 0.05 * armW;
      } else {
        tgtRArmX = aX; tgtRArmY = aY; tgtRArmZ = aZ; tgtRForeX = fX;
        tgtLArmZ = -0.06 * armW; tgtLArmX = 0.05 * armW;
      }

      if (at >= reachAnim.duration) reachAnim.active = false;
    } else if (reachAnim.active && reachAnim.target) {
      reachAnim.t += dt;
      const u = Math.min(1.0, reachAnim.t / reachAnim.duration);
      const tgt = reachAnim.target;

      // 1. Eye & Head Lead (arrives early, stays locked during tap, gently relaxes)
      const headLead = u < 0.72 ? minJerk(u / 0.26) : (1.0 - 0.55 * minJerk((u - 0.72) / 0.28));
      // 2. Shoulder & Arm Reach Envelope
      let reachW = 0;
      if (u < 0.46) {
        reachW = minJerk(Math.max(0, (u - 0.03) / 0.43));
      } else if (u < 0.58) {
        reachW = 1.0;
      } else {
        reachW = 1.0 - 0.86 * minJerk((u - 0.58) / 0.42);
      }

      // 3. Subtle Elbow Lift Arc (kept within cuff tolerance so forearm never separates)
      const liftArc = (u < 0.46)
        ? Math.sin((u / 0.46) * Math.PI)
        : (u > 0.58 ? Math.sin(((u - 0.58) / 0.42) * Math.PI) * 0.50 : 0.0);

      // 4. Crisp Finger-Tap / Click Impulse at the Apex (u in 0.44..0.62)
      let tapPulse = 0;
      if (u >= 0.44 && u <= 0.62) {
        tapPulse = Math.sin(((u - 0.44) / 0.18) * Math.PI);
      }

      // Fire exact impact event when finger presses the project link (u >= 0.50)
      if (u >= 0.50 && !reachAnim.firedImpact) {
        reachAnim.firedImpact = true;
        window.dispatchEvent(new CustomEvent('pika-hand-tapped-card', { detail: { id: reachAnim.id } }));
      }

      tgtBodyRotY   = tgt.bodyRotY * reachW;
      tgtBodyShiftX = tgt.bodyShiftX * reachW + tgt.sign * 0.018 * tapPulse;
      tgtTorsoLeanZ = tgt.bodyLeanZ * reachW - tgt.sign * 0.015 * tapPulse;

      tgtHeadY = tgt.headY * headLead;
      tgtHeadX = tgt.headX * headLead + 0.06 * tapPulse;
      tgtHeadZ = tgt.headZ * headLead;

      const activeArmZ  = tgt.armZ * reachW + tgt.sign * 0.06 * tapPulse;
      const activeArmX  = tgt.armX * reachW - 0.08 * liftArc + 0.08 * tapPulse;
      const activeArmY  = tgt.armY * reachW - tgt.sign * 0.08 * tapPulse;
      const activeForeZ = tgt.foreZ * reachW - tgt.sign * 0.05 * liftArc + tgt.sign * 0.06 * tapPulse;
      const activeForeX = tgt.foreX * reachW - 0.10 * liftArc + 0.10 * tapPulse;
      const activeForeY = tgt.foreY * reachW + tgt.sign * 0.08 * tapPulse;

      if (tgt.side === 'left') {
        tgtLArmZ = activeArmZ; tgtLArmX = activeArmX; tgtLArmY = activeArmY;
        tgtLForeZ = activeForeZ; tgtLForeX = activeForeX; tgtLForeY = activeForeY;
        tgtRArmZ = 0.06 * reachW; tgtRArmX = 0.05 * reachW;
      } else {
        tgtRArmZ = activeArmZ; tgtRArmX = activeArmX; tgtRArmY = activeArmY;
        tgtRForeZ = activeForeZ; tgtRForeX = activeForeX; tgtRForeY = activeForeY;
        tgtLArmZ = -0.06 * reachW; tgtLArmX = 0.05 * reachW;
      }

      if (u >= 1.0) {
        reachAnim.active = false;
      }
    } else if (actAnim.name) {
      actAnim.t += dt;
      const at = actAnim.t, D = actAnim.duration;
      // ขึ้นท่า 0.35 วิ, ค้างท่า, คลายท่า 0.45 วิสุดท้าย (hold = ค้างไว้จนกว่าจะสั่งท่าอื่น)
      let w = minJerk(at / 0.35);
      if (!actAnim.hold) w *= 1.0 - minJerk((at - (D - 0.45)) / 0.45);

      if (actAnim.name === 'cheer') {
        // ยกสองมือชูเป็นตัว V แล้วกระโดดดึ๋ง ๆ 4 ที
        const wig = Math.sin(at * 9.0) * 0.10 * w;
        tgtLArmZ = -2.05 * w + wig;  tgtLArmX = -0.10 * w;  tgtLForeZ = -0.50 * w;
        tgtRArmZ =  2.05 * w + wig;  tgtRArmX = -0.10 * w;  tgtRForeZ =  0.50 * w;
        tgtHeadX = -0.10 * w;
        tgtHeadZ = Math.sin(at * 4.5) * 0.07 * w;
        tgtTorsoLeanZ = Math.sin(at * 4.5) * 0.025 * w;
        if (at < 4 * Math.PI / 7.5) hopY = 0.05 * Math.abs(Math.sin(at * 7.5)) * w;
      } else if (actAnim.name === 'think') {
        // มือขวาเท้าคาง (มุมจาก IK: ฝ่ามือแตะใต้คาง) เอียงคอมองขึ้น นิ้วเคาะคางเบา ๆ
        const tap = Math.sin(at * 7.0) * 0.05 * w;
        tgtRArmX = -1.026 * w;  tgtRArmY = 0.477 * w;  tgtRArmZ = -0.624 * w;
        tgtRForeX = -0.695 * w + tap;  tgtRForeY = 0.397 * w;  tgtRForeZ = -1.326 * w;
        tgtLArmX = -0.10 * w;  tgtLArmZ = -0.06 * w;  tgtLForeX = -0.35 * w;
        // ลำตัวหันขวานิดหน่อย ไม่ให้เห็นปลายแขนเสื้อเป็นวงกลมตรง ๆ แล้วหันหน้ากลับมาหาผู้ชม
        tgtHeadX = -0.10 * w;
        tgtHeadY = -0.26 * w + Math.sin(at * 1.6) * 0.04 * w;
        tgtHeadZ = -0.08 * w;
        tgtBodyRotY = 0.62 * w;
      } else if (actAnim.name === 'point') {
        // ชี้ไปด้านข้าง (side 1 = ขวาจอ ใช้แขนขวา, -1 = ซ้ายจอ ใช้แขนซ้าย) หันหน้าตามนิ้ว
        const s = actAnim.side;
        const jab = Math.sin(Math.min(1.0, Math.max(0.0, (at - 0.30) / 0.50)) * Math.PI) * 0.10;
        const aX = -0.621 * w, aY = -0.274 * s * w, aZ = (0.338 + jab) * s * w;
        const fX = 0.058 * w, fY = -0.088 * s * w, fZ = 1.528 * s * w;
        if (s > 0) {
          tgtRArmX = aX; tgtRArmY = aY; tgtRArmZ = aZ; tgtRForeX = fX; tgtRForeY = fY; tgtRForeZ = fZ;
          tgtLArmZ = -0.06 * w;
        } else {
          tgtLArmX = aX; tgtLArmY = aY; tgtLArmZ = aZ; tgtLForeX = fX; tgtLForeY = fY; tgtLForeZ = fZ;
          tgtRArmZ = 0.06 * w;
        }
        tgtHeadY = 0.40 * s * w;
        tgtHeadX = 0.02 * w;
        tgtHeadZ = -0.05 * s * w;
        tgtBodyRotY = 0.10 * s * w;
        tgtTorsoLeanZ = -0.02 * s * w;
      } else if (actAnim.name === 'no') {
        // ส่ายหัว (บวกทับหลัง lerp ให้คม) ก้มนิด ๆ ยักไหล่หงายมือ
        extraHeadY = Math.sin(at * 13.0) * 0.30 * w * (1.0 - 0.45 * Math.min(1.0, at / D));
        tgtHeadX = 0.06 * w;
        tgtLArmZ = -0.20 * w;  tgtLForeZ = -0.35 * w;  tgtLArmX = -0.12 * w;
        tgtRArmZ =  0.20 * w;  tgtRForeZ =  0.35 * w;  tgtRArmX = -0.12 * w;
      } else if (actAnim.name === 'surprise') {
        // สะดุ้งเด้งขึ้นหนึ่งที กางแขน เงยหน้า
        if (at < 0.36) hopY = 0.06 * Math.sin((at / 0.36) * Math.PI);
        tgtLArmZ = -0.38 * w;  tgtLForeZ = -0.40 * w;
        tgtRArmZ =  0.38 * w;  tgtRForeZ =  0.40 * w;
        tgtHeadX = -0.08 * w;
      }

      if (!actAnim.hold && at >= D) actAnim.name = null;
    } else if (waveAnim.active) {
      waveAnim.t += dt;
      const u = Math.min(1.0, waveAnim.t / waveAnim.duration);
      // ยกแขนขึ้น → โบก → ลดแขนลง
      const raiseW = u < 0.18 ? minJerk(u / 0.18) : (u > 0.82 ? 1.0 - minJerk((u - 0.82) / 0.18) : 1.0);
      const wag = Math.sin(waveAnim.t * 11.0) * raiseW;

      tgtBodyRotY = 0.08 * raiseW;
      tgtTorsoLeanZ = -0.03 * raiseW;
      tgtHeadY = -0.08 * raiseW;
      tgtHeadX = -0.04 * raiseW;
      tgtHeadZ = 0.10 * raiseW;

      tgtLArmZ = -1.75 * raiseW - 0.05 * wag;
      tgtLArmX = -0.12 * raiseW;
      tgtLForeZ = -0.95 * raiseW + 0.32 * wag;
      tgtLForeTwist = -2.9 * raiseW;
      tgtRArmZ = 0.05 * raiseW;

      if (u >= 1.0) {
        waveAnim.active = false;
      }
    } else {
      const hAim = (hoveredProjectId && hoveredAim && hoveredAim.id === hoveredProjectId) ? hoveredAim : null;
      let hoverTgt = (hoveredProjectId && !hAim) ? poseFor(hoveredProjectId) : null;
      if (hAim) {
        // ชี้เมาส์ค้างบนการ์ด: หันหน้า+มองไปที่การ์ด ลำตัวเอียงตามนิด แขนขยับเตรียมชี้
        tgtBodyRotY = hAim.bodyRotY * 0.35;
        tgtBodyShiftX = hAim.bodyShiftX * 0.30;
        tgtTorsoLeanZ = hAim.bodyLeanZ * 0.30;
        tgtHeadY = hAim.headY * 0.85;
        tgtHeadX = hAim.headX * 0.85;
        tgtHeadZ = hAim.headZ * 0.65;
        tgtEyeDX = hAim.eyeDX;
        tgtEyeDY = hAim.eyeDY;
        const k = 0.18;
        if (hAim.sign < 0) {
          tgtLArmX = hAim.arm.x * k; tgtLArmY = hAim.arm.y * k; tgtLArmZ = hAim.arm.z * k; tgtLForeX = -0.08;
        } else {
          tgtRArmX = hAim.arm.x * k; tgtRArmY = hAim.arm.y * k; tgtRArmZ = hAim.arm.z * k; tgtRForeX = -0.08;
        }
      } else if (hoverTgt) {
        tgtBodyRotY = hoverTgt.bodyRotY * 0.35;
        tgtBodyShiftX = hoverTgt.bodyShiftX * 0.30;
        tgtTorsoLeanZ = hoverTgt.bodyLeanZ * 0.30;
        tgtHeadY = hoverTgt.headY * 0.78;
        tgtHeadX = hoverTgt.headX * 0.70;
        tgtHeadZ = hoverTgt.headZ * 0.65;
        if (hoverTgt.side === 'left') {
          tgtLArmZ = hoverTgt.armZ * 0.25;
          tgtLArmX = -0.08;
          tgtLForeX = -0.08;
        } else {
          tgtRArmZ = hoverTgt.armZ * 0.25;
          tgtRArmX = -0.08;
          tgtRForeX = -0.08;
        }
      } else {
        let nodPitch = 0;
        if (nodTimer > 0) {
          nodTimer -= dt;
          nodPitch = Math.sin(nodTimer * 10) * 0.09;
        }
        curLookY += (targetLookY - curLookY) * 0.08;
        curLookX += (targetLookX - curLookX) * 0.08;
        tgtHeadY = curLookY * 0.65;
        tgtHeadX = curLookX * 0.40 + nodPitch;
      }
    }

    const lerpRate = reachAnim.active ? 0.26 : (actAnim.name ? 0.22 : (waveAnim.active ? 0.20 : 0.11));
    curCharRotY   += (tgtBodyRotY - curCharRotY) * lerpRate;
    curCharShiftX += (tgtBodyShiftX - curCharShiftX) * lerpRate;
    curTorsoLeanZ += (tgtTorsoLeanZ - curTorsoLeanZ) * lerpRate;

    curHeadRotY += (tgtHeadY - curHeadRotY) * lerpRate;
    curHeadRotX += (tgtHeadX - curHeadRotX) * lerpRate;
    curHeadRotZ += (tgtHeadZ - curHeadRotZ) * lerpRate;

    curLeftArmX  += (tgtLArmX - curLeftArmX) * lerpRate;
    curLeftArmY  += (tgtLArmY - curLeftArmY) * lerpRate;
    curLeftArmZ  += (tgtLArmZ - curLeftArmZ) * lerpRate;
    curLeftForeX += (tgtLForeX - curLeftForeX) * lerpRate;
    curLeftForeY += (tgtLForeY - curLeftForeY) * lerpRate;
    curLeftForeZ += (tgtLForeZ - curLeftForeZ) * lerpRate;
    curLeftForeTwist += (tgtLForeTwist - curLeftForeTwist) * lerpRate;

    curRightArmX  += (tgtRArmX - curRightArmX) * lerpRate;
    curRightArmY  += (tgtRArmY - curRightArmY) * lerpRate;
    curRightArmZ  += (tgtRArmZ - curRightArmZ) * lerpRate;
    curRightForeX += (tgtRForeX - curRightForeX) * lerpRate;
    curRightForeY += (tgtRForeY - curRightForeY) * lerpRate;
    curRightForeZ += (tgtRForeZ - curRightForeZ) * lerpRate;
    curRightForeTwist += (tgtRForeTwist - curRightForeTwist) * lerpRate;

    charGroup.rotation.y = dragRotY + curCharRotY;
    charGroup.rotation.x = dragRotX;
    charGroup.position.x = curCharShiftX;
    torsoGroup.rotation.z = curTorsoLeanZ;

    headMasterGroup.rotation.y = curHeadRotY + extraHeadY;
    headMasterGroup.rotation.x = curHeadRotX;
    headMasterGroup.rotation.z = curHeadRotZ;

    // ลูกตาเลื่อนไปทางที่มอง (เลื่อนตามผิวหน้าโค้ง: ออกด้านนอก = จมเข้าหัวนิดหนึ่ง) ตายิ้ม ^^ เลื่อนตามด้วย
    curEyeDX += (tgtEyeDX - curEyeDX) * 0.2;
    curEyeDY += (tgtEyeDY - curEyeDY) * 0.2;
    [leftEyeGroup, rightEyeGroup].forEach(function(g, i) {
      if (!g) return;
      const sg = i === 0 ? -1 : 1;
      g.position.set(sg * EYE_X0 + curEyeDX, EYE_Y0 + curEyeDY, EYE_Z0 - sg * 0.32 * curEyeDX - 0.05 * curEyeDY);
      if (happyEyeArcs[i]) happyEyeArcs[i].position.copy(g.position);
    });

    if (leftArmRig) {
      leftArmRig.armHolder.rotation.set(curLeftArmX, curLeftArmY, curLeftArmZ);
      leftArmRig.forearmGroup.rotation.set(curLeftForeX, curLeftForeY, curLeftForeZ);
      // หมุนรอบแกนแขนท่อนล่าง (หลังตั้งมุมข้อศอกแล้ว) ให้ฝ่ามือหันออกหาผู้ชม
      leftArmRig.forearmGroup.rotateY(curLeftForeTwist);
    }
    if (rightArmRig) {
      rightArmRig.armHolder.rotation.set(curRightArmX, curRightArmY, curRightArmZ);
      rightArmRig.forearmGroup.rotation.set(curRightForeX, curRightForeY, curRightForeZ);
      rightArmRig.forearmGroup.rotateY(curRightForeTwist);
    }

    const breathe = Math.sin(time * 2.0);
    torsoGroup.scale.set(1.0 + breathe * 0.005, 1.0 + breathe * 0.007, 1.0 + breathe * 0.005);
    headMasterGroup.position.y = HEAD_PIVOT_Y + breathe * 0.005;
    charGroup.position.y = Math.sin(time * 1.2) * 0.006 + hopY;
    shadowMesh.position.x = curCharShiftX * 0.85;
    const shadowK = 1.0 - hopY * 3.0;
    shadowMesh.scale.set(shadowK, 0.42 * shadowK, 1.0);

    renderer.render(scene, camera);
  }

  animate();
  // ทักทายครั้งแรกตอนเข้าหน้า พร้อมกล่องคำพูดที่เด้งขึ้นมา
  // ถ้าหน้าก่อนหน้าฝากท่าไว้ (เช่น login สำเร็จแล้ว reload → 'cheer:<เวลา>') เล่นท่านั้นแทนการโบกมือ
  let greetAction = null;
  try {
    const nextRaw = sessionStorage.getItem('pika_mascot_next');
    if (nextRaw) {
      sessionStorage.removeItem('pika_mascot_next');
      const m = /^([a-z]+):(\d+)$/.exec(nextRaw);
      if (m && ACTIONS[m[1]] && Date.now() - Number(m[2]) < 20000) greetAction = m[1];
    }
  } catch (e) { /* sessionStorage ใช้ไม่ได้ → ทักทายแบบปกติ */ }
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (greetAction) {
    if (reduceMotion) express(ACTIONS[greetAction].expr, 4.0);
    else setTimeout(() => { talkAnim.active = true; play(greetAction); }, 700);
  } else if (!reduceMotion) {
    setTimeout(() => { talkAnim.active = true; startWave(); }, 700);
  }
})();
