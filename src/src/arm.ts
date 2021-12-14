import { Vector3 } from './vector';
import { Quarternion } from './quarternion';

export class Arm {
    q: Quarternion;
    offset: Vector3;
    length: number;
    parent: Arm | undefined;
    children: Array<Arm>;
    constructor(quart: Quarternion, length: number, offset?: Vector3, parent?: Arm, children?: Array<Arm>) {
        this.q = quart;
        this.offset = offset || new Vector3();
        this.length = length;
        this.parent = parent;
        this.children = children || [];
    }

    computeTransform(): {
        offset: Vector3;
        rotation: Quarternion;
    } {
        if (this.parent == null) {
            return {
                offset: this.offset,
                rotation: this.q.clone(),
            };
        }
        const parentProperties = this.parent.computeTransform();
        const parentEndpoint = parentProperties.offset.add(
            parentProperties.rotation.rotate(new Vector3(this.parent.length, 0, 0))
        );
        return {
            offset: this.offset.add(parentEndpoint),
            rotation: parentProperties.rotation.getMultiplicationBy(this.q),
        };
    }
}
