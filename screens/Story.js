import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Video, AVPlaybackStatus } from "expo-av";
import { SharedElement } from "react-navigation-shared-element";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");

const Story = ({ route }) => {
  const { story } = route.params;
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const context = useSharedValue(0);
  const video = useRef(null);
  const [status, setStatus] = useState({});

  const panGesture = Gesture.Pan()
    .onStart(({ translationX, translationY }) => {
      context.value = { x: translationX, y: translationY };
    })
    .onUpdate(({ translationX, translationY }) => {
      translateX.value = context.value.x + translationX;
      translateY.value = context.value.y + translationY;
    })
    .onEnd(() => {
      translateX.value = withSpring(0, { damping: 50 });
      translateY.value = withSpring(0, { damping: 50 });
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  useEffect(() => {
    if (video.current) {
      video.current.playAsync();
    }
  }, []);

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={animatedStyle}>
        <Pressable
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
          style={styles.screen}
        >
          <SharedElement
            id={story.id}
            style={{
              flex: 1,
              height: height,
              width: width,
            }}
          >
            <Video
              ref={video}
              style={styles.video}
              source={story.uri}
              // useNativeControls
              resizeMode="cover"
              isLooping
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
          </SharedElement>
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
};

export default Story;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  video: {
    flex: 1,
    width: "100%",
  },
});
