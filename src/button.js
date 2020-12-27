import React from "react";
import { StyleSheet, View, Button, Text } from "react-native";

const PurpButton = props => {
  return <Button title={props.title} style={styles.purpButton}></Button>;
};

const styles = StyleSheet.create({
  purpButton: {
    backgroundColor: "purple",
    fontSize: 10,
    color: "#ffffff",
    textAlign: "center",
    width: 200,
    height: 40,
    borderRadius: 20
  }
});

export { PurpButton };
