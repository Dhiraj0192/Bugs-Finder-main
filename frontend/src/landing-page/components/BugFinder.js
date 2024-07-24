import * as React from "react";
import PropTypes from "prop-types";
import './style.css';
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
  const [showDelayedText, setShowDelayedText] = React.useState(false);

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

    input = "";
    setIsLoadingCodeBox(false);
    setResultData("");
    setFinalResultData("");
    setOutput("");
    setIsErrorCode(false);

    input = editorRef.current.getValue();
    setInput(input);
    setLoading(true);



    if (language == "python") {
      setTimeout(() => {
        setShowDelayedText(true);
        onSent(
          `You're a meticulous and experienced Python developer with a keen eye for detail, having debugged and optimized countless codes over the years. You take pride in your ability to identify and rectify errors, ensuring that the code is efficient, readable, and reliable.
  
          Your task is to strictly analyze the source code provided and strictly analyze the following steps :
  
          First step : Check the given source give is in Python code or not. If not then strictly ask to provide python code.
          Second step : check if it contains any errors.
  
          Here are the details of the source code -
  
          Source Code: ${input}
  
          If it does not contain any errors which you have analyzed in second steps, please respond with "All good, no error found." However, if you find any errors in second steps then that prevent it from compiling or executing correctly then please provide a brief explanation of all of the errors which you have analyzed in second steps, starting with the title "Code Bug Explanation:" on the next line, followed by a simple and concise description of the error and how to solve it`
        );
      }, 3000); // Delay in milliseconds
      
    }

    if (language == "java") {
      setTimeout(() => {
        setShowDelayedText(true);
        onSent(
          `You're a meticulous and experienced java developer with a keen eye for detail, having debugged and optimized countless codes over the years. You take pride in your ability to identify and rectify errors, ensuring that the code is efficient, readable, and reliable.
  
          Your task is to strictly analyze the source code provided and strictly analyze the following steps:
  
          First step : Check the given source give is in java code or not. If not then strictly ask to provide java code.
          Second step : Code must contain main class to run java source code. Strictly check If main class missing or not. 
          Third step :  If any main function missing to execute the source code or not
          Forth step : If any semicolon missing at the end of statement or not
          Last step : If any other type of error

          Very Very Strictly Check Second step at the begining.
  
          Then Very Very Strictly Check Third and Forth and Last Steps.
  
          According to above steps if it does not contain any errors which you have analyzed in second or third or forth or in last steps, please respond with "All good, no error found." However, if you analyzed any errors in second and third and forth and in last steps then that prevent it from compiling or executing correctly then please provide a brief explanation of all of the errors which you have analyzed in second and third and forth and last steps, 
          
          Strictly not allowed to mention user provided source code in your response.

          Example :
  
            <<< 
                    
              Code Bug Explanation:
  
                1. **Missing Class Declaration:**  The code lacks a class declaration. In Java, every program must be enclosed within a class. This code needs a class definition like 'public class MyProgram { ... }' to hold the 'main' method.

                2. **Missing Semicolon:**  The code is missing a semicolon at the end of the 'float product = first * second' statement. Semicolons are required to terminate statements in Java.

                3. **Missing 'main' Function:** Java programs require a 'main' function as the entry point of execution. This code doesn't have a 'main' function. The 'main' function should be declared as 'public static void main(String[] args) { ... }'.

                4. **Syntax Error in Variable Declaration:** The line 'float first  1.5f;' has a syntax error. There should be an assignment operator ('=') between the variable name ('first') and the value ('1.5f').

                5. **Logic Error:** //your logic error explaination

              **Here's how to fix the code:**

                '''java
                  public class MultiplyTwoNumbers {

                    public static void main(String[] args) {

                      float first = 1.5f;
                      float second = 2.0f;

                      float product = first * second;

                      System.out.println("The product is: " + product);
                    }
                  }
                '''

              **Explanation of Corrections:**

                1. A 'public class MultiplyTwoNumbers' declaration is added to enclose the code within a class.
                2. The missing semicolon after 'float product = first * second' is added.
                3. The 'main' function is defined as 'public static void main(String[] args) { ... }'.
                4. The syntax error in 'float first  1.5f;' is corrected by adding the assignment operator ('=').
           
            >>>
  
          Very Very Strictly follow above Example for your response.
          
          You are strictly not allowed to mention steps.
          
          Here are the details of the source code -
  
          Source Code: ${input}`
        );
      }, 3000); // Delay in milliseconds
      
    }

    if (language == "c") {
      setTimeout(() => {
        setShowDelayedText(true);
        onSent(
          `You're a meticulous and experienced C Language developer with a keen eye for detail, having debugged and optimized countless codes over the years. You take pride in your ability to identify and rectify errors, ensuring that the code is efficient, readable, and reliable.
  
          Your task is to strictly analyze the source code provided and strictly analyze the following steps:
  
          First step : Check the given source give is in C language code or not. If not then strictly ask to provide C code.
          Second step : Code must contain header file to run C language code. Strictly check if header file is missing or not.
          Third step : If any main function missing to execute the source code 
          Forth step : If any semicolon missing at the end of statement 
          Fifth step : if any return missing  
          Last step : If any other type of error
  
          Very Very Strictly Check Second step at the begining.
  
          Then Very Very Strictly Check Third and Forth and Fifth and Last Steps.
  
          According to above steps if it does not contain any errors which you have analyzed in second or third or forth or fifth or in last steps, please respond with "All good, no error found." However, if you analyzed any errors in any above steps then that prevent it from compiling or executing correctly then please provide a brief explanation of all of the errors which you have analyzed in above steps,
  
          Strictly not allowed to mention user provided source code in your response.
          
          Example :
  
                    <<< Code Bug Explanation:
  
                    1. **Missing Header File:** The code is missing the '#include <stdio.h>' header file. This file is necessary for using the 'printf' function (note: it's "printf", not "prin").
  
                    2. **Typo in Function Name:** The code uses 'prin("hellp")' which seems to be a typo. It should be 'printf("hellp");' to correctly print the output.
  
                    3. **Missing Semicolon:**  The code is missing a semicolon at the end of the 'printf("hellp")' statement. 
  
                    4. **Missing 'main' Function:** C programs require a 'main' function as the entry point of execution. This code doesn't have a 'main' function.
  
                    5. **Return Statement (Implicit in C99 and later):** While not strictly an error in modern C (C99 and later), it's good practice to include an explicit 'return 0;' statement in the 'main' function to indicate successful execution.
  
                    **Here's how to fix the code:**
  
                    '''c
                    #include 
  
                    int main() {
                        printf("hello\n"); 
                        return 0; 
                    }
                    '''
  
                    **Explanation of Corrections:**
  
                    1. '#include': This line includes the standard input/output library, which is needed for functions like 'printf'.
                    2. 'int main() { ... }': This defines the 'main' function, the starting point of the program. 
                    3. 'printf("hello\n");': This line now uses the correct 'printf' function to print "hello" to the console, followed by a newline character ('\n') for better formatting.
                    4. 'return 0;': This line indicates that the program executed successfully. 
           
          >>>
  
          Very Very Strictly follow above Example for your response.
          
          You are strictly not allowed to mention steps.
          
          Here are the details of the source code -
  
          Source Code: ${input}`
        );
      }, 3000); // Delay in milliseconds
      
    }

    if (language == "c++") {
      setTimeout(() => {
        setShowDelayedText(true);
        onSent(
          `You're a meticulous and experienced C++ Language developer with a keen eye for detail, having debugged and optimized countless codes over the years. You take pride in your ability to identify and rectify errors, ensuring that the code is efficient, readable, and reliable.
  
          Your task is to strictly analyze the source code provided and strictly analyze the following steps:
  
          First step : Check the given source give is in C++ language code or not. If not then strictly ask to provide C++ code.
          Second step : Code must contain header file to run C++ language code. Strictly check if header file is missing or not.
          Third step : If any main function missing to execute the source code 
          Forth step : If any semicolon missing at the end of statement 
          Fifth step : if any return 0 missing in main function  
          Last step : If any other type of error
  
          Very Very Strictly Check Second step at the begining.
  
          Then Very Very Strictly Check Third and Forth and Fifth and Last Steps.
  
          According to above steps if it does not contain any errors which you have analyzed in second or third or forth or fifth or in last steps, please respond with "All good, no error found." However, if you analyzed any errors in any above steps then that prevent it from compiling or executing correctly then please provide a brief explanation of all of the errors which you have analyzed in above steps,
  
          Strictly not allowed to mention user provided source code in your response.
          
          Example :
  
          <<< 
                  Code Bug Explanation:
  
                  1. **Missing Header File:** The code is missing the '#include' header file.
  
                  2. **Typo in Function Name:** The code uses 'prin("hellp")' which seems to be a typo. It should be 'printf("hellp");' to correctly print the output.
  
                  3. **Missing Semicolon:**  The code is missing a semicolon at the end of the 'printf("hellp")' statement. 
  
                  4. **Missing 'main' Function:** C programs require a 'main' function as the entry point of execution. This code doesn't have a 'main' function.
  
                  5. **Return Statement (Implicit in C99 and later):** While not strictly an error in modern C (C99 and later), it's good practice to include an explicit 'return 0;' statement in the 'main' function to indicate successful execution.
  
                  **Here's how to fix the code:**
  
                  '''c++
                  #include 
  
                  int main() {
                      printf("hello\n"); 
                      return 0; 
                  }
                  '''
  
                  **Explanation of Corrections:**
  
                  * **'#include':** This line includes the standard input/output library, which is needed for functions like 'printf'.
                  * **'int main() { ... }':** This defines the 'main' function, the starting point of the program. 
                  * **'printf("hello\n");':** This line now uses the correct 'printf' function to print "hello" to the console, followed by a newline character ('\n') for better formatting.
                  * **'return 0;':** This line indicates that the program executed successfully. 
           
          >>>
  
          Very Very Strictly follow above Example for your response.
          
          You are strictly not allowed to mention steps.
          
          Here are the details of the source code -
  
          Source Code: ${input}`
        );
      }, 3000); // Delay in milliseconds
      
    }

    if (language == "javascript") {
      setTimeout(() => {
        setShowDelayedText(true);
        onSent(
          `You're a meticulous and experienced JavaScript developer with a keen eye for detail, having debugged and optimized countless codes over the years. You take pride in your ability to identify and rectify errors, ensuring that the code is efficient, readable, and reliable.
  
          Your task is to strictly analyze the source code provided and strictly analyzed the following steps:
          
          First step : Check the given source give is in javascript code or not. If not then strictly ask to provide javascript code.
          Second step : If semicolon missing at the end of statement. 
          Third step : If any other type of error to execute the source code and to make it run.
  
          Here are the details of the source code -
  
          Source Code: ${input}
  
          If it does not contain any errors which you have analyzed in second step or in third step, then please respond with "All good, no error found." However, if you analyzed any errors in second step or in third step then that prevent it from compiling or executing correctly then please provide a brief explanation of all of the errors which you have analyzed in second step and in third step, starting with the title "Code Bug Explanation:" on the next line, followed by a simple and concise description of the error and how to solve it`
        );
      }, 3000); // Delay in milliseconds
      
    }
  };

  let getPreviousEditorValue = async () => {
    setOutput("");
    setIsLoadingCodeBox(false);
    setIsErrorCode(false);
    setResultData(finalresultData);

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

      toast.success("Successfully Added To Report !");
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
      if (rep.error.data.error == "Report Already Exist") {
        toast.success("Report Already Exist!");
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
                fontSize:{xs: "30px", sm:"35px", lg:"60px"},
              display: "flex",
              flexDirection: { xs: "row", md: "row" },
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              Let's Find&nbsp;
              <Typography
                component="span"
                variant="h1"
                sx={{
                  fontSize:{xs: "30px", sm:"35px", lg:"60px"},
              display: "flex",
              flexDirection: { xs: "row", md: "row" },
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
        className="main-c"
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
            className="language-c"
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
            className="editors-c"
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                height: "80vh",
                width: "50vw",
                fontSize: "20px",
                marginTop: "8rem",
              }}
            >
              <Editor
                className="editors-c"
                
                theme="vs-dark"
                language={language}
                onMount={handleEditorDidMount}

                // onChange={(e) => setInput(e.target.value)}
                // value={input}
              ></Editor>
            </div>
          </div>
          <div
            className="second-c"
            style={{
              marginLeft: 30,
            }}
          >
            <div
            className="buttons-c-s"
              style={{
                marginBottom: "1.5rem",
                marginTop: "4.5rem",
              }}
            >
              <div
              className="button-c"
                style={{
                  display: "flex",
                  alignItems: "center",

                  gap: 15,
                }}
              >
                {isLoadingCodeBox ? (<Button
                  className="button"
                  color="bug"
                  variant="contained"
                  size="small"
                  component="a"
                  target="_blank"
                  onClick={() => getPreviousEditorValue()}
                  style={{
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    paddingTop: 15,
                    paddingBottom: 15,
                    width: "25%",
                    fontSize:16,
                    letterSpacing:1,
                    fontWeight:500
                  }}
                >
                  Bug Report
                </Button>): (<Button
                className="button"
                  disabled={loading}
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
                    fontSize:16,
                    letterSpacing:1,
                    fontWeight:500
                  }}
                >
                  {loading ? "Please wait..." : "Find Bug"}
                </Button>)}
                {isLoadingCodeBox ? (
                  ""
                ) : (
                  <Button
                  className="button"
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
                      fontSize:16,
                    letterSpacing:1,
                    fontWeight:500
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
                    className="button"
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
              className="outputBox-c"
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
                    letterSpacing:2,
                  }}
                  dangerouslySetInnerHTML={{ __html: resultData }}
                ></p>
              )}
              {loading ? <p
                  style={{
                    fontSize: "25px",
                    marginTop:"25vh",
                    textAlign:"center",
                    fontWeight: 500,
                    lineHeight: 1.8,
                    whiteSpace: "pre-wrap",
                    letterSpacing:2,
                    color:"GrayText"
                  }}
                  
                >Finding Bug. Please Wait....</p> : (
                  ""
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
                    justifyContent:"space-between",
                    gap: 15,
                  }}
                >
                  <TextField
                    sx={{
                      height: {xs:45,md:48,lg:48},
                      width: "71%",
                    }}
                    
                    required
                    id="title"
                    label="Enter Title Here..."
                    name="title"
                  />
                  

                  <div
                  className="save-report-c"
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
                    className="save-report-button"
                      type="submit"
                      style={{
                        color: "#fff",
                        fontSize: "17px",
                        fontWeight: "bold",
                        paddingLeft: 30,
                        paddingRight: 30,
                        paddingTop: 8,
                        paddingBottom: 8,
                        borderRadius: 5,
                        border: "1px solid #008000",
                      }}
                    >
                      Save Report
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
