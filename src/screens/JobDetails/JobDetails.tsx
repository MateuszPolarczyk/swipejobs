import { View, Text } from "react-native";
import styles from "./JobDetails.styles";

import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";

type JobDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface JobDetailsProps {}

const JobDetailsScreen = ({}: JobDetailsProps) => {
  const navigation = useNavigation<JobDetailsNavigationProp>();
  const route = useRoute();
  const { workerId, id } = route.params as RootStackParamList["JobDetails"];

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text onPress={() => handleGoBack()}>Back</Text>
      <Text>Job Details screen</Text>
      <Text>Job id: {id}</Text>
      <Text>Worker id: {workerId}</Text>
    </View>
  );
};

export default JobDetailsScreen;
