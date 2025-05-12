import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { JobSwiper } from "../JobSwiper";
import { useData } from "../../../context/DataContext";
import { NavigationContainer } from "@react-navigation/native";

jest.mock("../../../context/DataContext", () => ({
  useData: jest.fn(),
}));

jest.mock("@expo/vector-icons/Feather", () => "Feather");

it("shows loading indicator when loading", () => {
  (useData as jest.Mock).mockReturnValue({
    jobs: [],
    isLoading: true,
    error: null,
    acceptJob: jest.fn(),
    rejectJob: jest.fn(),
  });

  const { getByText, getByTestId } = render(<JobSwiper />);
  expect(getByText("Loading jobs...")).toBeTruthy();
});

it("shows empty state when no jobs left", () => {
  (useData as jest.Mock).mockReturnValue({
    jobs: [],
    isLoading: false,
    error: null,
    acceptJob: jest.fn(),
    rejectJob: jest.fn(),
  });

  const { getByText } = render(<JobSwiper />);
  expect(
    getByText("We've reached the bottom of the job barrel.\nCheck back soon!")
  ).toBeTruthy();
});

it("shows error message when error is present", () => {
  (useData as jest.Mock).mockReturnValue({
    jobs: [],
    isLoading: false,
    error: "Network error",
    acceptJob: jest.fn(),
    rejectJob: jest.fn(),
  });

  const { getByText } = render(<JobSwiper />);
  expect(getByText("Error: Network error")).toBeTruthy();
});

it("renders a JobCard when jobs are available", async () => {
  const mockJob = {
    jobId: "1",
    jobTitle: { name: "Plumber", imageUrl: "https://image.com" },
    company: {
      name: "FixIt Inc",
      address: { formattedAddress: "123 Fix St" },
    },
    wagePerHourInCents: 2500,
    milesToTravel: 3.5,
  };

  (useData as jest.Mock).mockReturnValue({
    jobs: [mockJob],
    isLoading: false,
    error: null,
    acceptJob: jest.fn().mockResolvedValue({ success: true }),
    rejectJob: jest.fn().mockResolvedValue({ success: true }),
  });

  const { getByText } = render(
    <NavigationContainer>
      <JobSwiper />
    </NavigationContainer>
  );
  await waitFor(() => {
    expect(getByText("Plumber")).toBeTruthy();
    expect(getByText("FixIt Inc")).toBeTruthy();
  });
});
