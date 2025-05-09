import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "space-between",
    gap: 20
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
});

export default styles;
