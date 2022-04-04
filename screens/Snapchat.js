import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

import { FlatList } from "react-native-gesture-handler";
import { videos } from "../constants/dummy-videos/dummy-videos";
import StoryThumbnail from "../components/StoryThumbnail";

const Snapchat = ({ navigation }) => {
  return (
    <FlatList
      style={{ flex: 1 }}
      data={videos}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        flex: 1,
      }}
      numColumns={2}
      renderItem={({ item, index }) => {
        return (
          <StoryThumbnail key={index} navigation={navigation} story={item} />
        );
      }}
    />
  );
};

export default Snapchat;

const styles = StyleSheet.create({});
