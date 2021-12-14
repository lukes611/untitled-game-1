import { Vector3 } from './vector';

const RAD_2_DEG = 57.29;
const DEG_2_RAD = 0.01745;

export class Quarternion {
    x: number;
    y: number;
    z: number;
	w: number;

	constructor(x = 0, y = 0, z = 0, w = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}
	
	static fromAngles(angle1: number, angle2: number) {
		const zAxis = new Vector3(0.0, 0.0, 1.0);
		const q1 = Quarternion.fromPole(new Vector3(0.0, 1.0, 0.0), angle1);
		const rotation2Direction = q1.rotate(zAxis);
		// const rotation2Direction = new Vector3();
		const q2 = Quarternion.fromPole(rotation2Direction, angle2);
		return q2;
    }
    
	static fromPole(pole: Vector3, angle: number): Quarternion {
		angle /= (2.0* RAD_2_DEG);
		const rv = new Quarternion();
		rv.w = Math.cos(angle);
		rv.x = Math.sin(angle);
		pole = pole.scale(rv.x);
		rv.x = pole.x;
		rv.y = pole.y;
		rv.z = pole.z;
		return rv;
    }

    clone() {
		return new Quarternion(this.x, this.y, this.z, this.w);
    }

	static fromRotations(xRotation: number, yRotation: number, zRotation: number) {
		const qx = Quarternion.fromPole(new Vector3(1.0, 0.0, 0.0), xRotation);
		const qy = Quarternion.fromPole(new Vector3(0.0, 1.0, 0.0), yRotation);
		const qz = Quarternion.fromPole(new Vector3(0.0, 0.0, 1.0), zRotation);
		return qz.getMultiplicationBy(qy).getMultiplicationBy(qx);
    }

    rotate(v: Vector3): Vector3 {
		const q1 = this.clone();
		const q1Inv = q1.getInverse();
		let vq = new Quarternion(v.x, v.y, v.z, 0.0);
		const m1 = q1.getMultiplicationBy(vq);
		vq = m1.getMultiplicationBy(q1Inv);
		v.x = vq.x;
		v.y = vq.y;
		v.z = vq.z;
		return v;
	}

	setAs(inp: Quarternion) {
		this.x = inp.x;
		this.y = inp.y;
		this.z = inp.z;
		this.w = inp.w;
	}

	dotProduct(inp: Quarternion): number {
		return this.x*inp.x + this.y*inp.y + this.z*inp.z + this.w*inp.w;
	}
	getConjugate(): Quarternion {
		const qt = this.clone();
		qt.x = -qt.x;
		qt.y = -qt.y;
		qt.z = -qt.z;
		return qt;
	}

	getInverse(): Quarternion {
		let q1 = this.clone();
		const dp = q1.dotProduct(q1);
		if (Math.abs(dp) < Number.EPSILON){
			return new Quarternion(0.0, 0.0, 0.0, 0.0);
		}
		const mag = 1.0 / dp;
		q1 = q1.getConjugate();
		q1.x *= mag;
		q1.y *= mag;
		q1.z *= mag;
		q1.w *= mag;
		return q1;
	}

	multiplyBy(inp: Quarternion) {
		this.setAs(this.getMultiplicationBy(inp));
	}

	getMultiplicationBy(q2: Quarternion): Quarternion {
		const rv = new Quarternion();
		const q1 = this.clone();
		rv.w = q1.w*q2.w - q1.x*q2.x - q1.y*q2.y - q1.z*q2.z;
		rv.x = q1.w*q2.x + q1.x*q2.w + q1.y*q2.z - q1.z*q2.y;
		rv.y = q1.w*q2.y - q1.x*q2.z + q1.y*q2.w + q1.z*q2.x;
		rv.z = q1.w*q2.z + q1.x*q2.y - q1.y*q2.x + q1.z*q2.w;
		return rv;
	}

	getMagnitude() {
		return Math.sqrt(Math.pow(this.x, 2.0) + Math.pow(this.y, 2.0) + Math.pow(this.z, 2.0) + Math.pow(this.w, 2.0));
	}

	interpolateTo(target: Quarternion, time: number): Quarternion {
		const from = this.clone();
		const to = target.clone();
		const t2 = 1.0 - time;
		from.iscale(t2);
		to.iscale(time);
		const out = from.clone();
		out.iadd(to);
		const reScale = out.getMagnitude();
		out.iscale(1.0 / reScale);
		return out;
    }
    
	print() {
		console.log(this.toString());
	}

	toString() {
		return `${this.x}, ${this.y}, ${this.z}, ${this.w}`;
	}

	iadd(inp: Quarternion) {
		this.x += inp.x;
		this.y += inp.y;
		this.z += inp.z;
		this.w += inp.w;
	}

	iscale(inp: number) {
		this.x *= inp;
		this.y *= inp;
		this.z *= inp;
		this.w *= inp;
	}
}