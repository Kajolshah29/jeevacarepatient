import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

interface UploadPrescriptionProps {
  onUploadPress?: () => void
  title?: string
  subtitle?: string
}

export default function UploadPrescription({
  onUploadPress,
  title = 'Upload Prescription',
  subtitle = 'Order via prescription..',
}: UploadPrescriptionProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#9B86BD', '#A78FC5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/images/rx.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        {/* Upload Button */}
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={onUploadPress}
          activeOpacity={0.8}
        >
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 16,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  icon: {
    width: 80,
    height: 80,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '400',
  },

  uploadButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 25,
  },

  uploadButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#9B86BD',
  },
})
