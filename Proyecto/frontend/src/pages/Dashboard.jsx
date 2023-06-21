
import React, { useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ChartPie from '../components/ChartPie'
import ChartBar from '../components/ChartBar'
import Top3 from '../components/Top3'
import '../styles/style.scss'
import Clock from '../components/Clock.jsx';
const theme = createTheme({
   typography: {
      poster: {
      fontSize: 52,
      color: 'red',
      animation: 'move 4s linear infinite'
      },
      // Disable h3 variant
      h3: undefined,
   },
   components: {
      MuiTypography: {
      defaultProps: {
         variantMapping: {
         // Map the new variant to render a <h1> by default
         poster: 'h1',
         },
      },},},});
      
const Dashboard = () => {
   const [report1, setReport1] = useState([]);
   const [report2, setReport2] = useState([]);
   const [report3, setReport3] = useState([]);
   const [municipios, setMunicipios] = useState([]);
   const [departamentos, setDepartamentos] = useState([]);
   const [option, setOption] = useState('Departamento');
   const [select, setSelcet] = useState('');


   const [report4, setReport4] = useState([]);
   const [report5, setReport5] = useState([]);

   const handleChange = (event) => {
      setOption(event.target.value);
      setSelcet('');
   };

   const handleChangeSelect = (event) => {
      setSelcet(event.target.value);
   };
   const rows = [];
   for (let i = 0; i < 50; i++) {
      rows.push(
      <tr>
         <td>fila</td>
         <td>sede</td>
         <td>municipio</td>
         <td>departamento</td>
         <td>papeleta</td>
         <td>departamento</td>
      </tr>
      );
   }

   useEffect(() => {
      const url = `http://${process.env.REACT_APP_BACKEND}:8080/mysql`;
      const url2 = `http://${process.env.REACT_APP_BACKEND}:8080/redis`;
      console.log("Conectadno API:", url)
      const fetchData = async () => {
         try{
            const response = await fetch(url);
            const data = await response.json();
            const mysqlData = data.mysql;

            const response2 = await fetch(url2);
            const data2 = await response2.json();
            var redisData = data2.redis;

            //reporte1
            setReport1(mysqlData)

            //reporte2
            const filterPresidente = mysqlData.filter(item => item.papeleta === "Blanca")
            const freq1 = {};
            for (const item of filterPresidente) {
               freq1[item.departamento] = (freq1[item.departamento] || 0) + 1;
            }
            const freqArray1 = Object.entries(freq1);
            freqArray1.sort((a, b) => b[1] - a[1]);
            setReport2(freqArray1.slice(0, 3).map(item => item));

            //reporte
            setReport3(mysqlData)
            setMunicipios([...new Set(mysqlData.map(item => item.municipio))])
            setDepartamentos([...new Set(mysqlData.map(item => item.departamento))])

            // redisData = [
            //    {
            //       sede: 8,
            //       municipio: 'Flores',
            //       departamento: 'Peten',
            //       papeleta: 'Blanca',
            //       partido: 'CAMBIA GUATE'
            //    },
            //    {
            //       sede: 7,
            //       municipio: 'Flores',
            //       departamento: 'Guatemala',
            //       papeleta: 'Blanca',
            //       partido: 'CAMBIA GUATE'
            //    },
            //    {
            //       sede: 8,
            //       municipio: 'Flores',
            //       departamento: 'Peten',
            //       papeleta: 'Blanca',
            //       partido: 'CAMBIA GUATE'
            //    },
            //    {
            //       sede: 9,
            //       municipio: 'Flores',
            //       departamento: 'Izabal',
            //       papeleta: 'Verde',
            //       partido: 'CAMBIA'
            //    },
            //    {
            //       sede: 9,
            //       municipio: 'Flores',
            //       departamento: 'Izabal',
            //       papeleta: 'Verde',
            //       partido: 'CAMBIA'
            //    }
            // ];
            //reporte4
            const freq2 = {};
            for (const item of redisData) { freq2[item.sede] = (freq2[item.sede] || 0) + 1; }
            const freqArray2 = Object.entries(freq2);
            freqArray2.sort((a, b) => b[1] - a[1]);
            const noSede =  freqArray2.slice(0, 5).map(item => item)
            const datosReporte = noSede.map(item => {
               const valor = redisData.filter(item2 => item2.sede.toString() === item[0]);
               return {
                  ...valor[0],
                  value: item[1],
               }
            });

            setReport4(datosReporte);

            //reporte5
            setReport5(redisData.sort((a, b) => parseInt(b.id) - parseInt(a.id)).slice(0, 5))
            console.log("===== Get =====")
         }catch(error){
            console.log("===== Get Err =====\n",error)
         }
      }
      const interval = setInterval(fetchData, 5000);
      return () => clearInterval(interval);
   }, []);
   return (
      <div >
         <ThemeProvider theme={theme}>
               <Typography variant="poster">VISUALIZADOR DE VOTOS EN ELECCIONES </Typography>
         </ThemeProvider>
         <br />
         <Typography variant="h4" color="black" align="center">Datos almacenados en MySQL</Typography>
         <br />
         <div id="div1">
            <table border="1">
               <thead>
                  <tr>
                     <th>fila</th>
                     <th>sede</th>
                     <th>municipio</th>
                     <th>departamento</th>
                     <th>papeleta</th>
                     <th>PARTIDO</th>
                  </tr>
               </thead>
               <tbody >
                  {/* {rows} */}
                  {
                     report1.map((item, index) => {
                        return (
                           <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.sede}</td>
                              <td>{item.municipio}</td>
                              <td>{item.departamento}</td>
                              <td>{item.papeleta}</td>
                              <td>{item.partido}</td>
                           </tr>
                        )
                     })
                  }
               </tbody>
            </table>
         </div>

         <h2>Top 3 de departamentos con mayores votos para presidente, en MySQL.</h2>
         <div >
            <ol>
               {
                  report2.length > 0 &&
                  <>
                     {report2[0] && <li>{report2[0][0]} valor: {report2[0][1]}</li>}
                     {report2[1] && <li>{report2[1][0]} valor: {report2[1][1]}</li>}
                     {report2[2] && <li>{report2[2][0]} valor: {report2[2][1]}</li>}
                  </>
               }
            </ol>
         </div>

         {
            report2.length > 0 &&
            <div id="div3">
            <Top3
               text1={report2.filter(item => item)[0]?.[0]} //si no tiene algun valor en la posicion X va a mandar un 0 objeto sin valor
               text2={report2.filter(item => item)[1]?.[0]}
               text3={report2.filter(item => item)[2]?.[0]}
            />
            </div>
         }

         <h2>Porcentaje de votos por partido, según municipio, y departamento, en MySQL. </h2>
         <center>
            <FormControl style={{  backgroundColor: "white", border: "black 1px solid", padding: "1%" }} >
               <FormLabel id="demo-radio-buttons-group-label">Grafica por:</FormLabel>
               <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={option}
                  onChange={handleChange}
               >
                  <FormControlLabel value="Departamento" control={<Radio />} label="Departamento" />
                  <FormControlLabel value="Municipio" control={<Radio />} label="Municipio" />
               </RadioGroup>
            </FormControl>

            <br /><br />
            <FormControl style={{ width: "80%", backgroundColor: "white" }} >
               <InputLabel id="demo-simple-select-label">Selección</InputLabel>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={select}
                  label="Selección"
                  onChange={handleChangeSelect}
               >
                  {
                     option === "Departamento" ? departamentos.map((item, index) => {
                        return (
                           <MenuItem key={index} value={item}>{item}</MenuItem>
                        )
                     }) : municipios.map((item, index) => {
                        return (
                           <MenuItem key={index} value={item}>{item}</MenuItem>
                        )
                     })
                  }
               </Select>
            </FormControl>
            <br /><br />
         </center>
         <ChartPie dataE={report3} option={option} select={select}/>

         <h2>5 sedes con mayores votos almacenados en Redis.</h2>
         <div style={{width:"90%",margin: "auto",border: "black 1px solid", padding: "2%"}}>
            {
               report4.length > 0 &&
               <ChartBar dataE={report4} />

            }
         </div>
         <br />
         <div id="div5" >
            <table border="1">
               <thead>
                  <tr>
                     <th>fila</th>
                     <th>sede</th>
                     <th>municipio</th>
                     <th>departamento</th>
                     <th>papeleta</th>
                     <th>PARTIDO</th>
                     <th>cantidad</th>
                  </tr>
               </thead>
               <tbody >
                  {
                     report4.map((item, index) => {
                        return (
                           <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.sede}</td>
                              <td>{item.municipio}</td>
                              <td>{item.departamento}</td>
                              <td>{item.papeleta}</td>
                              <td>{item.partido}</td>
                              <td>{item.value}</td>
                           </tr>
                        )
                     })
                  }
               </tbody>
            </table>
         </div> 

         <h2>Últimos 5 votos almacenados en Redis</h2>
         <div id="div5">
            <table border="1">
               <thead>
                  <tr>
                     <th>fila</th>
                     <th>sede</th>
                     <th>municipio</th>
                     <th>departamento</th>
                     <th>papeleta</th>
                     <th>PARTIDO</th>
                  </tr>
               </thead>
               <tbody >
                  {
                     report5.map((item, index) => {
                        return (
                           <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.sede}</td>
                              <td>{item.municipio}</td>
                              <td>{item.departamento}</td>
                              <td>{item.papeleta}</td>
                              <td>{item.partido}</td>
                           </tr>
                        )
                     })
                  }
               </tbody>
            </table>
         </div>

         <br /><br /><br /><br /><br /><br /><br /><br />
         <Clock/>
      </div>
   );
};
export default Dashboard;