import { useRouter } from 'expo-router'
import React from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

interface LabPackage {
  id: string
  title: string
  description: string
  testCount: number
  reportTime: string
  originalPrice: number
  discountedPrice: number
  icon: any
}

interface LabTestPackagesProps {
  packages?: LabPackage[]
  showViewAll?: boolean
  title?: string
  onPackagePress?: (pkg: LabPackage) => void
}

const defaultPackages: LabPackage[] = [
  {
    id: '1',
    title: 'Cancer Screening Package For Male',
    description: 'Male Cancer Prevention',
    testCount: 23,
    reportTime: '23 Hrs.',
    originalPrice: 2330,
    discountedPrice: 699,
    icon: require('../assets/images/body-scan.png'),
  },
  {
    id: '2',
    title: 'Cancer Screening Package For Female',
    description: 'Female Cancer Prevention',
    testCount: 3,
    reportTime: '36 Hrs.',
    originalPrice: 2330,
    discountedPrice: 699,
    icon: require('../assets/images/supplement.png'),
  },
  {
    id: '3',
    title: 'Comprehensive Cancer Screening Package For Male',
    description: 'Advanced Cancer Screening',
    testCount: 5,
    reportTime: '53 Hrs.',
    originalPrice: 2330,
    discountedPrice: 1427,
    icon: require('../assets/images/kidney-donor.png'),
  },
    {
    id: '4',
    title: 'Comprehensive Cancer Screening Package For  Female',
    description: 'Advanced Cancer Screening',
    testCount: 5,
    reportTime: '53 Hrs.',
    originalPrice: 2330,
    discountedPrice: 1427,
    icon: require('../assets/images/organ.png'),
    },
]

export default function LabTestPackages({
  packages = defaultPackages,
  showViewAll = true,
  title = 'Popular Health Checkups',
  onPackagePress,
}: LabTestPackagesProps) {
  const router = useRouter()

  const handleBookPress = (pkg: LabPackage) => {
    if (onPackagePress) {
      onPackagePress(pkg)
    } else {
      router.push({
        pathname: '/services/labtest',
        params: { packageId: pkg.id, packageTitle: pkg.title },
      })
    }
  }

const renderPackageCard = (pkg: LabPackage) => {
  const discountPercent = Math.round(
    ((pkg.originalPrice - pkg.discountedPrice) / pkg.originalPrice) * 100
  )

  return (
    <View key={pkg.id} style={styles.packageCard}>
      <Text numberOfLines={3} style={styles.packageTitle}>
        {pkg.title}
      </Text>

      <View style={styles.metaRow}>
        <View style={styles.metaLeft}>
          <View style={styles.metaIcon}>
            <Text style={styles.metaIconText}>%</Text>
          </View>
          <Text style={styles.metaText}>{pkg.testCount} Tests</Text>
        </View>
        <View style={styles.offerBadge}>
          <Text style={styles.offerBadgeText}>GROUP</Text>
        </View>
      </View>

      <View style={styles.moreRow}>
        <Text style={styles.moreText}>Know more+</Text>
        <Text style={styles.offerText}>UPTO {discountPercent}% OFF</Text>
      </View>

      <View style={styles.cardDivider} />

      <View style={styles.priceBlock}>
        <Text style={styles.exclusiveText}>EXCLUSIVE OFFER</Text>
        <View style={styles.priceRow}>
          <Text style={styles.discountedPrice}>₹{pkg.discountedPrice}</Text>
          <Text style={styles.originalPrice}>₹{pkg.originalPrice}</Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.bookButton}
        onPress={() => handleBookPress(pkg)}
      >
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  )
}
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        {showViewAll && <Text style={styles.viewAll}>View All</Text>}
      </View>

      <View style={styles.offerBanner}>
        <View style={styles.offerIcon}>
          <Text style={styles.offerIconText}>%</Text>
        </View>
        <Text style={styles.offerBannerText}>Get upto 70% OFF on all bookings.</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {packages.map((pkg) => renderPackageCard(pkg))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
  },

  viewAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4C6FFF',
  },

  offerBanner: {
    backgroundColor: '#FFF1E6',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  offerIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFB54D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerIconText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  offerBannerText: {
    color: '#E08A2E',
    fontWeight: '700',
    fontSize: 14,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  packageCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D6EDF0',
    padding: 12,
    marginBottom: 14,
  },

  packageTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3B3B3B',
    lineHeight: 18,
    marginBottom: 10,
    minHeight: 54,
  },

  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E9F6F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaIconText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#149FB0',
  },
  metaText: {
    color: '#FF8B2C',
    fontWeight: '700',
    fontSize: 12,
  },
  offerBadge: {
    backgroundColor: '#FFE6EC',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
  },
  offerBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#F0647A',
    textAlign: 'center',
    lineHeight: 11,
  },

  moreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  moreText: {
    color: '#7A7A7A',
    fontWeight: '600',
    fontSize: 12,
  },
  offerText: {
    color: '#FF8B2C',
    fontWeight: '700',
    fontSize: 11,
  },

  cardDivider: {
    height: 1,
    backgroundColor: '#E6F6F8',
    marginBottom: 10,
  },

  priceBlock: {
    backgroundColor: '#EAFBFE',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  exclusiveText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#3B3B3B',
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2F2F2F',
  },
  originalPrice: {
    fontSize: 11,
    color: '#9EA0A6',
    textDecorationLine: 'line-through',
  },

  bookButton: {
    backgroundColor: '#0B8E9D',
    paddingVertical: 10,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    alignItems: 'center',
    marginHorizontal: -12,
    marginBottom: -12,
  },

  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
})
