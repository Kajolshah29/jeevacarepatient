import { useRouter } from 'expo-router'
import { ArrowLeft, Edit2, Plus, Trash2, User } from 'lucide-react-native'
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

interface FamilyMember {
  id: string
  name: string
  relationship: string
  age: number
  bloodGroup: string
  phone: string
}

const familyMembers: FamilyMember[] = [
  {
    id: '1',
    name: 'Jane Doe',
    relationship: 'Spouse',
    age: 32,
    bloodGroup: 'O+',
    phone: '+91 98765 43210',
  },
  {
    id: '2',
    name: 'Emily Doe',
    relationship: 'Daughter',
    age: 8,
    bloodGroup: 'A+',
    phone: '+91 98765 43211',
  },
  {
    id: '3',
    name: 'Robert Doe',
    relationship: 'Father',
    age: 65,
    bloodGroup: 'B+',
    phone: '+91 98765 43212',
  },
]

export default function FamilyScreen() {
  const router = useRouter()

  const MemberCard = ({ member }: { member: FamilyMember }) => (
    <View style={styles.memberCard}>
      <View style={styles.memberHeader}>
        <View style={styles.avatarContainer}>
          <User size={28} color="white" />
        </View>
        <View style={styles.memberInfo}>
          <Text style={styles.memberName}>{member.name}</Text>
          <Text style={styles.memberRelationship}>{member.relationship}</Text>
        </View>
        <View style={styles.memberActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Edit2 size={18} color="#2567E8" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Trash2 size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.memberDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Age:</Text>
          <Text style={styles.detailValue}>{member.age} years</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Blood Group:</Text>
          <Text style={styles.detailValue}>{member.bloodGroup}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailValue}>{member.phone}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.viewProfileButton}>
        <Text style={styles.viewProfileText}>View Full Profile</Text>
      </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Family Members</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Text style={styles.infoBannerText}>
            Add family members to book appointments and manage their health records
          </Text>
        </View>

        {/* Family Members List */}
        <View style={styles.membersList}>
          {familyMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Add Member Button */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
          <Plus size={24} color="white" strokeWidth={2.5} />
          <Text style={styles.addButtonText}>Add Family Member</Text>
        </TouchableOpacity>
      </View>
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

  infoBanner: {
    backgroundColor: '#E0F2FE',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
  },
  infoBannerText: {
    fontSize: 14,
    color: '#0369A1',
    lineHeight: 20,
  },

  membersList: {
    padding: 20,
    gap: 16,
  },
  memberCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2567E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberInfo: {
    flex: 1,
    marginLeft: 12,
  },
  memberName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  memberRelationship: {
    fontSize: 14,
    color: '#6B7280',
  },
  memberActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  memberDetails: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
    marginBottom: 12,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },

  viewProfileButton: {
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
  },
  viewProfileText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2567E8',
  },

  addButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  addButton: {
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
  addButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: 'white',
  },
})
