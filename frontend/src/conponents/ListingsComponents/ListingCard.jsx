import { useNavigate } from "react-router-dom";
import "./ListingCard.css";
export default function Card({ listing }) {
    console.log(" this is listings ", listing);
    const navigate = useNavigate();
    return (

        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>

            <div className="card"  key={listing._id} onClick={()=>{
                navigate(`/listing/${listing._id}`);
            }} >
                <img
                    className="cardImage"
                    src={listing.image}
                    alt={listing.title}
                />
                <div>
                <h2>{listing.title}</h2>
                {/* <p>{listing.description}</p> */}
                <p><strong>Price:</strong> ${listing.price}</p>
                <p><strong>Location:</strong> {listing.location}</p>
                </div>
            </div>

        </div>



    );
};