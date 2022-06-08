import * as THREE from "three";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function CajaRemedio(props: JSX.IntrinsicElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => (ref.current.rotation.y += 0.01));
  console.log(props);
  return (
    <mesh {...props} ref={ref} scale={3}>
      <boxGeometry args={[0.5, 1, 2]} />
      <meshStandardMaterial />
    </mesh>
  );
}

const Scene = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <CajaRemedio position={[0, 0, 0]} />
    </Canvas>
  );
};

export default Scene;
