import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js"
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js"
import { useState, Suspense } from "react"
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber"
import { TextureLoader } from "three/src/loaders/TextureLoader"

interface Props {
  width?: number
  height?: number
}

const TEXTURE_PATH =
  "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657168/blog/vaporwave-threejs-textures/grid.png"
const DISPLACEMENT_PATH =
  "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657200/blog/vaporwave-threejs-textures/displacement.png"
const METALNESS_PATH =
  "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657200/blog/vaporwave-threejs-textures/metalness.png"

const Scene = () => {
  const [mesh1Position, setMesh1Position] = useState<[number, number, number]>([
    0, 0, 0.15
  ])
  const [mesh2Position, setMesh2Position] = useState<[number, number, number]>([
    0, 0, -1.85
  ])
  const { size } = useThree()
  const [gridTexture, terrainTexture, metalnessTexture] = useLoader(
    TextureLoader,
    [TEXTURE_PATH, DISPLACEMENT_PATH, METALNESS_PATH]
  )

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime()
    // Update controls
    setMesh1Position((p) => [p[0], p[1], (elapsedTime * 0.15) % 2])
    setMesh2Position((p) => [p[0], p[1], ((elapsedTime * 0.15) % 2) - 2])
  })

  return (
    <>
      <ambientLight color="#ffffff" intensity={10} />
      <mesh position={mesh1Position} rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeGeometry args={[1, 2, 24, 24]} />
        <meshStandardMaterial
          map={gridTexture}
          displacementMap={terrainTexture}
          displacementScale={0.4}
          metalnessMap={metalnessTexture}
          metalness={0.96}
          roughness={0.5}
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
        />
      </mesh>
      {/* 
      <perspectiveCamera
        args={[75, size.width / size.height, 0.01, 20]}
        position={[0, 0.06, 1.1]}
      /> */}
    </>
  )
}

export default function Vaporwave() {
  return (
    <Canvas camera={{ position: [0, 0.06, 1.1], fov: 75, near: 0.01, far: 20 }}>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
