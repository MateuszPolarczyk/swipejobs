import { View, Text } from "react-native";
import styles from "./Profile.styles";

interface ProfileProps {}

const ProfileScreen = ({}: ProfileProps) => {
  return (
    <View style={styles.container}>
      <Text>Profile screen</Text>
    </View>
  );
};

export default ProfileScreen;
