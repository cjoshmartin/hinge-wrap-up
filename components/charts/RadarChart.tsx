import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Radar } from 'react-chartjs-2';
  
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );


interface RadarChartInterface {
  title?: string;
  labels: string[];
  data: (string | number)[];
}

  export default function RadarChart(props: RadarChartInterface) {
    return (
      <div style={{ }}>
        <Radar
          data={{
            labels: props.labels,
            datasets: [
              {
                label: props.title,
                data: props.data,
                backgroundColor: "rgba(255, 255, 255, 1)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
            ],
          }}
          options={{
            chartArea: { backgroundColor: "red" },
          }}
        />
      </div>
    );
  }