import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import img from "./image.png"
import "./Covid.css"

export default function Alldata() {
    const [date, setDate] = useState([]);

    const [my_data, setmy_data] = useState([]);
    const [my_, setmy_] = useState("0");
    const [my_search, setmy_search] = useState("");
    var xx = document.getElementById("txt");
    const searchinput = (e) => {
        var x = document.getElementById("txt").value;
        // console.log(e.target.value);
        setmy_search(x)
        setmy_("1")
        let today = new Date().toDateString();
        setDate(today);

        let circle = document.getElementsByClassName("circle");

        for (let index = 0; index < circle.length; index++) {
            circle[index].style.display = "none";

        }
    }

    const loadrecords = async () => {
        const da = await axios.get("https://api.covid19api.com/summary")
        setmy_data(da.data.Countries);     
    }
    useEffect(() => {
        loadrecords()
    }, []);

    function handleAnswerChange(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            var btn = document.getElementById("btn");
            btn.click();
            btn.style.background = "coral";
            btn.style.color = "white";
        }

    }
    return (
        <div>
            <div className="container flex">
                <img src={img} alt="" />
                <div className="right">
                    <input type="text" id='txt' onKeyPress={handleAnswerChange} />
                    <button id='btn' onClick={searchinput}  >Sumbit</button>
                    <div className="main-box">
                        <h1 id='g'>{ }</h1>
                        <div className="box-top flex">
                            <div className="box blue">
                                <div className="hed">Date</div>
                                <div className="data-D">{date}</div>
                                <div className="circle blue-L"></div>
                            </div>
                            <div className="box red">
                                <div className="hed" id='total_cases'>Total Cases</div>
                                <div className="data-c">{ }</div>
                                <div className="circle red-L"></div>

                            </div>
                            <div className="box green">
                                <div className="hed" id='total_deaths'>Total Deaths</div>
                                <div className="data-c">{ }</div>
                                <div className="circle green-L"></div>
                            </div>
                        </div>
                        <h1>Today's Situation</h1>

                        <div className="box-bottom flex">
                            <div className="box blue">
                                <div className="hed" id='new_cases'>New Cases</div>
                                <div className="data-c">{ }</div>
                                <div className="circle blue-L"></div>
                            </div>
                            <div className="box red">
                                <div className="hed" id='new_deaths'>New Deaths</div>
                                <div className="data-c">{ }</div>
                                <div className="circle red-L"></div>
                            </div>
                        </div>
                    </div>
                    <h2><span>For More Details <a href="https://covid19.who.int/" target="">https://covid19.who.int/</a></span></h2>
                </div>
            </div>




            {
                my_data.filter((val) => {
                    if (my_search === "") {
                        return val;
                    }
                    else if (val.Country.toLowerCase().includes(my_search.toLowerCase())) {
                        return val;
                    }
                }).slice(0, my_).map((curr) => {
                    return (
                        document.getElementById("g").innerHTML = curr.Country,
                        document.getElementById("total_cases").innerHTML = `Total Cases <br></br> ${curr.TotalConfirmed}`,
                        document.getElementById("total_deaths").innerHTML = `Total Deaths <br></br> ${curr.TotalDeaths}`,
                        document.getElementById("new_cases").innerHTML = `New Cases <br></br> ${curr.NewConfirmed}`,
                        document.getElementById("new_deaths").innerHTML = `New Deaths <br></br> ${curr.NewDeaths}`
                    );
                })
            }
        </div>
    )
}
