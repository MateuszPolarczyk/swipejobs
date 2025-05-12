import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import { JobCard } from "../../components/JobCard/JobCard";

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));
jest.mock("@expo/vector-icons/Feather", () => "Feather");

const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock("../DataContext", () => ({
  useData: () => ({
    profile: {
      workerId: "worker-123",
    },
  }),
}));

const mockJobData = {
  id: "job-1",
  jobImageUrl: "https://example.com/image.jpg",
  jobTitle: "Test Job",
  jobCompany: "Test Company",
  jobHourlyRate: 25,
  jobDistance: 5,
  jobLocation: "New York",
};

describe("JobCard", () => {
  it("renders job information correctly", () => {
    const { getByText } = render(
      <JobCard
        jobData={mockJobData}
        onSwipe={jest.fn().mockResolvedValue(true)}
        onDismiss={jest.fn()}
      />
    );

    expect(getByText("Test Job")).toBeTruthy();
    expect(getByText("Test Company")).toBeTruthy();
    expect(getByText("$25.00")).toBeTruthy();
    expect(getByText("5.00 miles")).toBeTruthy();
    expect(getByText("New York")).toBeTruthy();
    expect(getByText("Find out more")).toBeTruthy();
  });

  it("navigates to JobDetails when button is pressed", () => {
    const { getByText } = render(
      <JobCard
        jobData={mockJobData}
        onSwipe={jest.fn()}
        onDismiss={jest.fn()}
      />
    );

    fireEvent.press(getByText("Find out more"));
    expect(mockNavigate).toHaveBeenCalledWith("JobDetails", {
      id: "job-1",
      workerId: "worker-123",
    });
  });

  it("shows toast on swipe left (rejection)", async () => {
    const mockSwipe = jest.fn().mockResolvedValue(true);
    const mockDismiss = jest.fn();

    render(
      <JobCard
        jobData={mockJobData}
        onSwipe={mockSwipe}
        onDismiss={mockDismiss}
      />
    );

    await act(async () => {
      await mockSwipe("left", "job-1");
      mockDismiss();
    });

    expect(mockSwipe).toHaveBeenCalledWith("left", "job-1");
    expect(mockDismiss).toHaveBeenCalled();
  });
});
