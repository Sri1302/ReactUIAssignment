import Header from "./components/Header";
import BusinessCard from "./components/BusinessCard";
import DayChecklist from "./components/DayCheckList";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { RiArrowDropDownLine } from "react-icons/ri";
import BasicMenu from "./components/BasicMenu";
import Box from "@mui/material/Box"; 

export default function App() {
  return (
    <div>
      <Header />
      <Stack direction={"row"} spacing={52} sx={{margin:2.7}}>
        <Stack direction={"row"} spacing={8}>
          <BasicMenu />
          <div>
            <Button variant="contained">Create Dashboard</Button>
          </div>
        </Stack>
        <Stack direction={"row"}>
          <div style={{ marginTop: 25 }}>
            <Typography variant="h5" style={{ fontWeight: 30 }}>
              Ticket Summary:
              <br />
              <span>
                <Typography variant="caption">
                  Last updated: 4 hours ago
                </Typography>
              </span>
            </Typography>
          </div>
          <Box
        sx={{
          padding: "16px",
          textAlign: "center",
          minWidth: "150px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          border:"2px solid gray",
          borderRight:"0px",
          borderTopRightRadius:"0px",
          borderBottomRightRadius:"0px"
        }}
      >
        <h3 style={{ margin: 0, fontSize: "16px", color: "black" }}>Open</h3>
        <h4 style={{ margin: 0, fontSize: "24px", color: "lightblue" }}>50</h4>
      </Box>
      <Box
        sx={{
          padding: "16px",
          textAlign: "center",
          minWidth: "150px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          border:"2px solid gray",
    

        }}
      >
        <h3 style={{ margin: 0, fontSize: "16px", color: "black" }}>
          In Progress
        </h3>
        <h4 style={{ margin: 0, fontSize: "24px", color: "orange" }}>120</h4>
      </Box>
      <Box
        sx={{
          padding: "16px",
          textAlign: "center",
          minWidth: "150px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          border:"2px solid gray ",
          borderLeft:"0px",
          borderBottomLeftRadius:"0px",
          borderTopLeftRadius:"0px"
        }}
      >
        <h3 style={{ margin: 0, fontSize: "16px", color: "black" }}>Waiting</h3>
        <h4 style={{ margin: 0, fontSize: "24px", color: "#e040fb" }}>120</h4>
      </Box>
        </Stack>
      </Stack>

      <br />

      <div style={{ marginLeft:30}}>
        <Typography variant="h4">Business view:</Typography>
        <Typography variant="caption">Last updated: 4 hours ago</Typography>
      </div>
      <br />
     
      <Stack direction="row" spacing={25}>
        <BusinessCard />
      </Stack>

      <br />
      <DayChecklist />
      <br />
      <DayChecklist />
    </div>
  );
}
