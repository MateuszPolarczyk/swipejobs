import { render } from "@testing-library/react-native";
import { Navbar } from "../Navbar";
import { useData } from "../../../context/DataContext";

jest.mock("../../../context/DataContext", () => ({
  useData: jest.fn(),
}));

describe("Navbar", () => {
  it("renders without crashing", () => {
    (useData as jest.Mock).mockReturnValue({
      profile: { firstName: "John", lastName: "Doe" },
    });

    const { getByTestId } = render(<Navbar />);
    expect(getByTestId("navbar")).toBeTruthy();
  });

  it("displays the user's full name", () => {
    (useData as jest.Mock).mockReturnValue({
      profile: { firstName: "Jane", lastName: "Smith" },
    });

    const { getByText } = render(<Navbar />);
    expect(getByText("Jane Smith")).toBeTruthy();
  });

  it("renders fallback when profile is undefined", () => {
    (useData as jest.Mock).mockReturnValue({
      profile: null,
    });

    const { getByTestId } = render(<Navbar />);
    expect(getByTestId("navbar")).toBeTruthy();
  });

  it("renders logo element", () => {
    (useData as jest.Mock).mockReturnValue({
      profile: { firstName: "John", lastName: "Doe" },
    });

    const { getByTestId } = render(<Navbar />);
    expect(getByTestId("navbar-logo")).toBeTruthy();
  });
});
