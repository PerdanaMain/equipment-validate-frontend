import React from "react";
import { Bar } from "react-chartjs-2";

const Barchart = () => {
  const state = {
    labels: ["On", "Off", "Dismantle", "Not Found", "Rack"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: "",
        borderColor: "",
        borderWidth: "",
        data: [65, 45, 123, 42, 43],
      },
    ],
  };
  return (
    <div>
      <Bar data={state} />
      <p>Bar Chart</p>
    </div>
  );
};

export default Barchart;
