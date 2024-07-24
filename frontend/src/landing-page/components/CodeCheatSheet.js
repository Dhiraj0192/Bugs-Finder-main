import * as React from "react";
import PropTypes from "prop-types";
import './style.css';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Container from "@mui/material/Container";
import AppAppBar from "./AppAppBar";
import Footer from "./Footer";
import getLPTheme from "../getLPTheme";
import { Button, Divider, duration } from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { grey } from "@mui/material/colors";

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
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

export default function CodeCheatSheet() {
  const [mode, setMode] = React.useState("dark");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [python, setPython] = React.useState(true);
  const [java, setJava] = React.useState(false);
  const [c, setC] = React.useState(false);
  const [cplus, setCPlus] = React.useState(false);
  const [javaScript, setJavaScript] = React.useState(false);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "dark" : "dark"));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const pythonCick = () => {
    setPython(true);
    setJava(false);
    setC(false);
    setCPlus(false);
    setJavaScript(false);
  };
  const javaCick = () => {
    setJava(true);
    setC(false);
    setCPlus(false);
    setJavaScript(false);
    setPython(false);
  };
  const cCick = () => {
    setC(true);
    setJava(false);
    setCPlus(false);
    setJavaScript(false);
    setPython(false);
  };
  const cPlusCick = () => {
    setCPlus(true);
    setC(false);
    setJava(false);
    setJavaScript(false);
    setPython(false);
  };
  const javaScriptCick = () => {
    setJavaScript(true);
    setCPlus(false);
    setC(false);
    setJava(false);
    setPython(false);
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />

      <Box sx={{ bgcolor: "background.default" }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 5 },
          }}
        >
          <Stack
            spacing={2}
            useFlexGap
            sx={{ width: { xs: "100%", sm: "70%" } }}
          >
            <Typography
              component="h1"
              variant="h1"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              <Typography
                component="span"
                variant="h1"
                sx={{
                  fontSize:{xs: "30px", sm:"35px", lg:"60px"},
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "primary.main"
                      : "primary.light",
                }}
              >
                Cheatsheet
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
            >
              Our website provide cheat sheet which is a one-page reference
              sheet for programming language. <br />
            </Typography>
          </Stack>
        </Container>

        <Divider
          style={{
            marginTop: "2rem",
            marginBottom: "2rem",
            backgroundColor: "#7069cc",
          }}
        ></Divider>

        <div
        className="cheat-button-c"
          style={{
            width: "92%",
            height: "100%",
            marginLeft: 80,
            marginBottom: "5rem",
          }}
        >
          {/* Getting Started div */}

          <div
            style={{
              display: "flex",
              gap: 20,
              justifyContent: "center",
            }}
          >
            <Box
            className="cheat-item-c"
              style={{
                // backgroundColor:{python?"transparent":"#436b97"},
                backgroundColor: python ? "transparent" : "#436b97",
                width: "20%",
                textAlign: "center",
                borderRadius: "12px",
                cursor: "pointer",
                border: "1px solid #fff",
              }}
              onClick={pythonCick}
            >
              <Typography
              className="cheat-item"
                sx={{
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  paddingLeft: "35px",
                  paddingRight: "35px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                Python
              </Typography>
            </Box>

            <Box
            className="cheat-item-c"
              sx={{
                backgroundColor: java ? "transparent" : "#d33731",
                width: "20%",
                textAlign: "center",
                borderRadius: "12px",
                cursor: "pointer",
                border: "1px solid #fff",
              }}
              onClick={javaCick}
            >
              <Typography
              className="cheat-item"
                sx={{
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  paddingLeft: "35px",
                  paddingRight: "35px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                Java
              </Typography>
            </Box>

            <Box
            className="cheat-item-c"
              sx={{
                backgroundColor: javaScript ? "transparent" : "#ebd01a",
                width: "20%",
                textAlign: "center",
                borderRadius: 3,
                cursor: "pointer",
                border: "1px solid #fff",
              }}
              onClick={javaScriptCick}
            >
              <Typography
              className="cheat-item"
                sx={{
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  paddingLeft: "35px",
                  paddingRight: "35px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                JavaScript
              </Typography>
            </Box>
          </div>

          <div
            style={{
              display: "flex",
              gap: 20,
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Box
            className="cheat-item-c"
              sx={{
                backgroundColor: c ? "transparent" : "#2a338a",
                width: "20%",
                textAlign: "center",
                borderRadius: 3,
                cursor: "pointer",
                border: "1px solid #fff",
              }}
              onClick={cCick}
            >
              <Typography
              className="cheat-item"
                sx={{
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  paddingLeft: "35px",
                  paddingRight: "35px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                C Language
              </Typography>
            </Box>

            <Box
            className="cheat-item-c"
              sx={{
                backgroundColor: cplus ? "transparent" : "#6d94c7",
                width: "20%",
                textAlign: "center",
                borderRadius: 3,
                cursor: "pointer",
                border: "1px solid #fff",
              }}
              onClick={cPlusCick}
            >
              <Typography
              className="cheat-item"
                sx={{
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  paddingLeft: "35px",
                  paddingRight: "35px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                C++ Language
              </Typography>
            </Box>
          </div>
        </div>

        <Divider
          style={{
            marginTop: "2rem",
            marginBottom: "2rem",
            backgroundColor: "#7069cc",
          }}
        ></Divider>

        {python ? (
          <div
          className="image-c"
            style={{
              marginTop: "3rem",
              width: "92%",
              height: "100%",
              marginLeft: 80,
              marginBottom: "5rem",
              textAlign: "center",
            }}
          >
            <img
              src={"imges/python.png"}
              style={{
                width: "98%",
                height: "100%",
                borderRadius: 10,
              }}
              alt="logo of sitemark"
            ></img>
          </div>
        ) : (
          ""
        )}

        {java ? (
          <div
          className="image-c"
            style={{
              marginTop: "3rem",
              width: "92%",
              height: "100%",
              marginLeft: 80,
              marginBottom: "5rem",
              textAlign: "center",
            }}
          >
            <img
              src={"imges/java.png"}
              style={{
                width: "98%",
                height: "100%",
                borderRadius: 10,
              }}
              alt="logo of sitemark"
            ></img>
          </div>
        ) : (
          ""
        )}

        {javaScript ? (
          <div
          className="image-c"
            style={{
              marginTop: "3rem",
              width: "92%",
              height: "100%",
              marginLeft: 80,
              marginBottom: "5rem",
              textAlign: "center",
            }}
          >
            <img
              src={"imges/javascript.png"}
              style={{
                width: "98%",
                height: "100%",
                borderRadius: 10,
              }}
              alt="logo of sitemark"
            ></img>
          </div>
        ) : (
          ""
        )}

        {c ? (
          <div
          className="image-c"
            style={{
              marginTop: "3rem",
              width: "92%",
              height: "100%",
              marginLeft: 80,
              marginBottom: "5rem",
              textAlign: "center",
            }}
          >
            <img
              src={"imges/c.png"}
              style={{
                width: "98%",
                height: "100%",
                borderRadius: 10,
              }}
              alt="logo of sitemark"
            ></img>
          </div>
        ) : (
          ""
        )}

        {cplus ? (
          <div
          className="image-c"
            style={{
              marginTop: "3rem",
              width: "92%",
              height: "100%",
              marginLeft: 80,
              marginBottom: "5rem",
              textAlign: "center",
            }}
          >
            <img
              src={"imges/cplus.png"}
              style={{
                width: "98%",
                height: "100%",
                borderRadius: 10,
              }}
              alt="logo of sitemark"
            ></img>
          </div>
        ) : (
          ""
        )}

        <Divider sx={{ backgroundColor: "#7069cc" }} />
        <Footer />
      </Box>
      <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      />
    </ThemeProvider>
  );
}
