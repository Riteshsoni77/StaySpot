import { Button, Grid, Rating, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function ReviewForm({ id }) {
    console.log(" hi this the review ");

    const [formData, setFormData] = useState({
        comment: "",
        rating: 2,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {

            const res = await axios.post(`http://localhost:8000/listings/${id}/reviews`,

                {
                    review: {
                        comment: formData.comment,
                        rating: formData.rating
                    }
                });
            console.log("Form Data Submitted Successfully:", res.data);
            alert("Listing created successfully!");
        } catch (e) {
            console.log(" ratin  is faild");
            alert("Failed to create listing. Please try again.");
        }

    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <h2>Leave a Review</h2>
                <Rating
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                />
                <br />
                <TextField
                    id="outlined-multiline-static"
                    label="Your Review"
                    name="comment"
                    multiline
                    rows={4}
                    value={formData.comment}
                    onChange={handleChange}
                    fullWidth
                />
                <br />
                <Button type="submit" variant="contained">
                    Submit
                </Button>
            </Grid>
            
        </form>
      


        </div>
       
     
    );
};