
import axios from "axios";
import { memo, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Card, CardContent, CardMedia, Grid, CircularProgress, Button, } from "@mui/material";
import Footer from "../../conponents/includes/Footer";
import Navbar from "../../conponents/includes/Navbar";
import Reviewform from "../../conponents/ListingsComponents/ReviewForm";
import { pink } from "@mui/material/colors";
import Reviewscard from "../../conponents/ListingsComponents/ReviewsCard";

export default function ShowlistingData() {
    const { id } = useParams();

    const [listingdata, setlistingdata] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    console.log(listingdata);

    const navigate = useNavigate();
    console.log(" this isthe riview state", reviews);



    const handleAddReview = (newReview) => {
        setReviews((prev) => [newReview, ...prev]);
    };

    const handleDeleteReview = (reviewId) => {
        setReviews((prev) =>
            prev.filter((r) => r._id !== reviewId)
        );
    };
    const handledDelete = async () => {
        try {

            await axios.delete(`http://localhost:8000/listings/${id}`);
            alert("Listing deleted successfully!");
            navigate("/");
        } catch (e) {
            console.log(`sonthing went wrong ${e}`);
            alert("Failed to delete the listing. Please try again.");
        }

    }
    const handleEdit = async () => {
        navigate("/update-listing", {
            state: { listingdata }
        });
    }
    useEffect(() => {

        const fetchListingData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/listings/${id}`);
                setlistingdata(response.data);
                setReviews(response.data.reviews);

            } catch (e) {
                console.log(`sonthing went wrong ....${e}`);
            } finally {
                setLoading(false);
            }
        };
        fetchListingData();

    }, [id,]);

    if (loading) return <h2>Loading...</h2>;

    if (error) return <h2>Error: {error}</h2>;
    return (
        <Box>
            <Navbar />
            <Box
                sx={{
                    maxWidth: "800px",
                    margin: "20px auto",
                    marginTop: "100px",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                }}
            >
                <Card>
                    <CardMedia
                        component="img"
                        height="400"
                        image={listingdata.image}
                        alt={listingdata.title}
                    />
                    <CardContent>
                        <Typography
                            variant="h4"
                            component="h2"
                            gutterBottom
                            sx={{ fontWeight: "bold", color: "#333" }}
                        >
                            {listingdata.title}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ marginBottom: "10px" }}
                        >
                            {listingdata.description}
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1">
                                    <strong>Price:</strong> ₹{listingdata.price}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1">
                                    <strong>Location:</strong> {listingdata.location}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1">
                                    <strong>Country:</strong> {listingdata.country}
                                </Typography>
                            </Grid>


                        </Grid>
                    </CardContent>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleEdit}

                        sx={{
                            marginLeft: "20px",
                            marginBottom: "10px",
                            padding: "10px",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            textTransform: "none",
                        }}

                    >
                        Edit
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handledDelete}
                        sx={{
                            marginLeft: "20px",
                            marginBottom: "10px",
                            padding: "10px",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            textTransform: "none",
                            backgroundColor: "red",
                        }}

                    >
                        Delete
                    </Button>
                </Card>

                <Grid sx={{ margin: "20px" }} ><Reviewform id={id} onAddReview={handleAddReview} /></Grid>



                <div style={{ display: "flex", flexWrap: "wrap", gap: "1px", justifyContent: "center" }}>
                    {reviews?.length > 0 ? (
                        reviews.map((review) => (

                            <Reviewscard id={listingdata._id}
                                review={review}
                                key={review?._id}
                                onDelete={() => handleDeleteReview(review._id)}
                            />

                        ))
                    ) : (
                        <Typography variant="body1" color="text.secondary">
                            No reviews available.
                        </Typography>
                    )
                    }
                </div>



            </Box>
            <Footer />

        </Box>

    )
};