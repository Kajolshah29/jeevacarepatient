import { useRouter } from 'expo-router'
import {
    Calendar,
    Clock,
    MapPin,
    Plus,
    Search,
    Video
} from 'lucide-react-native'
import React, { useState } from 'react'
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Appointment {
  id: string
  doctorName: string
  specialty: string
  date: string
  time: string
  type: 'in-person' | 'video'
  location?: string
  status: 'upcoming' | 'completed' | 'cancelled'
}

export default function Schedule() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming')

  const appointments: Appointment[] = [
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: 'Feb 23, 2026',
      time: '10:00 AM',
      type: 'in-person',
      location: 'City Hospital, Block A',
      status: 'upcoming',
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      date: 'Feb 25, 2026',
      time: '2:30 PM',
      type: 'video',
      status: 'upcoming',
    },
    {
      id: '3',
      doctorName: 'Dr. Emily Davis',
      specialty: 'General Physician',
      date: 'Feb 27, 2026',
      time: '11:00 AM',
      type: 'in-person',
      location: 'Wellness Clinic, Floor 2',
      status: 'upcoming',
    },
    {
      id: '4',
      doctorName: 'Dr. James Wilson',
      specialty: 'Orthopedic',
      date: 'Feb 15, 2026',
      time: '9:00 AM',
      type: 'in-person',
      location: 'Sports Medicine Center',
      status: 'completed',
    },
    {
      id: '5',
      doctorName: 'Dr. Lisa Anderson',
      specialty: 'Pediatrician',
      date: 'Feb 10, 2026',
      time: '3:00 PM',
      type: 'video',
      status: 'completed',
    },
  ]

  const upcomingAppointments = appointments.filter((a) => a.status === 'upcoming')
  const completedAppointments = appointments.filter((a) => a.status === 'completed')

  const displayedAppointments =
    activeTab === 'upcoming' ? upcomingAppointments : completedAppointments

  const renderAppointmentCard = (appointment: Appointment) => (
    <TouchableOpacity key={appointment.id} style={styles.appointmentCard}>
      <View style={styles.cardHeader}>
        <View style={styles.doctorInfo}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {appointment.doctorName
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </Text>
          </View>
          <View style={styles.doctorDetails}>
            <Text style={styles.doctorName}>{appointment.doctorName}</Text>
            <Text style={styles.specialty}>{appointment.specialty}</Text>
          </View>
        </View>
        <View
          style={[
            styles.typeBadge,
            appointment.type === 'video' ? styles.videoBadge : styles.inPersonBadge,
          ]}
        >
          {appointment.type === 'video' ? (
            <Video size={14} color="#2563EB" />
          ) : (
            <MapPin size={14} color="#16A34A" />
          )}
        </View>
      </View>

      <View style={styles.appointmentDetails}>
        <View style={styles.detailRow}>
          <Calendar size={16} color="#6B7280" />
          <Text style={styles.detailText}>{appointment.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Clock size={16} color="#6B7280" />
          <Text style={styles.detailText}>{appointment.time}</Text>
        </View>
      </View>

      {appointment.location && (
        <View style={styles.locationRow}>
          <MapPin size={14} color="#6B7280" />
          <Text style={styles.locationText}>{appointment.location}</Text>
        </View>
      )}

      <View style={styles.cardActions}>
        {appointment.status === 'upcoming' && (
          <>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Reschedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
              <Text style={[styles.actionButtonText, styles.primaryButtonText]}>
                View Details
              </Text>
            </TouchableOpacity>
          </>
        )}
        {appointment.status === 'completed' && (
          <TouchableOpacity style={[styles.actionButton, styles.outlineButton]}>
            <Text style={styles.outlineButtonText}>Book Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Schedule</Text>
          <Text style={styles.headerSubtitle}>
            {upcomingAppointments.length} upcoming appointments
          </Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#9CA3AF" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search appointments..."
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Appointments List */}
      <ScrollView
        style={styles.appointmentsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.appointmentsContent}
      >
        {displayedAppointments.length > 0 ? (
          displayedAppointments.map(renderAppointmentCard)
        ) : (
          <View style={styles.emptyState}>
            <Calendar size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No {activeTab} appointments</Text>
            <Text style={styles.emptyText}>
              {activeTab === 'upcoming'
                ? 'Book an appointment to see it here'
                : 'Your completed appointments will appear here'}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
  },

  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },

  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1F2937',
  },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    padding: 4,
  },

  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },

  activeTab: {
    backgroundColor: '#2563EB',
  },

  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },

  activeTabText: {
    color: '#FFFFFF',
  },

  appointmentsList: {
    flex: 1,
  },

  appointmentsContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },

  doctorInfo: {
    flexDirection: 'row',
    flex: 1,
  },

  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563EB',
  },

  doctorDetails: {
    flex: 1,
  },

  doctorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },

  specialty: {
    fontSize: 14,
    color: '#6B7280',
  },

  typeBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  videoBadge: {
    backgroundColor: '#DBEAFE',
  },

  inPersonBadge: {
    backgroundColor: '#DCFCE7',
  },

  appointmentDetails: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 12,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  detailText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },

  locationText: {
    fontSize: 13,
    color: '#6B7280',
    flex: 1,
  },

  cardActions: {
    flexDirection: 'row',
    gap: 12,
  },

  actionButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },

  primaryButton: {
    backgroundColor: '#2563EB',
  },

  outlineButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#2563EB',
  },

  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },

  primaryButtonText: {
    color: '#FFFFFF',
  },

  outlineButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
})