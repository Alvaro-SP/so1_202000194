import React from 'react';
import Sketch from "react-p5";
import { Button } from 'react-bootstrap';
//Over Time
import Ram from "./Ram";
import Cpu from "./Cpu";

const Reports=({Crr_Arr1, Crr_Arr2, option, handleClick0})=>{

   function condicional_render(){

    if(option=== 1){
        return(
        <div>
            <Ram Crr_Arr={Crr_Arr1}/>
            <Cpu Crr_Arr={Crr_Arr2}/>
        </div>
    )     
    }

   }
   function condicional_render_b(){
    if(option!==0){
       return(
          <>
          <Button onClick={handleClick0} style={{color: "white"}}>Cerrar</Button>
          <h1>Reporte:</h1>
          
          </>
       )
    }
 }
   return (
      <div>
         {condicional_render_b()}
         {condicional_render()}
      </div>
   );
}

export default Reports ;
