import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const ITEM_SIZE = (width - 60) / 4;

const categories = [
  { id: "1", name: "Physician", icon: require("../assets/images/physican.png") },
  { id: "2", name: "Dermatologist", icon: require("../assets/images/skin.png") },
  { id: "3", name: "Gynecologist", icon: require("../assets/images/gyna.png") },
  { id: "4", name: "Diabetic", icon: require("../assets/images/diabetes.png") },
  { id: "5", name: "Dentist", icon: require("../assets/images/dentist.png") },
  { id: "6", name: "Eye Specialist", icon: require("../assets/images/eye.png") },
  { id: "7", name: "ENT Specialist", icon: require("../assets/images/ent.png") },
  { id: "8", name: "Pain Mgt", icon: require("../assets/images/painmgt.png") },
  { id: "9", name: "Pediatrician", icon: require("../assets/images/child.png") },
  { id: "10", name: "Neurologist", icon: require("../assets/images/neuro.png") },
  { id: "11", name: "Surgeon", icon: require("../assets/images/surgeon.png") },
  { id: "12", name: "Gastro", icon: require("../assets/images/gastro.png") },
  { id: "13", name: "Psychiatrist", icon: require("../assets/images/psychiatrist.png") },
  { id: "14", name: "Pulmonologist", icon: require("../assets/images/pulmo.png") },
  { id: "15", name: "Consultant", icon: require("../assets/images/consultant.png") },
  { id: "16", name: "Cardiologist", icon: require("../assets/images/cardio.png") },
  { id: "17", name: "Endocrine", icon: require("../assets/images/endocrine.png") },
  { id: "18", name: "Orthopedic", icon: require("../assets/images/ortho.png") },
  { id: "19", name: "Nephrologist", icon: require("../assets/images/nepro.png") },
  { id: "20", name: "Urologist", icon: require("../assets/images/urologist.png") },
];

export default function DoctorsCategorySection({ onPressCategory }: any) {
  const [showAll, setShowAll] = useState(false);

  // Show only 2 rows (8 items) when collapsed
  const displayedData = showAll ? categories : categories.slice(0, 8);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Doctors Specialization</Text>
        <TouchableOpacity onPress={() => setShowAll(!showAll)}>
          <Text style={styles.viewAll}>
            {showAll ? "Show Less" : "View All"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Grid */}
      <FlatList
        data={displayedData}
        keyExtractor={(item) => item.id}
        numColumns={4}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <DoctorCategoryCard
            item={item}
            onPress={() => onPressCategory?.(item)}
          />
        )}
      />
    </View>
  );
}

function DoctorCategoryCard({ item, onPress }: any) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconBox}>
        <Image source={item.icon} style={styles.icon} resizeMode="contain" />
      </View>
      <Text style={styles.label} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  viewAll: {
    color: "#6B7280",
    fontWeight: "500",
  },
  card: {
    width: ITEM_SIZE,
    alignItems: "center",
    marginBottom: 20,
  },
  iconBox: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: ITEM_SIZE * 0.6,
    height: ITEM_SIZE * 0.6,
  },
  label: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
});