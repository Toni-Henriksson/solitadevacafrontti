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
            clearForm();
        });

    };
    const clearForm = () => {
        setStationName('');
        setStationaAdress('');
        setStationCity('');
        setStationOwner('');
        setStationCapacity('');
    }

    return(
        <div className="dropdown-container">
            <p style={{alignSelf: 'center'}}>New station</p>
            <input placeholder='Station name' className='dropdownpage-searchbar' value={stationName} onChange={(e) => { setStationName(e.target.value) }}></input>
            <input placeholder='Station address' className='dropdownpage-searchbar' value={stationAddress} onChange={(e) => { setStationaAdress(e.target.value) }}></input>
            <input placeholder='Station city' className='dropdownpage-searchbar' value={stationCity} onChange={(e) => { setStationCity(e.target.value) }}></input>
            <input placeholder='Station owner' className='dropdownpage-searchbar' value={stationOwner} onChange={(e) => { setStationOwner(e.target.value) }}></input>
            <input placeholder='Station capacity' className='dropdownpage-searchbar' value={stationCapacity} onChange={(e) => { setStationCapacity(e.target.value) }}></input>
            <button className='button-main' onClick={createStation}>Submit</button>
            <p style={{color: 'red', alignSelf: 'center'}}>{message}</p>
        </div>
    )
}

export default DropDownPage