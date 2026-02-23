import { useRouter } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'
import React, { useState } from 'react'
import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const plans = [
  {
    id: 'basic',
    label: 'Basic',
    price: 'Rs. 199',
    period: '/ month',
    note: 'Rs. 2,388 billed annually. Best value.',
    badge: 'Most popular',
    features: [
      'Unlimited doctor consultations',
      'Priority appointment slots',
      'Free monthly lab screening',
      'Family profiles (up to 4)',
      'Priority support',
    ],
  },
  {
    id: 'plus',
    label: 'Plus',
    price: 'Rs. 299',
    period: '/ month',
    note: 'Rs. 897 billed every 3 months. Save 20% vs monthly.',
    features: [
      'Unlimited doctor consultations',
      'Priority appointment slots',
      'Discounted lab tests',
      'Family profiles (up to 2)',
    ],
  },
  {
    id: 'premium',
    label: 'Premium',
    price: 'Rs. 499',
    period: '/ month',
    note: 'Rs. 499 billed monthly. Cancel anytime.',
    features: [
      'Unlimited doctor consultations',
      'Standard appointment slots',
      '5% pharmacy discounts',
      'Single profile access',
    ],
  },
]

export default function PremiumScreen() {
  const router = useRouter()
  const [selected, setSelected] = useState('basic')
  const [detailsVisible, setDetailsVisible] = useState(false)

  const selectedPlan = plans.find((plan) => plan.id === selected)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <ArrowLeft size={22} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscription</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Choose the plan that fits you</Text>
        <Text style={styles.subtitle}>
          Unlock premium care, priority access, and personalized health insights.
        </Text>

        <View style={styles.planStack}>
          {plans.map((plan) => {
            const isSelected = selected === plan.id

            return (
              <TouchableOpacity
                key={plan.id}
                onPress={() => {
                  setSelected(plan.id)
                  setDetailsVisible(true)
                }}
                activeOpacity={0.9}
                style={[
                  styles.planCard,
                  isSelected && styles.planCardSelected,
                ]}
              >
                <View style={styles.planBody}>
                  <View style={styles.planHeaderRow}>
                    <Text style={styles.planLabel}>{plan.label}</Text>
                    {plan.badge && (
                      <View style={styles.popularBadge}>
                        <Text style={styles.popularText}>{plan.badge}</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.priceRow}>
                    <Text style={styles.price}>{plan.price}</Text>
                    <Text style={styles.pricePeriod}>{plan.period}</Text>
                  </View>

                  <Text style={styles.planNote}>{plan.note}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>

        <TouchableOpacity
          style={styles.ctaButton}
          activeOpacity={0.9}
          onPress={() => setDetailsVisible(true)}
        >
          <Text style={styles.ctaText}>Continue</Text>
        </TouchableOpacity>
        <Text style={styles.cancelText}>Cancel anytime</Text>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent
        visible={detailsVisible}
        onRequestClose={() => setDetailsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedPlan?.label} plan details
              </Text>
              <TouchableOpacity
                onPress={() => setDetailsVisible(false)}
                style={styles.modalClose}
              >
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalPriceRow}>
              <Text style={styles.modalPrice}>{selectedPlan?.price}</Text>
              <Text style={styles.modalPeriod}>{selectedPlan?.period}</Text>
            </View>
            <Text style={styles.modalNote}>{selectedPlan?.note}</Text>

            <Text style={styles.modalSectionTitle}>What's included</Text>
            <ScrollView style={styles.modalFeatures}>
              {selectedPlan?.features.map((feature, index) => (
                <View key={index} style={styles.featureRow}>
                  <View style={styles.featureDot} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.modalCta}
              activeOpacity={0.9}
              onPress={() => router.push('/screens/payments')}
            >
              <Text style={styles.modalCtaText}>Continue</Text>
            </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  headerSpacer: {
    width: 22,
    height: 22,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  planStack: {
    marginTop: 20,
    gap: 12,
  },
  planCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#111827',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  planCardSelected: {
    borderColor: '#2567E8',
  },
  planBody: {
    padding: 16,
    gap: 10,
  },
  planHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
  },
  pricePeriod: {
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 4,
  },
  popularBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  popularText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2567E8',
  },
  planNote: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  ctaButton: {
    marginTop: 24,
    backgroundColor: '#2567E8',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#2567E8',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  ctaText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelText: {
    marginTop: 10,
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  modalClose: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  modalCloseText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  modalPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  modalPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  modalPeriod: {
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 6,
  },
  modalNote: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
    marginBottom: 16,
  },
  modalSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 10,
  },
  modalFeatures: {
    marginBottom: 18,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2567E8',
    marginRight: 10,
  },
  featureText: {
    fontSize: 13,
    color: '#374151',
    flex: 1,
  },
  modalCta: {
    backgroundColor: '#2567E8',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCtaText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
})