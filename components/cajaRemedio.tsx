import * as THREE from "three";
import React, { useRef, useState } from "react";
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  ReactThreeFiber,
} from "@react-three/fiber";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DDSLoader } from "three-stdlib";
import { GLTF as GLTFThree } from "three/examples/jsm/loaders/GLTFLoader";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

declare module "three-stdlib" {
  export interface GLTF extends GLTFThree {
    nodes: Record<string, THREE.Mesh>;
    materials: Record<string, THREE.Material>;
  }
}

extend({ OrbitControls });
declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >;
    }
  }
}

const CameraControls = () => {
  // from https://codeworkshop.dev/blog/2020-04-03-adding-orbit-controls-to-react-three-fiber/
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef<OrbitControls>(null);
  useFrame((state) => controls.current!.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={false}
    />
  );
};

const Model: React.FC<{
  props: {
    position: THREE.Vector3;
    rotation: THREE.Euler;
    scale: THREE.Vector3;
  };
  id: number;
}> = ({ props, id }) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => (ref.current.rotation.x += -0.01));
  const { nodes } = useGLTF("/glb/ignacioserranol.glb");
  const name = "REAL";
  const node = nodes[name].children[id] as THREE.Mesh;
  console.log("node", node);
  return (
    <mesh
      ref={ref}
      name={name}
      geometry={node.geometry}
      material={node.material}
      {...props}
      dispose={null}
    />
  );
};

const MainScene = () => {
  const faces = Array.from(Array(6).keys());
  return (
    <div className="h-80 w-full">
      <Canvas>
        <CameraControls />
        <PerspectiveCamera makeDefault position={[4.5, 1.5, 4.5]} zoom={1.5} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        <group rotation={new THREE.Euler(0, 0, THREE.MathUtils.degToRad(-90))}>
          {faces.map((faceId) => (
            <Model
              id={faceId}
              key={faceId}
              props={{
                position: new THREE.Vector3(0, 0, 0),
                rotation: new THREE.Euler(0, 0, 0),
                scale: new THREE.Vector3(1, .5, 2),
              }}
            />
          ))}
        </group>
      </Canvas>
    </div>
  );
};

export default MainScene;
