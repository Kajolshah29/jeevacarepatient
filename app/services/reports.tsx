import { useRouter } from 'expo-router'
import {
  ArrowLeft,
  Download,
  Eye,
  FileText,
  Filter,
  Plus,
  Upload,
  X,
} from 'lucide-react-native'
import React, { useMemo, useState } from 'react'
import {
  Alert,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Document {
  id: string
  title: string
  type: 'prescription' | 'report' | 'invoice' | 'medical-record'
  date: string
  doctor?: string
  size: string
  downloadUrl: string
}

const documents: Document[] = [
  {
    id: '1',
    title: 'Blood Test Report',
    type: 'report',
    date: 'Feb 20, 2026',
    doctor: 'Dr. Sarah Johnson',
    size: '2.4 MB',
    downloadUrl: '',
  },
  {
    id: '2',
    title: 'Prescription',
    type: 'prescription',
    date: 'Feb 18, 2026',
    doctor: 'Dr. Michael Chen',
    size: '156 KB',
    downloadUrl: '',
  },
  {
    id: '3',
    title: 'X-Ray Report',
    type: 'report',
    date: 'Feb 15, 2026',
    doctor: 'Dr. Emily Brown',
    size: '5.8 MB',
    downloadUrl: '',
  },
  {
    id: '4',
    title: 'Consultation Invoice',
    type: 'invoice',
    date: 'Feb 12, 2026',
    size: '98 KB',
    downloadUrl: '',
  },
  {
    id: '5',
    title: 'Medical History',
    type: 'medical-record',
    date: 'Jan 30, 2026',
    doctor: 'Dr. James Wilson',
    size: '1.2 MB',
    downloadUrl: '',
  },
]

export default function DocumentsScreen() {
  const router = useRouter()
  const [selectedFilter, setSelectedFilter] =
    useState<'all' | Document['type']>('all')
  const [modalVisible, setModalVisible] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    type: 'report' as Document['type'],
    doctorName: '',
  })

  const filteredDocuments = useMemo(() => {
    if (selectedFilter === 'all') return documents
    return documents.filter((doc) => doc.type === selectedFilter)
  }, [selectedFilter])

  const getTypeColor = (type: Document['type']) => {
    switch (type) {
      case 'prescription':
        return '#10B981'
      case 'report':
        return '#3B82F6'
      case 'invoice':
        return '#F59E0B'
      case 'medical-record':
        return '#8B5CF6'
    }
  }

  const getTypeLabel = (type: Document['type']) => {
    switch (type) {
      case 'prescription':
        return 'Prescription'
      case 'report':
        return 'Report'
      case 'invoice':
        return 'Invoice'
      case 'medical-record':
        return 'Medical Record'
    }
  }

  const handleUploadDocument = () => {
    if (!formData.title.trim()) {
      Alert.alert('Error', 'Please enter a document title')
      return
    }
    // Here you would implement actual file upload logic
    Alert.alert('Success', 'Document uploaded successfully!')
    setModalVisible(false)
    setFormData({ title: '', type: 'report', doctorName: '' })
  }

  const DocumentCard = ({ document }: { document: Document }) => {
    const typeColor = getTypeColor(document.type)

    return (
      <View style={styles.documentCard}>
        <View style={styles.documentHeader}>
          <View
            style={[
              styles.documentIcon,
              { backgroundColor: `${typeColor}15` },
            ]}
          >
            <FileText size={22} color={typeColor} />
          </View>

          <View style={styles.documentInfo}>
            <Text style={styles.documentTitle}>
              {document.title}
            </Text>

            <View style={styles.documentMeta}>
              <View
                style={[
                  styles.typeBadge,
                  { backgroundColor: `${typeColor}15` },
                ]}
              >
                <Text
                  style={[
                    styles.typeText,
                    { color: typeColor },
                  ]}
                >
                  {getTypeLabel(document.type)}
                </Text>
              </View>
              <Text style={styles.documentDate}>
                {document.date}
              </Text>
            </View>

            {document.doctor && (
              <Text style={styles.documentDoctor}>
                {document.doctor}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.documentFooter}>
          <Text style={styles.documentSize}>
            {document.size}
          </Text>

          <View style={styles.documentActions}>
            <TouchableOpacity style={styles.actionIconButton}>
              <Eye size={18} color="#2567E8" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionIconButton}>
              <Download size={18} color="#2567E8" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medical History</Text>
        <TouchableOpacity>
          <Filter size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Single Vertical Scroll */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Filter Chips */}
        <View style={styles.filterWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterChips}
          >
            {[
              { key: 'all', label: 'All' },
              { key: 'report', label: 'Reports' },
              { key: 'prescription', label: 'Prescriptions' },
              { key: 'invoice', label: 'Invoices' },
              { key: 'medical-record', label: 'Medical Records' },
            ].map((item) => (
              <TouchableOpacity
                key={item.key}
                style={[
                  styles.filterChip,
                  selectedFilter === item.key &&
                    styles.filterChipActive,
                ]}
                onPress={() =>
                  setSelectedFilter(item.key as any)
                }
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedFilter === item.key &&
                      styles.filterChipTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Documents */}
        <View style={styles.documentsList}>
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <FileText size={64} color="#D1D5DB" />
              <Text style={styles.emptyStateText}>
                No documents found
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Your documents will appear here
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Upload FAB */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
      >
        <Plus size={28} color="white" strokeWidth={2.5} />
      </TouchableOpacity>

      {/* Upload Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Upload Document</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Form */}
            <ScrollView style={styles.form}>
              <Text style={styles.label}>Document Title *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter document title"
                value={formData.title}
                onChangeText={(text) =>
                  setFormData({ ...formData, title: text })
                }
              />

              <Text style={styles.label}>Document Type *</Text>
              <View style={styles.typeSelector}>
                {[
                  { key: 'report', label: 'Report' },
                  { key: 'prescription', label: 'Prescription' },
                  { key: 'invoice', label: 'Invoice' },
                  { key: 'medical-record', label: 'Medical Record' },
                ].map((item) => (
                  <TouchableOpacity
                    key={item.key}
                    style={[
                      styles.typeButton,
                      formData.type === item.key && styles.typeButtonActive,
                    ]}
                    onPress={() =>
                      setFormData({
                        ...formData,
                        type: item.key as Document['type'],
                      })
                    }
                  >
                    <Text
                      style={[
                        styles.typeButtonText,
                        formData.type === item.key &&
                          styles.typeButtonTextActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Doctor Name (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter doctor name"
                value={formData.doctorName}
                onChangeText={(text) =>
                  setFormData({ ...formData, doctorName: text })
                }
              />

              {/* File Upload Button */}
              <TouchableOpacity style={styles.uploadButton}>
                <Upload size={20} color="#2567E8" />
                <Text style={styles.uploadButtonText}>Choose File</Text>
                <Text style={styles.uploadHint}>PDF, JPG, PNG (Max 10MB)</Text>
              </TouchableOpacity>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleUploadDocument}
              >
                <Text style={styles.submitButtonText}>Upload</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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

  filterWrapper: {
    marginTop: 16,
    marginBottom: 8,
  },

  filterChips: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
  },

  filterChip: {
    height: 38,
    paddingHorizontal: 18,
    borderRadius: 19,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  filterChipActive: {
    backgroundColor: '#E0F2FE',
    borderColor: '#2563EB',
  },

  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },

  filterChipTextActive: {
    color: '#2563EB',
  },

  documentsList: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
    gap: 12,
  },

  documentCard: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 16,
    elevation: 2,
  },

  documentHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },

  documentIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  documentInfo: {
    flex: 1,
    marginLeft: 12,
  },

  documentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },

  documentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },

  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },

  typeText: {
    fontSize: 11,
    fontWeight: '600',
  },

  documentDate: {
    fontSize: 12,
    color: '#6B7280',
  },

  documentDoctor: {
    fontSize: 13,
    color: '#6B7280',
  },

  documentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },

  documentSize: {
    fontSize: 13,
    color: '#6B7280',
  },

  documentActions: {
    flexDirection: 'row',
    gap: 8,
  },

  actionIconButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },

  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },

  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },

  // FAB
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2567E8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2567E8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Form
  form: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
  },
  typeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#F9FAFB',
  },
  typeButtonActive: {
    backgroundColor: '#E0F2FE',
    borderColor: '#2563EB',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  typeButtonTextActive: {
    color: '#2563EB',
  },
  uploadButton: {
    marginTop: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingVertical: 32,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2567E8',
    marginTop: 8,
  },
  uploadHint: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },

  // Modal Actions
  modalActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  submitButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#2567E8',
    alignItems: 'center',
    shadowColor: '#2567E8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
})