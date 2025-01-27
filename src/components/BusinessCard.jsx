import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useState, useEffect } from "react";
import transit from "../assets/transit.png";
import a from '../assets/a.png';
import b from '../assets/b.png';
import c from '../assets/c.png';
import d from '../assets/d.png';

export default function BusinessCard() {
  const [data, setData] = useState([]);
  const images = [transit,a,b,c,d];

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
         { <img src={images[item.id-1]}/>} {item.name}
          <Card
            sx={{
              border: "1px solid orange",
              borderRadius: "8px",
              padding: 2,
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                sx={{ fontSize: 32, fontWeight: "bold", color: "orange" }}
              >
                {item.orders || 12}
              </Typography>

              <LinearProgress
                variant="determinate"
                value={item.progress || 2.6}
                sx={{
                  height: 6,
                  borderRadius: "4px",
                  backgroundColor: "#f0f0f0",
                  "& .MuiLinearProgress-bar": { backgroundColor: "orange" },
                  marginY: 1.5,
                }}
              />

              <Typography
                variant="body2"
                sx={{
                  fontSize: 14,
                  color: "gray",
                  textAlign: "left",
                }}
              >
                {item.progress || 2.6}%
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "gray",
                  textAlign: "right",
                }}
              >
                {item.target || 450}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
