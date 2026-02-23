import { useRouter } from 'expo-router'
import {
    ArrowLeft,
    ChevronRight,
    Clock,
    FileText,
    HelpCircle,
    Mail,
    MapPin,
    MessageCircle,
    Phone
} from 'lucide-react-native'
import React from 'react'
import {
    Linking,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface FAQ {
  id: string
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How do I book an appointment?',
    answer: 'You can book appointments through our app by selecting a doctor and choosing a time slot.',
  },
  {
    id: '2',
    question: 'Can I cancel or reschedule my appointment?',
    answer: 'Yes, you can cancel or reschedule up to 24 hours before your appointment time.',
  },
  {
    id: '3',
    question: 'How do I access my medical records?',
    answer: 'Go to Documents section to view and download all your medical records.',
  },
  {
    id: '4',
    question: 'What payment methods do you accept?',
    answer: 'We accept credit/debit cards, UPI, net banking, and digital wallets.',
  },
]

export default function HelpSupportScreen() {
  const router = useRouter()

  const handleCall = () => {
    Linking.openURL('tel:+911234567890')
  }

  const handleEmail = () => {
    Linking.openURL('mailto:support@jeevacare.com')
  }

  const handleChat = () => {
    // Open chat functionality
  }

  const ContactCard = ({ icon: Icon, title, subtitle, onPress, color }: any) => (
    <TouchableOpacity style={styles.contactCard} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.contactIcon, { backgroundColor: `${color}15` }]}>
        <Icon size={24} color={color} />
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactTitle}>{title}</Text>
        <Text style={styles.contactSubtitle}>{subtitle}</Text>
      </View>
      <ChevronRight size={20} color="#9CA3AF" />
    </TouchableOpacity>
  )

  const FAQItem = ({ faq }: { faq: FAQ }) => (
    <TouchableOpacity style={styles.faqItem} activeOpacity={0.7}>
      <View style={styles.faqIconContainer}>
        <HelpCircle size={20} color="#2567E8" />
      </View>
      <View style={styles.faqContent}>
        <Text style={styles.faqQuestion}>{faq.question}</Text>
        <Text style={styles.faqAnswer}>{faq.answer}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Contact Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={styles.contactGrid}>
            <ContactCard
              icon={Phone}
              title="Call Us"
              subtitle="+91 123 456 7890"
              onPress={handleCall}
              color="#10B981"
            />
            <ContactCard
              icon={Mail}
              title="Email Us"
              subtitle="support@jeevacare.com"
              onPress={handleEmail}
              color="#3B82F6"
            />
            <ContactCard
              icon={MessageCircle}
              title="Live Chat"
              subtitle="Chat with our team"
              onPress={handleChat}
              color="#8B5CF6"
            />
          </View>
        </View>

        {/* Business Hours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Hours</Text>
          <View style={styles.infoCard}>
            <Clock size={20} color="#2567E8" />
            <View style={styles.infoContent}>
              <Text style={styles.infoText}>Monday - Saturday: 9:00 AM - 9:00 PM</Text>
              <Text style={styles.infoText}>Sunday: 10:00 AM - 6:00 PM</Text>
            </View>
          </View>
        </View>

        {/* Office Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Office Location</Text>
          <View style={styles.infoCard}>
            <MapPin size={20} color="#2567E8" />
            <View style={styles.infoContent}>
              <Text style={styles.infoText}>123 Healthcare Avenue</Text>
              <Text style={styles.infoText}>Medical District, Mumbai 400001</Text>
            </View>
          </View>
        </View>

        {/* FAQs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.faqList}>
            {faqs.map((faq) => (
              <FAQItem key={faq.id} faq={faq} />
            ))}
          </View>
        </View>

        {/* Additional Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Resources</Text>
          <TouchableOpacity style={styles.resourceItem}>
            <FileText size={20} color="#2567E8" />
            <Text style={styles.resourceText}>Terms & Conditions</Text>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceItem}>
            <FileText size={20} color="#2567E8" />
            <Text style={styles.resourceText}>Privacy Policy</Text>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceItem}>
            <FileText size={20} color="#2567E8" />
            <Text style={styles.resourceText}>User Guide</Text>
            <ChevronRight size={20} color="#9CA3AF" />
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
    backgroundColor: '#F5F7FA',
  },
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
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },

  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },

  contactGrid: {
    gap: 12,
  },
  contactCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },

  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 22,
  },

  faqList: {
    gap: 12,
  },
  faqItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  faqIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  faqContent: {
    flex: 1,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  resourceItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  resourceText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 12,
  },
})
