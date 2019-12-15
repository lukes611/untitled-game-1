import { Vector4 } from './vector';
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: '#ff0000',
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

renderer.render(scene, camera);


const n: number = 5;
const m = new Vector4(2.0, 1.0, 0.0);

initDom();


function initDom() {
    document.body.style.padding = '0';
    document.body.style.margin = '0';
}

// console.log('hello world', m, THREE.Scene);