import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Spacer from "./Spacer";
import { withNavigation } from "react-navigation";

const NavLink = ({ navigation, textLink, routeName }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(`${routeName}`)}>
      <Spacer>
        <Text style={styles.link}>{textLink}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    fontSize: 20,
    color: "blue",
    marginLeft: 15
  }
});

export default withNavigation(NavLink);
