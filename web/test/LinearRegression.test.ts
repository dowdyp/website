import { Hyperparameters, LinearRegression } from "@ml/LinearRegression";
import { Tuple } from "@util/Arb";

const data = [
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
] satisfies Tuple<number>[]

const hyperparams = {
    learningRate: 0.01,
    iterations: 2,
} satisfies Hyperparameters;

const model = new LinearRegression(data, hyperparams);
beforeEach(() => {
    model.train();
})

test("Model trains in the expected manner", () => {
    expect(model._weight).toBeCloseTo(0.134)
    expect(model._bias).toBeCloseTo(0.057)
})