import { useRouter } from 'expo-router'
import {
  ArrowLeft,
  X,
  Check,
  Crown,
  Zap,
  Heart,
} from 'lucide-react-native'
import React, { useState } from 'react'
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'

interface Plan {
  id: string
  name: string
  price: number
  duration: string
  description: string
  icon: React.ElementType
  features: string[]
  isFeatured?: boolean
  gradient?: string[]
  trialDays?: number
  buttonText?: string
}

const plans: Plan[] = [
  {
    id: '1',
    name: 'Basic',
    price: 0,
    duration: 'month',
    description: 'Getting started on your health journey',
    icon: Heart,
    features: [
      'Basic health tracking',
      'Access to health records',
      'Schedule appointments',
      'Get medicine discounts up to 10%',
    ],
    gradient: ['#F0F9FF', '#E0F2FE'],
    buttonText: 'Current Plan',
  },
  {
    id: '2',
    name: 'Plus',
    price: 9.99,
    duration: 'month',
    description: 'Enhanced health management with premium features',
    icon: Zap,
    features: [
      'Unlimited consultations',
      'AI-powered health insights',
      'Priority doctor access',
      'Get medicine discounts up to 15%',
      'Free monthly lab tests',
      'Health reports generation',
    ],
    gradient: ['#FEF3C7', '#FCD34D'],
    trialDays: 14,
    buttonText: 'Start Free Trial',
  },
  {
    id: '3',
    name: 'Premium',
    price: 14.99,
    duration: 'month',
    description: 'Stay on top of your health with AI-powered nutrition tracking, personalized insights, premium tools and custom settings',
    icon: Crown,
    features: [
      'Unlimited consultations',
      'AI-powered health insights',
      'Priority doctor access',
      'Get medicine discounts up to 20%',
      'Free monthly lab tests',
      'Health reports generation',
      '24/7 Emergency support',
      'Family plan access',
      'Personalized nutrition tracking',
    ],
    isFeatured: true,
    gradient: ['#DDD6FE', '#C4B5FD'],
    trialDays: 30,
    buttonText: 'Start 30-day free trial',
  },
]

