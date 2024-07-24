import * as React from "react";
import PropTypes from "prop-types";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import AppAppBar from "./components/AppAppBar";
import Hero from "./components/Hero";

import Highlights from "./components/Highlights";

import Features from "./components/Features";
import { toast } from "react-toastify";
import Footer from "./components/Footer";
import getLPTheme from "./getLPTheme";
import { getToken } from "../services/localStorageService";
import { setUserToken } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  const { access_token } = getToken();

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
  }, [access_token, dispatch]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100dvw",
        position: "fixed",
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: "background.default",
          "& .Mui-selected": {
            pointerEvents: "none",
          },
        }}
      ></ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default function LandingPage() {
  const [mode, setMode] = React.useState("dark");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "dark" : "dark"));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const location = useLocation();

  useEffect(() => {
      const params = new URLSearchParams(location.search);
      const msg = params.get('message');
      const errmsg = params.get('errmessage');
      const alreadymsg = params.get('alreadymessage');
      if (msg) {
          toast.success("Account Successfully Avtivated. Please Proceed To Login Now !!");
      }
      if (errmsg) {
        toast.error("Invalid Activation Link !!");
      }
      if (alreadymsg) {
        
        toast.warn("Account Is Already Activated !!");
      }
      
  }, [location]);

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero />
      <Divider sx={{backgroundColor:"#7069cc"}} />
      <Box sx={{ bgcolor: "background.default" }}>
        <Features />
        <Divider sx={{backgroundColor:"#7069cc"}} />

        <Divider sx={{backgroundColor:"#7069cc"}}/>
        <Highlights />
        <Divider sx={{backgroundColor:"#7069cc"}}/>
        <Footer  />
      </Box>
      <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      />
    </ThemeProvider>
  );
}
