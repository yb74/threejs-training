import * as THREE from 'three'
import WebGL  from 'three/addons/capabilities/WebGL.js';

import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import init from './setup';

const createText = () => {
    const scene = init();
    const loader = new FontLoader()

    // loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    loader.load('https://unpkg.com/three@0.77.0/examples/fonts/helvetiker_regular.typeface.json', (font) => {
        const geometry = new TextGeometry("Hello world", {
            font: font,
            size: 18,
            height: 5,
            curveSegment: 32,
            bevelEnabled: true,
            bevelThickness: 0.5,
            bevelSize: 0.5,
            bevelOffset: 0,
            bevelSegments: 8
        })

        // Create a standard material with red color and 50% gloss
        const material = new THREE.MeshStandardMaterial({
            color: 'hotpink',
            roughness: 0.5
        });

        // Geometries are attached to meshes so that they get rendered
        const textMesh = new THREE.Mesh(geometry, material);
        // Update positioning of the text
        textMesh.position.set(-70, 0, 0);
        scene.add(textMesh);
    })
}

const createCube = () => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    // Adding cube
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    // the cube will be added at the coordinates 0, 0, 0
    // the cube and the camera will be inside each other
    // we have to zoom out the camera this way :
    camera.position.set( 0, 0, 5 );
    // zooming out the camera to see the cube

    // function animate creates a loop that is run every frame (60 times/second)
    // place in this function everything that we want to move or change while the app is running
    const animate = () => {
        requestAnimationFrame(animate)

        cube.rotation.x += 0.01 // vertical rotation speed
        cube.rotation.y += 0.01 // horizontal rotation speed
        cube.rotation.z += 0.01 // circular rotation speed

        renderer.render(scene, camera)
    }

    if ( WebGL.isWebGLAvailable() ) {
        // Initiate function or other initializations here
        animate();
    } else {
        const warning = WebGL.getWebGLErrorMessage();
        document.getElementById( 'container' ).appendChild( warning );
    }
}

const createLines = () => {
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)
    camera.position.set(0, 0, 100)
    camera.lookAt(0, 0, 0) // change the position

    const scene = new THREE.Scene()

    //create a blue LineBasicMaterial
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff })

    const points = []
    points.push(new THREE.Vector3(-10, 0, 0))
    points.push(new THREE.Vector3(0, 10, 0))
    points.push(new THREE.Vector3(10, 0, 0))
    // points.push(new THREE.Vector3(0, -10, 0))
    // points.push(new THREE.Vector3(-10, 0, 0))

    const geometry = new THREE.BufferGeometry().setFromPoints(points)

    const line = new THREE.Line(geometry, material)

    scene.add(line)
    renderer.render(scene, camera)
}

// createCube()
// createLines()
createText()
