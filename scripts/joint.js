class Joint {
    constructor(id, mass, radius, position, velocity, acceleration) {
        this.id = id;
        this.mass = mass;
        this.radius = radius;
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.forceDueToGravity = 0;
        this.resultantForce = [0, 0];
        this.reactionForce = [0, 0];
        this.springForce = [0, 0];
        this.springs = [];
    }


    /*-------------------------------------------------------------------*/
    /* Render and main update                                            */
    /*-------------------------------------------------------------------*/


    update(windowWidth, windowHeight, deltaTime) {
        this.updateForce(deltaTime);
        this.updateAcceleration(deltaTime);
        this.updateVelocity(deltaTime);
        this.updatePosition(deltaTime);
        this.boundaryCollisionHandler(0, windowWidth, 0, windowHeight);
        this.springForce = [0, 0]
    }
    
    
    render() {
        noStroke();
        fill(255, 0, 0);
        ellipse(
            this.position[0], 
            this.position[1], 
            this.radius * 2, 
            this.radius * 2
        );
    }


    /*-------------------------------------------------------------------*/
    /* Joint physics                                                     */
    /*-------------------------------------------------------------------*/


    updateSpringForce(force) {
        this.springForce[0] += force[0];
        this.springForce[1] += force[1];
    }


    updateForce() {
        this.resultantForce[0] = this.reactionForce[0] + this.springForce[0] + this.forceDueToGravity;
        this.resultantForce[1] = this.reactionForce[1] + this.springForce[1] + this.forceDueToGravity;
    }


    updateAcceleration(deltaTime) {
        // a = f/m
        this.acceleration[0] = this.resultantForce[0] * deltaTime / this.mass;
        this.acceleration[1] = this.resultantForce[1] * deltaTime / this.mass;
    }
    
    
    updateVelocity() {
        // v = u + at
        this.velocity[0] += this.acceleration[0] * deltaTime;
        this.velocity[1] += this.acceleration[1] * deltaTime;
    }
    
    
    updatePosition(deltaTime) {
        // s = ut + 1/2at^2
        this.position[0] += (this.velocity[0] * deltaTime) + (0.5 * this.acceleration[0] * deltaTime * deltaTime);
        this.position[1] += (this.velocity[1] * deltaTime) + (0.5 * this.acceleration[1] * deltaTime * deltaTime);
    }


    /*-------------------------------------------------------------------*/
    /* Joint collisions                                                  */
    /*-------------------------------------------------------------------*/


    collidedWithBottomOfWindow(boundaryBottom) {
        // Floor collision detector
        if (this.position[1] - this.radius <= boundaryBottom) {
            return true;
        }
    }
    
    
    collidedWithTopOfWindow(boundaryTop) {
        // Roof collision detector
        if (this.position[1] + this.radius >= boundaryTop) {
            return true;
        }
    }
    
    
    collidedWithLeftOfWindow(boundaryLeft) {
        // Left window collision detector
        if (this.position[0] - this.radius <= boundaryLeft) {
            return true;
        }
    }
    
    
    collidedWithRightOfWindow(boundaryRight) {
        // Right window collision detector
        if (this.position[0] + this.radius >= boundaryRight) {
            return true;
        }
    }
    
    
    applyBoundaryImpulseX() {
        this.velocity[0] *= -boundaryDampingCoefficient;
    }
    
    
    applyBoundaryImpulseY() {
        this.velocity[1] *= -boundaryDampingCoefficient;
    }
    
    
    boundaryCollisionHandler(boundaryLeft, boundaryRight, boundaryBottom, boundaryTop) {
        if (this.collidedWithLeftOfWindow(boundaryLeft)) {
            this.position[0] = boundaryLeft + this.radius;
            this.applyBoundaryImpulseX();
        } 
        else if (this.collidedWithRightOfWindow(boundaryRight)) {
            this.position[0] = boundaryRight - this.radius;
            this.applyBoundaryImpulseX();
        } 
        else if (this.collidedWithBottomOfWindow(boundaryBottom)) {
            this.position[1] = boundaryBottom + this.radius;
            this.applyBoundaryImpulseY();
        } 
        else if (this.collidedWithTopOfWindow(boundaryTop)) {
            this.position[1] = boundaryTop - this.radius
            this.applyBoundaryImpulseY();
        }
    }



    /*-------------------------------------------------------------------*/
    /* Getters                                                           */
    /*-------------------------------------------------------------------*/


    getID() {
        return this.id;
    }


    getMass() {
        return this.mass;
    }


    getPosition() {
        return this.position;
    }


    getVelocity() {
        return this.velocity;
    }


    /*-------------------------------------------------------------------*/
    /* Setters                                                           */
    /*-------------------------------------------------------------------*/


    setSpring(spring) {
        this.springs.push(spring);
    }


    setForceDueToGravity() {
        this.forceDueToGravity = this.mass * g;
    }


    setPosition(newPosition) {
        this.position = newPosition;
    }


    setVelocity(newVelocity) {
        this.velocity = newVelocity;
    }


    /*-------------------------------------------------------------------*/
}