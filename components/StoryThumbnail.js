import { StyleSheet, Dimensions, Pressable } from "react-native";
import React from "react";
import { Video, AVPlaybackStatus } from "expo-av";
import { SharedElement } from "react-navigation-shared-element";

const { height, width } = Dimensions.get("window");

const StoryThumbnail = ({ navigation, story }) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate("Story", {
          story,
        })
      }
    >
      <SharedElement id={story.id}>
        <Video
          // ref={video}

          style={styles.video}
          source={story.uri}
          // useNativeControls
          resizeMode="cover"
          isLooping
          // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </SharedElement>
    </Pressable>
  );
};

export default StoryThumbnail;

const styles = StyleSheet.create({
  container: {
    height: height * 0.35,
    width: width * 0.45,
    overflow: "hidden",
    marginBottom: 10,
    marginRight: 5,
    borderRadius: 10,
  },
  video: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
