import { useState } from "react";
import "./App.css";
import "./utils/globalstyles/mainbutton.css";
import Routes from "./components/routes/Routes";
import Stations from "./components/stations/Stations";
import DropDownPage from "./components/dropdownpage/DropDownPage";

function App() {
  const [toggleNavigation, setToggleNavigation] = useState(true);
  const [toggleDropDown, setToggleDropDown] = useState("-25vw");

  return (
    <div className="App">
      <div className="header">
        <div className="header-section">
          <p>Helsinki City Bike app</p>
          <p>by Toni Henriksson</p>
        </div>
        {
          toggleNavigation ?
            <div>
              <h1>EXPLORE JOURNEYS</h1>
            </div>
            :
            <div>
              <h1>BROWSE STATIONS</h1>
            </div>
        }
        <div className="header-section">
          <div className="header-section-nav">
            <button className="button-main" onClick={() => { setToggleDropDown('0') }}>Add station</button>
            <div className="dropdown-page" style={{ right: toggleDropDown }}>
              <DropDownPage></DropDownPage>
              <button className="button-main" style={{width: '19vw', backgroundColor: 'cyan'}} onClick={() => { setToggleDropDown('-25vw') }}>close</button>
            </div>
          </div>
        </div>
      </div>

      <div className="content-container">
        {
          toggleNavigation ?
            <Routes></Routes>
            :
            <Stations></Stations>
        }
      </div>
      
      <div className="navigation-container">
        <div className="controls-wrapper">
          <button className="button-main" style={{ width: "8vw" }} onClick={() => { setToggleNavigation(true) }}>Journeys</button>
          <button className="button-main" style={{ width: "8vw" }} onClick={() => { setToggleNavigation(false) }}>Stations</button>
        </div>
      </div>
    </div>
  );
}

export default App;
