import { React, useState, useEffect} from 'react';
import "./routes.css";
import axios from "axios";
import { Round, SecToMinutes } from '../../utils/reusablefunctions/CalculationHelpers';

const Routes = () => {
  // Basic states for pagination ect.
  const [listOfRoutes, setListOfRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(0);

  // Single joyrney view
  const [toggleSearch, setToggleSearch] = useState(false);
  const [searchedJourney, setSearchedJourney] = useState('');
  const [journeyData, setJourneyData] = useState([]);
  const [singleJourneyCalculations, setSingleJourneyCalculations] = useState([]);

  useEffect(() => {
    fetchNextPage(next);
  }, [])

  const fetchNextPage = async (next) => {
    setLoading(true);
    axios.get("https://solitadevaus.herokuapp.com/getNextData", { params: { next } }).then((response) => {
      setListOfRoutes(response.data)
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

  const HandleSearch = async (stationName) => {
    axios.get("https://solitadevaus.herokuapp.com/getStationByName", { params: { stationName } }).then((response) => {
      setJourneyData(response.data);
      calculateStationJourneys(response.data[0].ID);
    })
  }

  const calculateStationJourneys = (stationid) => {
    axios.get("https://solitadevaus.herokuapp.com/getStationJourneys", { params: { stationid } }).then((response) => {
      setSingleJourneyCalculations(response.data)
      setToggleSearch(true)
    })
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <div className='stations-controls'>
        <input placeholder='Search journey by start location..' className='searchbar' onChange={(e) => { setSearchedJourney(e.target.value) }}></input>
        <button className='button-main' onClick={() => HandleSearch(searchedJourney)}>search</button>
      </div>
      <div className="routes-list-wrapper">
        {
          toggleSearch ?
          <div className='route-search-container'>
            <div className='single-station-card'>
              <div className='station-title'>
                <p>{journeyData[0].Name}</p>
              </div>

              <div className='station-content'>
                <p>Departures from here: {singleJourneyCalculations[0].departures}</p>
                <p>Returns to this location: {singleJourneyCalculations[0].returns}</p>
              </div>
              
              <div className="single-station-controls">
                <button className='button-main' onClick={() => setToggleSearch(false)}>Close</button>
              </div>
            </div>
          </div>
            :
            listOfRoutes.map((route, id) => {
              return (
                <div key={id} className="route-card">

                  <div className="route-item-section">
                    <p style={{color: 'green'}}>{route.departurestation}</p>
                  </div>

                  <div className="route-item-section">
                      <p style={{color: 'red'}}>{route.returnstation}</p>
                  </div>

                  <div className="route-item-section">
                      <p>Distance: { Round(parseFloat(route.distance)/1000, 1) + 'km' }</p>
                  </div>

                  <div className="route-item-section">
                      <p>Duration: { Round(SecToMinutes(parseFloat(route.duration)), 1) + 'min'}</p>
                  </div>

                </div>
              );
            })}
        <div className="pagination-section">
          <button className="button-main" style={{ backgroundColor: 'cyan' }} onClick={() => { handlePagination(-8) }}>last</button>
          <button className="button-main" style={{ backgroundColor: 'cyan' }} onClick={() => { handlePagination(8) }}>next</button>
        </div>
      </div>
    </div>
  );
};

export default Routes;