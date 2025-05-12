import { Linking } from "react-native";
import Toast from "react-native-toast-message";

export const openInMap = async (address: string) => {
  if (!address) return;

  const encodedAddress = encodeURIComponent(address);
  const mapURL = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  const supported = await Linking.canOpenURL(mapURL);

  if (supported) {
    Linking.openURL(mapURL);
  } else {
    Toast.show({
      type: "error",
      text1: "Unable to open map",
      text2: "Please check your address or try again later.",
    });
  }
};
