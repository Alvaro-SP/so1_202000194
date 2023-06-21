import React from "react";
import { Chart } from "react-google-charts";

const ChartPie = ({dataE,option,select}) => {
   let dataUNE = 0;
   let dataVAMOS = 0;
   let dataFCN = 0;
   let dataUNIONISTA = 0;
   let dataVALOR = 0;


   const dataGraph = () => {
      console.log("OPTION: ",option)
      if (option === "Departamento") {
         return dataE.map((item, index) => {
            return select === item.departamento ? [item.municipio, item.partido] : null;
         });
      } else {
         return dataE.map((item, index) => {
            return select === item.municipio ? [item.municipio, item.partido] : null;
         });
      }
   };

   const reformData = () => {
      let data = dataGraph();
      data = data.filter((item) => item !== null);
      data.forEach((item, index) => {
         if (item[1] === "UNE") {
            dataUNE++;
         } else if (item[1] === "VAMOS") {
            dataVAMOS++;
         } else if (item[1] === "FCN") {
            dataFCN++;
         } else if (item[1] === "UNIONISTA") {
            dataUNIONISTA++;
         } else if (item[1] === "VALOR") {
            dataVALOR++;
         }
      });
      // console.log("--------------------")
      // console.log("Total",dataUNE+dataVAMOS+dataFCN+dataUNIONISTA+dataVALOR)
      // console.log("UNE",dataUNE)
      // console.log("VAMOS",dataVAMOS)
      // console.log("FCN",dataFCN)
      // console.log("UNIONISTA",dataUNIONISTA)
      // console.log("VALOR",dataVALOR)
   };

   reformData();

   const data = [
      ["Task", "Hours per Day"],
      ["UNE", dataUNE],
      ["VAMOS", dataVAMOS],
      ["FCN", dataFCN],
      ["UNIONISTA", dataUNIONISTA],
      ["VALOR", dataVALOR],
   ];

   const options = {
      title: "Votos por " + option + ": " + select,
   };

   const conditionalRedndering = () => {
      if (select === '') {
         return (
            <div id="div3">
               <h2>Seleccione una opcion de: {option}</h2>
            </div>
         );
        
      } else {
         return (
         <div id="div4">
            <Chart
               chartType="PieChart"
               data={data}
               options={options}
               width={"100%"}
               height={"500px"}
            />
         </div>
          );
      

      }
   };


   return (
      <>
         {conditionalRedndering()}
      </>
   );
};

export default ChartPie;