import { useMemo, useEffect, useRef, Suspense } from "react"
import * as THREE from "three"
import { Mesh } from "three"
import {
  Canvas,
  useThree,
  useLoader,
  useFrame,
  extend
} from "@react-three/fiber"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import textureGrid from "@/assets/grid2.png"

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
    final.setSize(size.width, size.height)
    final.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }, [final, size])

  useFrame(() => {
    final.render()
  }, 1)

  return null
}

const Scene = () => {
  const mesh1Ref = useRef<Mesh>(null!)
  const mesh2Ref = useRef<Mesh>(null!)

  const [gridTexture, terrainTexture, metalnessTexture] = useLoader(
    TextureLoader,
    [textureGrid.src, DISPLACEMENT_PATH, METALNESS_PATH]
  )

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
      const offset = 0.0005
      return [
        -(mousePosition.y - window.innerHeight / 2) * offset,
        -(mousePosition.x - window.innerWidth / 2) * offset,
        0
      ]
    } else {
      return [0, 0, 0]
    }
  }, [mousePosition])

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime()
    mesh1Ref.current.position.z = (elapsedTime * 0.15) % 2
    mesh2Ref.current.position.z = ((elapsedTime * 0.15) % 2) - 2
    camera.rotation.x = THREE.MathUtils.lerp(
      camera.rotation.x,
      rotation[0],
      0.05
    )
    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      rotation[1],
      0.05
    )
  })

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

      <mesh
        ref={mesh1Ref}
        position={[0, 0, 0.15]}
        rotation={[-Math.PI * 0.5, 0, 0]}
      >
        <planeBufferGeometry args={[1, 2, 24, 24]} />
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
      <mesh
        ref={mesh2Ref}
        position={[0, 0, -1.85]}
        rotation={[-Math.PI * 0.5, 0, 0]}
      >
        <planeBufferGeometry args={[1, 2, 24, 24]} />
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
    <div className="fixed left-0 top-0 h-full w-full">
      <Canvas
        dpr={1}
        performance={{ min: 0.1, max: 1 }}
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
