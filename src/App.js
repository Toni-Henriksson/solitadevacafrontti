import { useState } from "react";
import "./App.css";
import "./utils/globalstyles/mainbutton.css";
import Routes from "./components/routes/Routes";
import Stations from "./components/stations/Stations";

function App() {
  const [toggleNavigation, setToggleNavigation] = useState(true);
  return (
    <div className="App">
      <div className="header">
      {
          toggleNavigation ? 
          <h1>EXPLORE JOURNEYS</h1>
          :
          <h1>BROWSE STATIONS</h1>
        }
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
          <button className="button-main" style={{width: "8vw", fontSize: "20px"}} onClick={()=> {setToggleNavigation(true)}}>Journeys</button>
          <button className="button-main" style={{width: "8vw", fontSize: "20px"}} onClick={()=> {setToggleNavigation(false)}}>Stations</button>
        </div>
      </div>
    </div>
  );
}

export default App;
