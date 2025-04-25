import { Tuple } from "@util/Arb";

export interface Hyperparameters {
    learningRate: number
    iterations: number
}

export class WithErrorAndWarning {
    errorMessage?: string;

    setError(message: string) {
        this.errorMessage = message;
    }

    clearError() {
        delete this.errorMessage
    }

    warningMessage?: string;

    setWarning(message: string) {
        this.warningMessage = message;
    }

    clearWarning() {
        delete this.warningMessage
    }
}

export class LinearRegression extends WithErrorAndWarning {
    providedData: Tuple<number>[];  // initial data points provided
    data: Tuple<number>[]; // data points to be operated upon
    normalized = false;
    
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

    /**
     * Calculate the mean squared error for all data points
     * @returns {number} Mean squared error for all datum
     */
    calcMSE = (): number => this.data.reduce(
        (acc: number, [x, y]: Tuple<number>) => acc + Math.pow(y - this.predict(x), 2), 0
    ) / this.data.length;

    _weightSlopePartial = (xVal: number, yVal: number) => xVal * (this.predict(xVal) - yVal) 

    _biasSlopePartial = (xVal: number, yVal: number) => this.predict(xVal) - yVal

    _getSlope = (fn: (xVal: number, yVal: number) => number) => 
        (2 / this.data.length) * this.data
            .map(([x, y]) => fn(x, y))
            .reduce((a, b) => a + b, 0); 

    /**
     * Completes one iteration of training, then returns whether that iteration was successful
     * @returns {boolean} whether to continue training
     * @todo Implement chaos detection to prevent computation when results start to diverge
     * signaling a problem with learning rate
     */
    updateWeightAndBias = (): boolean => {
        const weightSlope = this._getSlope(this._weightSlopePartial)
        const biasSlope = this._getSlope(this._biasSlopePartial)

        if(isNaN(weightSlope) || isNaN(biasSlope)) {
            this.setWarning("Weight or bias slope is NaN, try a lower training rate");
            return false;
        }
        
        this._weight = this._weight - (this._learningRate * weightSlope)
        this._bias = this._bias - (this._learningRate * biasSlope)
        
        return true;
    }

    train = () => {
        if(this.errorMessage || this.warningMessage) return this;
        for(let i = 0; i < this._iterations; i++) {
            if(!this.updateWeightAndBias()) {
                console.log(`Training halted early on iteration ${i}`)
                break;
            }
        }
        return this;
    }

    toString = () => (
       `Weight: ${this._weight}\n
        Bias: ${this._bias}\n
        Prediction formula: y=${this._weight}x + ${this._bias}\n
        Nudge amount: ${this._learningRate}`
    )

    constructor(points: Tuple<number>[], params: Hyperparameters, normalizeFn?: NormalizeFn) {
        super();
        this._learningRate = params.learningRate;
        this._iterations = params.iterations;
        this.providedData = points;

        this.normalized = normalizeFn ? true : false;
        this.data = normalize[normalizeFn ?? "none"](this.providedData);

        if(points.length < 2) this.setError("There must be at least two points to calculate the line of best fit");
    }
}

const normalize = {
    none: (data) => data,
    unit: (data) => {
        const max = data.reduce((a, [x, y]) => {
            a[0] = Math.max(a[0], x);
            a[1] = Math.max(a[1], y)
            return a;
        }, [0, 0])
        return data.map(([x, y]) => [x / max[0], y / max[1]])
    }
} satisfies Record<string, (d: Tuple<number>[]) => Tuple<number>[]>;
export type NormalizeFn = keyof typeof normalize;
