import { Picker } from '@react-native-picker/picker'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { Calendar, ChevronRight } from 'lucide-react-native'
import React, { useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface FormData {
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  bloodGroup: string
  pinCode: string
  flatHouseNo: string
  areaStreetVillage: string
  city: string
  state: string
}

export default function RegisterForm() {
  const router = useRouter()
  const [page, setPage] = useState(1)

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    pinCode: '',
    flatHouseNo: '',
    areaStreetVillage: '',
    city: '',
    state: '',
  })

  const handleNextPage = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.dateOfBirth ||
      !formData.gender ||
      !formData.bloodGroup
    ) {
      Alert.alert('Error', 'Please fill all personal details')
      return
    }
    setPage(2)
  }

  const handleCompleteRegistration = () => {
    if (
      !formData.pinCode ||
      !formData.flatHouseNo ||
      !formData.areaStreetVillage ||
      !formData.city ||
      !formData.state
    ) {
      Alert.alert('Error', 'Please fill all address details')
      return
    }

    Alert.alert('Success', 'Registration completed!')
    router.push('/screens/subscription')
  }

  const FormInput = ({ placeholder, value, onChangeText, icon, keyboardType = 'default' }: any) => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
      {icon}
    </View>
  )

  const FormSelect = ({ options, value, onValueChange }: any) => (
    <View style={styles.pickerContainer}>
      <Picker selectedValue={value} onValueChange={onValueChange} style={styles.picker}>
        <Picker.Item label="Select..." value="" />
        {options.map((o: any) => (
          <Picker.Item key={o.value} label={o.label} value={o.value} />
        ))}
      </Picker>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#2567E8" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* HEADER */}
        <LinearGradient colors={['#2F6FED', '#3A73E0']} style={styles.header}>
          <Image
            source={require('../../assets/images/white-logo (1).png')}
            style={styles.logo}
          />
        </LinearGradient>

        {/* STEP TABS */}
        <View style={styles.tabContainer}>
          <View style={styles.tab}>
            <View
              style={[
                styles.tabNumber,
                page === 1 ? styles.tabNumberActive : styles.tabNumberInactive,
              ]}
            >
              <Text
                style={[
                  styles.tabNumberText,
                  page === 1 && styles.tabNumberTextActive,
                ]}
              >
                1
              </Text>
            </View>
            <Text
              style={[
                styles.tabLabel,
                page === 1 ? styles.tabLabelActive : styles.tabLabelInactive,
              ]}
            >
              Personal
            </Text>
          </View>

          <View style={styles.tab}>
            <View
              style={[
                styles.tabNumber,
                page === 2 ? styles.tabNumberActive : styles.tabNumberInactive,
              ]}
            >
              <Text
                style={[
                  styles.tabNumberText,
                  page === 2 && styles.tabNumberTextActive,
                ]}
              >
                2
              </Text>
            </View>
            <Text
              style={[
                styles.tabLabel,
                page === 2 ? styles.tabLabelActive : styles.tabLabelInactive,
              ]}
            >
              Address
            </Text>
          </View>
        </View>

        {/* FORM */}
        <ScrollView
          style={styles.content}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formCard}>
            <Text style={styles.title}>
              {page === 1 ? 'Personal Information' : 'Address Information'}
            </Text>
            <Text style={styles.subtitle}>
              Please fill in your details below
            </Text>

            {page === 1 ? (
              <>
                <Text style={styles.label}>First Name</Text>
                <FormInput
                  placeholder="First Name"
                  value={formData.firstName}
                  onChangeText={(t: string) =>
                    setFormData({ ...formData, firstName: t })
                  }
                />

                <Text style={styles.label}>Last Name</Text>
                <FormInput
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChangeText={(t: string) =>
                    setFormData({ ...formData, lastName: t })
                  }
                />

                <Text style={styles.label}>Date of Birth</Text>
                <FormInput
                  placeholder="DD-MM-YYYY"
                  value={formData.dateOfBirth}
                  onChangeText={(t: string) =>
                    setFormData({ ...formData, dateOfBirth: t })
                  }
                  icon={<Calendar size={20} color="#9CA3AF" style={styles.inputIcon} />}
                />

                <Text style={styles.label}>Gender</Text>
                <FormSelect
                  value={formData.gender}
                  onValueChange={(v: string) =>
                    setFormData({ ...formData, gender: v })
                  }
                  options={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                    { label: 'Other', value: 'other' },
                  ]}
                />

                <Text style={styles.label}>Blood Group</Text>
                <FormSelect
                  value={formData.bloodGroup}
                  onValueChange={(v: string) =>
                    setFormData({ ...formData, bloodGroup: v })
                  }
                  options={[
                    { label: 'O+', value: 'O+' },
                    { label: 'A+', value: 'A+' },
                    { label: 'B+', value: 'B+' },
                    { label: 'AB+', value: 'AB+' },
                  ]}
                />
              </>
            ) : (
              <>
                <Text style={styles.label}>PIN Code</Text>
                <FormInput
                  placeholder="PIN Code"
                  keyboardType="numeric"
                  value={formData.pinCode}
                  onChangeText={(t: string) =>
                    setFormData({ ...formData, pinCode: t })
                  }
                />

                <Text style={styles.label}>Flat / House No.</Text>
                <FormInput
                  placeholder="Flat / House No."
                  value={formData.flatHouseNo}
                  onChangeText={(t: string) =>
                    setFormData({ ...formData, flatHouseNo: t })
                  }
                />

                <Text style={styles.label}>Area / Street</Text>
                <FormInput
                  placeholder="Area / Street"
                  value={formData.areaStreetVillage}
                  onChangeText={(t: string) =>
                    setFormData({ ...formData, areaStreetVillage: t })
                  }
                />

                <Text style={styles.label}>City</Text>
                <FormInput
                  placeholder="City"
                  value={formData.city}
                  onChangeText={(t: string) =>
                    setFormData({ ...formData, city: t })
                  }
                />

                <Text style={styles.label}>State</Text>
                <FormSelect
                  value={formData.state}
                  onValueChange={(v: string) =>
                    setFormData({ ...formData, state: v })
                  }
                  options={[
                    { label: 'Maharashtra', value: 'maharashtra' },
                    { label: 'Delhi', value: 'delhi' },
                    { label: 'Karnataka', value: 'karnataka' },
                  ]}
                />
              </>
            )}
          </View>
        </ScrollView>

        {/* BUTTON */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={page === 1 ? handleNextPage : handleCompleteRegistration}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>
              {page === 1 ? 'Next' : 'Complete Registration'}
            </Text>
            {page === 1 && <ChevronRight size={20} color="white" />}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },

  header: {
    paddingTop: 70,
    paddingBottom: 40,
    alignItems: 'center',
  },

  logo: { width: 140, height: 80, resizeMode: 'contain' },

  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: -24,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 14,
    justifyContent: 'space-around',
    elevation: 3,
  },

  tab: { flexDirection: 'row', alignItems: 'center', gap: 8 },

  tabNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabNumberActive: { backgroundColor: '#2567E8' },
  tabNumberInactive: { backgroundColor: '#E5E7EB' },

  tabNumberText: { fontWeight: '700', fontSize: 13 },
  tabNumberTextActive: { color: 'white' },

  tabLabel: { fontSize: 13, fontWeight: '600' },
  tabLabelActive: { color: '#2567E8' },
  tabLabelInactive: { color: '#9CA3AF' },

  content: { flex: 1, paddingHorizontal: 20, marginTop: 20 },

  formCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 22,
    elevation: 4,
  },

  title: { fontSize: 22, fontWeight: '700', color: '#111827' },
  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 20 },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 18,
    marginBottom: 6,
  },

  inputContainer: { position: 'relative' },

  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
  },

  inputIcon: { position: 'absolute', right: 16, top: 16 },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },

  picker: { height: 52 },

footer: {
  paddingHorizontal: 20,
  paddingTop: 12,
  paddingBottom: 16,
  backgroundColor: '#F5F7FA',
},

  button: {
  backgroundColor: '#2567E8',
  height: 54,
  borderRadius: 14,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  gap: 8,
  elevation: 4,
},

  buttonText: { color: 'white', fontSize: 17, fontWeight: '700' },
})