import React from "react";
import myImage1 from '../assets/1.png';
import myImage2 from '../assets/2.png';
import myImage3 from '../assets/3.png';

const Top3 = ({ text1, text2, text3 }) => {

   return (
      <>
         <table>
            <thead>
               <tr className="highlight">
                  <td >
                     <img src={myImage2} alt="My Image" className="full-width" />
                     <div className="text-overlay">
                        <h2 >{text2}</h2>
                     </div>
                  </td>
                  <td>
                     <img src={myImage1} alt="My Image" className="full-width" />
                     <div className="text-overlay">
                        <h2 >{text1}</h2>
                     </div>
                  </td>
                  <td>
                     <img src={myImage3} alt="My Image" className="full-width" />
                     <div className="text-overlay">
                        <h2 >{text3}</h2>
                     </div>
                  </td>
               </tr>
            </thead>
         </table>
      </>
   );
};

export default Top3;