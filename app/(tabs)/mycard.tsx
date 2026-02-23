import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Edit,
  Heart,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
  X,
} from 'lucide-react-native'
import React, { useState } from 'react'
import {
  Alert,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { SafeAreaView } from 'react-native-safe-area-context'

interface EmergencyContact {
  name: string
  relationship: string
  phone: string
}

interface UserData {
  name: string
  patientId: string
  dob: string
  bloodGroup: string
  email: string
  phone: string
  address: string
  planName: string
  planType: string
  validUntil: string
  emergencyContact: EmergencyContact
}

export default function MyCard() {
  const [userData, setUserData] = useState<UserData>({
    name: 'John Doe',
    patientId: 'JC-2024-001',
    dob: 'January 15, 1990',
    bloodGroup: 'O+',
    email: 'johndoe@email.com',
    phone: '+91 98765 43210',
    address: '123 Main Street, Mumbai, Maharashtra 400001',
    planName: 'Premium Health Plan',
    planType: 'Family',
    validUntil: 'Dec 31, 2026',
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+91 98765 43211',
    },
  })

  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editType, setEditType] = useState<'personal' | 'emergency'>('personal')
  const [editData, setEditData] = useState<any>({})

  const handleEditPersonal = () => {
    setEditType('personal')
    setEditData({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
    })
    setEditModalVisible(true)
  }

  const handleEditEmergency = () => {
    setEditType('emergency')
    setEditData({ ...userData.emergencyContact })
    setEditModalVisible(true)
  }

  const handleSaveChanges = () => {
    if (editType === 'personal') {
      setUserData({
        ...userData,
        name: editData.name,
        email: editData.email,
        phone: editData.phone,
        address: editData.address,
      })
    } else {
      setUserData({
        ...userData,
        emergencyContact: editData,
      })
    }
    setEditModalVisible(false)
    Alert.alert('Success', 'Changes saved successfully!')
  }

  const InfoRow = ({ icon: Icon, label, value, iconColor = '#2567E8' }: any) => (
    <View style={styles.infoRow}>
      <View style={[styles.infoIcon, { backgroundColor: `${iconColor}15` }]}>
        <Icon size={18} color={iconColor} />
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Health Card</Text>
        <View style={styles.badge}>
          <CheckCircle size={16} color="#10B981" />
          <Text style={styles.badgeText}>Active</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Digital Card */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardName}>{userData.name}</Text>
                <Text style={styles.cardId}>ID: {userData.patientId}</Text>
              </View>
              <View style={styles.cardLogo}>
                <Heart size={28} color="white" fill="white" />
              </View>
            </View>

            {/* Card Body */}
            <View style={styles.cardBody}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardLabel}>Blood Group</Text>
                <Text style={styles.cardValue}>{userData.bloodGroup}</Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardLabel}>DOB</Text>
                <Text style={styles.cardValue}>{userData.dob}</Text>
              </View>
            </View>

            {/* Card Footer */}
            <View style={styles.cardFooter}>
              <View style={styles.planInfo}>
                <Shield size={16} color="white" />
                <Text style={styles.planText}>{userData.planName}</Text>
              </View>
              <Text style={styles.validText}>Valid until {userData.validUntil}</Text>
            </View>
          </View>

          {/* QR Code Section */}
          <View style={styles.qrSection}>
            <Text style={styles.qrLabel}>Scan for Quick Access</Text>
            <View style={styles.qrContainer}>
              <QRCode
                value={JSON.stringify({
                  patientId: userData.patientId,
                  name: userData.name,
                  bloodGroup: userData.bloodGroup,
                })}
                size={140}
                backgroundColor="white"
              />
            </View>
            <Text style={styles.qrHint}>Show this at the clinic</Text>
          </View>
        </View>

        {/* Current Plan Details */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Current Plan</Text>
          </View>
          <View style={styles.planCard}>
            <View style={styles.planHeader}>
              <View>
                <Text style={styles.planName}>{userData.planName}</Text>
                <Text style={styles.planType}>{userData.planType} Coverage</Text>
              </View>
              <View style={styles.planBadge}>
                <Shield size={20} color="#10B981" />
              </View>
            </View>
            <View style={styles.planFeatures}>
              <View style={styles.featureRow}>
                <CheckCircle size={16} color="#10B981" />
                <Text style={styles.featureText}>Unlimited Consultations</Text>
              </View>
              <View style={styles.featureRow}>
                <CheckCircle size={16} color="#10B981" />
                <Text style={styles.featureText}>Free Lab Tests (Annual)</Text>
              </View>
              <View style={styles.featureRow}>
                <CheckCircle size={16} color="#10B981" />
                <Text style={styles.featureText}>Medicine Discounts up to 20%</Text>
              </View>
              <View style={styles.featureRow}>
                <CheckCircle size={16} color="#10B981" />
                <Text style={styles.featureText}>24/7 Emergency Support</Text>
              </View>
            </View>
            <View style={styles.planValidity}>
              <AlertCircle size={16} color="#F59E0B" />
              <Text style={styles.validityText}>
                Valid until {userData.validUntil}
              </Text>
            </View>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditPersonal}
            >
              <Edit size={18} color="#2567E8" />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoCard}>
            <InfoRow icon={User} label="Full Name" value={userData.name} />
            <InfoRow icon={Mail} label="Email" value={userData.email} />
            <InfoRow icon={Phone} label="Phone" value={userData.phone} />
            <InfoRow
              icon={Calendar}
              label="Date of Birth"
              value={userData.dob}
              iconColor="#8B5CF6"
            />
            <InfoRow
              icon={MapPin}
              label="Address"
              value={userData.address}
              iconColor="#F59E0B"
            />
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Emergency Contact</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditEmergency}
            >
              <Edit size={18} color="#2567E8" />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.emergencyCard}>
            <View style={styles.emergencyHeader}>
              <View style={styles.emergencyIcon}>
                <AlertCircle size={24} color="#EF4444" />
              </View>
              <View style={styles.emergencyInfo}>
                <Text style={styles.emergencyName}>
                  {userData.emergencyContact.name}
                </Text>
                <Text style={styles.emergencyRelation}>
                  {userData.emergencyContact.relationship}
                </Text>
              </View>
            </View>
            <View style={styles.emergencyContact}>
              <Phone size={18} color="#2567E8" />
              <Text style={styles.emergencyPhone}>
                {userData.emergencyContact.phone}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editType === 'personal' ? 'Edit Personal Info' : 'Edit Emergency Contact'}
              </Text>
              <TouchableOpacity
                onPress={() => setEditModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalForm}>
              {editType === 'personal' ? (
                <>
                  <Text style={styles.label}>Full Name</Text>
                  <TextInput
                    style={styles.input}
                    value={editData.name}
                    onChangeText={(text) =>
                      setEditData({ ...editData, name: text })
                    }
                  />

                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    value={editData.email}
                    keyboardType="email-address"
                    onChangeText={(text) =>
                      setEditData({ ...editData, email: text })
                    }
                  />

                  <Text style={styles.label}>Phone</Text>
                  <TextInput
                    style={styles.input}
                    value={editData.phone}
                    keyboardType="phone-pad"
                    onChangeText={(text) =>
                      setEditData({ ...editData, phone: text })
                    }
                  />

                  <Text style={styles.label}>Address</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={editData.address}
                    multiline
                    numberOfLines={3}
                    onChangeText={(text) =>
                      setEditData({ ...editData, address: text })
                    }
                  />
                </>
              ) : (
                <>
                  <Text style={styles.label}>Contact Name</Text>
                  <TextInput
                    style={styles.input}
                    value={editData.name}
                    onChangeText={(text) =>
                      setEditData({ ...editData, name: text })
                    }
                  />

                  <Text style={styles.label}>Relationship</Text>
                  <TextInput
                    style={styles.input}
                    value={editData.relationship}
                    onChangeText={(text) =>
                      setEditData({ ...editData, relationship: text })
                    }
                  />

                  <Text style={styles.label}>Phone Number</Text>
                  <TextInput
                    style={styles.input}
                    value={editData.phone}
                    keyboardType="phone-pad"
                    onChangeText={(text) =>
                      setEditData({ ...editData, phone: text })
                    }
                  />
                </>
              )}
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveChanges}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },

  // Digital Card
  cardContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#2567E8',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#2567E8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  cardName: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  cardId: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  cardLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBody: {
    flexDirection: 'row',
    gap: 40,
    marginBottom: 20,
  },
  cardInfo: {},
  cardLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  planInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  planText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'white',
  },
  validText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
  },

  // QR Code
  qrSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  qrLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  qrContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  qrHint: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 12,
  },

  // Section
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2567E8',
  },

  // Plan Card
  planCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  planName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  planType: {
    fontSize: 14,
    color: '#6B7280',
  },
  planBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  planFeatures: {
    gap: 12,
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#374151',
  },
  planValidity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  validityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F59E0B',
  },

  // Info Card
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    lineHeight: 20,
  },

  // Emergency Card
  emergencyCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FEE2E2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  emergencyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyInfo: {
    marginLeft: 12,
  },
  emergencyName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  emergencyRelation: {
    fontSize: 14,
    color: '#6B7280',
  },
  emergencyContact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  emergencyPhone: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2567E8',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalForm: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#2567E8',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
})