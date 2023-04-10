import { Doughnut } from "react-chartjs-2";

interface PieChartInterface {
  title?: string;
  labels: string[];
  data: (string | number)[];
  colors: string[];
}

export default function PieChart(props: PieChartInterface) {
  return (
    <div className="pie-char-container" style={{ height: "500px" }}>
      <Doughnut
        data={{
          labels: props.labels,
          datasets: [
            {
              data: props.data,
              backgroundColor: props.colors,
              hoverOffset: 1,
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: !!props.title,
              text: props.title,
            },
          },
        }}
      />
    </div>
  );
}
