import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { styles } from "./JobSwiper.styles";

import { JobCard } from "../JobCard/JobCard";
import { useData } from "../../context/DataContext";
import { Job } from "../../api/types";

export const JobSwiper = () => {
  const { jobs, isLoading, error } = useData();
  const [currentJobs, setCurrentJobs] = useState(jobs);

  useEffect(() => {
    setCurrentJobs(jobs);
  }, [jobs]);

  const handleSwipe = () => {
    setCurrentJobs((prevJobs) => prevJobs.slice(1));
  };

  if (isLoading) {
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

  const transformJobData = (job: Job): any => ({
    id: job.jobId,
    jobImageUrl: job.jobTitle.imageUrl,
    jobTitle: job.jobTitle.name,
    jobCompany: job.company.name,
    jobHourlyRate: job.wagePerHourInCents / 100,
    jobDistance: job.milesToTravel,
    jobLocation: job.company.address.formattedAddress,
  });

  return (
    <View style={{ flex: 1 }}>
      <JobCard
        jobData={transformJobData(currentJobs[0])}
        onSwipe={handleSwipe}
        isFirstCard={true}
      />
    </View>
  );
};
