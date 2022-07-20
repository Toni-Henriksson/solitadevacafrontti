import { React, useState, useEffect } from 'react';
import "./stations.css";
import axios from "axios";
import postitImageDark from '../routes/images/card_dark.png';
import { HandleSearch } from '../../utils/reusablefunctions/HandleSearch';

const Stations = () => {
  const [listOfStations, setListOfStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(0);

  const [searchStation, setSearchStation] = useState([]);
  const [searchedStation, setSearchedStation] = useState('');
  const [toggleSearch, setToggleSearch] = useState(false);
  const [stationJourneyData, setStationJourneyData] = useState([]);

  useEffect(() => {
    fetchNextPage(next);
  }, [])

  const fetchNextPage = async (next) => {
    setLoading(true);
    axios.get("http://localhost:3001/getStations", { params: { next } }).then((response) => {
      setListOfStations(response.data)
      setLoading(false);
    })
  }

  const handlePagination = (numOfPages) => {
    let i = next + numOfPages;
    if (i >= 0) {
      setNext(i)
      fetchNextPage(i)
    }
  }
  const handleSearch = async (stationName) => {
    axios.get("http://localhost:3001/getStationByName", { params: { stationName } }).then((response) => {
      calculateStationJourneys(response.data[0].ID)
      setSearchStation(response.data);
      setToggleSearch(true);
    })
  }

  const calculateStationJourneys = (stationid) => {
    axios.get("http://localhost:3001/getStationJourneys", { params: { stationid } }).then((response) => {
      setStationJourneyData(response.data)
    })
  }
  if (loading) {
    return (
      <div style={{ alignself: 'center' }}>
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <div>
      <div className='stations-controls'>
        <input placeholder='Search station by name..' className='searchbar' onChange={(e) => { setSearchedStation(e.target.value) }}></input>
        <button className='button-main' onClick={() => handleSearch(searchedStation)}>search</button>
      </div>
      <div className="stations-list-wrapper">
        {
          toggleSearch ?
            <div>
                <div className="single-station-card">
                  <p>Name: {searchStation[0]?.Nimi}</p>
                  <p>Address: {searchStation[0]?.Osoite}</p>
                  <p>City: {searchStation[0]?.Kaupunki}</p>
                  <p>Owner: {searchStation[0]?.Operaattor}</p>
                  <p>Capasity: {searchStation[0]?.Kapasiteet}</p>
                  <p>X-Location: {searchStation[0]?.x}</p>
                  <p>Y-Location: {searchStation[0]?.y}</p>
                  <p>Total departures: {stationJourneyData[0]?.departures}</p>
                  <p>Total returns: {stationJourneyData[0]?.returns}</p>
                </div>
              <div className="single-station-controls">
                <button className='button-main' onClick={() => setToggleSearch(false)}>Close</button>
              </div>
            </div>
            :
            listOfStations.map((station, id) => {
              return (
                <div key={id} className="station-item" onClick={() => handleSearch(station.Nimi)}>
                  <div className="station-item-section" style={{ backgroundImage: `url(${postitImageDark})`, backgroundRepeat: `no-repeat`, backgroundSize: `cover` }}>
                    <p>STATION</p>
                    <p>Station name: {station.Nimi}</p>
                    <p>Stations address: {station.Osoite}</p>
                    <p style={{color: 'green', fontSize: '20px'}}>Click me to see more!</p>
                  </div>
                </div>
              );
            })
        }
        <div className="pagination-section">
          <button className="button-main" style={{ backgroundColor: 'cyan' }} onClick={() => { handlePagination(-6) }}>last</button>
          <button className="button-main" style={{ backgroundColor: 'cyan' }} onClick={() => { handlePagination(6) }}>next</button>
        </div>
      </div>
    </div>
  );
};

export default Stations;