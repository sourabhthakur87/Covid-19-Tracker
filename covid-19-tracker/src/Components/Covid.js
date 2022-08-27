import img from "./image.png"
import React, { useState } from 'react'


import "./Covid.css"
export default function Covid() {
    const [Data, setData] = useState([]);
    const [date, setDate] = useState([]);

    function handleChange() {
        var val = document.getElementById("vll").value;
        loding();
        async function fatchData() {
            const res = await fetch("https://api.covid19api.com/summary");
            const data = await res.json();
            let today = new Date().toDateString();
                setDate(today)

            if (val === "global") {
                document.getElementById("g").innerHTML = "Global";
                setData(data.Global);
            }
            else {
                setData(data.Countries[val]);
            }
        }
        fatchData();
    }



    function loding() {
        setTimeout(disableloder, 100);
    }
    
    function disableloder() {
        var n = document.getElementsByClassName('circle');
        for (let i = 0; i < n.length; i++) {
            n[i].style.display = "none";
        }
        var m = document.getElementsByClassName('data-c');
        for (let i = 0; i < m.length; i++) {
            m[i].style.display = "block";
        }
    }
    

    return (
        <>
            <div className="container flex">
                <img src={img} alt="" />
                <div className="right">
                    <select name="" id="vll" onChange={handleChange}>
                        <option selected disabled>Select the Country</option>
                        <option value="global">Global</option>
                        <option value="77">India</option>
                        <option value="131">Pakistan</option>
                        <option value="144">Russia</option>
                        <option value="36">China</option>
                    </select>
                    <div className="main-box">
                        <h1 id='g'>{Data.Country}</h1>
                        <div className="box-top flex">
                            <div className="box blue">
                                <div className="hed">Date</div>
                                <div className="data-D">{date}</div>
                                <div className="circle blue-L"></div>
                            </div>
                            <div className="box red">
                                <div className="hed">Total Cases</div>
                                <div className="data-c">{Data.TotalConfirmed}</div>
                               <div className="circle red-L"></div>

                            </div>
                            <div className="box green">
                                <div className="hed">Total Deaths</div>
                                <div className="data-c">{Data.TotalDeaths}</div>
                                <div className="circle green-L"></div>
                            </div>
                        </div>
                        <h1>Today's Situation</h1>

                        <div className="box-bottom flex">
                            <div className="box blue">
                                <div className="hed">New Cases</div>
                                <div className="data-c">{Data.NewConfirmed}</div>
                                <div className="circle blue-L"></div>
                            </div>
                            <div className="box red">
                                <div className="hed">New Deaths</div>
                                <div className="data-c">{Data.NewDeaths}</div>
                               <div className="circle red-L"></div>
                            </div>
                        </div>
                    </div>
                    <h2 id="link"><span>For More Details <a href="https://covid19.who.int/" target="">https://covid19.who.int/</a></span></h2>
                </div>
            </div>
        </>
    )
}

