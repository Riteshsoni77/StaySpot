import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";

export default function Navbar() {
  const authData = JSON.parse(localStorage.getItem("authData"));
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        {authData ? (
          <>
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("authData");
                  navigate("/");
                }}
              >
                Logout
              </button>
            </li>

            <li>
              <Link to="/listings/mylisting">MyListing</Link>
            </li>

            <li>
              <Link to="/listings/add">Add New Listings</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/user/auth">Sign In</Link>
            </li>

            <li>
              <Link to="/user/auth">Sign Up</Link>
            </li>

            <li>
              <Link to="/listings/add">Add New Listings</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
