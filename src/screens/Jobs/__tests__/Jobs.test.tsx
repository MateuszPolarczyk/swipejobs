import React from "react";
import { render } from "@testing-library/react-native";
import JobsScreen from "../Jobs";

jest.mock("../../../components/JobSwiper/JobSwiper", () => ({
  JobSwiper: () => <></>,
}));

describe("JobsScreen", () => {
  it("renders without crashing and includes JobSwiper", () => {
    const { getByTestId } = render(<JobsScreen />);
    expect(getByTestId("job-swiper")).toBeTruthy();
  });
});
