import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { JobCard } from "../JobCard";
import { useNavigation } from "@react-navigation/native";
import { useData } from "../../../context/DataContext";

jest.mock("@expo/vector-icons/Feather", () => "Feather");

const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock("../../../context/DataContext", () => ({
  useData: () => ({
    profile: { workerId: "123" },
  }),
}));

describe("JobCard", () => {
  const jobData = {
    id: "job123",
    jobImageUrl: "https://example.com/image.jpg",
    jobTitle: "Barista",
    jobCompany: "Coffee Inc",
    jobHourlyRate: 15.5,
    jobDistance: 3.2,
    jobLocation: "123 Bean Street",
  };

  const mockOnSwipe = jest.fn().mockResolvedValue(true);
  const mockOnDismiss = jest.fn();

  it("renders job details correctly", () => {
    const { getByText } = render(
      <JobCard
        jobData={jobData}
        onSwipe={mockOnSwipe}
        onDismiss={mockOnDismiss}
      />
    );

    expect(getByText("Barista")).toBeTruthy();
    expect(getByText("Coffee Inc")).toBeTruthy();
    expect(getByText("$15.50")).toBeTruthy();
    expect(getByText("3.20 miles")).toBeTruthy();
    expect(getByText("123 Bean Street")).toBeTruthy();
  });

  it("navigates to job details on button press", () => {
    const { getByText } = render(
      <JobCard
        jobData={jobData}
        onSwipe={mockOnSwipe}
        onDismiss={mockOnDismiss}
      />
    );

    fireEvent.press(getByText("Find out more"));
    expect(mockNavigate).toHaveBeenCalledWith("JobDetails", {
      id: "job123",
      workerId: "123",
    });
  });
});
