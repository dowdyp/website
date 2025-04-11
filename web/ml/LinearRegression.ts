import { Tuple } from "@util/Arb";

interface Hyperparameters {
    learningRate: number
    iterations: number
}


class LRArgumentError extends Error {}
class LRTrainError extends Error {}

class LinearRegression {
    points: Tuple<number>[]
    
    _weight: number = 1;
    _bias: number = 0;
    _learningRate: number;
    setLearningRate(updatedNudge: number) {
        this._learningRate = updatedNudge;
    }
    _iterations: number
    setIterations(updatedIterations: number){
        this._iterations = updatedIterations
    }

    _weights: number[] = [0];
    _biases: number[] = [0];

    // Predicts the y value for a given x value based on current weigh and bias
    predict = (independant: number) => {
        const prediction = this._weight * independant + this._bias;
        return prediction
    }

    errors: number[] = [];
    appendMSE() {
        const error = this.points.reduce((acc: number, [x, y]: Tuple<number>) => acc + Math.pow(y - this.predict(x), 2), 0) / this.points.length
        this.errors.push(error)
        return error 
    }

    getWeightSlopeAtPoint = (xVal: number, yVal: number) => {
        // console.log(`weight{${this._weight}} eval{${xVal}, ${yVal}}: 2 * ${xVal} * (${this.predict(xVal)} - ${yVal})`)
        return 2 * xVal * (this.predict(xVal) - yVal) 
    }

    getBiasSlopeAtPoint = (xVal: number, yVal: number) => {
        // console.log(`bias{${this._bias}} eval{${xVal}, ${yVal}}: 2 * (${this.predict(xVal)} - ${yVal})`)
        return 2 * (this.predict(xVal) - yVal) 
    }

    _getSlope(fn: (xVal: number, yVal: number) => number) {
        const processed = this.points.map(([x, y]) => fn(x, y));
        const summed = processed.reduce((a, b) => a + b, 0);
        return summed / this.points.length
    }

    getWeightSlope() {
        const s = this._getSlope(this.getWeightSlopeAtPoint) 
        if(isNaN(s)) throw new LRTrainError(`Weight slope is NaN`)
        return s
    }

    getBiasSlope() {
        const s = this._getSlope(this.getBiasSlopeAtPoint);
        if(isNaN(s)) throw new LRTrainError(`Bias slope is NaN`)
        return s;
    }

    updateWeightAndBias() {
        const weightSlope = this.getWeightSlope()
        const biasSlope = this.getBiasSlope()

        
        this._weight = this._weight - (this._learningRate * weightSlope)
        this._bias = this._bias - (this._learningRate * biasSlope)
    }

    train(breakOnIteration?: number) {
        const iterMax = breakOnIteration ? Math.min(breakOnIteration, this._iterations) : this._iterations;
        for(let i = 0; i < iterMax; i++) {
            this.updateWeightAndBias();
            this.appendMSE();
        }
        return this;
    }

    clear() {
        this._weight = 0;
        this._bias = 0;
    }

    print() {
        console.log(`Weight: ${this._weight}\nBias: ${this._bias}\nNudge amount: ${this._learningRate}`, `\nMSE`, this.errors)
    }

    // @param points [x, y] tuple
    constructor(points: Tuple<number>[], params: Hyperparameters) {
        this.points = points
        this._learningRate = params.learningRate
        this._iterations = params.iterations
    }
}

export {
    Hyperparameters,
    LinearRegression
}