import { Button, Card, Grid, Rating, Typography } from "@mui/material";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function Reviewscard({ id, review, onDelete }) {
     const authData = JSON.parse(localStorage.getItem("authData"));
    
    const token=authData?.token;
    const userid=authData?.user;
    console.log( " thi sis user ",userid);
     
   
   
    console.log("this is riviews ",review);
    
    const handleDelete = async () => {
        try {

            await axios.delete(`http://localhost:8000/listings/${id}/reviews/${review._id}`,
          {      
   headers: {
    Authorization: token,
  }
     
         } );

            alert("review deleted successfully!");
            onDelete();

        } catch (e) {
            console.log(`sonthing went wrong ${e}`);
            alert("Failed to delete the review. Please try again.");
        }

    }
    return (

        <Card size="lg"
            sx={{

                height: "auto",

                margin: "20px",
                padding: "10px",
                width: "300px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",


            }}>
            <Grid container spacing={2}>

                <Grid item xs={12} >
                     <Rating
                        name="rating"
                        value={review?.rating}
                       
                    />

                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <strong>comment:</strong> {review?.comment}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <strong>user:</strong> {review?.user.name}
                    </Typography>
                </Grid>
                
            </Grid>
          
            { userid===review.user?._id?<Button variant="contained" onClick={handleDelete}>
                Delete
            </Button>:<> </>}

        </Card>
    )


}