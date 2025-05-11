import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { styles } from "./JobSwiper.styles";
import { JobCard } from "../JobCard/JobCard";
import { useData } from "../../context/DataContext";

export const JobSwiper = () => {
  const { jobs, isLoading, error, acceptJob, rejectJob } = useData();
  const [hasShownInitialWave, setHasShownInitialWave] = useState(false);
  const [currentJobs, setCurrentJobs] = useState<typeof jobs>([]);
  const [hasSwipedAllJobs, setHasSwipedAllJobs] = useState(false);

  useEffect(() => {
    if (jobs.length > 0) {
      setCurrentJobs(jobs);
      setHasSwipedAllJobs(false);
    }
  }, [jobs]);

  const handleSwipe = async (direction: "left" | "right", jobId: string) => {
    try {
      const result =
        direction === "right" ? await acceptJob(jobId) : await rejectJob(jobId);

      if (result && !hasShownInitialWave) {
        setHasShownInitialWave(true);
      }
      return result.success;
    } catch (err) {
      console.error("Swipe action failed:", err);
      return false;
    }
  };

  const handleDismiss = () => {
    setCurrentJobs((prevJobs) => {
      const newJobs = prevJobs.slice(1);
      if (newJobs.length === 0) {
        setHasSwipedAllJobs(true);
      }
      return newJobs;
    });
  };

  if (isLoading && jobs.length === 0 && !hasSwipedAllJobs) {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.emptyText}>Loading jobs...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.emptyContainer}>
        <Feather name="alert-triangle" size={60} color={"#c00"} />
        <Text style={styles.emptyText}>Error: {error}</Text>
      </View>
    );
  }

  if (currentJobs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Feather name="coffee" size={60} color={"#000"} />
        <Text style={styles.emptyText}>
          We've reached the bottom of the job barrel.{"\n"}Check back soon!
        </Text>
      </View>
    );
  }

  const currentJob = currentJobs[0];
  const showWaveAnimation = !hasShownInitialWave;

  return (
    <View style={{ flex: 1 }}>
      <JobCard
        key={currentJob.jobId}
        jobData={{
          id: currentJob.jobId,
          jobImageUrl: currentJob.jobTitle.imageUrl,
          jobTitle: currentJob.jobTitle.name,
          jobCompany: currentJob.company.name,
          jobHourlyRate: currentJob.wagePerHourInCents / 100,
          jobDistance: currentJob.milesToTravel,
          jobLocation: currentJob.company.address.formattedAddress,
        }}
        onSwipe={handleSwipe}
        isFirstCard={showWaveAnimation}
        onDismiss={handleDismiss}
      />
    </View>
  );
};
