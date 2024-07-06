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

import LanguageSelector from "./LanguageSelector";

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

export default function CodeAnalysis() {
  const [mode, setMode] = React.useState("dark");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [showDebugContainer, setShowDebugContainer] = React.useState("");
  const [language, setLanguage] = React.useState("python");

  const onSelect = (language) => {
    setLanguage(language);
  };

  let {
    inputAnalysis,
    setInputAnalysis,
    recentPromptAnalysis,
    setRecentPromptAnalysis,
    showResultAnalysis,
    onSentAnalysis,
    setShowResultAnalysis,
    resultDataAnalysis,
    setResultDataAnalysis,
    loadingAnalysis,
    setLoadingAnalysis,
  } = React.useContext(Context);

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

  let getEditorValue = async () => {
    // let finaldebugValue = "ggggggg";

    inputAnalysis = editorRef.current.getValue();
    setInputAnalysis(inputAnalysis);

    // onSent(
    //   "Identify given code is python or not. If the given code is in python then Where is the bug in this python code? Explain about error and also solve the given code and provide me solved code. :" +
    //     input
    // );
    onSentAnalysis(
      "You are a highly skilled " +
        language +
        " software developer and code analyser. I have a source code. Your task is to Identify given code is " +
        language +
        " or not. If not then simply ask to provide " +
        language +
        " code. If the given code is in " +
        language +
        " then analyse and explain the complete flow of code in detail. Your explaination title must start with 'Code Analyse Explaination : ' then your explaination from next line'. Here’s the code: " +
        inputAnalysis
    );

    // if (value === "") {
    //   setShowDebugContainer(false);
    // } else {
    //   setShowDebugContainer(true);
    // }
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
            pb: { xs: 8, sm: 10 },
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
              Let's Analyse&nbsp;
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
                Code
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
            >
              Our website provide a platform, designed specifically for
              programmers where you can analyse or understand the flow of your
              code. <br />
            </Typography>
          </Stack>
        </Container>
        <Divider sx={{ backgroundColor: "#7069cc" }} />

        <h3
          style={{
            fontSize: "24px",
            textAlign: "center",
            fontWeight: "bold",
            marginTop: "3rem",
          }}
          class="question"
        >
          Write Your Code Here To Analyse
        </h3>

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
              width: "50%",
              height: "540px",
              marginLeft: 50,
              position: "relative",
              marginBottom: 150,
            }}
          >
            <div
              style={{
                marginTop: "5rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  color: "#fff",
                  letterSpacing: 1,
                  marginRight: "2rem",
                }}
              >
                Languages :
              </p>

              <LanguageSelector
                language={language}
                onSelect={onSelect}
              ></LanguageSelector>
            </div>
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                height: "100%",
                width: "50%",
                fontSize: "20px",
                marginTop: "8rem",
              }}
            >
              <Editor
                height="80vh"
                width="50vw"
                theme="vs-dark"
                language={language}
                onMount={handleEditorDidMount}

                // onChange={(e) => setInput(e.target.value)}
                // value={input}
              ></Editor>
            </div>
          </div>
          <div
            style={{
              marginLeft: 30,
            }}
          >
            <div
              style={{
                marginBottom: "1.5rem",
                marginTop: "4.5rem",
              }}
            >
              <div>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  component="a"
                  target="_blank"
                  onClick={() => getEditorValue()}
                  style={{
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    paddingTop: 15,
                    paddingBottom: 15,
                    width: "25%",
                  }}
                >
                  {loadingAnalysis ? "Please wait..." : "Analyse Code"}
                </Button>
              </div>
            </div>
            {/* runner component */}
            <Box
              height="80vh"
              width="42vw"
              p={2}
              overflow="overlay"
              border="3px solid"
              borderRadius={4}
              borderColor="#333"
            >
              {!showResultAnalysis ? (
                "Click 'Analyse Code' to see the output here"
              ) : (
                <p
                  style={{
                    fontSize: "17px",
                    fontWeight: 300,
                    lineHeight: 1.8,
                    whiteSpace: "pre-wrap",
                  }}
                  dangerouslySetInnerHTML={{ __html: resultDataAnalysis }}
                ></p>
              )}
            </Box>
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
