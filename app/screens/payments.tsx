import { useRouter } from 'expo-router'
import {
    ArrowLeft,
    Building2,
    CreditCard,
    Plus,
    Wallet,
} from 'lucide-react-native'
import React, { useState } from 'react'
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface PaymentOption {
  id?: string
  name: string
  subtitle?: string
  icon?: any
  logo?: any
  hasPlus?: boolean
}

export default function PaymentSettingsScreen() {
  const router = useRouter()
  const [payOnDeliveryEnabled, setPayOnDeliveryEnabled] = useState(false)

  const SectionHeader = ({ title }: { title: string }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  )

  const PaymentItem = ({
    icon: Icon,
    logo,
    name,
    subtitle,
    hasPlus = false,
    onPress,
  }: PaymentOption & { onPress?: () => void }) => (
    <TouchableOpacity
      style={styles.paymentItem}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.paymentLeft}>
        <View style={styles.iconContainer}>
          {Icon && <Icon size={24} color="#333" />}
          {logo && <Text style={styles.logoText}>{logo}</Text>}
        </View>
        <View style={styles.paymentContent}>
          <Text style={styles.paymentName}>{name}</Text>
          {subtitle && <Text style={styles.paymentSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {hasPlus && (
        <Plus size={20} color="#10B981" strokeWidth={2.5} />
      )}
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* CARDS Section */}
        <View style={styles.section}>
          <SectionHeader title="CARDS" />
          <View style={styles.sectionContent}>
            <PaymentItem
              icon={CreditCard}
              name="Add credit or debit cards"
              hasPlus={true}
              onPress={() => {}}
            />

          </View>
        </View>

        {/* UPI Section */}
        <View style={styles.section}>
          <SectionHeader title="UPI" />
          <View style={styles.sectionContent}>
            <PaymentItem
              logo="gpay"
              name="Google Pay UPI"
              onPress={() => {}}
            />
            <PaymentItem
              logo="paytm"
              name="Paytm UPI"
              onPress={() => {}}
            />
            <PaymentItem
              logo="upi"
              name="Add new UPI ID"
              hasPlus={true}
              onPress={() => {}}
            />
          </View>
        </View>

        {/* NETBANKING Section */}
        <View style={styles.section}>
          <SectionHeader title="NETBANKING" />
          <View style={styles.sectionContent}>
            <PaymentItem
              icon={Building2}
              name="Netbanking"
              hasPlus={true}
              onPress={() => {}}
            />
          </View>
        </View>

        {/* SETTINGS Section */}
        <View style={styles.section}>
          <SectionHeader title="SETTINGS" />
          <View style={styles.sectionContent}>
            <View style={styles.settingItem}>
              <View style={styles.paymentLeft}>
                <View style={styles.iconContainer}>
                  <Wallet size={24} color="#333" />
                </View>
                <View style={styles.paymentContent}>
                  <Text style={styles.settingSubtitle}>
                    If online payment fails
                  </Text>
                  <Text style={styles.paymentName}>Pay on delivery</Text>
                </View>
              </View>
              <Text
                style={[
                  styles.enableText,
                  payOnDeliveryEnabled && styles.enableTextActive,
                ]}
                onPress={() => setPayOnDeliveryEnabled(!payOnDeliveryEnabled)}
              >
                {payOnDeliveryEnabled ? 'ENABLED' : 'ENABLE'}
              </Text>
            </View>
          </View>
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
    fontWeight: '600',
    color: '#1F2937',
  },

  section: {
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: 'white',
  },

  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  logoText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#333',
  },
  paymentContent: {
    flex: 1,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  paymentSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },

  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  enableText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
  },
  enableTextActive: {
    color: '#6B7280',
  },
})
