import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./JobCard.styles";
import Feather from "@expo/vector-icons/Feather";

import { getJobById } from "../../data/mock";

interface JobCardProps {
  jobId: string;
  onPress?: () => void;
}

export const JobCard = ({ jobId, onPress }: JobCardProps) => {
  const job = getJobById(jobId);

  if (!job) {
    return (
      <View
        style={[
          styles.cardContainer,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Feather name="cloud-off" size={60} color={"#000"} />
        <Text>Job not found</Text>
      </View>
    );
  }

  const {
    jobImageUrl,
    jobTitle,
    jobCompany,
    jobHourlyRate,
    jobDistance,
    jobLocation,
  } = job;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: jobImageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.informationContainer}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
        <Text style={styles.jobCompany}>{jobCompany}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Feather name="clock" size={25} color={"#000"} style={styles.icon} />
          <View style={{ gap: 3 }}>
            <Text style={styles.detailTitle}>Hourly Rate</Text>
            <Text style={styles.detailInfo}>${jobHourlyRate}</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <Feather
            name="map-pin"
            size={25}
            color={"#000"}
            style={styles.icon}
          />
          <View style={{ gap: 3 }}>
            <Text style={styles.detailTitle}>Distance</Text>
            <Text style={styles.detailInfo}>{jobDistance} miles</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <Feather name="map" size={25} color={"#000"} style={styles.icon} />
          <View style={{ gap: 3 }}>
            <Text style={styles.detailTitle}>Location</Text>
            <Text style={styles.detailInfo}>{jobLocation}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>Find out more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
