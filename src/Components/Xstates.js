import React, { useEffect, useState } from "react";

const Xstates = () => {
    const[countries, setCountries]=useState([]);
    const[selectedCountry, setSelectedCountry]=useState("");

    const[states, setStates]=useState([]);
    const[selectedState, setSelectedState]=useState("");

    const[cities,setCities]=useState([]);
    const[selectedCity, setSelectedCity]=useState("");
     //dummy data for countries
    // const data=[1,2,3,4,5]
    const BASE_URL="https://crio-location-selector.onrender.com"


//======= Fecthing for Countires ========
    useEffect(()=>{
       const fetchCountiries=async()=>{
        try{
            const response=await fetch(`${BASE_URL}/countries`);
            const data=await response.json();
            setCountries(Array.isArray(data) ? data :[]) 
        }
        catch(err){
            console.error("Error while fetching coutnries: ", err)
        }
       }
       fetchCountiries();
    },[])
   

    //========= Fetching for Sates =========
    
    useEffect(()=>{
        if(selectedCountry){
            const fetchStates=async()=>{
                try{
                    const response=await fetch(`${BASE_URL}/country=${selectedCountry}/states`)
                    const data=await response.json();
                    setStates(Array.isArray(data) ? data :[]);
                    setSelectedState("");
                    setCities([]);
                    setSelectedCity("");
                    console.log("States data: ", data);
                }catch(err){
                    console.error("Error while fetching states: ", err);
                }
            }
            fetchStates();
         }
    
        
    },[selectedCountry])

    //========= Fetching for cities =========
    useEffect(()=>{
        if(selectedState){
            const fetchCities=async()=>{
            try{
                const response=await fetch(`${BASE_URL}/country=${selectedCountry}/state=${selectedState}/cities`);
                const data=await response.json();
                setCities(Array.isArray(data) ? data :[]);
                setSelectedCity("");
                console.log("Cities data: ",data)
            }catch(err){
                console.error("Fetching Cities: ",err)
            }
        }
        fetchCities();
        }
    },[selectedState, selectedCountry])
   

    const handleOnChangeCountries=(e)=>{
        setSelectedCountry(e.target.value);
    }
//=========Rendering for states=========
const handleOnChangeStates=(e)=>{
    setSelectedState(e.target.value);
}

//=========Rendering for states=========
const handleOnChangeCity=(e)=>{
    setSelectedCity(e.target.value);
}
//Build display String  to show the selected location=======
const displayString=()=>{
    if(selectedCity){
        return `You selected ${selectedCity}, ${selectedState},${selectedCountry}`;
    }else if(selectedState){
        return `You selected ${selectedState},${selectedCountry}`
    }else if(selectedCountry){
        return `You Selected ${selectedCountry}`
    }
    return "";
}
    return(
        <div>
            <h2>Select Location</h2>
            <select style={{margin:10}} value={selectedCountry} onChange={handleOnChangeCountries}>
                <option value="">Select Countries</option>
                {countries.map((country,ind)=>(
                    <option key={ind} value={country}>{country}</option>
                ))}
            </select>

             <select style={{margin:10}} value={selectedState} onChange={handleOnChangeStates} disabled={!selectedCountry}>
                <option value="">Select States</option>
                {states.map((state,ind)=>(
                    <option key={ind} value={state}>{state}</option>
                ))}
            </select>

             <select style={{margin:10}} value={selectedCity} onChange={handleOnChangeCity} disabled={!selectedState}>
                <option value="">Select City</option>
                {cities.map((city,ind)=>(
                    <option key={ind} value={city}>{city}</option>
                ))}
            </select>
            <div style={{margin:20, color:"grey", fontWeight:"bold"}}>
               
                {displayString() && <p>{displayString()}</p>}
            

            </div>
        </div>
    )
}
export default Xstates;