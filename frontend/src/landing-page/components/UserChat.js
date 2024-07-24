import * as React from "react";
import PropTypes from "prop-types";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Editor from "@monaco-editor/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Container from "@mui/material/Container";
import DebugResponse from "./DebugResponse";
import AppAppBar from "./AppAppBar";
import Footer from "./Footer";
import getLPTheme from "../getLPTheme";
import { Button, Divider } from "@mui/material";
import { useRef } from "react";
import { Context } from "../../context/context";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { getToken } from "../../services/localStorageService";
import { useReportDataQuery } from "../../services/userAuthApi";

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

export default function UserChat() {
  const [mode, setMode] = React.useState("dark");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const { access_token } = getToken();

  const { data, isSuccess } = useReportDataQuery(access_token);
  // console.log(data.data[0].user)

  const [reportData, setReportData] = React.useState([]);

  const [reportReverseData, setReportReverseData] = React.useState([]);

  const [divData, setDivData] = React.useState({
    bug_code: "Click Report Title To Show Data Here...",
    bug_report: "Click Report Title To Show Data Here...",
  });

  const [loadingDiv, setLoadingDiv] = React.useState(false);

  React.useEffect(() => {
    if (data && isSuccess) {
      setReportData(data.data);
      setReportReverseData(reportData.reverse());
    }
  }, [data, isSuccess]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "dark" : "dark"));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  let editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />

      <Box sx={{ bgcolor: "background.default" }}>
        <div
          style={{
            marginTop: "18vh",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
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
            Yours Recents&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "primary.light",
              }}
            >
              Reports
            </Typography>
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            Our website provide collection of your reports, designed specifically
            for programmers where you can preview your reports at anytime. <br />
          </Typography>
        </div>

        <Divider
          sx={{
            marginTop: "10vh",
            backgroundColor: "#7069cc",
          }}
        ></Divider>

        <div
          style={{
            // backgroundColor:"#fff",
            width: "99%",
            height: "90vh",
            // marginTop:"15vh",
            display: "flex",
            // marginLeft:"1vw",
            // marginRight:"1vw"
          }}
        >
          <div
            style={{
              backgroundColor: "#181a29",
              width: "19%",
              height: "90vh",
              overflow: "overlay",
              scrollbarWidth: "thin",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginTop: 10,
              }}
            >
              <p
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                Reports Title
              </p>
              <Divider></Divider>

              <div
                style={{
                  marginTop: 15,
                  marginBottom: 15,
                }}
              >
                {/* chat title */}
                {isSuccess ? (
                  reportData.map((item, index) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: "18px",
                        }}
                      >
                        <div
                          style={{
                            marginTop: 5,
                          }}
                        >
                          <IoChatbubbleEllipses
                            style={{
                              fontSize: "20px",
                            }}
                          />
                        </div>
                        <div
                          onClick={() => {
                            setLoadingDiv(true);
                            setDivData({
                              bug_code: item.bug_code,
                              bug_report: item.bug_report,
                            });
                          }}
                          style={{
                            marginLeft: 8,
                          }}
                        >
                          <p
                            style={{
                              fontSize: 15,
                              cursor: "pointer",
                              letterSpacing: 1,
                            }}
                          >
                            {item.title.slice(0, 18)}....
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        marginTop: 5,
                      }}
                    >
                      <IoChatbubbleEllipses
                        style={{
                          fontSize: "20px",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        marginLeft: 8,
                      }}
                    >
                      <p
                        style={{
                          fontSize: 15,
                          cursor: "pointer",
                          letterSpacing: 1,
                        }}
                      >
                        No Reports To Show...
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <Divider></Divider>
            </div>
          </div>

          {/* body div */}
          <div
            style={{
              // backgroundColor:"#fcba03",
              width: "80%",
              height: "100vh",
            }}
          >
            <div
              style={{
                display: "flex",
                marginTop: "1rem",
                marginBottom: "5rem",
              }}
            >
              <div
                class="editor-container"
                style={{
                  width: "36%",
                  height: "540px",
                  marginLeft: 25,
                  position: "relative",
                  marginBottom: 150,
                }}
              >
                <div
                  style={
                    {
                      // marginTop: "5rem",
                    }
                  }
                >
                  <p
                    style={{
                      color: "#fff",
                      letterSpacing: 1,
                    }}
                  >
                    Your Code :
                  </p>
                </div>
                <Box
                  height="72vh"
                  width="38vw"
                  p={2}
                  overflow="overlay"
                  border="3px solid"
                  borderRadius={4}
                  borderColor="#0959AA"
                  marginTop="25px"
                >
                  {!loadingDiv ? (
                    <p
                      style={{
                        fontSize: "17px",
                        fontWeight: 300,
                        lineHeight: 1.8,
                        whiteSpace: "pre-wrap",
                      }}
                      dangerouslySetInnerHTML={{ __html: divData.bug_code }}
                    ></p>
                  ) : (
                    <p
                      style={{
                        fontSize: "17px",
                        fontWeight: 300,
                        lineHeight: 1.8,
                        whiteSpace: "pre-wrap",
                      }}
                      dangerouslySetInnerHTML={{ __html: divData.bug_code }}
                    ></p>
                  )}
                </Box>
              </div>
              <div
                style={{
                  marginLeft: "11vw",
                }}
              >
                <div
                  style={{
                    marginBottom: "1.5rem",
                    // marginTop: "2rem",
                  }}
                >
                  <p
                    style={{
                      color: "#fff",
                      letterSpacing: 1,
                    }}
                  >
                    Report Response :
                  </p>
                </div>
                {/* runner component */}
                <Box
                  height="72vh"
                  width="38vw"
                  p={2}
                  overflow="overlay"
                  border="3px solid"
                  borderRadius={4}
                  borderColor="#0959AA"
                >
                  {!loadingDiv ? (
                    <p
                      style={{
                        fontSize: "17px",
                        fontWeight: 300,
                        lineHeight: 1.8,
                        whiteSpace: "pre-wrap",
                      }}
                      dangerouslySetInnerHTML={{ __html: divData.bug_report }}
                    ></p>
                  ) : (
                    <p
                      style={{
                        fontSize: "17px",
                        fontWeight: 300,
                        lineHeight: 1.8,
                        whiteSpace: "pre-wrap",
                      }}
                      dangerouslySetInnerHTML={{ __html: divData.bug_report }}
                    ></p>
                  )}
                </Box>
              </div>
            </div>
          </div>
        </div>

        {/* {!showResult ? <></> : <DebugResponse></DebugResponse>} */}
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
