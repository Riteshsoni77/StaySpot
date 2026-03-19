import { useState } from "react";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";
import Footer from "../../conponents/includes/Footer";
import Navbar from "../../conponents/includes/Navbar";
import axios from "axios";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";

export default function UpdateListings(){
const navigate = useNavigate();
      const location = useLocation();
      
      const listingdata = location.state?.listingdata;
      console.log(listingdata);
      const id=listingdata?._id;
   
    const [formData, setFormData] = useState({
    title: listingdata?.title || "",
    description: listingdata?.description || "",
    image: listingdata?.image || "",
    price: listingdata?.price || "",
    location: listingdata?.location || "",
    country: listingdata?.country || "",
});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.put(`http://localhost:8000/listings/${id}`, {
            listing: formData, 
        });
        
        console.log("Form Data Submitted Successfully:", response.data);
        alert("Listing update successfully!");
       
         navigate(`/listing/${id}`);


         setFormData({
            title: "",
            description: "",
            image: "",
            price: "",
            location: "",
            country: "",
        });
    } catch (error) {
        console.error("Error submitting form data:", error);
        alert("Failed to create listing. Please try again.");
    }
};

    return(
         <Box>
            <Navbar/>
        <Box
            sx={{
                Width: "100%",
                margin: "50px auto",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f9f9f9",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <Typography
                variant="h4"
                component="h2"
                align="center"
                gutterBottom
                sx={{ fontWeight: 600, color: "#222" }}
            >
                Update Listing
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                    <TextField
                        fullWidth
                        label="Title"
                        id="title"
                        name="title"
                        placeholder="Add a catchy title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </Box>
                <Box sx={{ mb: 3 }}>
                    <TextField
                        fullWidth
                        label="Description"
                        id="description"
                        name="description"
                        placeholder="Add a description"
                        value={formData.description}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        required
                    />
                </Box>
                <Box sx={{ mb: 3 }}>
                    <TextField
                        fullWidth
                        label="Image Link"
                        id="image"
                        name="image"
                        placeholder="Enter image URL/Link"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Price"
                            id="price"
                            name="price"
                            type="number"
                            placeholder="1200"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Country"
                            id="country"
                            name="country"
                            placeholder="ex- India"
                            value={formData.country}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                </Grid>
                <Box sx={{ mb: 3, mt: 3 }}>
                    <TextField
                        fullWidth
                        label="Location"
                        id="location"
                        name="location"
                        placeholder="ex- Jaipur, Rajasthan"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    
                    sx={{
                        padding: "10px",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        textTransform: "none",
                    }}

                >
                    Add
                </Button>
            </form>
        </Box>
        <Footer/>
        </Box>
    )
}