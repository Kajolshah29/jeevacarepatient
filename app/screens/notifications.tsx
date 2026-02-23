import { useRouter } from 'expo-router'
import { ArrowLeft, Bell } from 'lucide-react-native'
import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function NotificationsScreen() {
  const router = useRouter()

  const notifications = [
    { id: 1, title: 'Appointment Reminder', description: 'Your appointment with Dr. Patel is tomorrow at 10:00 AM', time: '2 hours ago' },
    { id: 2, title: 'Medicine Available', description: 'Your prescribed medicine is now available at nearby pharmacies', time: '4 hours ago' },
    { id: 3, title: 'Lab Report Ready', description: 'Your blood test report is ready for download', time: '1 day ago' },
    { id: 4, title: 'Special Offer', description: 'Get 20% off on your next doctor consultation', time: '2 days ago' },
  ]

  const NotificationCard = ({ notification }: any) => (
    <TouchableOpacity style={styles.notificationCard} activeOpacity={0.8}>
      <View style={styles.notificationIcon}>
        <Bell size={24} color="#2567E8" />
      </View>
      
      <View style={styles.notificationInfo}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationDescription}>{notification.description}</Text>
        <Text style={styles.notificationTime}>{notification.time}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationCard notification={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
  },
  listContent: {
    padding: 20,
    gap: 15,
  },
  notificationCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  notificationIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#E8F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: '#888',
  },
})
