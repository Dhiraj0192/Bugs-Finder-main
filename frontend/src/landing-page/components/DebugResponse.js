import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Context } from "../../context/context";

const DebugResponse = () => {
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
  } = React.useContext(Context);
  const [showDebugValue, setShowDebugValue] = React.useState("");
  return (
    <Container
      sx={{
        height: "auto",
        width: "100%",
        marginTop: 25,
        backgroundColor: "#252626",
        pt: { xs: 4, sm: 5 },
        pb: { xs: 8, sm: 10 },
      }}
    >
      <h3
        style={{
          fontSize: "18px",
          textAlign: "left",
          fontWeight: "bold",
        }}
      >
        Response :
      </h3>
      <Typography variant="body1" color="#fff" textAlign="left">
        {loading ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <hr
              style={{
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#f6f7f8",

                backgroundSize: "80px 50px",
                height: "20px",
              }}
            />
            <hr />
            <hr />
          </div>
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
      </Typography>
    </Container>
  );
};

export default DebugResponse;
