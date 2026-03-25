import logo from "../../assets/logo.png";
import "./Navbar.css"
export default  function Navbar(){

    
    return(

      <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Logo" />
            </div>
            <ul className="navbar-links">
                <li><a href="/home">Home</a></li>
                <li><a href="user/Auth">SignIN</a></li>
                <li><a href="user/Auth">SignUP</a></li>
                <li><a href="/listings/add">Add New Listings</a></li>
            </ul>
        </nav>
    );
};