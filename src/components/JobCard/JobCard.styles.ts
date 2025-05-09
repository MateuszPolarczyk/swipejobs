import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export default StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#232829",
    backgroundColor: "#fafafa",
  },
  imageContainer: {
    height: "40%",
    padding: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  informationContainer: {
    height: "10%",
    padding: 10,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: "800",
  },
  jobCompany: {
    fontSize: 15,
    fontWeight: "400",
  },
  detailsContainer: {
    height: "50%",
    justifyContent: "space-between",
    padding: 10,
  },
  detailRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  detailInfo: {
    fontSize: 12,
    fontWeight: "400",
  },
  icon: {
    alignSelf: "center",
  },
  button: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: THEME.colors.accent,
    borderRadius: 10,
    gap: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "700",
    color: THEME.colors.accent,
  },
});
