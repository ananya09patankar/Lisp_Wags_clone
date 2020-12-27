import React from "react";
import { Router, Scene } from "react-native-router-flux";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Voice from "./pages/voice";
import Voice_b from "./pages/voice_b";
import Scanner from "./pages/scanner"

const Routes = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="voice_b" component={Voice_b}   hideNavBar />
        <Scene key="voice" component={Voice} hideNavBar />
        <Scene key="scanner" component={Scanner} initial={true} hideNavBar />
        {/* <Scene key="login" component={Login} initial={true} hideNavBar /> */}
        {/* <Scene key="signup" component={Signup} title="About" /> */}
      </Scene>
    </Router>
  );
};

export default Routes;
