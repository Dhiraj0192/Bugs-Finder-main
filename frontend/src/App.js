import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./landing-page/LandingPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./landing-page/components/SignUp";
import SignIn from "./landing-page/components/SignIn";
import BugFinder from "./landing-page/components/BugFinder";
import CodeIde from "./landing-page/components/CodeIde";
import CodeCheatSheet from "./landing-page/components/CodeCheatSheet";
import CodeAnalysis from "./landing-page/components/CodeAnalysis";
import UserChat from "./landing-page/components/UserChat";
import { useSelector } from "react-redux";

function App() {
  const { access_token } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>}></Route>
        <Route
          path="/signup"
          element={
            !access_token ? <SignUp></SignUp> : <Navigate to="/bugfinder" />
          }
        ></Route>
        <Route
          path="/signin"
          element={
            !access_token ? <SignIn></SignIn> : <Navigate to="/bugfinder" />
          }
        ></Route>
        <Route
          path="/bugfinder"
          element={access_token ? <BugFinder></BugFinder> : <Navigate to="/" />}
        ></Route>

        <Route
          path="/codecheatsheet"
          element={
            access_token ? (
              <CodeCheatSheet></CodeCheatSheet>
            ) : (
              <Navigate to="/" />
            )
          }
        ></Route>

        <Route
          path="/codeanalyse"
          element={
            access_token ? <CodeAnalysis></CodeAnalysis> : <Navigate to="/" />
          }
        ></Route>

        <Route
          path="/userchat"
          element={
            access_token ? <UserChat></UserChat> : <Navigate to="/" />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
