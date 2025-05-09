import { View, Text } from "react-native";
import styles from "./Jobs.styles";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { JobCard } from "../../components/JobCard/JobCard";

type JobsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface JobScreenProps {}

const JobsScreen = ({}: JobScreenProps) => {
  const navigation = useNavigation<JobsNavigationProp>();

  const navigateToJobDetails = (id: string, workerId: string) => {
    navigation.navigate("JobDetails", { id: id, workerId: workerId });
  };

  return (
    <View style={styles.container}>
      <JobCard onPress={() => navigateToJobDetails("1", "11")} />
    </View>
  );
};

export default JobsScreen;
