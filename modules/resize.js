import * as THREE from 'three';

export function resize(camera, renderer) {

    // Limit resolution to 2x device pixels.
    // High-res 3x displays (such as newer iPhones) won't notice
    // the difference, and will enjoy perf savings.
    const pixelRatio = THREE.MathUtils.clamp(window.devicePixelRatio, 1, 2)

    // Save pixel ratio to store and apply the renderer
    renderer.setPixelRatio(pixelRatio)

    // Set renderer width/height
    const canvas = renderer.domElement
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()

}