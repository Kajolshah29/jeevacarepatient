import { useRouter } from 'expo-router'
import {
    ArrowLeft,
    Calendar,
    Camera,
    Edit,
    Mail,
    MapPin,
    Phone,
    User
} from 'lucide-react-native'
import React from 'react'
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen() {
  const router = useRouter()

  const ProfileField = ({ icon: Icon, label, value }: any) => (
    <View style={styles.profileField}>
      <View style={styles.fieldIcon}>
        <Icon size={20} color="#2567E8" />
      </View>
      <View style={styles.fieldContent}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <Text style={styles.fieldValue}>{value}</Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Edit size={22} color="#2567E8" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarInitials}>JD</Text>
            </View>
            <TouchableOpacity style={styles.cameraButton} activeOpacity={0.8}>
              <Camera size={18} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.patientId}>Patient ID: JC-2024-001</Text>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.sectionCard}>
            <ProfileField
              icon={User}
              label="Full Name"
              value="John Doe"
            />
            <ProfileField
              icon={Mail}
              label="Email Address"
              value="johndoe@email.com"
            />
            <ProfileField
              icon={Phone}
              label="Phone Number"
              value="+91 98765 43210"
            />
            <ProfileField
              icon={Calendar}
              label="Date of Birth"
              value="January 15, 1990"
            />
          </View>
        </View>

        {/* Address Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          <View style={styles.sectionCard}>
            <ProfileField
              icon={MapPin}
              label="Current Address"
              value="123 Main Street, Apartment 4B, Mumbai, Maharashtra 400001"
            />
          </View>
        </View>

        {/* Medical Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical Information</Text>
          <View style={styles.sectionCard}>
            <View style={styles.medicalGrid}>
              <View style={styles.medicalItem}>
                <Text style={styles.medicalLabel}>Blood Group</Text>
                <Text style={styles.medicalValue}>O+</Text>
              </View>
              <View style={styles.medicalItem}>
                <Text style={styles.medicalLabel}>Height</Text>
                <Text style={styles.medicalValue}>175 cm</Text>
              </View>
              <View style={styles.medicalItem}>
                <Text style={styles.medicalLabel}>Weight</Text>
                <Text style={styles.medicalValue}>72 kg</Text>
              </View>
              <View style={styles.medicalItem}>
                <Text style={styles.medicalLabel}>BMI</Text>
                <Text style={styles.medicalValue}>23.5</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Edit Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
            <Edit size={20} color="white" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },

  avatarSection: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2567E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    fontSize: 36,
    fontWeight: '700',
    color: 'white',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  patientId: {
    fontSize: 14,
    color: '#6B7280',
  },

  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  profileField: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  fieldIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldContent: {
    flex: 1,
    marginLeft: 12,
  },
  fieldLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    lineHeight: 20,
  },

  medicalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  medicalItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  medicalLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
  },
  medicalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2567E8',
  },

  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  editButton: {
    backgroundColor: '#2567E8',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#2567E8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  editButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: 'white',
  },
})
