import React, { useState } from 'react';
import axios from 'axios'


export default function Search(props) {
    const [city, setCity] = useState('')
    const [weather, setWeather] = useState(null)
    const [searches, setSearches] = useState(null)


    async function search(e) {
        e.preventDefault();

        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=38f67b980bfa9d2c24c44aa550c0fd25`)
            .then((response) => {
                return response.json();
            })
            .then((weatherData) => {
                setWeather(weatherData.weather[0])
                const search = {
                    name: weatherData.name,
                    description: weatherData.weather[0].description,
                    icon: weatherData.weather[0].icon,
                    main: weatherData.weather[0].main
                }
                const token = localStorage.getItem('serverToken')
                if (token == undefined) {
                    alert("you first have to login")
                    props.history.push("/login")
                }
                return axios.post('http://localhost:3000/search/saveWeatherSearch', {
                    search
                }, {
                    headers: {
                        'Authorization': `token ${token}`
                    }

                })
                    .then(function (response) {
                        debugger
                        console.log(response);
                    })
            }).catch(function (error) {
                console.log(error.message)
                if (error.status == 404) {
                    return props.history.push("/login")
                }
                else alert("there is no such city or country")
            })
    }

    function handlerCity(e) {
        setCity(e.target.value)
    }

    function getSearches(e) {

        e.preventDefault();
        const token = localStorage.getItem('serverToken')
        if (token == undefined) {
            alert("you first have to login")
        }
        axios.get('http://localhost:3000/search/getSearches', {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then(function (response) {
                setSearches(response)
            })
            .catch(function (error) {
                console.log(error);
                if (error.status == 404) {
                    return props.history.push("/login")
                }
            })
    }

    return (

        <>
            <form >
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Country Or City</label>
                    <input className="form-control mb-3" onChange={handlerCity} placeholder="City..."></input>
                </div>
                <button onClick={search} className="btn btn-primary">search</button>
                <div style={{ width: "5px", height: "auto", display: "inline-block" }}></div>
                <button onClick={getSearches} className="btn btn-primary " >get searches</button>
            </form>

            {weather ?
                <>
                    <h2>
                        <label>the weather is:</label>
                        &nbsp;
                        {weather.main}
                        <br></br>
                        <label>description: </label>
                        &nbsp;
                        {weather.description}
                        <br></br>
                        <img style={{ width: "100px" }} src={` http://openweathermap.org/img/w/${weather.icon}.png`} /></h2>
                </>
                : ""
            }
            {searches ?
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Country</th>
                            <th scope="col">weather</th>
                            <th scope="col">description</th>
                            <th scope="col">img</th>

                        </tr>
                    </thead>
                    <tbody>
                        {searches.data.users.searches.map((s, index) => (
                            <tr key={s._id}>
                                <th scope="row">{index}</th>
                                <td>{s.name}</td>
                                <td>{s.main}</td>
                                <td>{s.description}</td>
                                <td><img src={` http://openweathermap.org/img/w/${s.icon}.png`} ></img></td>
                            </tr>
                        ))}
                    </tbody>
                </table> : ""}
        </>
    )
}




