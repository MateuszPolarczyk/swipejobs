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
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  jobTitle: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 4,
    color: "#000",
  },
  companyName: {
    fontSize: 16,
    color: "#777",
    marginBottom: 16,
    fontWeight: "500",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: THEME.colors.accent,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  infoColumn: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFF",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFF",
  },
  dollarSign: {
    fontSize: 12,
    color: "#fff",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#111",
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: "300",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 16,
  },
  detailRight: {
    flex: 1,
    gap: 4,
  },
  detailText: {
    fontSize: 15,
    color: "#333",
  },
  smallNote: {
    fontSize: 12,
    color: "#888",
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
