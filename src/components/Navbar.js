import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const role = localStorage.getItem("userRole");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const navLinks = () => {
    switch (role) {
      case "Admin":
        return (
          <>
            <Button color="inherit" onClick={() => navigate("/dashboard")}>Dashboard</Button>
            <Button color="inherit" onClick={() => navigate("/expenses")}>Expenses</Button>
            <Button color="inherit" onClick={() => navigate("/reports")}>Reports</Button>
          </>
        );
      case "Manager":
        return (
          <>
            <Button color="inherit" onClick={() => navigate("/dashboard")}>Dashboard</Button>
            <Button color="inherit" onClick={() => navigate("/approvals")}>Approvals</Button>
          </>
        );
      case "Employee":
        return (
          <>
            <Button color="inherit" onClick={() => navigate("/expenses")}>My Expenses</Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    role ? (
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
            Expense Management
          </Typography>
          
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {navLinks()}
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Box>

          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {role === "Admin" && (
                <>
                  <MenuItem onClick={() => { handleMenuClose(); navigate("/dashboard"); }}>Dashboard</MenuItem>
                  <MenuItem onClick={() => { handleMenuClose(); navigate("/expenses"); }}>Expenses</MenuItem>
                  <MenuItem onClick={() => { handleMenuClose(); navigate("/reports"); }}>Reports</MenuItem>
                </>
              )}
              {role === "Manager" && (
                <>
                  <MenuItem onClick={() => { handleMenuClose(); navigate("/dashboard"); }}>Dashboard</MenuItem>
                  <MenuItem onClick={() => { handleMenuClose(); navigate("/approvals"); }}>Approvals</MenuItem>
                </>
              )}
              {role === "Employee" && (
                <>
                  <MenuItem onClick={() => { handleMenuClose(); navigate("/expenses"); }}>My Expenses</MenuItem>
                </>
              )}
              <MenuItem onClick={() => { handleMenuClose(); handleLogout(); }}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    ) : null
  );
};

export default Navbar;
