import { React, useState} from 'react';
import "./dropdownpage.css";
import axios from "axios";

const DropDownPage = () => {
    const [stationName, setStationName] = useState('');
    const [stationAddress, setStationaAdress] = useState('');
    const [stationCity, setStationCity] = useState('');
    const [stationOwner, setStationOwner] = useState('');
    const [stationCapacity, setStationCapacity] = useState('');

    const [message, setMessage] = useState('');

    const createStation = () => {
        axios.post("https://solitadevaus.herokuapp.com/createStation", {
            Name: stationName,
            Adress: stationAddress,
            City: stationCity,
            Owner: stationOwner,
            Capacity: stationCapacity,
        }).then((response) => {
            setMessage('Station added!')
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
            <button className='button-main' onClick={createStation}>Submit</button>
            <p style={{color: 'red', alignSelf: 'center'}}>{message}</p>
        </div>
    )
}

export default DropDownPage