import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

const { width } = Dimensions.get("window");

type BannerType = "doctor" | "pharmacy" | "lab";

type Props = {
  style?: ViewStyle;
  type?: BannerType;
};

const bannerData = {
  doctor: {
    colors: ["#5B7FFF", "#4A66D6"],
    smallText: "Trusted doctor on your schedule 😉",
    title: "Consult A Doctor\n— Book Today!",
    image: require("../assets/images/image 44.png"),
    highlight: "#4A66D6",
  },
  pharmacy: {
    colors: ["#16A34A", "#15803D"],
    smallText: "Medicines delivered fast 💊",
    title: "Order Medicines\nAt Your Doorstep!",
    image: require("../assets/images/meds.png"), // add your image
    highlight: "#15803D",
  },
  lab: {
    colors: ["#F97316", "#EA580C"],
    smallText: "Accurate tests, quick reports 🧪",
    title: "Book Lab Tests\nFrom Home!",
    image: require("../assets/images/technician.png"), // add your image
    highlight: "#EA580C",
  },
};

export default function DoctorAdBanner({
  style,
  type = "doctor",
}: Props) {
  const data = bannerData[type];

  return (
    <LinearGradient
      colors={data.colors as [string, string, ...string[]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
    >
      {/* Left Content */}
      <View style={styles.leftContent}>
        <Text style={styles.smallText}>{data.smallText}</Text>

        <Text style={styles.title}>
          {data.title}
        </Text>

        {/* Patients / Users Row */}
        <View style={styles.patientRow}>
          <View style={styles.avatarGroup}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=12" }}
              style={[styles.avatar, { left: 0, borderColor: data.highlight }]}
            />
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=25" }}
              style={[styles.avatar, { left: 20, borderColor: data.highlight }]}
            />
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=36" }}
              style={[styles.avatar, { left: 40, borderColor: data.highlight }]}
            />
          </View>

          <View style={{ marginLeft: 60 }}>
            <Text style={styles.patientCount}>30,000+</Text>
            <Text style={styles.patientText}>Happy Users</Text>
          </View>
        </View>
      </View>

      {/* Right Image */}
      <Image source={data.image} style={styles.image} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 30,
    height: 180,
    borderRadius: 25,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  leftContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  smallText: {
    color: "#E0E7FF",
    fontSize: 14,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 30,
    marginVertical: 10,
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarGroup: {
    width: 80,
    height: 40,
    position: "relative",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    borderWidth: 2,
  },
  patientCount: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  patientText: {
    color: "#E0E7FF",
    fontSize: 14,
  },
  image: {
    width: 180,
    height: 200,
    resizeMode: "contain",
    position: "absolute",
    right: -10,
    bottom: -10,
  },
});