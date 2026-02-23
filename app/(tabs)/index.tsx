import DoctorAdBanner from '@/components/adsbanner'
import HomeHeader from '@/components/homeheader'
import { useRouter } from 'expo-router'
import {
  Activity,
  AlertCircle,
  Calendar,
  Clock,
  Droplet,
  FileText,
  Heart,
  Pill
} from 'lucide-react-native'
import React from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const CARD_PADDING = 20
const CARD_GAP = 12

const index = () => {
  const router = useRouter()

  const medicines = [
    {
      id: '1',
      name: 'Aspirin',
      dosage: '75mg',
      time: '8:00 AM',
      taken: false,
    },
    {
      id: '2',
      name: 'Vitamin D3',
      dosage: '1000 IU',
      time: '9:00 AM',
      taken: true,
    },
    {
      id: '3',
      name: 'Metformin',
      dosage: '500mg',
      time: '2:00 PM',
      taken: false,
    },
  ]

  const recentReports = [
    {
      id: '1',
      name: 'Blood Test Report',
      date: 'Feb 20, 2026',
      type: 'Lab Report',
      status: 'normal',
    },
    {
      id: '2',
      name: 'X-Ray Chest',
      date: 'Feb 18, 2026',
      type: 'Radiology',
      status: 'normal',
    },
    {
      id: '3',
      name: 'Lipid Profile',
      date: 'Feb 15, 2026',
      type: 'Lab Report',
      status: 'attention',
    },
  ]

  const upcomingAppointments = [
    {
      id: '1',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: 'Feb 23',
      time: '10:00 AM',
    },
    {
      id: '2',
      doctor: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      date: 'Feb 25',
      time: '2:30 PM',
    },
  ]

  const healthMetrics = [
    {
      id: '1',
      label: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      icon: Heart,
      color: '#DC2626',
      bgColor: '#FEE2E2',
    },
    {
      id: '2',
      label: 'Steps',
      value: '8,542',
      unit: 'today',
      icon: Activity,
      color: '#2563EB',
      bgColor: '#DBEAFE',
    },
    {
      id: '3',
      label: 'Water',
      value: '1.8L',
      unit: '/ 2.5L',
      icon: Droplet,
      color: '#06B6D4',
      bgColor: '#CFFAFE',
    },
  ]

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HomeHeader />
        <DoctorAdBanner style={styles.adbanner} />

        {/* Medicine Reminder Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Medicine Reminder</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {medicines.map((medicine) => (
              <TouchableOpacity key={medicine.id} style={styles.medicineCard}>
                <View
                  style={[
                    styles.medicineIcon,
                    { backgroundColor: medicine.taken ? '#DCFCE7' : '#FEF3C7' },
                  ]}
                >
                  <Pill
                    size={24}
                    color={medicine.taken ? '#16A34A' : '#F59E0B'}
                  />
                </View>
                <View style={styles.medicineInfo}>
                  <Text style={styles.medicineName}>{medicine.name}</Text>
                  <Text style={styles.medicineDosage}>{medicine.dosage}</Text>
                  <View style={styles.medicineTime}>
                    <Clock size={14} color="#6B7280" />
                    <Text style={styles.timeText}>{medicine.time}</Text>
                  </View>
                </View>
                {!medicine.taken && (
                  <View style={styles.pendingBadge}>
                    <Text style={styles.pendingText}>Pending</Text>
                  </View>
                )}
                {medicine.taken && (
                  <View style={styles.takenBadge}>
                    <Text style={styles.takenText}>✓ Taken</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Reports Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Reports</Text>
            <TouchableOpacity onPress={() => router.push('/services/reports')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {recentReports.map((report) => (
              <TouchableOpacity key={report.id} style={styles.reportCard}>
                <View style={styles.reportHeader}>
                  <View style={styles.reportIconContainer}>
                    <FileText size={24} color="#2563EB" />
                  </View>
                  <View
                    style={[
                      styles.statusDot,
                      {
                        backgroundColor:
                          report.status === 'normal' ? '#16A34A' : '#F59E0B',
                      },
                    ]}
                  />
                </View>
                <Text style={styles.reportName}>{report.name}</Text>
                <Text style={styles.reportType}>{report.type}</Text>
                <View style={styles.reportFooter}>
                  <Calendar size={14} color="#6B7280" />
                  <Text style={styles.reportDate}>{report.date}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity onPress={() => router.push('/schedule' as any)}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {upcomingAppointments.map((appointment) => (
              <TouchableOpacity
                key={appointment.id}
                style={styles.appointmentCard}
              >
                <View style={styles.appointmentIconContainer}>
                  <Calendar size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.doctorName}>{appointment.doctor}</Text>
                <Text style={styles.specialty}>{appointment.specialty}</Text>
                <View style={styles.appointmentTimeContainer}>
                  <Text style={styles.appointmentDate}>{appointment.date}</Text>
                  <Text style={styles.appointmentTime}>{appointment.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Health Metrics Summary */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Health</Text>
            <TouchableOpacity onPress={() => router.push('/analytics' as any)}>
              <Text style={styles.seeAll}>View Details</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {healthMetrics.map((metric) => {
              const Icon = metric.icon
              return (
                <TouchableOpacity key={metric.id} style={styles.metricCard}>
                  <View
                    style={[
                      styles.metricIconContainer,
                      { backgroundColor: metric.bgColor },
                    ]}
                  >
                    <Icon size={24} color={metric.color} />
                  </View>
                  <Text style={styles.metricValue}>{metric.value}</Text>
                  <Text style={styles.metricLabel}>{metric.label}</Text>
                  <Text style={styles.metricUnit}>{metric.unit}</Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>

        {/* Health Tip Card */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.healthTipCard}>
            <View style={styles.tipIconContainer}>
              <AlertCircle size={28} color="#8B5CF6" />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Health Tip of the Day</Text>
              <Text style={styles.tipText}>
                Drink at least 8 glasses of water daily to stay hydrated and
                maintain optimal health.
              </Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  adbanner: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
  horizontalScroll: {
    gap: 12,
    paddingRight: 20,
  },

  // Medicine Cards
  medicineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: SCREEN_WIDTH * 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  medicineIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  medicineInfo: {
    marginBottom: 12,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  medicineDosage: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  medicineTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    fontSize: 13,
    color: '#6B7280',
  },
  pendingBadge: {
    backgroundColor: '#FEF3C7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  pendingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F59E0B',
  },
  takenBadge: {
    backgroundColor: '#DCFCE7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  takenText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16A34A',
  },

  // Report Cards
  reportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: SCREEN_WIDTH * 0.45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reportIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  reportName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  reportType: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 12,
  },
  reportFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  reportDate: {
    fontSize: 13,
    color: '#6B7280',
  },

  // Appointment Cards
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: SCREEN_WIDTH * 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  appointmentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  doctorName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 12,
  },
  appointmentTimeContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 10,
  },
  appointmentDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  appointmentTime: {
    fontSize: 13,
    color: '#6B7280',
  },

  // Health Metrics
  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: SCREEN_WIDTH * 0.35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  metricIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 2,
  },
  metricUnit: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  // Health Tip Card
  healthTipCard: {
    backgroundColor: '#F5F3FF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tipIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  tipText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  // Quick Actions Grid
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  quickActionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: (SCREEN_WIDTH - CARD_PADDING * 2 - CARD_GAP) / 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
})