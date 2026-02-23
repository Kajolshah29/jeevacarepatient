import { useRouter } from 'expo-router'
import { ArrowLeft, Check, Search } from 'lucide-react-native'
import React, { useState } from 'react'
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Language {
  id: string
  name: string
  flag: string
}

const languages: Language[] = [
  { id: '1', name: 'English', flag: '🇬🇧' },
  { id: '2', name: 'Hindi', flag: '🇮🇳' },
  { id: '3', name: 'Spanish', flag: '🇪🇸' },
  { id: '4', name: 'French', flag: '🇫🇷' },
  { id: '5', name: 'Arabic', flag: '🇦🇪' },
  { id: '6', name: 'Chinese', flag: '🇨🇳' },
  { id: '7', name: 'German', flag: '🇩🇪' },
  { id: '8', name: 'Japanese', flag: '🇯🇵' },
  { id: '9', name: 'Portuguese', flag: '🇵🇹' },
  { id: '10', name: 'Russian', flag: '🇷🇺' },
  { id: '11', name: 'Bengali', flag: '🇮🇳' },
  { id: '12', name: 'Korean', flag: '🇰🇷' },
  { id: '13', name: 'Italian', flag: '🇮🇹' },
]

export default function LanguageScreen() {
  const router = useRouter()
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0])
  const [searchQuery, setSearchQuery] = useState('')

  const filteredLanguages = languages.filter((lang) =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectLanguage = (language: Language) => {
    setSelectedLanguage(language)
  }

  const handleComplete = () => {
    // Save language preference and navigate
    router.back()
  }

  const LanguageItem = ({ item, isSelected }: { item: Language; isSelected: boolean }) => (
    <TouchableOpacity
      style={[styles.languageItem, isSelected && styles.languageItemSelected]}
      activeOpacity={0.7}
      onPress={() => handleSelectLanguage(item)}
    >
      <View style={styles.languageLeft}>
        <Text style={styles.flag}>{item.flag}</Text>
        <Text style={styles.languageName}>{item.name}</Text>
      </View>
      <View style={[styles.radio, isSelected && styles.radioSelected]}>
        {isSelected && <Check size={16} color="white" strokeWidth={3} />}
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Choose the language</Text>
          <Text style={styles.subtitle}>
            Select your preferred language below This helps us serve you better.
          </Text>
        </View>

        {/* You Selected Section */}
        <View style={styles.selectedSection}>
          <Text style={styles.sectionTitle}>You Selected</Text>
          <View style={styles.selectedCard}>
            <View style={styles.languageLeft}>
              <Text style={styles.flag}>{selectedLanguage.flag}</Text>
              <Text style={styles.selectedLanguageName}>{selectedLanguage.name}</Text>
            </View>
            <View style={styles.checkCircle}>
              <Check size={20} color="white" strokeWidth={3} />
            </View>
          </View>
        </View>

        {/* All Languages Section */}
        <View style={styles.allLanguagesSection}>
          <Text style={styles.sectionTitle}>All Languages</Text>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Search size={20} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Languages List */}
          <View style={styles.languagesList}>
            {filteredLanguages.map((language) => (
              <LanguageItem
                key={language.id}
                item={language}
                isSelected={selectedLanguage.id === language.id}
              />
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Complete Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.completeButton}
          activeOpacity={0.8}
          onPress={handleComplete}
        >
          <Text style={styles.completeButtonText}>Complete Registration</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
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

  selectedSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  selectedCard: {
    backgroundColor: '#F0F4FF',
    borderWidth: 2,
    borderColor: '#2567E8',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedLanguageName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2567E8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  allLanguagesSection: {
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 10,
  },

  languagesList: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 8,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  languageItemSelected: {
    backgroundColor: '#EFF6FF',
  },
  languageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flag: {
    fontSize: 28,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    backgroundColor: '#2567E8',
    borderColor: '#2567E8',
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  completeButton: {
    backgroundColor: '#2567E8',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#2567E8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  completeButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: 'white',
  },
})
