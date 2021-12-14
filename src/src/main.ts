import { Vector4, Vector3 } from './vector';
import * as THREE from 'three';
import { Quarternion } from './quarternion';
import { Arm } from './arm';
import { ArmModel } from './arm_model';

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
// scene.add(cube);
camera.position.z = 5;
let angle = 0.1;



const larm = new Arm(
    Quarternion.fromRotations(0, 0, 0),
    2,
);

const foreArm = new Arm(
    Quarternion.fromRotations(0, 0, 0),
    1.5,
    new Vector3(0, 0, 0),
    larm,
)

larm.children.push(foreArm);

const armCube = new ArmModel(larm, '#aa0000');
scene.add(armCube.model);
const farmCube = new ArmModel(foreArm, '#002288');
scene.add(farmCube.model);

let t = 0;
const q1 = Quarternion.fromRotations(0, 0, 0);
const q2 = Quarternion.fromRotations(0, 0, 45);

const q3 = Quarternion.fromRotations(0, 0, 0);
const q4 = Quarternion.fromRotations(0, 0, 90);

function loop() {
    const T = (Math.sin(t * Math.PI * 2)+1)/2;
    larm.q = q1.interpolateTo(q2, T);
    foreArm.q = q3.interpolateTo(q4, T);
    // console.log(t, q1+'', q2+'', q1.interpolateTo(q2, t)+'');
    // updateArmObject(q1.interpolateTo(q2, (Math.sin(t * Math.PI * 2)+1)/2), armCube);
    // updateArmObject(larm, armCube);
    armCube.update();
    // updateArmObject(foreArm, farmCube);
    farmCube.update();
    // updateLArm(Quarternion.fromAngles(t * 60, t * 50), armCube);
    cube.rotateY(angle);
    renderer.render(scene, camera);
    requestAnimationFrame(loop);


    t += 0.05;
    if (t > 1) t -= 1;

    // setTimeout(loop, 800);
}

loop();




const n: number = 5;
const m = new Vector4(2.0, 1.0, 0.0);

initDom();


function initDom() {
    document.body.style.padding = '0';
    document.body.style.margin = '0';
}

// console.log('hello world', m, THREE.Scene);