import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import SignIn from "./SignIn";
import {
  getToken,
  storeUser,
  getUser,
} from "../../services/localStorageService";
import { useUserDataQuery } from "../../services/userAuthApi";

export default function Hero() {
  const [open, setOpen] = React.useState(false);
  const { access_token } = getToken();

  const { data, isSuccess } = useUserDataQuery(access_token);

  let { name } = getUser();

  const [userData, setUserData] = React.useState({
    name: "",
  });

  React.useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        name: data.name,
      });
    }
  }, [data, isSuccess]);

  const navigate = useNavigate();
  const gotoSignUp = () => {
    navigate("/signup");
  };
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        display: "flex",
        flexDirection :{xs :"column",md:"column",lg:"row"},
        paddingLeft: {xs:"10px",sm:"10px",lg:"100px"},
        paddingRight: {xs:"10px",sm:"10px",lg:"50px"},
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : "linear-gradient(#02294F, #090E10)",
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 23 },
          pb: { xs: 8, sm: 10 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ width: { xs: "100%", sm: "100%" } }}
        >
          <Typography
            component="h1"
            variant="h1"
            sx={{
              fontSize:{xs: "20px", sm:"35px", lg:"60px"},
              display: "flex",
              flexDirection: { xs: "row", md: "row" },
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            {isSuccess ? "Welcome , " : "Our Bug "}
            <Typography
              component="span"
              variant="h1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "primary.light",

                marginLeft: 2,
                fontSize:{xs: "20px", sm:"35px", lg:"60px"},
              }}
            >
              {isSuccess ? userData.name : "Finder"}
            </Typography>
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            Our website is a bug finder tool designed specifically for
            programmers <br />
            Not only does it identify bugs, but it also provides suggestions and
            solutions to resolve them. Whether you're a beginner or an
            experienced programmer, our bug finder tool is here to help
            streamline your coding process and improve the quality of your code
            journey..
          </Typography>

          {access_token ? (
            ""
          ) : (
            <Typography
              variant="caption"
              textAlign="center"
              sx={{ opacity: 0.8 }}
            >
              By clicking &quot;Sign In&quot; you agree to our&nbsp;
              <Link href="#" color="primary">
                Terms & Conditions
              </Link>
              .
            </Typography>
          )}
        </Stack>
      </Container>
      {access_token ? (
        ""
      ) : (
        <Container
          sx={{
            width: {xs:"100%",md:"75%"},
            marginRight: {xs:"0px",md:"100px"},
          }}
        >
          <SignIn></SignIn>
        </Container>
      )}
    </Box>
  );
}
