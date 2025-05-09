import { View, Text, Image } from "react-native";
import styles from "./Navbar.styles";
import { useData } from "../../context/DataContext";

interface NavbarProps {}
export const Navbar = ({}: NavbarProps) => {
  const { profile } = useData();
  return (
    <View style={styles.navbar} accessibilityRole="header">
      <Image
        source={require("../../assets/swipejobs-logo-light.png")}
        style={styles.logo}
        resizeMode="contain"
        accessible
        accessibilityLabel={"Swipejobs logo"}
      />
      <Text style={{ color: "#FFF" }}>
        {profile ? `${profile?.firstName} ${profile?.lastName}` : ""}
      </Text>
    </View>
  );
};
