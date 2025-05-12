import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import Toast from "react-native-toast-message";

import styles from "./JobDetails.styles";
import { useData } from "../../context/DataContext";
import { Job } from "../../api/types";
import { formatUSPhoneNumber } from "../../helpers/phoneNumber";

interface RouteParams {
  id: string;
  workerId: string;
}

const JobDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as RouteParams;

  const { jobs, acceptJob, rejectJob, removeJob } = useData();
  const job: Job | undefined = jobs.find((j) => j.jobId === id);

  if (!job) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Job not found</Text>
      </View>
    );
  }

  const {
    jobTitle,
    company,
    wagePerHourInCents,
    milesToTravel,
    shifts,
    branch,
    branchPhoneNumber,
    requirements,
  } = job;

  const hourlyRate = (wagePerHourInCents / 100).toFixed(2);

  const handleJobRejection = async () => {
    const result = await rejectJob(id);

    const isUnavailable =
      result.message?.toLowerCase().includes("available") ?? false;

    if (result.success || isUnavailable) {
      removeJob(id);

      Toast.show({
        type: "success",
        text1: "Job Rejected",
      });

      navigation.navigate("MainTabs", {
        screen: "Jobs",
      });
    } else {
      Toast.show({
        type: "error",
        text1: result.message || "Failed to reject job",
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Feather name="arrow-left" size={24} color="black" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Image
        source={{ uri: jobTitle.imageUrl }}
        style={styles.jobImage}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>{jobTitle.name}</Text>
        <Text style={styles.subtitle}>{company.name}</Text>

        <View style={styles.detailRow}>
          <Feather name="clock" size={20} />
          <Text style={styles.detailText}>${hourlyRate} / hr</Text>
        </View>

        <View style={styles.detailRow}>
          <Feather name="map-pin" size={20} />
          <Text style={styles.detailText}>
            {milesToTravel.toFixed(2)} miles from your location
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Feather name="map" size={20} />
          <Text style={styles.detailText}>
            {company.address.formattedAddress}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Feather name="users" size={20} />
          <Text style={styles.detailText}>
            {company.reportTo.name}
            {company.reportTo.phone
              ? `, ${formatUSPhoneNumber(company.reportTo.phone)}`
              : ""}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Feather name="git-pull-request" size={20} />
          <Text style={styles.detailText}>Branch: {branch}</Text>
        </View>

        <View style={styles.detailRow}>
          <Feather name="phone" size={20} />
          <Text style={styles.detailText}>
            Branch phone: {formatUSPhoneNumber(branchPhoneNumber)}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Shifts{" "}
            <Text style={styles.sectionSubtitle}>(Start date - End date)</Text>
          </Text>
          {shifts.map((shift, index) => (
            <View style={styles.shiftRow} key={index}>
              <Text style={styles.detailText}>
                <Text style={styles.shiftLabel}>{index + 1}:</Text>{" "}
                {new Date(shift.startDate).toLocaleString()}
              </Text>
              <Text style={styles.detailText}>
                {new Date(shift.endDate).toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        {requirements?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Requirements</Text>
            {requirements.map((req, index) => (
              <Text key={index} style={styles.requirementText}>
                - {req}
              </Text>
            ))}
          </View>
        )}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.noButton]}
          onPress={handleJobRejection}
        >
          <Text style={[styles.buttonText, styles.noButtonText]}>
            No Thanks
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.yesButton]}
          onPress={async () => {
            const result = await acceptJob(id);
            Toast.show({
              type: result.success ? "success" : "error",
              text1: result.success
                ? "Job Accepted"
                : result.message || "Failed to accept job",
            });
            if (result.success) {
              navigation.navigate("MainTabs", { screen: "Jobs" });
            }
          }}
        >
          <Text style={styles.buttonText}>I'll Take that</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default JobDetails;
