import React, { Component } from "react";
import LottieView from "lottie-react-native";

class LView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <LottieView
        source={require("./loaderCat.json")}
        autoPlay
        loop
        style={{ height: 270 }}
      />
    );
  }
}

export { LView };
