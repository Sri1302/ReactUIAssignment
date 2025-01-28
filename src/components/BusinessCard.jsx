import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useState, useEffect } from "react";
import transit from "../assets/transit.png";
import a from "../assets/a.png";
import b from "../assets/b.png";
import c from "../assets/c.png";
import d from "../assets/d.png";

export default function BusinessCard() {
  const [data, setData] = useState([]);
  const images = [transit, a, b, c, d];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://679474ccaad755a134e9896e.mockapi.io/screen/businessview"
        );
        setData(response.data);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };
    fetchData();
  }, []);

  return (
    <Grid
      container
      spacing={2}
      padding={1}
      justifyContent="center"
      alignItems="center"
    >
      {data.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={item.id}>
          <div>
            <img
              src={images[item.id - 1]}
              style={{ marginRight: 5, marginLeft: 6 }}
            />
            {/* <Typography
            variant="h6"
            sx={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#333",
              marginBottom: 1,
              marginLeft:5,
              textAlign: "left",
            }} */}
            {item.name}
          </div>
          <Card
            sx={{
              border: "1px solid orange",
              borderRadius: "8px",
              padding: 2,
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              width: "100%", // Ensures the card takes up the full width of its container
              maxWidth: "300px", // Optional: Sets a max width to prevent cards from being too wide
              margin: "auto", // Centers the card within the grid item
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                sx={{
                  fontSize: 38,
                  fontWeight: "bold",
                  color: "orange",
                  textAlign: "left",
                  marginLeft: 0.2,
                  marginBottom: 0,
                }}
              >
                {item.orders || 12}
              </Typography>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: 18,
                    color: "gray",
                  }}
                >
                  {item.progress || 2.6}%
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "gray",
                  }}
                >
                  {item.target || 450}
                </Typography>
              </div>

              <LinearProgress
                variant="determinate"
                value={item.progress || 2.6}
                sx={{
                  height: 6,
                  borderRadius: "4px",
                  backgroundColor: "#f0f0f0",
                  "& .MuiLinearProgress-bar": { backgroundColor: "orange" },
                  marginY: 0.4,
                }}
              />

             
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
