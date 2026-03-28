import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../conponents/includes/Navbar.jsx";
import Footer from "../../conponents/includes/Footer.jsx";
import Card from "../../conponents/ListingsComponents/ListingCard.jsx";

export default function Listings() {

    const [listings, setListings] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get("http://localhost:8000/listings");
                setListings(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, []);
    console.log(listings);

    if (error) {
        return <div>Error: {error}</div>;
    }
    if (loading) {
        return <h3> plese wait data is loding .........</h3>
    }
    return (
        <div>
            <div ><Navbar /> </div>
            <div>

                <h2 style={{ marginTop: "80px", textAlign: "center" }}>All Listings</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
                    {
                        listings.map((listing) => (

                            <Card key={listing._id} listing={listing} />


                        ))
                    }

                </div>



            </div>
            <Footer />
        </div>

    );
};