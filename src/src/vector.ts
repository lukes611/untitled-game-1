
export class Vector4 {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor(
        x: number = 0,
        y: number = 0,
        z: number = 0,
        w: number = 0,
    ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
}

export class Vector3 {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor(
        x: number = 0,
        y: number = 0,
        z: number = 0,
    ) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    scale(scalar: number) {
        return new Vector3(
            this.x * scalar,
            this.y * scalar,
            this.z * scalar,
        );
    }
    
    add(v: Vector3) {
        return new Vector3(
            this.x + v.x,
            this.y + v.y,
            this.z + v.z,
        );
    }
}