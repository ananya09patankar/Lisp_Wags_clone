import React from "react";
import { View, Button } from "react-native";
import { Actions } from "react-native-router-flux";
import { LView } from "../components/lottieView";

const goToLogin = () => {
  Actions.push("login");
};

const Signup = () => {
  return (
    <View>
      <LView />
      <Button title="Go To Login" onPress={goToLogin}></Button>
    </View>
  );
};

export default Signup;
