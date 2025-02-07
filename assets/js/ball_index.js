/** Describes object (circle) drawn on canvas and its attributes. */
class Shape {
    constructor(x, y, radius, ax, ay, m, vx=0, vy=0) {
        this.x = x;
        this.y = y;
        this.r = radius;
        this.ax = ax;
        this.ay = ay;
        this.m = m;
        this.vx = vx;
        this.vy = vy;
        this.fx = 0;
        this.fy = 0;
    }

    move(dt) {
        this.vx += this.ax * dt;
        this.vy += this.ay * dt;
        if (this.vx > maxSpeed) {
            this.vx = maxSpeed
        }
        if (this.vx < -maxSpeed) {
            this.vx = -maxSpeed
        }
        if (this.vy > maxSpeed) {
            this.vy = maxSpeed
        }
        if (this.vy < -maxSpeed) {
            this.vy = -maxSpeed
        }
        this.x += this.vx * dt;
        this.y += this.vy * dt;
    }

    draw() {
        //draw a circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }

    resolveEdgeCollision() {
        // Detect collision with right wall.
        if (this.x + this.r > c.width) {
            // Need to know how much we overshot the canvas width so we know how far to 'bounce'.
            this.x = c.width - this.r;
            this.vx = -this.vx;
            this.ax = -this.ax;
        }

        // Detect collision with bottom wall.
        else if (this.y + this.r > c.height) {
            this.y = c.height - this.r;
            this.vy = -this.vy;
            this.ay = -this.ay;
        }

        // Detect collision with left wall.
        else if (this.x - this.r < 0) {
            this.x  = this.r;
            this.vx = -this.vx;
            this.ax = -this.ax;
        }
        // Detect collision with top wall.
        else if (this.y - this.r < 0) {
            this.y = this.r;
            this.vy = -this.vy;
            this.ay = -this.ay;
        }

    }
}

/** Object describing collision between 2 objects */
class Collision {
    constructor(o1, o2, dx, dy, d) {
        this.o1 = o1;
        this.o2 = o2;

        this.dx = dx;
        this.dy = dy;
        this.d = d;
    }
}

function checkCollision(o1, o2) {
    let dx = o2.x - o1.x;
    let dy = o2.y - o1.y;
    let d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (d < o1.r + o2.r) {
        return  {
            collisionInfo: new Collision(o1, o2, dx, dy, d),
            collided: true
        }
    }
    return  {
        collisionInfo: null,
        collided: false
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Resolves collision by pushing objects away from each other. */
function resolveCollision(info) {  // "info" is a Collision object from above
    let nx = info.dx /info.d;  // Compute iegen vectors
    let ny = info.dy /info.d;
    let s = info.o1.r + info.o2.r - info.d;
    info.o1.x -= nx * s/2;  // Move first object by half of collision size
    info.o1.y -= ny * s/2;
    info.o2.x += nx * s/2;  // Move other object by half of collision size in opposite direction
    info.o2.y += ny * s/2;
}

/** Resolves collision by bouncing objects. */
function resolveCollisionWithBounce(info) {
    let nx = info.dx /info.d;
    let ny = info.dy /info.d;
    let s = info.o1.r + info.o2.r - info.d;
    info.o1.x -= nx * s/2;
    info.o1.y -= ny * s/2;
    info.o2.x += nx * s/2;
    info.o2.y += ny * s/2;

    // Magic...
    let k = -2 * ((info.o2.vx - info.o1.vx) * nx + (info.o2.vy - info.o1.vy) * ny) / (1/info.o1.m + 1/info.o2.m);
    info.o1.vx -= k * nx / info.o1.m;  // Same as before, just added "k" and switched to "m" instead of "s/2"
    info.o1.vy -= k * ny / info.o1.m;
    info.o2.vx += k * nx / info.o2.m;
    info.o2.vy += k * ny / info.o2.m;
}

function moveWithGravity(dt, o) {  // "o" refers to Array of objects we are moving
    for (let o1 of o) {  // Zero-out accumulator of forces for each object
        o1.fx = 0;
        o1.fy = 0;
    }
    for (let [i, o1] of o.entries()) {  // For each pair of objects...
        for (let [j, o2] of o.entries()) {
            if (i < j) {  // To not do same pair twice
                let dx = o2.x - o1.x;  // Compute distance between centers of objects
                let dy = o2.y - o1.y;
                let r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                if (r < 1) {  // To avoid division by 0
                    r = 1;
                }
                let f = (1000 * o1.m * o2.m) / Math.pow(r, 2);  // Compute force for this pair
                let fx = f * dx / r;  // Break it down
                let fy = f * dy / r;
                o1.fx += fx;  // Accumulate for first object
                o1.fy += fy;
                o2.fx -= fx;  // And for second object in opposite direction
                o2.fy -= fy;
            }
        }
    }
    for (let o1 of o) {  // for each object update...
        let ax = o1.fx / o1.m;  // ...acceleration
        let ay = o1.fy / o1.m;

        o1.vx += ax * dt;  // ...speed
        o1.vy += ay * dt;

        o1.x += o1.vx * dt;  // ...position
        o1.y += o1.vy * dt;
    }
}

const CollisionTypes = Object.freeze({
    "push": resolveCollision,
    "bounce": resolveCollisionWithBounce
});
let gravity = false;

let currentCollisionType = CollisionTypes.bounce;

const maxSpeed = 150;
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

let objects = [];

function createBouncingExample() {
    let labelCollision = document.getElementById("switchCollisionLabel");
    currentCollisionType = CollisionTypes.bounce;
    labelCollision.textContent = "Bounce";

    let labelGravity = document.getElementById("toggleGravityLabel");
    gravity = false;
    labelGravity.textContent = "Off";

    objects = [];

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let radius = 7;
            let x = getRandomInt(radius, c.offsetWidth - radius);
            let y = getRandomInt(radius, c.offsetHeight - radius);
            objects.push(new Shape(x, y, radius, getRandomInt(-1, 1), getRandomInt(-1, 1), radius*10));
        }
    }
}

createBouncingExample();

/** Used with click + hold events to create circles (objects). */
function createShape(event, radius=10, mass=100) {
    let x = event.pageX - c.offsetLeft;
    let y = event.pageY - c.offsetTop;

    objects.push(new Shape(x, y, radius, getRandomInt(-1, 1), getRandomInt(-1, 1), mass));
}

let holdTimer;
let timerFlag;
let startTime = new Date();
function mouseDown() {
    startTime = new Date();
    holdTimer = window.setTimeout(function() {
        timerFlag = true;
        }, 100);
}

c.addEventListener("mousedown", mouseDown);
c.addEventListener("mouseup", function(event) {
    removeTimer(event)
}, false);

function removeTimer(event) {
    if(timerFlag) {
        let endTime = new Date();
        let timeDiff = endTime - startTime; // in ms
        // strip the ms
        timeDiff /= 1000;
        createShape(event, Math.round(10*timeDiff), Math.ceil(100*timeDiff));
        console.log(objects[objects.length- 1]);
    }
    if (holdTimer) {
        window.clearTimeout(holdTimer);
    }
    timerFlag = false;
}

/** This function is ran with every animation frame and each time clears canvas, updates coordinates of all objects,
 * resolves collisions of objects and edges of canvas , resolves collisions between objects and finally draws all of them. */
function animate() {
    ctx.clearRect(0, 0, c.width, c.height);

    if (gravity) {
        moveWithGravity(0.1, objects);
    }
    else {
        for (let o of objects) {
            o.move(0.1);
        }
    }

    for (let o of objects) {
        o.resolveEdgeCollision();
    }
    let collisions = [];
    for (let [i, o1] of objects.entries()) {
        for (let [j, o2] of objects.entries()) {
            if (i < j) {
                let {collisionInfo, collided} = checkCollision(o1, o2);
                if (collided) {
                    collisions.push(collisionInfo);
                }
            }
        }
    }

    for (let col of collisions) {
        currentCollisionType(col)  // resolveCollision(col)
    }
    for (let o of objects) {
        o.draw();
    }
    window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);
