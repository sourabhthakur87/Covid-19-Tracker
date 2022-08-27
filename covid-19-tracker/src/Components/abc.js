import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
const Abc = () => {
    const [my_data, setmy_data] = useState([]);
    const [my_search, setmy_search] = useState("");
    const getclick = () => {
        console.log("hello");
    }
    const searchinput = (e) =>{
        console.log(e.target.value);
        setmy_search(e.target.value)
    }
    const loadrecords = async() => {
        const da = await axios.get("https://api.covid19api.com/summary")
        setmy_data(da.data.Countries);
        console.log("fetched");
        // console.log(my_data);
    }
    useEffect(() => {
        loadrecords() 
    }, []);
  return (
    <div>
        <h1>hello</h1>
        <input type="text" onChange = {searchinput} />
        {/* {console.log(my_data)} */}
        {
            my_data.filter((val) => {
                if (my_search === ""){
                    return val;
                }
                else if (val.Country.toLowerCase().includes(my_search.toLowerCase())){
                    return val;
                }
            }).slice(0, 10).map((curr) => {
                return(
                    <>
                        <p>{curr.ID}</p>
                        <h1>{curr.Country}</h1>
                        <h1>{curr.NewDeaths}</h1>
                        <button className='myBtn' name = {curr.id} value = {curr.id} onClick = {getclick}>CLICK</button>
                    </>
                );
            })
        }
    </div>
  )
}
export default Abc;