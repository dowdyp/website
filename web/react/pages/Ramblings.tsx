import { ComponentProps, useMemo, useRef } from "react"
import { Scatter } from "react-chartjs-2";

import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend, ChartOptions} from "chart.js"
import { useMutableChartData, XYPoint } from "@util/useChartData";
import { TypedChartComponent } from "react-chartjs-2/dist/types";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

const startingPoints = [
    [1, 2],
    [3, 4],
    [5, 6],
] satisfies XYPoint[]

export const Ramblings = () => {
    const options: ChartOptions<"scatter"> = {
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            beginAtZero: true,
          }
        },
      };

    const [points, addPoint] = useMutableChartData(startingPoints);
    
    const data = useMemo(() => ({
        datasets: [
            {
                label: "Some chart data",
                data: points,
                backgroundColor: 'rgba(255, 99, 132, 1)'
            }
        ]
    }), [points]);

    return <><div className="publication-card">
        <h3>title</h3>
        <span className="trunc-desc">this is some content which should be truncated after two lines lines lines lines lines lines lines lines lines lines lines </span>
    </div>
    <Scatter options={options} data={data}/>
    <button onClick={() => addPoint([4, 6])}>add data</button>
    </>
}