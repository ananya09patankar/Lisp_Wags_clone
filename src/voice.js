import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Select } from "@ui-kitten/components";
import { Actions } from "react-native-router-flux";

import Voice from "@react-native-community/voice";

class VoiceTest extends Component {
  state = {
    recognized: "",
    qrval: props.qrval,
    pitch: "",
    error: "",
    end: "",
    started: "",
    results: [],
    partialResults: [],
    selectedOption: ""
  };

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     medstring: props.medstring,
  //     medname: "",
  //     morning: 0,
  //     afternoon: 0,
  //     night: 0
  //   };
  // }
  constructor(props) {
    
    super(props);
//     this.state = {
//       qrval: props.qrval
// }
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = e => {
    console.log("onSpeechStart: ", e);
    this.setState({
      started: "yes"
    });
  };

  onSpeechRecognized = e => {
    console.log("onSpeechRecognized: ", e);
    this.setState({
      recognized: "√"
    });
  };

  onSpeechEnd = e => {
    console.log("onSpeechEnd: ", e);
    this.setState({
      started: "no"
    });
  };

  onSpeechError = e => {
    console.log("onSpeechError: ", e);
    this.setState({
      error: JSON.stringify(e.error)
    });
  };

  onSpeechResults = e => {
    console.log("onSpeechResults: ", e);
    let list_of_options = e.value;
    let data = [];
    for (var x of list_of_options) {
      data.push({ text: x });
    }
    this.setState({
      results: data
    });
  };

  onSpeechPartialResults = e => {
    console.log("onSpeechPartialResults: ", e);
    this.setState({
      partialResults: e.value
    });
  };

  onSpeechVolumeChanged = e => {
    console.log("onSpeechVolumeChanged: ", e);
    this.setState({
      pitch: e.value
    });
  };

  _startRecognizing = async () => {
    this.setState({
      recognized: "",
      pitch: "",
      error: "",
      started: "",
      results: [],
      partialResults: [],
      end: ""
    });

    try {
      await Voice.start("en-US");
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: "",
      pitch: "",
      error: "",
      started: "",
      results: [],
      partialResults: [],
      selectedOption: "",
      end: ""
    });
  };

  setSelectedOption = e => {
    this.setState({ selectedOption: e.text });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 24, fontWeight: "bold"}}>
        Add Presciption
        </Text>

        <Text style={styles.stat}>{`Status: ${
          this.state.started == "yes" ? "Listening" : "Stopped"
        }`}</Text>
        <View style = {styles.buttons}>
        <Button style={styles.button} onPress={this._startRecognizing}>
          Start Recording
        </Button>
        <Button style={styles.button} onPress={this._stopRecognizing}>
          Stop Recording
        </Button>
        <Button style={styles.button} onPress={this._destroyRecognizer}>
          Reset
        </Button>
        </View>
      <Text>{this.props.qrval}</Text>
        <Select
          placeholder={"Please select closest response"}
          data={this.state.results}
          selectedOption={this.state.selectedOption}
          onSelect={this.setSelectedOption}
          style={styles.select}
        ></Select>

        {this.state.selectedOption != "" ? (
          <Button
            onPress={() => {
              Actions.voice_b({ medstring: this.state.selectedOption, qrval: this.state.qrval });
            }}
          >
            Go to Step 2
          </Button>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row"
  },
  button: {
    marginBottom: 20,
    marginRight: 12,
    backgroundColor: "#50ACBE"
  },
  select: {
    width: 300
  },
  container: {
    fontFamily: "Gordita",
    flex: 1,
    padding: 32,
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  action: {
    textAlign: "center",
    color: "#0000FF",
    marginVertical: 5,
    fontWeight: "bold"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  stat: {
    fontFamily: "",
    fontWeight: "bold",
    color: "#EB5757",
    marginBottom: 40
  }
});

export default VoiceTest;
