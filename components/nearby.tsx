import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get('window')

interface Facility {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  image: any;
  isAvailable: boolean;
  distance: number; // in km
}

interface NearbyFacilitiesProps {
  title: string;
  facilities: Facility[];
  onViewAll?: () => void;
  onFacilityPress?: (facility: Facility) => void;
}

export default function NearbyFacilities({
  title,
  facilities,
  onViewAll,
  onFacilityPress,
}: NearbyFacilitiesProps) {

  const FacilityCard = ({ facility }: { facility: Facility }) => (
    <TouchableOpacity
      style={styles.facilityCard}
      onPress={() => onFacilityPress?.(facility)}
    >
      {/* Available Badge */}
      {facility.isAvailable && (
        <View style={styles.availableBadge}>
          <View style={styles.dot} />
          <Text style={styles.availableText}>Available</Text>
        </View>
      )}

      {/* Facility Image */}
      <Image source={facility.image} style={styles.facilityImage} />

      {/* Info */}
      <View style={styles.facilityInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.facilityName}>{facility.name}</Text>
          <Text style={styles.specialization}>{facility.specialization}</Text>
        </View>
        <View style={styles.ratingBadge}>
          <MaterialCommunityIcons name="star" size={18} color="#FFA500" />
          <Text style={styles.rating}>{facility.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Facilities List - Horizontal Scroll */}
      <FlatList
        data={facilities}
        renderItem={({ item }) => <FacilityCard facility={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.facilitiesListContent}
        snapToInterval={280}
        decelerationRate="fast"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
  },

  viewAll: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },

  facilitiesListContent: {
    paddingHorizontal: 16,
    gap: 12,
  },

  facilityCard: {
    width: SCREEN_WIDTH * 0.7,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },

  availableBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4CAF50",
    marginRight: 6,
  },

  availableText: {
    color: "#2E7D32",
    fontSize: 11,
    fontWeight: "600",
  },

  facilityImage: {
    width: "100%",
    height: 220,
    backgroundColor: "#F3F4F6",
    resizeMode: "cover",
  },

  facilityInfo: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  nameContainer: {
    flex: 1,
  },

  facilityName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },

  specialization: {
    fontSize: 12,
    color: "#9CA3AF",
  },

  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginLeft: 8,
  },

  rating: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFA500",
  },
});