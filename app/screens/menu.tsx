import { useRouter } from 'expo-router'
import {
  Activity,
  ArrowLeft,
  Bell,
  Calendar,
  ChevronRight,
  CreditCard,
  FileText,
  Globe,
  Heart,
  HelpCircle,
  Info,
  LogOut,
  MapPin,
  Navigation,
  Phone,
  Pill,
  Shield,
  ShoppingBag,
  TestTube,
  User,
  Users,
  Wallet,
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

interface MenuItemProps {
  icon: any
  title: string
  subtitle?: string
  onPress: () => void
  iconColor?: string
  showBadge?: boolean
}

export default function MenuScreen() {
  const router = useRouter()

  const handleNavigation = (route: string) => {
    router.push(route as any)
  }

  const handleLogout = () => {
    // Clear any stored user data/tokens here if needed
    // Navigate to login and clear the navigation stack
    router.replace('/onboardnauth/login' as any)
  }

  const MenuItem: React.FC<MenuItemProps> = ({
    icon: Icon,
    title,
    subtitle,
    onPress,
    iconColor = '#2567E8',
    showBadge = false,
  }) => (
    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
        <Icon size={22} color={iconColor} />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      {showBadge && <View style={styles.badge} />}
      <ChevronRight size={20} color="#999" />
    </TouchableOpacity>
  )

  const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2567E8" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Menu</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Profile Card */}
        <TouchableOpacity
          style={styles.profileCard}
          activeOpacity={0.8}
          onPress={() => handleNavigation('/screens/profile' as any)}
        >
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarInitials}>JD</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>johndoe@email.com</Text>
            <Text style={styles.profileId}>Patient ID: JC-2024-001</Text>
          </View>
          <ChevronRight size={24} color="#2567E8" />
        </TouchableOpacity>

        {/* Account & Profile Section */}
        <View style={styles.section}>
          <SectionHeader title="Account & Profile" />
          <MenuItem
            icon={User}
            title="My Profile"
            subtitle="View and edit your profile"
            onPress={() => handleNavigation('/screens/profile' as any)}
            iconColor="#2567E8"
          />
          <MenuItem
            icon={CreditCard}
            title="My Health Card"
            subtitle="Digital health card"
            onPress={() => handleNavigation('/(tabs)/mycard' as any)}
            iconColor="#6366F1"
          />
          <MenuItem
            icon={Users}
            title="Family Members"
            subtitle="Manage family profiles"
            onPress={() => handleNavigation('/screens/family' as any)}
            iconColor="#8B5CF6"
          />
          <MenuItem
            icon={Shield}
            title="Insurance"
            subtitle="View insurance plans"
            onPress={() => handleNavigation('/(tabs)/insurance' as any)}
            iconColor="#10B981"
          />
        </View>

        {/* Health Services Section */}
        <View style={styles.section}>
          <SectionHeader title="Health Services" />
          <MenuItem
            icon={Calendar}
            title="My Appointments"
            subtitle="View & manage bookings"
            onPress={() => handleNavigation('/(tabs)/schedule' as any)}
            iconColor="#F59E0B"
          />
          <MenuItem
            icon={TestTube}
            title="Lab Tests"
            subtitle="Book lab tests & diagnostics"
            onPress={() => handleNavigation('/services/labtest' as any)}
            iconColor="#EF4444"
          />
          <MenuItem
            icon={Pill}
            title="Medicines & Pharmacy"
            subtitle="Order medicines online"
            onPress={() => handleNavigation('/services/pharmacy' as any)}
            iconColor="#06B6D4"
          />
          <MenuItem
            icon={FileText}
            title="Medical Reports"
            subtitle="Access health reports"
            onPress={() => handleNavigation('/services/reports' as any)}
            iconColor="#8B5CF6"
          />
          <MenuItem
            icon={Activity}
            title="Health Analytics"
            subtitle="Track your health metrics"
            onPress={() => handleNavigation('/(tabs)/analytics' as any)}
            iconColor="#EC4899"
          />
          <MenuItem
            icon={Heart}
            title="Saved & Favorites"
            subtitle="Doctors, medicines & more"
            onPress={() => handleNavigation('/screens/favorites' as any)}
            iconColor="#F43F5E"
          />
        </View>

        {/* Orders & Payments Section */}
        <View style={styles.section}>
          <SectionHeader title="Orders & Payments" />
          <MenuItem
            icon={ShoppingBag}
            title="My Orders"
            subtitle="Track medicine orders"
            onPress={() => handleNavigation('/screens/orders' as any)}
            iconColor="#10B981"
          />
          <MenuItem
            icon={MapPin}
            title="Saved Addresses"
            subtitle="Manage delivery addresses"
            onPress={() => handleNavigation('/screens/location' as any)}
            iconColor="#F59E0B"
          />
          <MenuItem
            icon={Wallet}
            title="Payment Methods"
            subtitle="Cards, UPI & wallets"
            onPress={() => handleNavigation('/screens/payments' as any)}
            iconColor="#8B5CF6"
          />
        </View>

        {/* General Section */}
        <View style={styles.section}>
          <SectionHeader title="General" />
          <MenuItem
            icon={Bell}
            title="Notifications"
            subtitle="Manage notification settings"
            onPress={() => handleNavigation('/screens/notifications' as any)}
            iconColor="#F59E0B"
            showBadge={true}
          />
          <MenuItem
            icon={Globe}
            title="Language"
            subtitle="English"
            onPress={() => handleNavigation('/screens/language' as any)}
            iconColor="#06B6D4"
          />
          <MenuItem
            icon={Navigation}
            title="Location Services"
            subtitle="Manage location access"
            onPress={() => handleNavigation('/screens/location' as any)}
            iconColor="#EF4444"
          />
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <SectionHeader title="Support" />
          <MenuItem
            icon={HelpCircle}
            title="Help Center"
            subtitle="FAQs & guides"
            onPress={() => handleNavigation('/screens/help' as any)}
            iconColor="#6366F1"
          />
          <MenuItem
            icon={Phone}
            title="Contact Us"
            subtitle="24/7 customer support"
            onPress={() => handleNavigation('/screens/contact' as any)}
            iconColor="#10B981"
          />
          <MenuItem
            icon={Info}
            title="About JeevaCare"
            subtitle="Version 1.0.0"
            onPress={() => handleNavigation('/screens/about' as any)}
            iconColor="#8B5CF6"
          />
        </View>

        {/* Logout Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.7}
            onPress={handleLogout}
          >
            <LogOut size={22} color="#EF4444" />
            <Text style={styles.logoutText}>Logout</Text>
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
    backgroundColor: '#F5F7FF',
  },
  header: {
    backgroundColor: '#2567E8',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },

  profileCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2567E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  profileId: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  section: {
    marginTop: 15,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    marginBottom: 12,
    marginTop: 5,
  },

  menuItem: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  badge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginRight: 8,
  },

  logoutButton: {
    backgroundColor: '#FEE2E2',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 5,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
})
