import { View } from "react-native";
import styles from "./Jobs.styles";

import { JobSwiper } from "../../components/JobSwiper/JobSwiper";

interface JobScreenProps {}

const JobsScreen = ({}: JobScreenProps) => {
  return (
    <View style={styles.container}>
      <JobSwiper />
    </View>
  );
};

export default JobsScreen;
