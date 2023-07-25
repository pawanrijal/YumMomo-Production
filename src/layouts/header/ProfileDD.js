import React from "react";
import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import {
  Box,
  Menu,
  Typography,
  Link,
  ListItemButton,
  List,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
const ProfileDD = () => {
  const router = useRouter();
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    toast.success("Logged out Succesfully");
    router.push("/admin");
  };

  useEffect(() => {
    const token = localStorage.getItem("admin");
    if (token) {
      const decoded = jwt_decode(token);
      setUser(decoded.email);
    }
  }, [router]);
  
  return (
    
    <>
      <Button
        aria-label="menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick4}
      >
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              alignItems: "center",
            }}
          >
            <Typography
              color="textSecondary"
              variant="h5"
              fontWeight="400"
              sx={{ ml: 1 }}
            >
              Hi,
            </Typography>
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                ml: 1,
              }}
            >
              {user}
            </Typography>
            <FeatherIcon icon="chevron-down" width="20" height="20" />
          </Box>
        </Box>
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl4}
        keepMounted
        open={Boolean(anchorEl4)}
        onClose={handleClose4}
        sx={{
          "& .MuiMenu-paper": {
            width: "385px",
          },
        }}
      >
        <Box>
          <Divider />
          <Box p={2}>
            <Link to="/">
              <Button onClick={handleLogout} fullWidth variant="outlined" color="primary">
                Logout
              </Button>
            </Link>
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default ProfileDD;
