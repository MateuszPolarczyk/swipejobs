import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./Profile.styles";
import Feather from "@expo/vector-icons/Feather";

import { useData } from "../../context/DataContext";
import { formatUSPhoneNumber } from "../../helpers/phoneNumber";
import { openInMap } from "../../helpers/openMap";

interface ProfileProps {}

const ProfileScreen = ({}: ProfileProps) => {
  const { profile, isLoading, error } = useData();

  const formattedPhoneNumber = formatUSPhoneNumber(profile?.phoneNumber);

  const showUserLocation = () => {
    if (profile?.address.formattedAddress) {
      openInMap(profile.address.formattedAddress);
    }
  };

  if (!isLoading && !error) {
    return (
      <View style={styles.container}>
        <View style={[styles.detailRow, { alignSelf: "center" }]}>
          <Image
            source={require("../../assets/default-avatar.jpg")}
            style={{
              alignSelf: "center",
              width: 100,
              height: 100,
              borderRadius: 50,
            }}
          />
        </View>
        <View style={[styles.detailRow, { alignSelf: "center" }]}>
          <Text style={{ fontSize: 20 }}>
            Hello, {profile?.firstName} {profile?.lastName}!
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Feather name="mail" size={25} color={"#000"} style={styles.icon} />
          <View style={{ gap: 3 }}>
            <Text style={styles.detailTitle}>E-mail</Text>
            <Text style={styles.detailInfo}>{profile?.email}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.detailRow}
          onPress={() => {
            showUserLocation();
          }}
        >
          <Feather
            name="map-pin"
            size={25}
            color={"#000"}
            style={styles.icon}
          />
          <View style={{ gap: 3 }}>
            <Text style={styles.detailTitle}>Address</Text>
            <Text style={styles.detailInfo}>
              {profile?.address.formattedAddress}
            </Text>
          </View>
          <Feather
            name="chevron-right"
            size={20}
            color={"#000"}
            style={[styles.icon, { alignSelf: "flex-end" }]}
          />
        </TouchableOpacity>
        <View style={styles.detailRow}>
          <Feather name="map" size={25} color={"#000"} style={styles.icon} />
          <View style={{ gap: 3 }}>
            <Text style={styles.detailTitle}>Zone</Text>
            <Text style={styles.detailInfo}>{profile?.address.zoneId}</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <Feather name="phone" size={25} color={"#000"} style={styles.icon} />
          <View style={{ gap: 3 }}>
            <Text style={styles.detailTitle}>Phone</Text>
            <Text style={styles.detailInfo}>{formattedPhoneNumber}</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <Feather
            name="crosshair"
            size={25}
            color={"#000"}
            style={styles.icon}
          />
          <View style={{ gap: 3 }}>
            <Text style={styles.detailTitle}>Max job distance</Text>
            <Text style={styles.detailInfo}>
              {profile?.maxJobDistance} miles
            </Text>
          </View>
        </View>
      </View>
    );
  }
};

export default ProfileScreen;
