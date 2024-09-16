// Planet.js
import React, { useRef, useEffect, Suspense } from "react";
import { Float, OrbitControls } from "@react-three/drei";
import { gsap } from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";

const Planet = () => {
  const planetRef = useRef();

  // Use GSAP to rotate the planet infinitely
  useEffect(() => {
    if (planetRef.current) {
      gsap.to(planetRef.current.rotation, {
        y: "+=6.28", // 2 * Math.PI for full rotation
        duration: 10, // Duration of rotation
        repeat: -1, // Infinite rotation
        ease: "none",
      });
    }
  }, []);

  // Use useFrame to add continuous rotation
  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.01; // Rotate the planet continuously
    }
  });

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  const soundEffects = [
    new Audio("/sounds/sound1.ogg"),
    new Audio("/sounds/sound2.ogg"),
    new Audio("/sounds/sound3.ogg"),
  ];

  const handleClick = () => {
    gsap.utils.random(soundEffects).play();
  };

  return (
    <Float speed={5} rotationIntensity={6} floatIntensity={5}>
      <mesh
        ref={planetRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#3498db"
          wireframe={true} // Enables wireframe mode
        />
      </mesh>
    </Float>
  );
};

const PlanetShape = () => {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square  md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas className="z-0" shadows gl={{ antialias: false }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <Planet />
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default PlanetShape;
