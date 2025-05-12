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
  onSwipe: (direction: "left" | "right", jobId: string) => Promise<boolean>;
  isFirstCard?: boolean;
  onDismiss: () => void;
}

export const JobCard = ({
  jobData,
  onSwipe,
  isFirstCard,
  onDismiss,
}: JobCardProps) => {
  const position = useRef(new Animated.ValueXY()).current;
  const isAnimating = useRef(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );
  const [animatedWave, setAnimatedWave] = useState(false);
  const navigation = useNavigation();
  const { profile } = useData();

  const resetAnimationState = () => {
    isAnimating.current = false;
    setAnimatedWave(false);
    setSwipeDirection(null);
  };

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
              resetAnimationState();
            });
          });
        });
      }, 1000);

      return () => {
        clearTimeout(timeout);
        position.stopAnimation();
        resetAnimationState();
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
          position.setValue({ x: 0, y: 0 });
          resetAnimationState();
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
          const isRightSwipe = gesture.dx > 0;
          setSwipeDirection(null);

          try {
            await new Promise<void>((resolve) => {
              Animated.timing(position, {
                toValue: {
                  x: isRightSwipe ? SCREEN_WIDTH + 100 : -SCREEN_WIDTH - 100,
                  y: gesture.dy,
                },
                duration: 200,
                useNativeDriver: false,
              }).start(() => {
                position.setValue({ x: 0, y: 0 });
                resolve();
              });
            });

            if (isRightSwipe) {
              const success = await onSwipe("right", jobData.id);
              if (!success) {
                Toast.show({
                  type: "error",
                  text1: "This job is no longer available, check next one.",
                  position: "top",
                  visibilityTime: 2500,
                });
                return;
              }
              Toast.show({
                type: "success",
                text1: "Job accepted!",
                position: "top",
                visibilityTime: 2000,
              });
            } else {
              await onSwipe("left", jobData.id);
              Toast.show({
                type: "error",
                text1: "Job rejected!",
                position: "top",
                visibilityTime: 2000,
              });
            }

            onDismiss();
          } catch (error) {
            console.error("Swipe failed:", error);
            Toast.show({
              type: "error",
              text1: "Action failed",
              text2: "Please try again",
              position: "top",
              visibilityTime: 2000,
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
