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
import { Button, Divider, duration } from "@mui/material";
import { useRef } from "react";
import { Context } from "../../context/context";
import { executeCode } from "./codeRunnerApi";

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

export default function CodeIde() {
  const [mode, setMode] = React.useState("dark");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [showDebugContainer, setShowDebugContainer] = React.useState("");
  const [output, setOutput] = React.useState();
  const [isLoadingCode, setIsLoadingCode] = React.useState(false);

  const [isErrorCode, setIsErrorCode] = React.useState(false);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "dark" : "dark"));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  let editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    editor.focus();
  }

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoadingCode(true);
      const { run: result } = await executeCode(sourceCode);
      setOutput(result.output);
      result.stderr ? setIsErrorCode(true) : setIsErrorCode(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingCode(false);
    }
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
              Let's Run&nbsp;
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
              Our website provide an online IDE, designed specifically for
              Python programmers where you can run or test your code. <br />
              <p
                style={{
                  color: "#55A6F6",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                User input need to be handled, this IDE is designed for code
                execution, not real-time interaction.
              </p>
            </Typography>
          </Stack>
        </Container>

        <h3
          style={{
            fontSize: "24px",
            textAlign: "center",
            fontWeight: "bold",
          }}
          class="question"
        >
          Run Your Python Code Here..
        </h3>

        <Divider
          style={{
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        ></Divider>

        <div
          style={{
            display: "flex",
            marginTop: "1rem",
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
              }}
            >
              <p
                style={{
                  color: "#fff",
                  letterSpacing: 1,
                }}
              >
                Code Editor :
              </p>
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
                defaultLanguage="python"
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
                marginTop: "2rem",
              }}
            >
              <p
                style={{
                  color: "#fff",
                  letterSpacing: 1,
                }}
              >
                Output :
              </p>
              <div>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  component="a"
                  target="_blank"
                  onClick={runCode}
                  style={{
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    paddingTop: 15,
                    paddingBottom: 15,
                    width: "25%",
                  }}
                >
                  {isLoadingCode ? "Please wait..." : "Run Code"}
                </Button>
              </div>
            </div>
            {/* runner component */}
            <Box
              height="80vh"
              width="42vw"
              p={2}
              color={isErrorCode ? "red" : ""}
              border="3px solid"
              borderRadius={4}
              borderColor={isErrorCode ? "red" : "#333"}
            >
              {output ? output : "Click 'Run Code' to see the output here"}
            </Box>
          </div>
        </div>

        <Footer />
      </Box>
      <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      />
    </ThemeProvider>
  );
}
