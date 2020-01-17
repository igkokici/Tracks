import React, { useContext } from "react";
import { SafeAreaView } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";
import { Button, Text } from "react-native-elements";
import Spacer from "../components/Spacer";
import { FontAwesome } from "@expo/vector-icons";

const AccountScreen = () => {
  const { signOut } = useContext(AuthContext);
  return (
    <>
      <SafeAreaView forceInset={{ top: "always" }}>
        <Text h3>Sing Out Screen</Text>
        <Spacer>
          <Button title="Sign Out" onPress={signOut} />
        </Spacer>
      </SafeAreaView>
    </>
  );
};

AccountScreen.navigationOptions = {
  title: "Account",
  tabBarIcon: <FontAwesome name="gear" size={20} />
};

export default AccountScreen;
