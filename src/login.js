import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { LView } from "../components/lottieView";
import { Input, Button, Icon, Text } from "@ui-kitten/components";
import Axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [ftext, setftext] = useState("");

  const renderIcon = style => (
    <Icon {...style} name={secure ? "eye-off" : "eye"} />
  );

  const onIconPress = () => {
    setSecure(!secure);
  };

  const loginProc = () => {
    Axios.post("https://reqres.in/api/login", {
      email: username,
      password: password
    }).then(response => {
      setftext(response.data.token);
    });
  };

  return (
    <View style={styles.container}>
      <Text category="h2" style={styles.headerText}>
        Login
      </Text>
      <LView />
      <Input
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
      />
      <Input
        placeholder="Password"
        secureTextEntry={secure}
        onChangeText={setPassword}
        style={styles.input}
        icon={renderIcon}
        onIconPress={onIconPress}
      />
      <Text>{ftext}</Text>
      <Button style={styles.button} onPress={loginProc}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
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
  headerText: { marginTop: 80 }
});

export default Login;
