import { LinearRegression } from "@ml/LinearRegression"
import { useMemo, useState } from "react"

export const useLinearRegression = (params: ConstructorParameters<typeof LinearRegression>) => {
    const model = useMemo(() => new LinearRegression(...params), [])
    const [weight, setWeight] = useState(model._weight);
    const [bias, setBias] = useState(model._bias);

}