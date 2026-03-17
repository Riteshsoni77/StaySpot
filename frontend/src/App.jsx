 import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Listings from './pages/AllListings'


function App() {
  
  return (
 <Router>
    <Routes>
       <Route path="/" element={<Listings/>} />

    </Routes>
    </Router>
  
  )
}

export default App
