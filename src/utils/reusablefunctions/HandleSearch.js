import axios from "axios";

export const HandleSearch = async(parameter, endpoint, {setFetchedJourney}) => {
    axios.get("http://localhost:3001/" + endpoint, { params: { parameter } }).then((response) => {  
      setFetchedJourney(response.data)
    })
}
