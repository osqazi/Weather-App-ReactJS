import { useState } from 'react';
import bgpic from './images/bg-pic.jpg';

function App() {
  let [city, setCity]=useState('');
  let [showWthr, setShowWthr]=useState(false);
  let [temp, setTemp]=useState();
  let [humid, setHumid]=useState();
  let [windSpd, setWindSpd]=useState();
  let [citName, setCitName]=useState();
  let [feel, setFeel]=useState();
  let [weath, setWeath]=useState();
  let [icon, setIcon]=useState();
  let [country, setCountry]=useState();


  let getResp=()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=104f8218dcb5bd63f90398a4f3fe5512&units=metric`)
  .then((res)=>res.json())
  .then ((finalRes)=>{
    console.log(finalRes)
    if(finalRes.cod==404 || finalRes.cod==400){
      setShowWthr(false)

    } else{
      setShowWthr(true)     
      setTemp(finalRes.main.temp)
      setHumid(finalRes.main.humidity)
      setWindSpd(finalRes.wind.speed)
      setCitName(finalRes.name)
      setFeel(finalRes.main.feels_like)
      setWeath(finalRes.weather[0].description)
      setIcon(finalRes.weather[0].icon)
      setCountry(finalRes.sys.country)
      console.log(finalRes.weather[0].icon)


    }
    
    
  })
  }


  
  return (
    <div className="h-screen flex justify-center items-center">      
    <div className='flex absolute gap-2 top-36'>      
      <input type='text' name='city' placeholder='Enter City Name' value={city} className='placeholder-white p-2 text-lg bg-transparent border h-10 w-64 rounded-md text-white' onChange={(e)=>setCity(e.target.value)}></input>
      <button className='bg-blue-600 text-white w-24 rounded-md hover:bg-blue-500' onClick={getResp}>Check</button>
      </div>
      <div><img src={bgpic} className='h-screen w-screen'></img></div>            
      <div className='bg-blue-800 h-[340px] w-[375px] rounded-3xl shadow-lg shadow-gray-500 flex p-6 absolute opacity-85'>
      <div className={`text-white text-5xl ${(!showWthr) ? '' : 'hidden'} flex`}>No Data Found</div>
        <div className={`absolute h-[375] w-[375] flex ${(!showWthr) ? 'hidden' : ''}`}>        
        <div className='text-white text-5xl flex'>{citName}</div><div className='text-white text-xl my-5 mx-2 flex'>{country}</div>
        <div className="my-16 absolute text-5xl font-bold text-white w-full flex">{temp}°C</div>
        <img src={`http://openweathermap.org/img/w/${icon}.png`} className="absolute fill-transparent h-[350px] w-[200px] my-4 mx-36"></img>
        <div className="my-36 absolute text-xl text-white w-64 flex">Feels Like: {feel}°C</div>
        <div className='text-white text-xl absolute my-44' >{weath}</div>                
        <div className="my-52 absolute text-xl text-white flex w-80">Humidity: {humid}%</div>
        <div className="my-60 absolute text-xl text-white w-80">Wind Speed: {windSpd}</div>
        </div>
        
        
      
      </div>
    </div>
   
  );
}

export default App;
