import { Button, Grid, Rating, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReviewForm({ id,onAddReview }) {
      const navigate = useNavigate();
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token=authData?.token;
    
  

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

    const handleRatingChange = (event, newValue) => {
        setFormData((prev) => ({
            ...prev,
            rating: newValue || 1,
        }));
    };
   
    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!authData) {
         alert("first login to add a review");
        
         
           navigate("/user/auth", { state: { from: `/listing/${id}` } });
        return;
    }

        try {

            const res = await axios.post(`http://localhost:8000/listings/${id}/reviews`,

                 {
                review: {
                    comment: formData.comment,
                    rating: formData.rating,
                }
            },
            {
                headers: {
                    Authorization: token,  
                }
            });
            console.log("Form Data Submitted Successfully:", res.data);
            alert("Review submitted successfully!");
              onAddReview(res.data.review);
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
                        onChange={handleRatingChange}
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