import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useInput } from "../../../shared-components/services/hooks/useInput";
import { directionOffset } from "../../../shared-components/services/player/player.service";

let walkDirection = new THREE.Vector3();
let rotateAngle = new THREE.Vector3(0, 1, 0);
let rotateQuartenion = new THREE.Quaternion();
let cameraTarget = new THREE.Vector3();

const MyPlayer = () => {
  const { forward, backward, left, right, jump, shift } = useInput();
  const model = useGLTF("/models/noah.glb");

  const { actions } = useAnimations(model.animations, model.scene);
  console.log(model);

  model.scene.traverse((object) => {
    if (object) {
      object.castShadow = true;
    }
  });
  const currentAction = useRef("");
  const controlRef = useRef<any>();
  const camera = useThree((state) => state.camera);

  const updateCameraTarget = (moveX: number, moveZ: number) => {
    //move Camera
    camera.position.x += moveX;
    camera.position.z += moveZ;

    //update camera target
    cameraTarget.x = model.scene.position.x;
    cameraTarget.y = model.scene.position.y + 2;
    cameraTarget.z = model.scene.position.z;
    if (controlRef.current) {
      controlRef.current.target = cameraTarget;
    }
  };
  // animations dance, idle, jump, running
  useEffect(() => {
    let action = "";

    if (forward || backward || left || right) {
      action = "running";
    } else if (jump) {
      action = "jump";
    } else if (shift) {
      action = "dance";
    } else {
      action = "idle";
    }
    // actions?.dance?.play();
    // console.log("forward  ", forward);
    // console.log("backward  ", backward);
    // console.log("left   ", left);
    // console.log("right   ", right);
    // console.log("jump   ", jump);
    // console.log("shift   ", shift);
    if (currentAction.current != action) {
      const nextActionToPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.2);
      nextActionToPlay?.reset().fadeIn(0.2).play();
      currentAction.current = action;
    }
  }, [forward, backward, left, right, jump, shift]);

  useFrame((state, delta) => {
    if (currentAction.current == "running") {
      // calculate towards camera direction
      let angleYCameraDirection = Math.atan2(
        camera.position.x - model.scene.position.x,
        camera.position.z - model.scene.position.z
      );

      //diagonal movement angle offset
      let newDirectionOffset = directionOffset({
        forward,
        backward,
        left,
        right,
      });

      //rotate model
      rotateQuartenion.setFromAxisAngle(
        rotateAngle,
        angleYCameraDirection + newDirectionOffset
      );

      model.scene.quaternion.rotateTowards(rotateQuartenion, 0.2);

      //calculate direction
      camera.getWorldDirection(walkDirection);
      walkDirection.y = 0;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);

      //for future run/walk faster or not
      const velocity = currentAction.current == "running" ? 5 : 10;

      //move model & camera
      const moveX = walkDirection.x * velocity * delta;
      const moveZ = walkDirection.z * velocity * delta;
      model.scene.position.x += moveX;
      model.scene.position.z += moveZ;

      updateCameraTarget(moveX, moveZ);
    }
  });
  return (
    <>
      <OrbitControls ref={controlRef}></OrbitControls>
      <primitive object={model.scene}></primitive>
    </>
  );
};

export default MyPlayer;
