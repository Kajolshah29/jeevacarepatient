import DoctorAdBanner from '@/components/adsbanner'
import DoctorsCategorySection from '@/components/doctorcategory'
import NearbyFacilities from '@/components/nearby'
import DoctorCard from '@/components/recommeddoctor'
import { useRouter } from 'expo-router'
import {
  ArrowLeft,
  Bell,
  Search
} from 'lucide-react-native'
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function HomeScreen() {
  const router = useRouter()

  return (
    
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FF" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={22} color="#333" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Find Doctors</Text>

          <View style={{ flexDirection: 'row', gap: 15 }}>

            <TouchableOpacity onPress={() => router.push('/screens/notifications')}>
              <Bell size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <Search size={18} color="#999" />
          <TextInput
            placeholder="Search Doctors, Specialities, Clinics..."
            style={styles.searchInput}
          />
        </View>

        {/* BANNER */}
        <DoctorAdBanner style={styles.adbanner} type='doctor'/>

{/* DOCTOR SPECIALIZATION */}
<DoctorsCategorySection/>
<DoctorCard doctors={[
  {
    id: '1',
    name: 'Dr. Nehal Parikh',
    specialty: 'Obs & Gynacologist',
    hospital: 'Devarsh Hospital',
    rating: 4.5,  

    image: { uri: 'https://i.pravatar.cc/200?img=32' },
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Dr. Rahul Mehta',    
    specialty: 'Cardiologist',
    hospital: 'City Heart Clinic',
    rating: 4.7,

    image: { uri: 'https://i.pravatar.cc/200?img=12' },
    isAvailable: false,
  },
  {
    id: '3',
    name: 'Dr. Anjali Sharma',
    specialty: 'Skin Specialist',
    hospital: 'Skin Care Center',
    rating: 4.3,    
    image: { uri: 'https://i.pravatar.cc/200?img=45' },
    isAvailable: true,
  },
  {
    id: '4',
    name: 'Dr. Vikram Singh',
    specialty: 'Physician', 
    hospital: 'General Health Clinic',
    rating: 4.6,    
    image: { uri: 'https://i.pravatar.cc/200?img=13' },
    isAvailable: false,
  }
]}/>

<NearbyFacilities 
  title="Nearby Facilities" 
  facilities={[
    {
      id: '1',
      name: 'Devarsh Hospital',
      distance: 2.5,
      rating: 4.5,
      specialization: 'Multi-specialty',
      image: { uri: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3' },
      isAvailable: true,
    },
    {
      id: '2',
      name: 'City Heart Clinic',
      distance: 3.2,
      rating: 4.7,
      specialization: 'Cardiology',
      image: { uri: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d' },
      isAvailable: true,
    },
    {
      id: '3',
      name: 'Skin Care Center',   
      distance: 1.8,
      rating: 4.3,
      specialization: 'Dermatology',

      image: { uri: 'https://images.unsplash.com/photo-1588776814546-9cbbf0e1b8e7' },
      isAvailable: false,
    },
    {
      id: '4',
      name: 'General Health Clinic',
      distance: 4.0,
      rating: 4.6,
      specialization: 'General Medicine',
      image: { uri: 'https://images.unsplash.com/photo-1588776814546-9cbbf0e1b8e7' },
      isAvailable: true,
    },
  ]}
/>


      </ScrollView>
    </SafeAreaView>
  )
}

/* COMPONENTS */

function SectionHeader({ title }: any) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.viewAll}>View All</Text>
    </View>
  )
}

function Chip({ label, active }: any) {
  return (
    <View style={[styles.chip, active && styles.activeChip]}>
      <Text style={[styles.chipText, active && { color: '#2567E8' }]}>
        {label}
      </Text>
    </View>
  )
}

/* STYLES */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FF',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 14,
    marginBottom: 20,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
  },
  adbanner:{
    alignSelf: 'center',
  },

  banner: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  bannerSmall: {
    color: '#E3E8FF',
    fontSize: 13,
    marginBottom: 8,
  },
  bannerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  bannerPatients: {
    color: '#D6DEFF',
    fontSize: 12,
  },
  bannerImage: {
    width: SCREEN_WIDTH * 0.27,
    height: SCREEN_WIDTH * 0.32,
    borderRadius: 15,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  viewAll: {
    color: '#777',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  gridItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBox: {
    width: 65,
    height: 65,
    backgroundColor: '#EDEFFF',
    borderRadius: 18,
    marginBottom: 8,
  },
  gridText: {
    fontSize: 12,
    textAlign: 'center',
  },

  chipRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  chip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EAEFF5',
  },
  activeChip: {
    backgroundColor: '#E3ECFF',
  },
  chipText: {
    fontSize: 13,
    color: '#555',
  },

  recommendedCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  recommendedImage: {
    width: '100%',
    height: 180,
  },
  hospitalTag: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    backgroundColor: '#3E63DD',
    padding: 8,
  },
  hospitalText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  recommendedInfo: {
    padding: 15,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '700',
  },
  speciality: {
    color: '#777',
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontWeight: '600',
  },
})