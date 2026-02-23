import { useRouter } from 'expo-router'
import {
  ChevronDown,
  ChevronRight,
  Clock,
  MapPin,
  Navigation,
  Plus,
  Search,
  X,
} from 'lucide-react-native'
import React, { useState } from 'react'
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Location {
  id: string
  name: string
  address: string
  distance?: string
}

const nearbyLocations: Location[] = [
  {
    id: '1',
    name: 'Satyanarayan Township',
    address: 'TP 13,Akhardham Society,Chhani Jakatnaka,Vadodara',
    distance: '210 m',
  },
  {
    id: '2',
    name: 'Ramvatika Society',
    address: 'Chhani Jakat Naka, Vadodara, Gujarat',
    distance: '297 m',
  },
  {
    id: '3',
    name: 'Veda 2',
    address: 'Chhani Jakatnaka, Vadodara, Gujarat',
    distance: '327 m',
  },
  {
    id: '4',
    name: 'Samsara Luxury Apartments',
    address: 'Canal Rd, Chhani Jakatnaka, Vadodara',
    distance: '352 m',
  },
  {
    id: '5',
    name: 'Fortune Gateway',
    address: 'Guru Gobindsinhji Marg,TP 13,Chhani Jakatnaka,Vadodara',
    distance: '354 m',
  },
  {
    id: '6',
    name: 'Prayag Complex',
    address: 'Vardan Society And Duplex, Chhani Jakat Naka, Vadodara, Gujarat',
    distance: '319 m',
  },
  {
    id: '7',
    name: 'Radhika Residency',
    address: 'Near Uma Amar Party Plot, Chhani Road, Vadodara, Gujarat',
    distance: '542 m',
  },
  {
    id: '8',
    name: 'Krishna Prime',
    address: 'Chhani Jakatnaka, Vadodara, Gujarat',
    distance: '570 m',
  },
  {
    id: '9',
    name: 'Giriraj Avenue',
    address: 'Abhishek Society,TP 13,Chhani Jakatnaka,Vadodara',
    distance: '545 m',
  },
  {
    id: '10',
    name: 'Veda Alembic',
    address: 'Chhani,TP 13,Vadodara',
    distance: '595 m',
  },
]

const recentLocations: Location[] = [
  {
    id: 'r1',
    name: 'TP 13',
    address: 'Chhani Jakatnaka, Vadodara',
    distance: '6 m',
  },
]

export default function LocationScreen() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)

  // Filter locations based on search query
  const filteredNearbyLocations = nearbyLocations.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredRecentLocations = recentLocations.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectLocation = (location: Location) => {
    setSelectedLocation(location)
    // Navigate back or save location
    setTimeout(() => {
      router.back()
    }, 200)
  }

  const handleUseCurrentLocation = () => {
    // Logic to get current location
    console.log('Using current location')
    router.back()
  }

  const handleAddAddress = () => {
    // Navigate to add address screen
    router.push('/screens/addaddress' as any)
  }

  const LocationItem = ({ location, showDistance = true }: { location: Location; showDistance?: boolean }) => (
    <TouchableOpacity
      style={styles.locationItem}
      activeOpacity={0.7}
      onPress={() => handleSelectLocation(location)}
    >
      <View style={styles.locationLeft}>
        <View style={styles.distanceContainer}>
          {showDistance ? (
            <>
              <MapPin size={18} color="#666" />
              <Text style={styles.distance}>{location.distance}</Text>
            </>
          ) : (
            <Clock size={18} color="#666" />
          )}
        </View>
        <View style={styles.locationContent}>
          <Text style={styles.locationName}>{location.name}</Text>
          <Text style={styles.locationAddress}>{location.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <TouchableOpacity
        style={styles.header}
        activeOpacity={0.7}
        onPress={() => router.back()}
      >
        <ChevronDown size={24} color="#333" />
        <Text style={styles.headerTitle}>Select a location</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#10B981" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for area, street name..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              activeOpacity={0.7}
            >
              <X size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.7}
            onPress={handleUseCurrentLocation}
          >
            <View style={styles.actionLeft}>
              <View style={[styles.actionIcon, { backgroundColor: `${`#10B981`}15` }]}>
                <Navigation size={22} color="#10B981" />
              </View>
              <View>
                <Text style={styles.actionTitle}>Use current location</Text>
                <Text style={styles.actionSubtitle}>TP 13, Chhani Jakatnaka, Vadodara</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.7}
            onPress={handleAddAddress}
          >
            <View style={styles.actionLeft}>
              <View style={[styles.actionIcon, { backgroundColor: `${`#10B981`}15` }]}>
                <Plus size={22} color="#10B981" strokeWidth={2.5} />
              </View>
              <Text style={styles.actionTitle}>Add Address</Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>

        </View>

        {/* Nearby Locations */}
        {filteredNearbyLocations.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>NEARBY LOCATIONS</Text>
            {filteredNearbyLocations.map((location) => (
              <LocationItem key={location.id} location={location} />
            ))}
          </View>
        )}

        {/* Recent Locations */}
        {filteredRecentLocations.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>RECENT LOCATIONS</Text>
            {filteredRecentLocations.map((location) => (
              <LocationItem key={location.id} location={location} showDistance={false} />
            ))}
          </View>
        )}

        {/* No Results */}
        {searchQuery && filteredNearbyLocations.length === 0 && filteredRecentLocations.length === 0 && (
          <View style={styles.noResults}>
            <MapPin size={48} color="#D1D5DB" />
            <Text style={styles.noResultsText}>No locations found</Text>
            <Text style={styles.noResultsSubtext}>Try searching with different keywords</Text>
          </View>
        )}

        {/* Powered by Google */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            powered by <Text style={styles.google}>Google</Text>
          </Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
  },

  actionsContainer: {
    paddingHorizontal: 20,
    gap: 1,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  actionSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  blinkit: {
    fontSize: 11,
    fontWeight: '700',
    color: '#333',
  },

  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    marginBottom: 8,
  },

  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  locationLeft: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  distanceContainer: {
    alignItems: 'center',
    width: 50,
  },
  distance: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  locationContent: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  google: {
    color: '#4285F4',
    fontWeight: '600',
  },

  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
})
