import { LinearGradient } from 'expo-linear-gradient'
import {
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Heart,
  HelpCircle,
  Plus,
  Shield,
  ShieldCheck,
} from 'lucide-react-native'
import React, { useState } from 'react'
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface InsurancePlan {
  id: string
  name: string
  provider: string
  type: string
  coverage: string
  premium: number
  validUntil: string
  status: 'active' | 'pending' | 'expired'
}

interface Claim {
  id: string
  hospitalName: string
  claimAmount: number
  approvedAmount: number
  date: string
  status: 'approved' | 'pending' | 'rejected'
}

export default function Insurance() {
  const [activeTab, setActiveTab] = useState<'plans' | 'claims'>('plans')

  const activePlan: InsurancePlan = {
    id: '1',
    name: 'Premium Health Plan',
    provider: 'HealthFirst Insurance',
    type: 'Family Floater',
    coverage: '₹10,00,000',
    premium: 25000,
    validUntil: 'Dec 31, 2026',
    status: 'active',
  }

  const claims: Claim[] = [
    {
      id: '1',
      hospitalName: 'City Hospital',
      claimAmount: 45000,
      approvedAmount: 45000,
      date: 'Feb 15, 2026',
      status: 'approved',
    },
    {
      id: '2',
      hospitalName: 'Wellness Medical Center',
      claimAmount: 12000,
      approvedAmount: 0,
      date: 'Feb 10, 2026',
      status: 'pending',
    },
    {
      id: '3',
      hospitalName: 'Metro Clinic',
      claimAmount: 8500,
      approvedAmount: 7500,
      date: 'Jan 28, 2026',
      status: 'approved',
    },
  ]

  const benefits = [
    { icon: Heart, label: 'Hospitalization', covered: true },
    { icon: FileText, label: 'Prescribed Medicines', covered: true },
    { icon: Shield, label: 'Ambulance Services', covered: true },
    { icon: CheckCircle2, label: 'Pre-existing Diseases', covered: true },
    { icon: Heart, label: 'Maternity Coverage', covered: false },
    { icon: FileText, label: 'Mental Health', covered: true },
  ]

  const renderClaimCard = (claim: Claim) => (
    <TouchableOpacity key={claim.id} style={styles.claimCard}>
      <View style={styles.claimHeader}>
        <View style={styles.claimInfo}>
          <Text style={styles.claimHospital}>{claim.hospitalName}</Text>
          <Text style={styles.claimDate}>{claim.date}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            claim.status === 'approved' && styles.approvedBadge,
            claim.status === 'pending' && styles.pendingBadge,
            claim.status === 'rejected' && styles.rejectedBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              claim.status === 'approved' && styles.approvedText,
              claim.status === 'pending' && styles.pendingText,
              claim.status === 'rejected' && styles.rejectedText,
            ]}
          >
            {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.claimAmounts}>
        <View style={styles.amountItem}>
          <Text style={styles.amountLabel}>Claimed</Text>
          <Text style={styles.amountValue}>₹{claim.claimAmount.toLocaleString()}</Text>
        </View>
        {claim.status === 'approved' && (
          <>
            <View style={styles.amountDivider} />
            <View style={styles.amountItem}>
              <Text style={styles.amountLabel}>Approved</Text>
              <Text style={[styles.amountValue, styles.approvedAmount]}>
                ₹{claim.approvedAmount.toLocaleString()}
              </Text>
            </View>
          </>
        )}
      </View>

      <TouchableOpacity style={styles.viewDetails}>
        <Text style={styles.viewDetailsText}>View Details</Text>
        <ChevronRight size={16} color="#2563EB" />
      </TouchableOpacity>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Insurance</Text>
          <Text style={styles.headerSubtitle}>Manage your health coverage</Text>
        </View>
        <TouchableOpacity style={styles.helpButton}>
          <HelpCircle size={22} color="#4B5563" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Active Insurance Card */}
        <View style={styles.insuranceCardContainer}>
          <LinearGradient
            colors={['#16A34A', '#22C55E', '#4ADE80']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.insuranceCard}
          >
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardProvider}>{activePlan.provider}</Text>
                <Text style={styles.cardType}>{activePlan.type}</Text>
              </View>
              <View style={styles.shieldIcon}>
                <ShieldCheck size={32} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.cardMid}>
              <Text style={styles.planName}>{activePlan.name}</Text>
              <View style={styles.coverageRow}>
                <Text style={styles.coverageLabel}>Sum Insured</Text>
                <Text style={styles.coverageAmount}>{activePlan.coverage}</Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.footerItem}>
                <Text style={styles.footerLabel}>Policy ID</Text>
                <Text style={styles.footerValue}>{activePlan.id}</Text>
              </View>
              <View style={styles.footerDivider} />
              <View style={styles.footerItem}>
                <Text style={styles.footerLabel}>Valid Until</Text>
                <Text style={styles.footerValue}>{activePlan.validUntil}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#DBEAFE' }]}>
              <Plus size={24} color="#2563EB" />
            </View>
            <Text style={styles.actionLabel}>File Claim</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#FEF3C7' }]}>
              <FileText size={24} color="#F59E0B" />
            </View>
            <Text style={styles.actionLabel}>E-Card</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#F3E8FF' }]}>
              <Clock size={24} color="#8B5CF6" />
            </View>
            <Text style={styles.actionLabel}>History</Text>
          </TouchableOpacity>
        </View>

        {/* Coverage Benefits */}
        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>Coverage Benefits</Text>

          <View style={styles.benefitsGrid}>
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <View key={index} style={styles.benefitCard}>
                  <View
                    style={[
                      styles.benefitIcon,
                      { backgroundColor: benefit.covered ? '#DCFCE7' : '#FEE2E2' },
                    ]}
                  >
                    <Icon size={20} color={benefit.covered ? '#16A34A' : '#DC2626'} />
                  </View>
                  <Text style={styles.benefitLabel}>{benefit.label}</Text>
                  <View
                    style={[
                      styles.benefitStatus,
                      { backgroundColor: benefit.covered ? '#DCFCE7' : '#FEE2E2' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.benefitStatusText,
                        { color: benefit.covered ? '#16A34A' : '#DC2626' },
                      ]}
                    >
                      {benefit.covered ? 'Covered' : 'Not Covered'}
                    </Text>
                  </View>
                </View>
              )
            })}
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'plans' && styles.activeTab]}
            onPress={() => setActiveTab('plans')}
          >
            <Text style={[styles.tabText, activeTab === 'plans' && styles.activeTabText]}>
              Available Plans
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'claims' && styles.activeTab]}
            onPress={() => setActiveTab('claims')}
          >
            <Text style={[styles.tabText, activeTab === 'claims' && styles.activeTabText]}>
              My Claims
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'plans' ? (
          <View style={styles.plansSection}>
            <TouchableOpacity style={styles.planCard}>
              <View style={styles.planHeader}>
                <View>
                  <Text style={styles.planCardName}>Basic Health Plan</Text>
                  <Text style={styles.planCardProvider}>HealthFirst Insurance</Text>
                </View>
                <View style={styles.planPriceBadge}>
                  <Text style={styles.planPrice}>₹8,000</Text>
                  <Text style={styles.planPeriod}>/year</Text>
                </View>
              </View>
              <View style={styles.planFeatures}>
                <View style={styles.planFeature}>
                  <Check size={16} color="#16A34A" />
                  <Text style={styles.planFeatureText}>₹5,00,000 Coverage</Text>
                </View>
                <View style={styles.planFeature}>
                  <Check size={16} color="#16A34A" />
                  <Text style={styles.planFeatureText}>Cashless Hospitalization</Text>
                </View>
                <View style={styles.planFeature}>
                  <Check size={16} color="#16A34A" />
                  <Text style={styles.planFeatureText}>No Claim Bonus</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.upgradeButton}>
                <Text style={styles.upgradeButtonText}>View Details</Text>
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity style={styles.planCard}>
              <View style={styles.recommendedBadge}>
                <Text style={styles.recommendedText}>RECOMMENDED</Text>
              </View>
              <View style={styles.planHeader}>
                <View>
                  <Text style={styles.planCardName}>Premium Health Plan</Text>
                  <Text style={styles.planCardProvider}>HealthFirst Insurance</Text>
                </View>
                <View style={[styles.planPriceBadge, styles.highlightedPrice]}>
                  <Text style={[styles.planPrice, styles.highlightedPriceText]}>
                    ₹25,000
                  </Text>
                  <Text style={[styles.planPeriod, styles.highlightedPriceText]}>
                    /year
                  </Text>
                </View>
              </View>
              <View style={styles.planFeatures}>
                <View style={styles.planFeature}>
                  <Check size={16} color="#16A34A" />
                  <Text style={styles.planFeatureText}>₹10,00,000 Coverage</Text>
                </View>
                <View style={styles.planFeature}>
                  <Check size={16} color="#16A34A" />
                  <Text style={styles.planFeatureText}>Worldwide Coverage</Text>
                </View>
                <View style={styles.planFeature}>
                  <Check size={16} color="#16A34A" />
                  <Text style={styles.planFeatureText}>Pre & Post Hospitalization</Text>
                </View>
                <View style={styles.planFeature}>
                  <Check size={16} color="#16A34A" />
                  <Text style={styles.planFeatureText}>Annual Health Checkup</Text>
                </View>
              </View>
              <View style={styles.currentPlanBadge}>
                <CheckCircle2 size={16} color="#16A34A" />
                <Text style={styles.currentPlanText}>Current Plan</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.planCard}>
              <View style={styles.planHeader}>
                <View>
                  <Text style={styles.planCardName}>Elite Health Plan</Text>
                  <Text style={styles.planCardProvider}>HealthFirst Insurance</Text>
                </View>
                <View style={styles.planPriceBadge}>
                  <Text style={styles.planPrice}>₹45,000</Text>
                  <Text style={styles.planPeriod}>/year</Text>
                </View>
              </View>
              <View style={styles.planFeatures}>
                <View style={styles.planFeature}>
                  <Check size={16} color="#16A34A" />
                  <Text style={styles.planFeatureText}>₹25,00,000 Coverage</Text>
                </View>
                <View style={styles.planFeature}>
                  <Check size={16} color="#16A34A" />
                  <Text style={styles.planFeatureText}>International Treatment</Text>
                </View>
                <View style={styles.planFeature}>
                  <Check size={16} color="#16A34A" />
                  <Text style={styles.planFeatureText}>Mental Health Coverage</Text>
                </View>
                <View style={styles.planFeature}>
                  <Check size={16} color="#16A34A" />
                  <Text style={styles.planFeatureText}>Priority Customer Support</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.upgradeButton}>
                <Text style={styles.upgradeButtonText}>Upgrade Plan</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.claimsSection}>
            {claims.length > 0 ? (
              claims.map(renderClaimCard)
            ) : (
              <View style={styles.emptyState}>
                <FileText size={64} color="#D1D5DB" />
                <Text style={styles.emptyTitle}>No claims yet</Text>
                <Text style={styles.emptyText}>
                  Your insurance claims will appear here
                </Text>
              </View>
            )}
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

  helpButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 100,
  },

  insuranceCardContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 24,
  },

  insuranceCard: {
    borderRadius: 20,
    padding: 24,
    minHeight: 240,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },

  cardProvider: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  cardType: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },

  shieldIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardMid: {
    marginBottom: 24,
  },

  planName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
  },

  coverageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  coverageLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },

  coverageAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  cardFooter: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 16,
  },

  footerItem: {
    flex: 1,
  },

  footerLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },

  footerValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  footerDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 16,
  },

  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },

  actionButton: {
    flex: 1,
    alignItems: 'center',
  },

  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },

  actionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },

  benefitsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },

  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  benefitCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  benefitLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },

  benefitStatus: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },

  benefitStatusText: {
    fontSize: 11,
    fontWeight: '700',
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
    paddingVertical: 10,
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

  plansSection: {
    paddingHorizontal: 20,
  },

  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
  },

  recommendedBadge: {
    position: 'absolute',
    top: -8,
    right: 20,
    backgroundColor: '#F59E0B',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    zIndex: 10,
  },

  recommendedText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },

  planCardName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },

  planCardProvider: {
    fontSize: 13,
    color: '#6B7280',
  },

  planPriceBadge: {
    alignItems: 'flex-end',
  },

  highlightedPrice: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  planPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
  },

  highlightedPriceText: {
    color: '#2563EB',
  },

  planPeriod: {
    fontSize: 13,
    color: '#6B7280',
  },

  planFeatures: {
    gap: 10,
    marginBottom: 16,
  },

  planFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  planFeatureText: {
    fontSize: 14,
    color: '#4B5563',
  },

  upgradeButton: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  upgradeButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2563EB',
  },

  currentPlanBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#DCFCE7',
    paddingVertical: 12,
    borderRadius: 10,
  },

  currentPlanText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#16A34A',
  },

  claimsSection: {
    paddingHorizontal: 20,
  },

  claimCard: {
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

  claimHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },

  claimInfo: {
    flex: 1,
  },

  claimHospital: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },

  claimDate: {
    fontSize: 13,
    color: '#6B7280',
  },

  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  approvedBadge: {
    backgroundColor: '#DCFCE7',
  },

  pendingBadge: {
    backgroundColor: '#FEF3C7',
  },

  rejectedBadge: {
    backgroundColor: '#FEE2E2',
  },

  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },

  approvedText: {
    color: '#16A34A',
  },

  pendingText: {
    color: '#F59E0B',
  },

  rejectedText: {
    color: '#DC2626',
  },

  claimAmounts: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  amountItem: {
    flex: 1,
  },

  amountLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 6,
  },

  amountValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
  },

  approvedAmount: {
    color: '#16A34A',
  },

  amountDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },

  viewDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  viewDetailsText: {
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
  },
})