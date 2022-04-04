import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { CardStyleInterpolators } from "@react-navigation/stack";
import Snapchat from "../screens/Snapchat";
import Story from "../screens/Story";

const Stack = createSharedElementStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Snapchat"
        screenOptions={{
          gestureEnabled: false,
          presentation: "transparentModal",
          headerShown: true,
          // cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
          cardOverlayEnabled: true,
          // cardStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen name="Snapchat" component={Snapchat} />
        <Stack.Screen
          name="Story"
          component={Story}
          options={{ headerShown: false }}
          sharedElements={(route) => {
            const { story } = route.params;
            return [{ id: story.id, animation: "fade" }];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
