import { Tuple } from "@util/Arb";

interface Hyperparameters {
    learningRate: number
    iterations: number
}


class LRArgumentError extends Error {}
export class LRTrainError extends Error {}

class WithErrorAndWarning {
    hasError: boolean = false;
    errorMessage?: string;

    addError(message: string) {
        this.hasError = true;
        this.errorMessage = message;
    }

    clearError() {
        this.hasError = false;
        delete this.errorMessage
    }

    hasWarning: boolean = false;
    warningMessage?: string;

    setWarning(message: string) {
        this.hasWarning = true;
        this.warningMessage = message;
    }

    clearWarning() {
        this.hasWarning = false;
        delete this.warningMessage
    }
}

class LinearRegression extends WithErrorAndWarning {
    inputPoints: Tuple<number>[];  // initial data points provided
    scaledPoints: Tuple<number>[]; // data points to be operated upon
    extent?: Tuple<number>;
    
    _weight: number = 0;
    _bias: number = 0;
    _learningRate: number;
    setLearningRate(updatedNudge: number) {
        this._learningRate = updatedNudge;
    }
    _iterations: number
    setIterations(updatedIterations: number){
        this._iterations = updatedIterations
    }

    // Predicts the y value for a given x value based on current weigh and bias
    predict = (independant: number) => this._weight * independant + this._bias;

    calcMSE = (): number => this.scaledPoints.reduce(
        (acc: number, [x, y]: Tuple<number>) => acc + Math.pow(y - this.predict(x), 2), 0
    ) / this.scaledPoints.length;

    _weightSlopePartial = (xVal: number, yVal: number) => xVal * (this.predict(xVal) - yVal) 

    getBiasSlopeAtPoint = (xVal: number, yVal: number) => (this.predict(xVal) - yVal)

    _getSlope = (fn: (xVal: number, yVal: number) => number) => 
        (2 / this.scaledPoints.length) 
            * this.scaledPoints
            .map(([x, y]) => fn(x, y))
            .reduce((a, b) => a + b, 0); 

    updateWeightAndBias() {
        const weightSlope = this._getSlope(this._weightSlopePartial)
        const biasSlope = this._getSlope(this.getBiasSlopeAtPoint)

        if(isNaN(weightSlope) || isNaN(biasSlope)) {
            this.addError("Weight or bias slope is NaN, try a lower training rate");
            throw new LRTrainError("Bias slope is NaN, try a lower training rate");
        }
        
        this._weight = this._weight - (this._learningRate * weightSlope)
        this._bias = this._bias - (this._learningRate * biasSlope)
    }

    train(breakOnIteration?: number) {
        const iterMax = breakOnIteration ? Math.min(breakOnIteration, this._iterations) : this._iterations;
        for(let i = 0; i < iterMax; i++) {
            try {
                this.updateWeightAndBias();
            } catch(e) {
                console.log(`Training halted early on iteration ${i}`)
                break;
            }
            // this.calcMSE();
        }
        return this;
    }

    clear() {
        this._weight = 0;
        this._bias = 0;
    }

    toString() {
        return `Weight: ${this._weight}\nBias: ${this._bias}\nNudge amount: ${this._learningRate}`;
    }

    // @param points [x, y] tuple
    constructor(points: Tuple<number>[], params: Hyperparameters) {
        super();
        this.inputPoints = points;
        this.scaledPoints = points.slice();
        this._learningRate = params.learningRate
        this._iterations = params.iterations
    }
}

export {
    Hyperparameters,
    LinearRegression
}