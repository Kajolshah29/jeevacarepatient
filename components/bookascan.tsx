import { useRouter } from 'expo-router'
import React from 'react'
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

interface ScanTest {
  id: string
  name: string
  description: string
  price: number
  icon: any
}

interface BookAScanProps {
  tests?: ScanTest[]
  title?: string
  onTestPress?: (test: ScanTest) => void
}

const defaultTests: ScanTest[] = [
  {
    id: '1',
    name: 'CT Scan',
    description: 'Computed Tomography full body scan',
    price: 3500,
    icon: require('../assets/images/body-scan.png'),
  },
  {
    id: '2',
    name: 'Sonography',
    description: 'Ultrasound imaging scan',
    price: 1200,
    icon: require('../assets/images/gyna.png'),
  },
  {
    id: '3',
    name: 'ECG',
    description: 'Electrocardiogram heart monitoring',
    price: 350,
    icon: require('../assets/images/heart.png'),
  },
  {
    id: '4',
    name: 'MRI Scan',
    description: 'Magnetic Resonance Imaging scan',
    price: 5500,
    icon: require('../assets/images/liver.png'),
  },
  {
    id: '5',
    name: 'X-Ray',
    description: 'Digital X-Ray imaging',
    price: 450,
    icon: require('../assets/images/endocrine.png'),
  },
]

export default function BookAScan({
  tests = defaultTests,
  title = 'Top Diagnostic Test',
  onTestPress,
}: BookAScanProps) {
  const router = useRouter()

  const handleBookPress = (test: ScanTest) => {
    if (onTestPress) {
      onTestPress(test)
    } else {
      router.push({
        pathname: '/services/labtest',
        params: { testId: test.id, testName: test.name },
      })
    }
  }

  const renderTestCard = (test: ScanTest) => (
    <TouchableOpacity 
      key={test.id} 
      style={styles.card}
      onPress={() => handleBookPress(test)}
      activeOpacity={0.8}
    >
      {/* Icon */}
      <View style={styles.iconContainer}>
        <Image source={test.icon} style={styles.icon} resizeMode="contain" />
      </View>

      {/* Test Name */}
      <Text style={styles.testName} numberOfLines={2}>
        {test.name}
      </Text>

      {/* Description */}
      <Text style={styles.description} numberOfLines={2}>
        {test.description}
      </Text>

      {/* Price */}
\    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tests.map((test) => renderTestCard(test))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  scrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },

  card: {
    width: SCREEN_WIDTH * 0.5,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },

  icon: {
    width: 50,
    height: 50,
  },

  testName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 6,
    lineHeight: 20,
  },

  description: {
    fontSize: 12,
    color: '#7A7A7A',
    lineHeight: 16,
    marginBottom: 12,
  },

  price: {
    fontSize: 18,
    fontWeight: '800',
    color: '#00B8D4',
    marginBottom: 12,
  },
})
