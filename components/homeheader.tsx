import { useRouter } from "expo-router";
import {
    Bell,
    ChevronDown,
    MapPinned,
    Search,
    TextAlignJustify,
} from "lucide-react-native";
import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeHeader() {
  const router = useRouter();

  const handleServicePress = (service: string) => {
    const serviceRoutes: Record<string, string> = {
      Reports: "/services/reports",
      Doctor: "/services/doctor",
      Pharmacy: "/services/pharmacy",
      "Lab Test": "/services/labtest",
    };
    router.push(serviceRoutes[service] as any);
  };

  const handleNavigate = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]}>
        {/* 🔹 Top Row */}
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => handleNavigate("/screens/menu")}>
            <TextAlignJustify size={26} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.locationContainer} onPress={() => handleNavigate("/screens/location")}>
            <Text style={styles.locationLabel}>Location</Text>

            <View style={styles.locationRow}>
              <MapPinned size={18} color="white" />
              <Text style={styles.locationText}>
                Ahmedabad, Gujarat
              </Text>
              <ChevronDown size={18} color="white" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleNavigate("/screens/notifications")}>
            <Bell size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* 🔹 Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#888" />
          <TextInput
            placeholder="Search Doctors, Medicines, Labtests..."
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
        </View>

        {/* 🔹 Services */}
        <Text style={styles.servicesTitle}>Services</Text>

        <View style={styles.servicesRow}>
          <ServiceItem
            image={require("../assets/images/reporticon.png")}
            label="Reports"
            onPress={() => handleServicePress("Reports")}
          />
          <ServiceItem
            image={require("../assets/images/doctoricon.png")}
            label="Doctor"
            onPress={() => handleServicePress("Doctor")}
          />
          <ServiceItem
            image={require("../assets/images/pharmacyicon.png")}
            label="Pharmacy"
            onPress={() => handleServicePress("Pharmacy")}
          />
          <ServiceItem
            image={require("../assets/images/labsicon.png")}
            label="Lab Test"
            onPress={() => handleServicePress("Lab Test")}
          />
        </View>
      </SafeAreaView>
    </View>
    
  );
}

const ServiceItem = ({
  image,
  label,
  onPress,
}: {
  image: any;
  label: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.serviceItem} activeOpacity={0.8} onPress={onPress}>
      <Image source={image} style={styles.serviceImage} />
      <Text style={styles.serviceText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2567E8",
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  locationContainer: {
    alignItems: "center",
  },

  locationLabel: {
    color: "#dbeafe",
    fontSize: 14,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  locationText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 6,
  },

  searchContainer: {
    marginTop: 25,
    backgroundColor: "#e5e7eb",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },

  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 15,
  },

  servicesTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 20,
  },

  servicesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  serviceItem: {
    alignItems: "center",
    flex: 1,
  },

  serviceImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },

  serviceText: {
    color: "white",
    marginTop: 8,
    fontSize: 15,
    fontWeight: "500",
  },
});

