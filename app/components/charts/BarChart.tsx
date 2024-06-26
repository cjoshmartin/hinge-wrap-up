import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


interface BarInterface {
  title?: string;
  labels: string[];
  data: (string | number)[];
  colors?: string[];
}

export default function BarChart(props: BarInterface) {
  return (
    <div className="bar-chart-container" >
      <Bar
        data={{
          labels: props.labels, 
          datasets: [
            {
              data: props.data,
              backgroundColor: props.colors,
            },
          ],
        }}
        // updateMode="resize"
        // redraw={true}
        height="250px"
        options={{
          // responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: !!props.title,
              text: props.title,
            },
            legend: {
                display: false
            }
          },
        }}
      />
    </div>
  );
}
