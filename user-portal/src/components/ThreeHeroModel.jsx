import React, { useRef, Suspense, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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

function Scene() {
  const groupRef = useRef();
  const coinsGroupRef = useRef();
  const coinRefs = useRef([]);

  // Define 6 coins in a vertical XY ring of smaller radius
  const coins = useMemo(() => {
    const count = 6;
    const radius = 0.95;
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      };
    });
  }, []);

  // Resize / initialize refs array for individual coins
  if (coinRefs.current.length !== coins.length) {
    coinRefs.current = Array(coins.length).fill(null);
  }

  const coinTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Create radial gradient for metallic/depth effect
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

    // Circuit ring
    ctx.strokeStyle = 'rgba(192, 132, 252, 0.15)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(256, 256, 140, 0, Math.PI * 2);
    ctx.stroke();

    // Central Rupee symbol
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#c084fc';
    ctx.shadowBlur = 20;
    ctx.font = 'bold 230px "Outfit", "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('₹', 256, 245);
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  // Purple glow uniforms
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorGlow: { value: new THREE.Color('#c084fc') }, // Neon purple
    uFresnelPower: { value: 1.2 } // Wider glow for visibility
  }), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Tilt the entire vertical scene slightly for 3D depth
    if (groupRef.current) {
      groupRef.current.rotation.y = 0.35 + Math.sin(t * 0.1) * 0.04;
      groupRef.current.rotation.x = 0.20 + Math.cos(t * 0.1) * 0.02;
    }

    // Rotate the vertical coin belt (majestic slow Ferris wheel orbit)
    if (coinsGroupRef.current) {
      coinsGroupRef.current.rotation.z = t * 0.15;
    }

    // Spin individual coins on their local Y-axis slowly (no X/Z tumbling)
    coinRefs.current.forEach((coin, idx) => {
      if (coin) {
        coin.rotation.y = t * 0.7 + idx * (Math.PI / 3);
        coin.rotation.x = 0;
        coin.rotation.z = 0;
      }
    });

    uniforms.uTime.value = t;
  });

  return (
    <group ref={groupRef} position={[-0.15, 0, 0]}>
      {/* Clean lights */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={2.5} />
      
      {/* Point lights to project glowing reflections */}
      <pointLight position={[-4, 2, 2]} color="#c084fc" intensity={15} decay={1.3} />
      <pointLight position={[4, -2, 2]} color="#06b6d4" intensity={15} decay={1.3} />

      {/* ─── VERTICAL RING OF DETAILED COINS ─── */}
      <group ref={coinsGroupRef}>
        {coins.map((coin, idx) => (
          <group
            key={idx}
            position={[coin.x, coin.y, 0]}
            ref={(el) => (coinRefs.current[idx] = el)}
          >
            {/* ─── Coin Mesh Group ─── */}
            <group rotation={[Math.PI / 2, 0, 0]}>
              {/* 1. Base Cylinder Side (no caps) */}
              <mesh castShadow receiveShadow>
                <cylinderGeometry args={[0.28, 0.28, 0.07, 32, 1, true]} />
                <meshStandardMaterial
                  color="#20153b"
                  metalness={0.9}
                  roughness={0.2}
                />
              </mesh>

              {/* 2. Top Circle Face */}
              <mesh position={[0, 0.0351, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
                <circleGeometry args={[0.28, 32]} />
                <meshStandardMaterial
                  map={coinTexture}
                  bumpMap={coinTexture}
                  bumpScale={0.005}
                  metalness={0.9}
                  roughness={0.15}
                />
              </mesh>

              {/* 3. Bottom Circle Face */}
              <mesh position={[0, -0.0351, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
                <circleGeometry args={[0.28, 32]} />
                <meshStandardMaterial
                  map={coinTexture}
                  bumpMap={coinTexture}
                  bumpScale={0.005}
                  metalness={0.9}
                  roughness={0.15}
                />
              </mesh>

              {/* 4. Glowing Purple Fresnel Overlay (for thickness & faces outline glow) */}
              <mesh>
                <cylinderGeometry args={[0.283, 0.283, 0.073, 32]} />
                <shaderMaterial
                  uniforms={uniforms}
                  vertexShader={vertexShader}
                  fragmentShader={fragmentShader}
                  transparent
                  depthWrite={false}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            </group>
          </group>
        ))}
      </group>
    </group>
  );
}

export default function ThreeHeroModel({ onLoad }) {
  const [loaded, setLoaded] = useState(false);

  const handleCreated = () => {
    setLoaded(true);
    if (onLoad) {
      setTimeout(() => {
        onLoad();
      }, 300);
    }
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center bg-[#050508]">
      {/* Soft ambient background glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[70%] h-[70%] rounded-full bg-[#00d2ff]/3 blur-[120px] mix-blend-screen" />
        <div className="absolute w-[60%] h-[60%] rounded-full bg-[#7c5cfc]/3 blur-[100px] mix-blend-screen" />
      </div>

      {/* Elegant loading spinner */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="w-8 h-8 rounded-full border-2 border-[#7c5cfc]/20 border-t-[#7c5cfc] animate-spin" />
        </div>
      )}

      {/* Smooth fade-in container for active canvas */}
      <div className={`w-full h-full z-10 transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Canvas
          camera={{ position: [0, 0, 4.3], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          className="w-full h-full"
          style={{ background: 'transparent' }}
          onCreated={handleCreated}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
