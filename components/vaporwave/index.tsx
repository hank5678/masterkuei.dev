import { useState, useMemo, useEffect, Suspense } from "react"
import * as THREE from "three"
import {
  Canvas,
  useThree,
  useLoader,
  useFrame,
  extend
} from "@react-three/fiber"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import textureGrid from "@/assets/grid2.png"
console.log(textureGrid.src)

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"

import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js"
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js"
import useMousePosition from "@/hooks/useMousePosition"

const TEXTURE_PATH =
  "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657168/blog/vaporwave-threejs-textures/grid.png"
const DISPLACEMENT_PATH =
  "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657200/blog/vaporwave-threejs-textures/displacement.png"
const METALNESS_PATH =
  "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657200/blog/vaporwave-threejs-textures/metalness.png"

extend({ EffectComposer, ShaderPass, RenderPass })

// #c5fff9
// #9efff2
// #6dffe9
// #3dffd9
// #00efe4 xxx
// #00c5bf
// #008e8a
// #005856
// #002d22

// #ffb9dc
// #ff8ecf
// #ff5ebf
// #ff2f99
// #ff008b xxx
// #d40077
// #a2005c
// #710042
// #3f001e

// https://codesandbox.io/s/r3f-selective-bloom-forked-j8gk9r?file=/src/index.js
function Effect() {
  const { gl, scene, camera, size } = useThree()

  const final = useMemo(() => {
    const finalComposer = new EffectComposer(gl)

    const renderScene = new RenderPass(scene, camera)
    finalComposer.addPass(renderScene)

    const rgbShiftPass = new ShaderPass(RGBShiftShader)
    rgbShiftPass.uniforms["amount"].value = 0.001
    finalComposer.addPass(rgbShiftPass)

    const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
    finalComposer.addPass(gammaCorrectionPass)

    return finalComposer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // base.setSize(size.width, size.height)
    final.setSize(size.width, size.height)
    final.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }, [final, size])

  useFrame(() => {
    // base.render()
    final.render()
  }, 1)

  return null
}

const Scene = () => {
  // const ref = useRef()
  const [mesh1Position, setMesh1Position] = useState<[number, number, number]>([
    0, 0, 0.15
  ])
  const [mesh2Position, setMesh2Position] = useState<[number, number, number]>([
    0, 0, -1.85
  ])
  // const { size, scene, camera, gl } = useThree()
  const [gridTexture, terrainTexture, metalnessTexture] = useLoader(
    TextureLoader,
    [textureGrid.src, DISPLACEMENT_PATH, METALNESS_PATH]
  )

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime()
    // Update controls
    setMesh1Position((p) => [p[0], p[1], (elapsedTime * 0.15) % 2])
    setMesh2Position((p) => [p[0], p[1], ((elapsedTime * 0.15) % 2) - 2])
  })

  const spotLight1 = useMemo(() => {
    return new THREE.SpotLight()
  }, [])
  const spotLight2 = useMemo(() => {
    return new THREE.SpotLight()
  }, [])

  const mousePosition = useMousePosition()
  const { camera } = useThree()

  const rotation = useMemo<[number, number, number]>(() => {
    if (window) {
      const offset = 0.0002
      return [
        -(mousePosition.y - window.innerHeight / 2) * offset,
        -(mousePosition.x - window.innerWidth / 2) * offset,
        0
      ]
    } else {
      return [0, 0, 0]
    }
  }, [mousePosition])

  useEffect(() => {
    camera.rotation.x = rotation[0]
    camera.rotation.y = rotation[1]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotation])

  return (
    <>
      <fog attach="fog" color="#000000" near={0} far={10} />
      <ambientLight color="#FFFFFF" intensity={5} />
      <primitive
        object={spotLight1}
        color="#ff008b"
        position={[0.5, 1.75, 2.2]}
        intensity={30}
        distance={25}
        angle={Math.PI * 0.1}
        penumbra={0.05}
      />
      <primitive object={spotLight1.target} position={[-0.4, 0.25, 0.25]} />

      <primitive
        object={spotLight2}
        color="#00efe4"
        position={[-0.5, 0.75, 2.2]}
        intensity={30}
        distance={25}
        angle={Math.PI * 0.1}
        penumbra={0.05}
      />
      <primitive object={spotLight2.target} position={[0.4, 0.25, 0.25]} />

      <mesh position={mesh1Position} rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeGeometry args={[1, 2, 24, 24]} />
        <meshStandardMaterial
          map={gridTexture}
          displacementMap={terrainTexture}
          displacementScale={0.4}
          metalnessMap={metalnessTexture}
          metalness={0.96}
          roughness={0.5}
          transparent={true}
          alphaTest={0}
          wireframe={true}
        />
      </mesh>
      <mesh position={mesh2Position} rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeGeometry args={[1, 2, 24, 24]} />
        <meshStandardMaterial
          map={gridTexture}
          displacementMap={terrainTexture}
          displacementScale={0.4}
          metalnessMap={metalnessTexture}
          metalness={0.96}
          roughness={0.5}
          transparent={true}
          alphaTest={0}
          wireframe={true}
        />
      </mesh>
      <Effect />
    </>
  )
}

export default function Vaporwave() {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0.06, 1.1], fov: 75, near: 0.01, far: 20 }}
      >
        <color attach="background" args={["#1e1e28"]} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
