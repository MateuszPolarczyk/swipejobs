import { View, Text } from "react-native";
import styles from "./NotFound.styles";

interface NotFoundProps {}

const NotFoundScreen = ({}: NotFoundProps) => {
  return (
    <View style={styles.container}>
      <Text>NotFound screen</Text>
    </View>
  );
};

export default NotFoundScreen;
