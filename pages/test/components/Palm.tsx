/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
https://gltf.pmnd.rs/
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Palm: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};

const PalmModel: React.FC = (props: JSX.IntrinsicElements["group"]) => {
  const { nodes, materials } = useGLTF("/models/Palm.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <object3D position={[0, 0, 2]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Palm.geometry}
          material={materials.Material}
          rotation={[2.37, 1.5, -2.52]}
          scale={[1, 1, 0.5]}
        />
      </object3D>
      <object3D position={[0, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Palm.geometry}
          material={materials.Material}
          rotation={[2.37, 1.5, -2.52]}
          scale={[1, 1, 0.5]}
        />
      </object3D>
    </group>
  );
};

useGLTF.preload("/models/Palm.glb");
export default PalmModel;