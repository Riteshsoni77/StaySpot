 import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Listings from "./pages/ListingPages/AllListings";
import ShowlistingData from "./pages/ListingPages/ShowListingData";
import Createlistings from "./pages/ListingPages/CreateListings";
import UpdateListings from "./pages/ListingPages/UpdateListings";
import Authentication from "./pages/Auth/Authentication";
import Userlistings from "./pages/ListingPages/userlistings";

function App() {
  
  return (
 <Router>
    <Routes>
       <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/user/auth" element={<Authentication/>} />
       <Route path="/home" element={<Listings/>} />
       <Route path="/listing/:id" element={<ShowlistingData/>} />
        <Route path="/listings/add" element={<Createlistings/>} />
         <Route path="/update-listing" element={<UpdateListings/>} />
         <Route path = "/listings/mylisting" element={<Userlistings/>}/>


    </Routes>
    </Router>
  
  )
}

export default App
