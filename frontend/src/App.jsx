 import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Listings from "./pages/ListingPages/AllListings";
import ShowlistingData from "./pages/ListingPages/ShowListingData";
import Createlistings from "./pages/ListingPages/CreateListings";
import UpdateListings from "./pages/ListingPages/UpdateListings";

function App() {
  
  return (
 <Router>
    <Routes>
       <Route path="/" element={<Listings/>} />
       <Route path="/listing/:id" element={<ShowlistingData/>} />
        <Route path="/listings/add" element={<Createlistings/>} />
         <Route path="/update-listing" element={<UpdateListings/>} />


    </Routes>
    </Router>
  
  )
}

export default App
