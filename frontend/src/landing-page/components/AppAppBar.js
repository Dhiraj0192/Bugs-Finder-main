import * as React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "./ToggleColorMode";

import { useNavigate } from "react-router-dom";
import { removeToken, getToken } from "../../services/localStorageService";
import {
  useUserDataQuery,
  useLogoutUserMutation,
} from "../../services/userAuthApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { unSetUserToken } from "../../features/authSlice";
import { setUserToken } from "../../features/authSlice";

const logoStyle = {
  width: "52px",
  height: "auto",
  cursor: "pointer",
  backgroundColor: "#fff",

  borderRadius: "27%",
  padding: "5px",
};

function AppAppBar({ mode, toggleColorMode }) {
  const { access_token } = getToken();
  
  const [logoutUser] = useLogoutUserMutation();

  const dispatch = useDispatch();
  // React.useEffect(() => {
  //   dispatch(setUserToken({ access_token: access_token }));
  // }, [access_token, dispatch]);
  const Submit = async (event) => {
    // let { csrf_key } = getToken();
    const res = await logoutUser();

    dispatch(unSetUserToken({ access_token: null }));
    removeToken();
    
    navigate("/");
    toast.success("Successfully Logout !", {});
  };

  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const gotoSignUp = () => {
    navigate("/signup");
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToDebug = () => {
    navigate("/bugfinder");
  };

  const goToCheatSheet = () => {
    navigate("/codecheatsheet");
  };

  const goToCodeAnalyse = () => {
    navigate("/codeanalyse");
  };
  const goToUserchat = () => {
    navigate("/userchat");
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",

                ml: "-18px",
                px: 0,
              }}
            >
              <img
                src={"https://www.svgrepo.com/show/216693/bug.svg"}
                style={logoStyle}
                alt="logo of sitemark"
              />
              <Typography
                fontSize="20px"
                fontWeight="bold"
                paddingLeft={1.5}
                paddingRight={1.5}
              >
                Bug Finder
              </Typography>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem onClick={goToHome} sx={{ py: "6px", px: "12px" }}>
                  <Typography variant="body2" color="text.primary">
                    Home
                  </Typography>
                </MenuItem>
                {access_token ? (
                  ""
                ) : (
                  <MenuItem
                    onClick={() => scrollToSection("features")}
                    sx={{ py: "6px", px: "12px" }}
                  >
                    <Typography variant="body2" color="text.primary">
                      Features
                    </Typography>
                  </MenuItem>
                )}

                {access_token ? (
                  ""
                ) : (
                  <MenuItem
                    onClick={() => scrollToSection("highlights")}
                    sx={{ py: "6px", px: "12px" }}
                  >
                    <Typography variant="body2" color="text.primary">
                      Highlights
                    </Typography>
                  </MenuItem>
                )}

                {access_token ? (
                  <MenuItem onClick={goToDebug} sx={{ py: "6px", px: "12px" }}>
                    <Typography variant="body2" color="text.primary">
                      Let's Find Bug
                    </Typography>
                  </MenuItem>
                ) : (
                  ""
                )}

                {access_token ? (
                  <MenuItem
                    onClick={goToCodeAnalyse}
                    sx={{ py: "6px", px: "12px" }}
                  >
                    <Typography variant="body2" color="text.primary">
                      Analyse Code
                    </Typography>
                  </MenuItem>
                ) : (
                  ""
                )}

                {access_token ? (
                  <MenuItem
                    onClick={goToUserchat}
                    sx={{ py: "6px", px: "12px" }}
                  >
                    <Typography variant="body2" color="text.primary">
                      Chats
                    </Typography>
                  </MenuItem>
                ) : (
                  ""
                )}

                {access_token ? (
                  <MenuItem
                    onClick={goToCheatSheet}
                    sx={{ py: "6px", px: "12px" }}
                  >
                    <Typography variant="body2" color="text.primary">
                      Cheat Sheet
                    </Typography>
                  </MenuItem>
                ) : (
                  ""
                )}
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 2,
                alignItems: "center",
              }}
            >
              
              {access_token ? (
                ""
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  component="a"
                  onClick={goToHome}
                  target="_blank"
                  sx={{
                    paddingLeft:3,
                    paddingRight:3,
                    fontSize:15
                  }}
                >
                  Sign In
                </Button>
              )}
              {access_token ? (
                ""
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  component="a"
                  onClick={gotoSignUp}
                  target="_blank"
                  sx={{
                    paddingLeft:3,
                    paddingRight:3,
                    fontSize:15
                  }}
                >
                  Sign up
                </Button>
              )}
              {access_token ? (
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  component="a"
                  onClick={Submit}
                  target="_blank"
                  sx={{
                    paddingLeft:3,
                    paddingRight:3,
                    fontSize:15
                  }}
                >
                  Logout
                </Button>
              ) : (
                ""
              )}
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode
                      mode={mode}
                      toggleColorMode={toggleColorMode}
                    />
                  </Box>
                  <MenuItem onClick={goToHome}>Home</MenuItem>
                  {access_token ? (
                    ""
                  ) : (
                    <MenuItem onClick={() => scrollToSection("features")}>
                      Features
                    </MenuItem>
                  )}

                  {access_token ? (
                    ""
                  ) : (
                    <MenuItem onClick={() => scrollToSection("highlights")}>
                      Highlights
                    </MenuItem>
                  )}
                  {access_token ? (
                    <MenuItem onClick={goToDebug}>Let's Find Bug</MenuItem>
                  ) : (
                    ""
                  )}

                  {access_token ? (
                    <MenuItem onClick={goToCodeAnalyse}>Analyse Code</MenuItem>
                  ) : (
                    ""
                  )}

                  {access_token ? (
                    <MenuItem onClick={goToUserchat}>Chats</MenuItem>
                  ) : (
                    ""
                  )}

                  {access_token ? (
                    <MenuItem onClick={goToCheatSheet}>Cheat Sheet</MenuItem>
                  ) : (
                    ""
                  )}

                  <Divider />
                  {access_token ? (
                    ""
                  ) : (
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="contained"
                        component="a"
                        onClick={gotoSignUp}
                        target="_blank"
                        sx={{ width: "100%" }}
                      >
                        Sign up
                      </Button>
                    </MenuItem>
                  )}

                  {access_token ? (
                    ""
                  ) : (
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="contained"
                        component="a"
                        onClick={goToHome}
                        target="_blank"
                        sx={{ width: "100%" }}
                      >
                        Sign In
                      </Button>
                    </MenuItem>
                  )}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
