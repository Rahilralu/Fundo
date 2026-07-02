import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Custom Fresnel Glowing Shader
const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColorGlow;
  uniform float uFresnelPower;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), uFresnelPower);
    
    // Additive glowing purple color on the edges
    vec3 color = uColorGlow * fresnel * 1.5;
    
    gl_FragColor = vec4(color, fresnel * 0.85);
  }
`;

export default function ThreeHeroModel() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // ─── GENERATE DETAILED COIN TEXTURE ───
    const createCoinTexture = () => {
      const texCanvas = document.createElement('canvas');
      texCanvas.width = 512;
      texCanvas.height = 512;
      const ctx = texCanvas.getContext('2d');
      
      // Radial gradient for metallic depth
      const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 256);
      grad.addColorStop(0, '#2b1b54');
      grad.addColorStop(0.7, '#110924');
      grad.addColorStop(1, '#05020c');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);
      
      // Glowing border rim
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 10;
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 16;
      ctx.beginPath();
      ctx.arc(256, 256, 226, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = '#8155ff';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(256, 256, 202, 0, Math.PI * 2);
      ctx.stroke();

      // Ridges
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 4;
      for (let i = 0; i < 360; i += 7.5) {
        const angle = (i * Math.PI) / 180;
        const x1 = 256 + Math.cos(angle) * 202;
        const y1 = 256 + Math.sin(angle) * 202;
        const x2 = 256 + Math.cos(angle) * 226;
        const y2 = 256 + Math.sin(angle) * 226;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Circuit lines
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.15)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(256, 256, 140, 0, Math.PI * 2);
      ctx.stroke();

      // Central Rupee symbol
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 20;
      ctx.font = 'bold 230px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('₹', 256, 245);
      
      return new THREE.CanvasTexture(texCanvas);
    };

    const coinTexture = createCoinTexture();

    // ─── THREE.JS SETUP ───
    const scene = new THREE.Scene();

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.3);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);
    
    const purpleLight = new THREE.PointLight(0xc084fc, 15, 8);
    purpleLight.position.set(-4, 2, 2);
    scene.add(purpleLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 15, 8);
    cyanLight.position.set(4, -2, 2);
    scene.add(cyanLight);

    // ─── BUILD COIN BELT ───
    // Centered group (position 0,0,0) to prevent disalignment
    const mainGroup = new THREE.Group();
    mainGroup.position.set(0, 0, 0); 
    scene.add(mainGroup);

    const coinsGroup = new THREE.Group();
    mainGroup.add(coinsGroup);

    const coinGroups = [];
    const count = 6;
    const radius = 0.95;

    const sideMat = new THREE.MeshStandardMaterial({
      color: 0x20153b,
      metalness: 0.9,
      roughness: 0.2,
    });

    const faceMat = new THREE.MeshStandardMaterial({
      map: coinTexture,
      bumpMap: coinTexture,
      bumpScale: 0.005,
      metalness: 0.9,
      roughness: 0.15,
    });

    // Purple glow uniforms
    const uniforms = {
      uTime: { value: 0 },
      uColorGlow: { value: new THREE.Color('#c084fc') },
      uFresnelPower: { value: 1.2 },
    };

    const sideGeom = new THREE.CylinderGeometry(0.28, 0.28, 0.07, 32, 1, true);
    const faceGeom = new THREE.CircleGeometry(0.28, 32);
    const glowGeom = new THREE.CylinderGeometry(0.283, 0.283, 0.073, 32);

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const coinGroup = new THREE.Group();
      coinGroup.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);

      // Create a local rotated container group so children rotate together
      const meshGroup = new THREE.Group();
      meshGroup.rotation.x = Math.PI / 2;
      coinGroup.add(meshGroup);

      // 1. Base Cylinder Side (no local rotation needed since parent is rotated)
      const sideMesh = new THREE.Mesh(sideGeom, sideMat);
      meshGroup.add(sideMesh);

      // 2. Top Face
      const topMesh = new THREE.Mesh(faceGeom, faceMat);
      topMesh.position.y = 0.0351;
      topMesh.rotation.x = -Math.PI / 2;
      meshGroup.add(topMesh);

      // 3. Bottom Face
      const bottomMesh = new THREE.Mesh(faceGeom, faceMat);
      bottomMesh.position.y = -0.0351;
      bottomMesh.rotation.x = Math.PI / 2;
      meshGroup.add(bottomMesh);

      // 4. Glowing Purple Fresnel Overlay (no local rotation needed)
      const glowMat = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const glowMesh = new THREE.Mesh(glowGeom, glowMat);
      meshGroup.add(glowMesh);

      coinsGroup.add(coinGroup);
      coinGroups.push(coinGroup);
    }

    // ─── ANIMATION LOOP ───
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Slow 3D tilt of the orbit group
      mainGroup.rotation.y = 0.35 + Math.sin(t * 0.1) * 0.04;
      mainGroup.rotation.x = 0.20 + Math.cos(t * 0.1) * 0.02;

      // Rotate the vertical coin belt (orbit)
      coinsGroup.rotation.z = t * 0.15;

      // Spin individual coins locally
      coinGroups.forEach((coin, idx) => {
        coin.rotation.y = t * 0.7 + idx * (Math.PI / 3);
        coin.rotation.x = 0;
        coin.rotation.z = 0;
      });

      uniforms.uTime.value = t;

      renderer.render(scene, camera);
    };

    animate();

    // ─── RESIZE HANDLING ───
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Clean up resources
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      sideGeom.dispose();
      faceGeom.dispose();
      glowGeom.dispose();
      sideMat.dispose();
      faceMat.dispose();
      coinTexture.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative flex items-center justify-center bg-transparent">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[70%] h-[70%] rounded-full bg-[#00d2ff]/3 blur-[120px] mix-blend-screen" />
        <div className="absolute w-[60%] h-[60%] rounded-full bg-[#7c5cfc]/3 blur-[100px] mix-blend-screen" />
      </div>

      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
