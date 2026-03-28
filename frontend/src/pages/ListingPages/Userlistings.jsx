import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../conponents/includes/Navbar.jsx";
import Footer from "../../conponents/includes/Footer.jsx";
import Card from "../../conponents/ListingsComponents/ListingCard.jsx";

export default function Userlistings() {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const authData = JSON.parse(localStorage.getItem("authData") || "{}");
  const userId = authData?.user; 
  const token=authData?.token;      
  console.log("User ID from localStorage:", userId);

  useEffect(() => {
  const fetchUserListings = async () => {
    try {

      const res = await axios.get(
        `http://localhost:8000/listings/mylisting/${userId}`,
        {
            
          headers: {
            Authorization: token,
          }
         
        }
      );
        console.log(res.data);
      setListings(res.data);
    } catch (e) {
      setError("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  fetchUserListings();
}, []);

  
  if (loading) {
    return (
      <div>
        <Navbar />
        <h3 style={{ textAlign: "center", marginTop: "100px" }}>
          Loading your listings...
        </h3>
        <Footer />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: "center", marginTop: "100px", color: "red" }}>
          Error: {error}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div style={{ marginTop: "80px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          My Listings
        </h2>

        {listings.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "18px" }}>
            You haven't created any listings yet.
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            {listings.map((listing) => (
              <Card key={listing._id} listing={listing} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}