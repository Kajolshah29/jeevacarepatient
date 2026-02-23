import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get('window')

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  image: any;
  isAvailable: boolean;
}

interface RecommendedDoctorsProps {
  doctors: Doctor[];
  onViewAll?: () => void;
  onDoctorPress?: (doctor: Doctor) => void;
}

export default function RecommendedDoctors({
  doctors,
  onViewAll,
  onDoctorPress,
}: RecommendedDoctorsProps) {
  const [selectedFilter, setSelectedFilter] = useState("Lastest");

  const filters = ["Lastest", "Physician", "Skin Specialist", "Cardiologist"];

  const DoctorCard = ({ doctor }: { doctor: Doctor }) => (
    <TouchableOpacity
      style={styles.doctorCard}
      onPress={() => onDoctorPress?.(doctor)}
    >
      {/* Available Badge */}
      {doctor.isAvailable && (
        <View style={styles.availableBadge}>
          <View style={styles.dot} />
          <Text style={styles.availableText}>Available</Text>
        </View>
      )}

      {/* Doctor Image */}
      <Image source={doctor.image} style={styles.doctorImage} />

      {/* Hospital Section */}
      <View style={styles.hospitalSection}>
        <Text style={styles.hospitalName}>{doctor.hospital}</Text>
        <MaterialCommunityIcons name="hospital-box" size={20} color="#fff" />
      </View>

      {/* Doctor Info */}
      <View style={styles.doctorInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty}</Text>
        </View>
        <View style={styles.ratingBadge}>
          <MaterialCommunityIcons name="star" size={18} color="#FFA500" />
          <Text style={styles.rating}>{doctor.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Recommended Doctors</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              selectedFilter === filter && styles.filterTabActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Doctors List - Horizontal Scroll */}
      <FlatList
        data={doctors}
        renderItem={({ item }) => <DoctorCard doctor={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.doctorsListContent}
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

  filterContainer: {
    marginBottom: 16,
  },

  filterContent: {
    paddingHorizontal: 16,
    gap: 10,
  },

  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  filterTabActive: {
    backgroundColor: "#E0F2FE",
    borderColor: "#2563EB",
  },

  filterText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },

  filterTextActive: {
    color: "#2563EB",
    fontWeight: "600",
  },

  doctorsListContent: {
    paddingHorizontal: 16,
    gap: 12,
  },

  doctorCard: {
    width: SCREEN_WIDTH * 0.7,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
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

  doctorImage: {
    width: "100%",
    height: 220,
    backgroundColor: "#F3F4F6",
    resizeMode: "cover",
  },

  hospitalSection: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  hospitalName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },

  doctorInfo: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  nameContainer: {
    flex: 1,
  },

  doctorName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },

  specialty: {
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