
import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import "./showListingData.css";

export default function ShowlistingData() {
    const { id } = useParams();
    const [listingdata, setlistingdata] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchListingData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/listings/${id}`);
                setlistingdata(response.data);

            } catch (e) {
                console.log(`sonthing went wrong ....${e}`);
            } finally {
                setLoading(false);
            }
        };
        fetchListingData();
    }, [id]);

    if (loading) return <h2>Loading...</h2>;

    if (error) return <h2>Error: {error}</h2>;
    return (



        <div className="showcard"  key={listingdata._id} >
            <img
                className="showcardImage"
                src={listingdata.image}
                alt={listingdata.title}
                style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                }}
            />
            <div className="showcarddata">
                <h2>{listingdata.title}</h2>
                {/* <p>{listing.description}</p> */}
                <p><strong>Price:</strong> ${listingdata.price}</p>
                <p><strong>Location:</strong> {listingdata.location}</p>
            </div>
        </div>







    )
}