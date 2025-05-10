import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export default StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    marginLeft: 8,
    color: "#333",
  },
  jobImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  content: {
    paddingBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
  detailText: {
    fontSize: 15,
    color: "#333",
  },
  section: {
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: "300",
  },
  shiftRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shiftLabel: {
    fontWeight: "600",
  },
  requirementText: {
    fontSize: 15,
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    gap: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  noButton: {
    borderWidth: 0.5,
    borderColor: THEME.colors.primary,
  },
  yesButton: {
    backgroundColor: THEME.colors.primary,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  noButtonText: {
    color: "#000",
  },
});
