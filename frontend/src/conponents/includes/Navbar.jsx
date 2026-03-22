import logo from "../../assets/logo.png";
import "./Navbar.css"
export default  function Navbar(){

    
    return(

      <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Logo" />
            </div>
            <ul className="navbar-links">
                <li><a href="/">Home</a></li>
                <li><a href="/listings">All Listings</a></li>
                <li><a href="/listings/add">Add New Listings</a></li>
            </ul>
        </nav>
    );
};