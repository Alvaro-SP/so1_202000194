import React from "react";
import { Chart } from "react-google-charts";

const ChartBar = ({dataE}) => {

   const data = [
      ["Sedes", "Votos"],
      [`${dataE[0]?.sede || ""}`, dataE[0]?.value || 0],
      [`${dataE[1]?.sede || ""}`, dataE[1]?.value || 0],
      [`${dataE[2]?.sede || ""}`, dataE[2]?.value || 0],
      [`${dataE[3]?.sede || ""}`, dataE[3]?.value || 0],
      [`${dataE[4]?.sede || ""}`, dataE[4]?.value || 0],
   ];

   const options = {
      chart: {
         title: "Sedes con mayores votos ",
         subtitle: "Almacenados en Redis.",
      },
      series: {
         0: { borderWidth: 2, borderColor: "#212121" },
         },
};


   return (
      <Chart
         chartType="Bar"
         width="100%"
         height="400px"
         data={data}
         options={options}
      />
   );
};

export default ChartBar;