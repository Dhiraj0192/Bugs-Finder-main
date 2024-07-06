import * as React from "react";
import PropTypes from "prop-types";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
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
import { executeCode } from "./codeRunnerApi";
import {
  useRegisterreportMutation,
  useUserDataQuery,
} from "../../services/userAuthApi";
import { getToken } from "../../services/localStorageService";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
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

export default function BugFinder() {
  const [mode, setMode] = React.useState("dark");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [showDebugContainer, setShowDebugContainer] = React.useState("");
  const [output, setOutput] = React.useState();
  const [isLoadingCode, setIsLoadingCode] = React.useState(false);
  const [isLoadingCodeBox, setIsLoadingCodeBox] = React.useState(false);

  const [isErrorCode, setIsErrorCode] = React.useState(false);

  const { access_token } = getToken();

  const { data, isSuccess } = useUserDataQuery(access_token);
  const [registerReport, { isLoading }] = useRegisterreportMutation();

  const [inputValue, setInputValue] = React.useState("");

  const [language, setLanguage] = React.useState("python");

  const onSelect = (language) => {
    setLanguage(language);
  };

  let {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    showResult,
    onSent,
    setShowResult,
    resultData,
    setResultData,
    loading,
    setLoading,
    finalresultData,
    setFinalResultData,
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
    setIsLoadingCodeBox(false);
    setResultData("");
    setFinalResultData("");
    setOutput("");
    setIsErrorCode(false);

    input = editorRef.current.getValue();
    setInput(input);

    // onSent(
    //   "Identify given code is python or not. If the given code is in python then Where is the bug in this python code? Explain about error and also solve the given code and provide me solved code. :" +
    //     input
    // );
    // onSent(
    //   "You are a highly skilled " +
    //     language +
    //     " software developer. I have a source code with several bugs in it.Analyse full source code and always must check first if given code is " +
    //     language +
    //     " code or not. If given code is not " +
    //     language +
    //     " code then strictly ask to provide " +
    //     language +
    //     " code and You are never allowed to provide Recomended code. But If give source code is written in " +
    //     language +
    //     " then first check any missing header file in source code , if yes then reply about that missing header file then continue check that source code missing any main function to run whole code, if yes then reply for that then further continue checking given source code contain any bug like syntax error or logic error or semicolon at the end of line ,if yes then also reply for what kind of bug is this also how to solve it . Your explaination title must start with 'Code Bug Explaination : ' then your explaination from next line and You are never allowed to provide the corrected line or any kind of code . " +
    //     input
    // );

    if (language == "python") {
      onSent(
        "You are a highly skilled python developer. I have a source code with several bugs in it.Analyse full source code and first must check the given source code contain any error or not? If not then strictly reply all good no error found. But if given source code contain any type of error and through error after compile and executation then provide breif explaination what kind of error is this in a simple way also how to solve it . Your explaination title must start with 'Code Bug Explaination : ' then your explaination from next line . " +
          input
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    input = editorRef.current.getValue();
    const report = {
      title: formdata.get("title"),
      user: data.id,
      bug_code: input,
      bug_report: finalresultData,
    };
    console.log(report);
    const rep = await registerReport(report);

    if (rep.data) {
      // console.log(rep.data);

      toast.success("Successfully Added To Chat !");
    }
    if (rep.error) {
      // console.log(rep.error.data.error);
      if (rep.error.data.title == "This field may not be blank.") {
        toast.success("Title is Required!");
      }
      if (rep.error.data.bug_code == "This field may not be blank.") {
        toast.success("Code is Required!");
      }
      if (rep.error.data.bug_report == "This field may not be blank.") {
        toast.success("Response is Required!");
      }
      if (rep.error.data.error == "Chat Already Exist") {
        toast.success("Chat Already Exist!");
      }
    }
  };

  const runCode = async () => {
    setResultData("");

    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoadingCode(true);
      const { run: result } = await executeCode(
        language,
        sourceCode,
        inputValue
      );
      setOutput(result.output.split("\n"));
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
              Let's Find&nbsp;
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
                Bug
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
            >
              Our website is a bug finder tool designed specifically for
              programmers <br />
              Not only does it identify bugs, but it also provides suggestions
              and solutions to resolve them. Whether you're a beginner or an
              experienced programmer, our bug finder tool is here to help
              streamline your coding process and improve the quality of your
              coding journey..
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
            >
              <p
                style={{
                  color: "#55A6F6",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                User input need to be handled in custom input field, this IDE is
                designed for code execution, not real-time interaction.
              </p>
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
          Write Your Code Here To Run or Find Bug
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",

                  gap: 15,
                }}
              >
                <Button
                  color="bug"
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
                  {loading ? "Please wait..." : "Find Bug"}
                </Button>
                {isLoadingCodeBox ? (
                  ""
                ) : (
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    component="a"
                    target="_blank"
                    onClick={() => {
                      setIsLoadingCodeBox(true);
                      setResultData("");
                    }}
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
                )}
              </div>
              {isLoadingCodeBox ? (
                <div>
                  <textarea
                    rows={5}
                    style={{
                      width: "100%",
                      marginTop: "2rem",
                      marginBottom: "-1rem",
                      border: "3px solid #333",
                      backgroundColor: "transparent",
                      color: "#fff",
                      borderRadius: "8px",
                      padding: "10px",
                      fontSize: "15px",
                    }}
                    placeholder={`Custom input`}
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    required
                    id="title"
                    label="Enter custom Input here..."
                    name="title"
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      marginTop: "1rem",
                      marginBottom: "-1rem",
                      marginRight: "5px",
                    }}
                  >
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
                        width: "35%",
                        fontSize: "15px",
                      }}
                    >
                      {isLoadingCode ? "Please wait..." : "Compile and Excute"}
                    </Button>
                  </div>
                  <p
                    style={{
                      color: "#fff",
                      letterSpacing: 1,
                      marginBottom: "-10px",
                    }}
                  >
                    Output :
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            {/* runner component */}
            <Box
              height={isLoadingCodeBox ? "43vh" : "80vh"}
              width="42vw"
              p={2}
              overflow="overlay"
              color={isErrorCode ? "red" : ""}
              border="3px solid"
              borderRadius={4}
              borderColor={isErrorCode ? "red" : "#333"}
            >
              {output ? (
                output.map((line, i) => <Typography key={i}>{line}</Typography>)
              ) : !showResult ? (
                "Click 'Run Code' or 'Find Bug' to see the output here"
              ) : (
                <p
                  style={{
                    fontSize: "17px",
                    fontWeight: 300,
                    lineHeight: 1.8,
                    whiteSpace: "pre-wrap",
                  }}
                  dangerouslySetInnerHTML={{ __html: resultData }}
                ></p>
              )}
            </Box>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    gap: 15,
                  }}
                >
                  <TextField
                    sx={{
                      height: 48,
                      width: "71%",
                    }}
                    required
                    id="title"
                    label="Enter Title Here..."
                    name="title"
                  />
                  {/* {server_error.email ? (
                  <Typography
                    style={{
                      fontSize: 12,
                      color: "red",
                      paddingLeft: 10,
                      paddingTop: 5,
                    }}
                  >
                    {server_error.email[0]}
                  </Typography>
                ) : (
                  ""
                )} */}

                  <div
                    style={{
                      display: "flex",
                      gap: 3,
                      alignItems: "center",

                      marginBottom: -19,
                      marginTop: -19,
                      cursor: "pointer",
                      width: "30%",
                    }}
                  >
                    <FaSave
                      style={{
                        fontSize: "30px",
                        color: "green",
                      }}
                    />
                    <Button
                      type="submit"
                      style={{
                        color: "green",
                        fontSize: "18px",
                        fontWeight: "bold",
                        paddingLeft: 15,
                        paddingRight: 15,
                        paddingTop: 8,
                        paddingBottom: 8,
                        borderRadius: 5,
                        border: "1px solid #008000",
                      }}
                    >
                      Save To Chat
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>

        {/* <Button
          title="Let's Debug"
          sx={{
            backgroundColor: "#0959AA",
            width: "80%",
            fontSize: "18px",
            marginTop: "50px",
            marginLeft: "280px",
            fontWeight: "bold",
            textAlign: "center",
            color: "#fff",
          }}
          onClick={() => getEditorValue()}
        >
          Let's Debug Code
        </Button> */}

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
