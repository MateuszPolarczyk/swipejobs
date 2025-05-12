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
      navigation.navigate("MainTabs", { screen: "Jobs" });
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
        <Text style={styles.jobTitle}>{jobTitle.name}</Text>
        <Text style={styles.companyName}>{company.name}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Distance</Text>
            <Text style={styles.infoValue}>
              {milesToTravel.toFixed(2)} miles
            </Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Hourly Rate</Text>
            <Text style={styles.infoValue}>
              <Text style={styles.dollarSign}>$</Text>
              {hourlyRate}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.detailRow}>
            <Feather name="calendar" size={20} />
            <View style={styles.detailRight}>
              <Text style={styles.sectionTitle}>Shifts</Text>
              {shifts.map((shift, index) => (
                <Text style={styles.detailText} key={index}>
                  {new Date(shift.startDate).toLocaleString()} -{" "}
                  {new Date(shift.endDate).toLocaleString()}
                </Text>
              ))}
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.detailRow}>
          <Feather name="map-pin" size={20} />
          <View style={styles.detailRight}>
            <Text style={styles.sectionTitle}>
              {company.address.formattedAddress}
            </Text>
            <Text style={styles.smallNote}>
              {milesToTravel.toFixed(2)} miles from your job search location
            </Text>
          </View>
          <Feather name="chevron-right" size={20} />
        </TouchableOpacity>

        {requirements?.length > 0 && (
          <View style={styles.section}>
            <View style={styles.detailRow}>
              <Feather name="list" size={20} />
              <View style={styles.detailRight}>
                <Text style={styles.sectionTitle}>Requirements</Text>
                {requirements.map((req, index) => (
                  <Text key={index} style={styles.requirementText}>
                    - {req}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.detailRow}>
            <Feather name="user" size={20} />
            <View style={styles.detailRight}>
              <Text style={styles.detailText}>{company.reportTo.name}</Text>
              {company.reportTo.phone && (
                <Text style={styles.detailText}>
                  {formatUSPhoneNumber(company.reportTo.phone)}
                </Text>
              )}
            </View>
          </View>
        </View>
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
