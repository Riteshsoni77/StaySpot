import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css"
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
                    <a href="/home">Home</a>
                </li>
                {authData ? (
                    <>
                        <li>
                            <a
                                onClick={() => {
                                    localStorage.removeItem("authData");
                                    navigate("/home");
                                }}
                            >
                                Logout
                            </a>
                        </li>
                        <li>
                            <a href="/listings/mylisting">MyListing</a>
                        </li>
                        <li>
                            <a href="/listings/add">Add New Listings</a>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <a href="/user/auth">Sign In</a>
                        </li>
                        <li>
                            <a href="/user/auth">Sign Up</a>
                        </li>
                        <li>
                            <a href="/listings/add">Add New Listings</a>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};