import { Bar } from "react-chartjs-2";

interface BarInterface {
  title?: string;
  labels: string[];
  data: (string | number)[];
  colors: string[];
}

export default function BarChart(props: BarInterface) {
  return (
    <div
      className="bar-chart-container"
      style={{
        height: "500px",
      }}
    >
      <Bar
        data={{
          labels: ["Likes without Comments", "Likes with Comments"],
          datasets: [
            {
              // axis: "x",
              data: props.data,
              backgroundColor: props.colors,
            },
          ],
        }}
        options={{
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
