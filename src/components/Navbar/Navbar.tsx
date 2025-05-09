import { View, Text, Image } from "react-native";
import styles from "./Navbar.styles";

interface NavbarProps {}
export const Navbar = ({}: NavbarProps) => {
  return (
    <View style={styles.navbar} accessibilityRole="header">
      <Image
        source={require("../../assets/swipejobs-logo-light.png")}
        style={styles.logo}
        resizeMode="contain"
        accessible
        accessibilityLabel={"Swipejobs logo"}
      />
    </View>
  );
};
