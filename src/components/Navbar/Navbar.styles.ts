import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export default StyleSheet.create({
  navbar: {
    flexDirection: "row",
    height: 80,
    width: "100%",
    backgroundColor: THEME.colors.primary,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 80,
  },
  user: {
    fontSize: 16,
    color: THEME.colors.secondary,
    fontWeight: "500",
  },
});
