import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import styles from "./JobCard.styles";
import { useNavigation } from "@react-navigation/native";
import { useData } from "../../context/DataContext";

import Toast from "react-native-toast-message";
import { acceptJob, rejectJob } from "../../api";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 160;
const HINT_THRESHOLD = 80;

interface Job {
  id: string;
  jobImageUrl: string;
  jobTitle: string;
  jobCompany: string;
  jobHourlyRate: number;
  jobDistance: number;
  jobLocation: string;
}

interface JobCardProps {
  jobData: Job;
  onSwipe: () => void;
  isFirstCard?: boolean;
}

export const JobCard = ({ jobData, onSwipe, isFirstCard }: JobCardProps) => {
  const position = useRef(new Animated.ValueXY()).current;
  const isAnimating = useRef(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );
  const [animatedWave, setAnimatedWave] = useState(false);

  const navigation = useNavigation();
  const { profile } = useData();

  useEffect(() => {
    if (isFirstCard && !animatedWave) {
      const timeout = setTimeout(() => {
        setAnimatedWave(true);
        isAnimating.current = true;

        setTimeout(() => setSwipeDirection("left"), 100);
        Animated.timing(position, {
          toValue: { x: -120, y: 0 },
          duration: 1000,
          useNativeDriver: false,
        }).start(() => {
          setTimeout(() => setSwipeDirection("right"), 600);
          Animated.timing(position, {
            toValue: { x: 120, y: 0 },
            duration: 1000,
            useNativeDriver: false,
          }).start(() => {
            setTimeout(() => setSwipeDirection(null), 1000);
            Animated.timing(position, {
              toValue: { x: 0, y: 0 },
              duration: 1000,
              useNativeDriver: false,
            }).start(() => {
              setAnimatedWave(false);
              isAnimating.current = false;
            });
          });
        });
      }, 1000);

      return () => {
        clearTimeout(timeout);
        position.stopAnimation();
        setAnimatedWave(false);
        isAnimating.current = false;
      };
    }
  }, [isFirstCard]);

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        if (isAnimating.current) {
          position.stopAnimation();
          setAnimatedWave(false);
          isAnimating.current = false;
          setSwipeDirection(null);
        }
      },
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
        if (gesture.dx > HINT_THRESHOLD) {
          setSwipeDirection("right");
        } else if (gesture.dx < -HINT_THRESHOLD) {
          setSwipeDirection("left");
        } else {
          setSwipeDirection(null);
        }
      },
      onPanResponderRelease: async (_, gesture) => {
        if (Math.abs(gesture.dx) > SWIPE_THRESHOLD) {
          try {
            const isRightSwipe = gesture.dx > 0;
            let apiResponse;

            setSwipeDirection(null);

            if (isRightSwipe) {
              apiResponse = await acceptJob(
                profile?.workerId ?? "",
                jobData.id
              );
            } else {
              apiResponse = await rejectJob(
                profile?.workerId ?? "",
                jobData.id
              );
            }

            if (!apiResponse.success) {
              Animated.timing(position, {
                toValue: { x: 0, y: 0 },
                duration: 100,
                useNativeDriver: false,
              }).start();

              Toast.show({
                type: "error",
                text1: "Job no longer available",
                position: "bottom",
                visibilityTime: 1000,
              });
              return;
            }

            Animated.timing(position, {
              toValue: {
                x: isRightSwipe ? SCREEN_WIDTH + 100 : -SCREEN_WIDTH - 100,
                y: gesture.dy,
              },
              duration: 200,
              useNativeDriver: false,
            }).start(() => {
              position.setValue({ x: 0, y: 0 });
              onSwipe();
            });

            Toast.show({
              type: "success",
              text1: isRightSwipe ? "Job accepted!" : "Job rejected",
              position: "bottom",
              visibilityTime: 2000,
            });
          } catch (error) {
            console.error("Swipe action failed:", error);
            Animated.spring(position, {
              toValue: { x: 0, y: 0 },
              friction: 7,
              tension: 40,
              useNativeDriver: false,
            }).start();

            Toast.show({
              type: "error",
              text1: "Action failed",
              position: "bottom",
              visibilityTime: 1000,
            });
          }
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start(() => setSwipeDirection(null));
        }
      },
    })
  ).current;

  const {
    jobImageUrl,
    jobTitle,
    jobCompany,
    jobHourlyRate,
    jobDistance,
    jobLocation,
  } = jobData;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.cardContainer,
        {
          transform: [...position.getTranslateTransform(), { rotate }],
        },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: jobImageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        {swipeDirection === "right" && (
          <View style={styles.hintBoxRight}>
            <Text style={styles.hintText}>I'll Take that</Text>
          </View>
        )}
        {swipeDirection === "left" && (
          <View style={styles.hintBoxLeft}>
            <Text style={styles.hintText}>No Thanks</Text>
          </View>
        )}
      </View>
      <View style={styles.informationContainer}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
        <Text style={styles.jobCompany}>{jobCompany}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Feather name="clock" size={25} color="#000" style={styles.icon} />
          <View style={{ gap: 3 }}>
            <Text style={styles.detailTitle}>Hourly Rate</Text>
            <Text style={styles.detailInfo}>${jobHourlyRate.toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <Feather name="map-pin" size={25} color="#000" style={styles.icon} />
          <View style={{ gap: 3 }}>
            <Text style={styles.detailTitle}>Distance</Text>
            <Text style={styles.detailInfo}>
              {jobDistance.toFixed(2)} miles
            </Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <Feather name="map" size={25} color="#000" style={styles.icon} />
          <View style={{ gap: 3 }}>
            <Text style={styles.detailTitle}>Location</Text>
            <Text style={styles.detailInfo}>{jobLocation}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("JobDetails", {
              id: jobData.id,
              workerId: profile?.workerId ?? "",
            })
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Find out more</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
