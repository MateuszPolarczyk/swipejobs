import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import JobDetails from "../JobDetails";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useData } from "../../../context/DataContext";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock("@expo/vector-icons/Feather", () => "Feather");

jest.mock("../../../context/DataContext", () => ({
  useData: jest.fn(),
}));

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));

jest.mock("../../../helpers/openMap", () => ({
  openInMap: jest.fn(),
}));

jest.mock("../../../helpers/phoneNumber", () => ({
  formatUSPhoneNumber: (phone: string) => phone,
}));

describe("JobDetails", () => {
  const mockGoBack = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
      goBack: mockGoBack,
    });

    (useRoute as jest.Mock).mockReturnValue({
      params: { id: "job1", workerId: "worker1" },
    });

    (useData as jest.Mock).mockReturnValue({
      jobs: [
        {
          jobId: "job1",
          jobTitle: {
            name: "Dishwasher",
            imageUrl: "https://example.com/dishwasher.jpg",
          },
          company: {
            name: "CleanCo",
            address: { formattedAddress: "123 Soap St" },
            reportTo: { name: "Jane Doe", phone: "1234567890" },
          },
          wagePerHourInCents: 1500,
          milesToTravel: 2.5,
          shifts: [
            {
              startDate: new Date("2024-01-01T08:00:00Z"),
              endDate: new Date("2024-01-01T16:00:00Z"),
            },
          ],
          branch: "Main Branch",
          branchPhoneNumber: "9876543210",
          requirements: ["Work boots", "Gloves"],
        },
      ],
      rejectJob: jest.fn().mockResolvedValue({ success: true }),
      acceptJob: jest.fn().mockResolvedValue({ success: true }),
      removeJob: jest.fn(),
    });
  });

  it("renders job details", () => {
    const { getByText } = render(<JobDetails />);

    expect(getByText("Dishwasher")).toBeTruthy();
    expect(getByText("CleanCo")).toBeTruthy();
    expect(getByText("2.50 miles")).toBeTruthy();
    expect(getByText("$15.00")).toBeTruthy();
    expect(getByText("123 Soap St")).toBeTruthy();
    expect(getByText("Jane Doe")).toBeTruthy();
    expect(getByText("1234567890")).toBeTruthy();
  });

  it("goes back when back button is pressed", () => {
    const { getByText } = render(<JobDetails />);
    fireEvent.press(getByText("Back"));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it("handles job rejection", async () => {
    const { getByText } = render(<JobDetails />);
    fireEvent.press(getByText("No Thanks"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("MainTabs", { screen: "Jobs" });
    });
  });

  it("handles job acceptance", async () => {
    const { getByText } = render(<JobDetails />);
    fireEvent.press(getByText("I'll Take that"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("MainTabs", { screen: "Jobs" });
    });
  });
});
