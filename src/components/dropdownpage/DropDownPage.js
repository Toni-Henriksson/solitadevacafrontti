import { React, useState} from 'react';
import "./dropdownpage.css";
import { Axios } from "axios";

const DropDownPage = () => {
    const [stationName, setStationName] = useState('');
    const [stationAddress, setStationaAdress] = useState('');
    const [stationCity, setStationCity] = useState('');
    const [stationOwner, setStationOwner] = useState('');
    const [stationCapacity, setStationCapacity] = useState('');

    const createStation = () => {
        Axios.post("https://solitadevaus.herokuapp.com/createStation", {
            Name: stationName,
            Adress: stationAddress,
            City: stationCity,
            Owner: stationOwner,
            Capacity: stationCapacity
        }).then((response) => {
            console.log("Station added!")
        });
    };

    return(
        <div className="dropdown-container">
            <p style={{alignSelf: 'center'}}>New station</p>
            <input placeholder='Station name' className='dropdownpage-searchbar' onChange={(e) => { setStationName(e.target.value) }}></input>
            <input placeholder='Station address' className='dropdownpage-searchbar' onChange={(e) => { setStationaAdress(e.target.value) }}></input>
            <input placeholder='Station city' className='dropdownpage-searchbar' onChange={(e) => { setStationCity(e.target.value) }}></input>
            <input placeholder='Station owner' className='dropdownpage-searchbar' onChange={(e) => { setStationOwner(e.target.value) }}></input>
            <input placeholder='Station capacity' className='dropdownpage-searchbar' onChange={(e) => { setStationCapacity(e.target.value) }}></input>
            <button className='button-main' onClick={()=> {createStation()}}>Submit</button>
        </div>
    )
}

export default DropDownPage