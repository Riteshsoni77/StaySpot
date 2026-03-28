import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../conponents/includes/Navbar.jsx";
import Footer from "../../conponents/includes/Footer.jsx";
import Card from "../../conponents/ListingsComponents/ListingCard.jsx";

export default function Userlistings() {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get userId from localStorage
  const authData = JSON.parse(localStorage.getItem("authData") || "{}");
  const userId = authData?.user;        // ← This is already the ID (string)

  console.log("User ID from localStorage:", userId);

  useEffect(() => {
    const fetchUserListings = async () => {
      if (!userId) {
        setError("Please login to view your listings");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        const response = await axios.get("http://localhost:8000/listings/userlisting", {
          params: { userId },           // ← Sending userId correctly
        });

        setListings(response.data);
      } catch (err) {
        console.error("Error fetching user listings:", err);
        setError(
          err.response?.data?.message || 
          err.message || 
          "Failed to load your listings"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserListings();
  }, [userId]);

  // Loading State
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