export default function SubscriptionScreen() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [modalVisible, setModalVisible] = useState(false)

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId)
    setModalVisible(true)
  }

  const handleSubscribe = () => {
    Alert.alert('Success', 'Subscription activated successfully!')
    setModalVisible(false)
  }

  const PlanCard = ({ plan }: { plan: Plan }) => {
    const Icon = plan.icon

    if (plan.isFeatured) {
      return (
        <View style={styles.featuredContainer}>
          <LinearGradient
            colors={['#E879F9', '#AC63F7', '#7C63F8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.featuredCard}
          >
            {/* Featured Badge */}
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>Premium Plan</Text>
            </View>

            {/* Icon */}
            <View style={styles.iconContainer}>
              <Icon size={36} color="white" />
            </View>

            {/* Price */}
            <Text style={styles.featuredPrice}>
              ${plan.price.toFixed(2)}
              <Text style={styles.duration}>/{plan.duration}</Text>
            </Text>

            {/* Description */}
            <Text style={styles.featuredDescription}>
              {plan.description}
            </Text>

            {/* Features */}
            <View style={styles.featuresSection}>
              <Text style={styles.featuresTitle}>Features</Text>
              {plan.features.map((feature, index) => (
                <View key={index} style={styles.featureRow}>
                  <Check size={18} color="white" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            {/* Trial Info */}
            {plan.trialDays && (
              <View style={styles.trialInfoFeatured}>
                <Zap size={16} color="white" />
                <Text style={styles.trialTextFeatured}>
                  Start {plan.trialDays}-day free trial
                </Text>
              </View>
            )}

            {/* Button */}
            <TouchableOpacity
              style={styles.buttonFeatured}
              onPress={() => handleSelectPlan(plan.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonFeaturedText}>
                {plan.buttonText}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )
    }

    return (
      <LinearGradient
        colors={plan.gradient || ['#F9FAFB', '#F3F4F6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.planCard}
      >
        {/* Icon */}
        <View style={styles.planIconContainer}>
          <Icon size={28} color={plan.name === 'Premium' ? '#E879F9' : '#2567E8'} />
        </View>

        {/* Plan Name */}
        <Text style={styles.planName}>{plan.name}</Text>

        {/* Description */}
        <Text style={styles.planDescription}>{plan.description}</Text>

        {/* Features List */}
        <View style={styles.planFeatures}>
          {plan.features.slice(0, 4).map((feature, index) => (
            <View key={index} style={styles.planFeatureRow}>
              <Check size={16} color="#10B981" />
              <Text style={styles.planFeatureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Button */}
        <TouchableOpacity
          style={[
            styles.planButton,
            plan.name === 'Basic' && styles.planButtonBasic,
          ]}
          onPress={() => handleSelectPlan(plan.id)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.planButtonText,
              plan.name === 'Basic' && styles.planButtonTextBasic,
            ]}
          >
            {plan.buttonText}
          </Text>
          {plan.name !== 'Basic' && (
            <>
              <Text style={styles.arrow}> →</Text>
            </>
          )}
        </TouchableOpacity>
      </LinearGradient>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Premium Plans</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          style={styles.closeButton}
        >
          <X size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Upgrade To Unlock</Text>
          <Text style={styles.subtitle}>
            Access AI-powered health insights, personalized tools and premium features
          </Text>
        </View>

        {/* Plans */}
        <View style={styles.plansContainer}>
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </View>

        {/* Available Plans Text */}
        <View style={styles.availablePlansSection}>
          <Text style={styles.availablePlansTitle}>Available Plan</Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Plan Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {plans.find((p) => p.id === selectedPlan)?.name} Plan
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.modalCloseButton}
              >
                <X size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Modal Body */}
            <ScrollView style={styles.modalBody}>
              {selectedPlan && (
                <>
                  <View style={styles.modalPlanDetails}>
                    <Text style={styles.modalPrice}>
                      $
                      {plans
                        .find((p) => p.id === selectedPlan)
                        ?.price.toFixed(2)}
                    </Text>
                    <Text style={styles.modalDuration}>
                      /{plans.find((p) => p.id === selectedPlan)?.duration}
                    </Text>
                  </View>

                  <Text style={styles.modalFeatureTitle}>
                    What's Included:
                  </Text>

                  {plans
                    .find((p) => p.id === selectedPlan)
                    ?.features.map((feature, index) => (
                      <View key={index} style={styles.modalFeatureRow}>
                        <Check size={18} color="#10B981" />
                        <Text style={styles.modalFeatureText}>{feature}</Text>
                      </View>
                    ))}

                  {plans.find((p) => p.id === selectedPlan)?.trialDays && (
                    <View style={styles.trialBanner}>
                      <Text style={styles.trialBannerText}>
                        Start{' '}
                        {
                          plans.find((p) => p.id === selectedPlan)
                            ?.trialDays
                        }
                        -day free trial
                      </Text>
                    </View>
                  )}
                </>
              )}
            </ScrollView>

            {/* Modal Actions */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSubscribeButton}
                onPress={handleSubscribe}
              >
                <Text style={styles.modalSubscribeText}>Subscribe Now</Text>
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

  // Header
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
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Title Section
  titleSection: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },

  // Plans Container
  plansContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },

  // Plan Card
  planCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  planIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(37, 103, 232, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  planName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 16,
  },
  planFeatures: {
    gap: 10,
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingTop: 16,
  },
  planFeatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  planFeatureText: {
    fontSize: 14,
    color: '#374151',
  },
  planButton: {
    backgroundColor: '#2567E8',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  planButtonBasic: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  planButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
  planButtonTextBasic: {
    color: '#6B7280',
  },
  arrow: {
    color: 'white',
    fontSize: 16,
  },

  // Featured Card
  featuredContainer: {
    marginBottom: 16,
  },
  featuredCard: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#E879F9',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  featuredBadge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  featuredBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featuredPrice: {
    fontSize: 36,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  duration: {
    fontSize: 16,
    fontWeight: '600',
  },
  featuredDescription: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 22,
    marginBottom: 20,
  },
  featuresSection: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginBottom: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  featureText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    flex: 1,
  },
  trialInfoFeatured: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 16,
  },
  trialTextFeatured: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  buttonFeatured: {
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonFeaturedText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E879F9',
  },

  // Available Plans Section
  availablePlansSection: {
    paddingHorizontal: 20,
    marginTop: 32,
    marginBottom: 16,
  },
  availablePlansTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
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
    maxHeight: '85%',
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
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  modalPlanDetails: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 24,
  },
  modalPrice: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
  },
  modalDuration: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 4,
  },
  modalFeatureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  modalFeatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  modalFeatureText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  trialBanner: {
    backgroundColor: '#D1FAE5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  trialBannerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#065F46',
  },

  // Modal Actions
  modalActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  modalSubscribeButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#2567E8',
    alignItems: 'center',
  },
  modalSubscribeText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
})
