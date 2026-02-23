import { Tabs } from "expo-router";
import { Calendar, ChartBar, ChartGantt, Home, QrCode, Shield, ShieldPlus } from "lucide-react-native";
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#6b7280",
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color, size }) => (
            <Calendar color={color} size={size} />
          ),
        }}
      />

      {/* 🔵 CENTER FLOATING BUTTON */}
      <Tabs.Screen
        name="mycard"
        options={{
          title: "",
          tabBarButton: ({ onPress }) => (
            <View style={styles.centerButton}>
              <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.8}
                style={styles.centerIcon}
              >
                <QrCode color="white" size={28} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarIcon: ({ color, size }) => (
            <ChartGantt color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="insurance"
        options={{
          title: "Insurance",
          tabBarIcon: ({ color, size }) => <ShieldPlus color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    backgroundColor: "#f1f5f9",
    position: "absolute",
  },
  centerButton: {
    top: -30, // lifts button above tab bar
    justifyContent: "center",
    alignItems: "center",
  },
  centerIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#2567E8",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android shadow
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
});
