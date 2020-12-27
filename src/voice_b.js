import React, { Component } from "react";
import WTN from "words-to-numbers";
import _ from "underscore";
import axios from "axios";
import Icon from "react-native-vector-icons/Feather";
import { View, StyleSheet, Keyboard } from "react-native";
import { Actions } from "react-native-router-flux";
import { Input, Button, Text } from "@ui-kitten/components";

class voice_b extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medstring: props.medstring,
      medname: "",
      morning: 0,
      afternoon: 0,
      night: 0
    };
  }

  componentDidMount = () => {
    this.changeBelow();
    const req = axios("")
  };

  changeText = text => {
    const mes = text;
    this.setState({ medstring: mes });
    this.changeBelow();
  };

  changeBelow = () => {
    const medstr = this.state.medstring;
    let arr = medstr.split(" ");
    let medicine = arr[0];
    let morni = WTN(arr[1], { fuzzy: true });
    let after = WTN(arr[3], { fuzzy: true });
    let night = WTN(arr[5], { fuzzy: true });
    this.setState({
      medname: medicine,
      morning: morni,
      afternoon: after,
      night: night
    });
  };

  render() {
    return (
      <View>
        <Text category="h2" style={styles.headerText}>
          Confirmation
        </Text>
        <Input
          style={styles.input}
          value={this.state.medstring}
          onChangeText={this.changeText}
        />
        <View style={styles.wrapperIcon}>
          <Text style={styles.textSty}>{this.state.medname}</Text>
        </View>

        <View style={styles.wrapperIcon}>
          <Icon
            style={styles.IconSty}
            name="sunrise"
            size={35}
            color="#FF7F4F"
          ></Icon>
          <Text style={styles.textSty}>{this.state.morning}</Text>
        </View>

        <View style={styles.wrapperIcon}>
          <Icon
            style={styles.IconSty}
            name="sun"
            size={35}
            color="#FF7F4F"
          ></Icon>
          <Text style={styles.textSty}>{this.state.afternoon}</Text>
        </View>

        <View style={styles.wrapperIcon}>
          <Icon
            style={styles.IconSty}
            name="moon"
            size={35}
            color="#FF7F4F"
          ></Icon>
          <Text style={styles.textSty}>{this.state.night}</Text>
        </View>
        <Text>{this.state.qrval}</Text>

        <Button style={styles.button}>Next Page</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 410,
    height: 50,
    margin: 10,
    borderRadius: 5
  },
  button: {
    width: 250,
    height: 50,
    marginTop: 40,
    borderRadius: 10
  },
  container: { justifyContent: "center", alignItems: "center" },
  headerText: { marginTop: 80, marginLeft: 20 },
  wrapperIcon: { marginLeft: 20, marginBottom: 20, flexDirection: "row" },
  IconSty: { marginRight: 20 },
  textSty: { justifyContent: "center" }
});

export default voice_b;
