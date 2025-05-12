import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ProfileScreen from "../Profile";
import { useData } from "../../../context/DataContext";

jest.mock("../../../helpers/openMap", () => ({
  openInMap: jest.fn(),
}));

jest.mock("@expo/vector-icons/Feather", () => "Feather");

jest.mock("../../../context/DataContext", () => ({
  useData: jest.fn(),
}));

describe("ProfileScreen", () => {
  const mockProfile = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phoneNumber: "1234567890",
    maxJobDistance: 15,
    address: {
      formattedAddress: "123 Main St, Anytown, USA",
      zoneId: "zone-1",
    },
  };

  beforeEach(() => {
    (useData as jest.Mock).mockReturnValue({
      profile: mockProfile,
      isLoading: false,
      error: null,
    });
  });

  it("renders user profile info", () => {
    const { getByText } = render(<ProfileScreen />);

    expect(getByText("Hello, John Doe!")).toBeTruthy();
    expect(getByText("E-mail")).toBeTruthy();
    expect(getByText("john@example.com")).toBeTruthy();
    expect(getByText("123 Main St, Anytown, USA")).toBeTruthy();
    expect(getByText("15 miles")).toBeTruthy();
  });

  it("calls openInMap when address is pressed", () => {
    const { getByText } = render(<ProfileScreen />);
    const addressRow = getByText("123 Main St, Anytown, USA");

    fireEvent.press(addressRow);
    const { openInMap } = require("../../../helpers/openMap");
    expect(openInMap).toHaveBeenCalledWith("123 Main St, Anytown, USA");
  });
});
