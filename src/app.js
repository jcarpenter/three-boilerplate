import * as THREE from 'three'
import { resize } from '../modules/resize'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'


let canvas, scene, camera, controls, renderer

function setup() {

    canvas = document.getElementById("three-canvas")

    /* --------------- SCENE --------------- */

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x212121)

    /* --------------- CAMERA --------------- */

    camera = new THREE.PerspectiveCamera(45, canvas.offsetWidth / canvas.offsetHeight, 100, 4000)
    camera.filmGauge = 36
    camera.setFocalLength(120)

    /* --------------- CONTROLS --------------- */

    controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    controls.dampingFactor = 0.05 // Default
    camera.position.set(150, 300, 300)
    controls.update()

    /* --------------- RENDERER --------------- */

    renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true
    })
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    /* --------------- RESIZER --------------- */

    // Setup resize observer for canvas
    const resizeObserver = new ResizeObserver((entries) => {
        resize(camera, renderer)
    })

    // Fallback to `content-box`, because some browsers don't 
    // support `device-pixel-content-box` this yet.
    try {
        resizeObserver.observe(canvas, { box: 'device-pixel-content-box' })
    } catch (e) {
        resizeObserver.observe(canvas, { box: 'content-box' })
    }

    /* --------------- SCENE CONTENTS --------------- */

    const gridHelper = new THREE.GridHelper(100, 10)
    scene.add(gridHelper)

    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 10),
        new THREE.MeshNormalMaterial()
    )
    scene.add(cube)

    /* --------------- KICKOFF --------------- */

    animate()

}

function animate() {

    requestAnimationFrame(animate)
    controls.update();
    renderer.render(scene, camera)


}

window.addEventListener("load", setup)