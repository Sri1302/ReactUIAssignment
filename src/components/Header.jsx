import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import logo from "../assets/Logo.png";
import contact from "../assets/contact.png";
import profile from "../assets/profile.png";
import question from "../assets/question.png";
import setting from "../assets/setting.png";

const drawerWidth = 240;
const navItems = [
  "Dashboard",
  "Exception",
  "Investigation",
  "Datasource",
  "Distribution",
  "Fix",
  "Audit Trails",
  " ",
  " ",
  " ",
  " ",
  <img src={contact} alt="Contact" />,
  <img src={question} alt="Question" />,
  <img src={setting} alt="Setting" />,
  <img src={profile} alt="Profile" />,
];

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeButton, setActiveButton] = React.useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleButtonClick = (index) => {
    setActiveButton(index);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", marginTop: 1 }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} sx={{ color: "#000" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        position="fixed" // Set header to be fixed
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          zIndex: 1201, // Ensure it stays above other content
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <img src={logo} alt="Logo" style={{ marginTop: 7 }} />
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, index) => (
              <Button
                key={index}
                sx={{
                  color: "#000",
                  textDecoration:
                    activeButton === index ? "underline" : "none", // Apply underline to active button
                  textDecorationColor: "blue", // Blue color for underline
                  textDecorationThickness: activeButton === index ? "3px" : "none", // Thicker underline
                }}
                onClick={() => handleButtonClick(index)} // Set active button on click
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box
        component="main"
        sx={{
          p: 3,
          mt: 2, // Add top margin to avoid content overlapping the fixed header
        }}
      >
        <Toolbar />
       
      </Box>
    </Box>
  );
}

export default Header;
