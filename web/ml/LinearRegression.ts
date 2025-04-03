import { Tuple } from "@util/Arb";

interface Hyperparameters {
    nudge: number
    iterations: number
}


class LRArgumentError extends Error {}

class LinearRegression {
    points: Tuple<number>[]
    
    _weight: number = 0;
    _bias: number = 0;
    _nudge: number;
    setNudge = (updatedNudge: number) => this._nudge = updatedNudge
    _iterations: number
    setIterations = (updatedIterations: number) => this._iterations = updatedIterations

    // Predicts the y value for a given x value based on current weigh and bias
    predict = (independant: number) => this._weight * independant + this._bias

    mse = () => {
        const sum = this.points.reduce((acc: number, [x, y]: Tuple<number>) => acc + y - this.predict(x), 0)
        return sum / this.points.length
    }

    getWeightSlopeAtPoint = (xVal: number, yVal: number) => {
        return 2 * xVal * (this.predict(xVal) - yVal) 
    }

    getBiasSlopeAtPoint = (xVal: number, yVal: number) => {
        return 2  * (this.predict(xVal) - yVal) 
    }

    _getSlope(fn: (xVal: number, yVal: number) => number) {
        return this.points.reduce((acc: number, [x, y]: Tuple<number>) => acc + fn(x, y), 0) / this.points.length
    }

    getWeightSlope = () => this._getSlope(this.getWeightSlopeAtPoint)
    getBiasSlope = () => this._getSlope(this.getBiasSlopeAtPoint)

    updateWeightAndBias = () => {
        const weightSlope = this.getWeightSlope()
        const biasSlope = this.getBiasSlope()

        this._weight = this._weight - (this._nudge * weightSlope)
        this._bias = this._bias - (this._nudge * biasSlope)
    }

    train(breakOnIteration?: number) {
        const iterMax = breakOnIteration ? Math.min(breakOnIteration, this._iterations) : this._iterations;
        for(let i = 0; i < iterMax; i++) {
            this.updateWeightAndBias();
        }
    }

    clear() {
        this._weight = 0;
        this._bias = 0;
    }

    // @param points [x, y] tuple
    constructor(points: Tuple<number>[], params: Hyperparameters) {
        this.points = points
        this._nudge = params.nudge
        this._iterations = params.iterations
    }
}

export {
    Hyperparameters,
    LinearRegression
}