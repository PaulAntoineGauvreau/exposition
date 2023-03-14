import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
// import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
// import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)
const attendreTexture = textureLoader.load('/images/Attendre.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/2.png')

/**
 * Object
 */


// const geometryWhite = new THREE.BoxGeometry(11.52, 5.76, 0.05)
// const materialWhite = new THREE.MeshBasicMaterial( { color: 0xffffff } );
// materialWhite.side = THREE.FrontSide
// materialWhite.transparent = true
// const meshWhite = new THREE.Mesh(geometryWhite, materialWhite)

const floor = new THREE.BoxGeometry(2000, 0.02, 2000)

const geometry = new THREE.BoxGeometry(11.52, 5.76, 0.05)
const peinture = new THREE.MeshBasicMaterial({map: attendreTexture})
const whiteColor = new THREE.MeshBasicMaterial({color: 'white'})
const materialMatCap =  new THREE.MeshMatcapMaterial()
materialMatCap.matcap = matcapTexture

const material =  [
    whiteColor,
    whiteColor,
    whiteColor,
    whiteColor,
    peinture,
    whiteColor,
]
 
material.transparent = true
material.side = THREE.BackSide

const mesh = new THREE.Mesh(geometry, material)
const meshFloor = new THREE.Mesh(floor, materialMatCap)
mesh.position.y = 3

scene.add(mesh,meshFloor)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 1, 1000)
camera.position.x = 0
camera.position.y = 1.5
camera.position.z = 20
// camera.lookAt(mesh.position)



scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.maxDistance = 100
controls.enablePan = false
controls.maxPolarAngle = Math.PI / 2 - 0.085
controls.update();
// controls.minPolarAngle = Math.Pi * .5

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

mesh.addEventListener('mouseover', () => {
    console.log('musique')
})