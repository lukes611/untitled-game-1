import * as THREE from 'three';
import { Arm } from './arm';

export class ArmModel {
    arm: Arm;
    color: string;
    model: THREE.Object3D;
    constructor(arm: Arm, color: string = '#00cc00') {
        this.arm = arm;
        this.color = color;
        this.model = ArmModel.createModel(this.arm, this.color);
    }

    static createModel(arm: Arm, color: string): THREE.Object3D {
        const geometry = new THREE.BoxGeometry(arm.length, 0.2, 0.2);
        const material = new THREE.MeshBasicMaterial({
            color,
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(arm.length/2, 0, 0);
        const obj = new THREE.Object3D();
        obj.add(cube);
        return obj;
    }

    update() {
        const t = this.arm.computeTransform();
        const { rotation: qq, offset: pp } = t;
        const q = new THREE.Quaternion(qq.x, qq.y, qq.z, qq.w);
        this.model.rotation.setFromQuaternion(q);
        this.model.position.set(pp.x, pp.y, pp.z);
    }
    
}
