import React from 'react'
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

const { width } = Dimensions.get('window')
const ITEM_SIZE = (width - 60) / 4

interface LabCategoryItem {
  id: string
  label: string
  icon: any
}

interface LabTestCategoryProps {
  categories?: LabCategoryItem[]
  title?: string
  actionLabel?: string
  onPressCategory?: (item: LabCategoryItem) => void
  onPressAction?: () => void
}

const defaultCategories: LabCategoryItem[] = 
[
  { id: '1', label: 'Digestive Health', icon: require('../assets/images/gastroenterology.png') },
  { id: '2', label: 'Infection Screening', icon: require('../assets/images/mask.png') },
  { id: '3', label: 'Respiratory Health', icon: require('../assets/images/lungs.png') },
  { id: '4', label: 'Cardiac Health', icon: require('../assets/images/heart.png') },
  { id: '5', label: 'Thyroid Profile', icon: require('../assets/images/organ.png') },
  { id: '6', label: 'Liver Function', icon: require('../assets/images/liver.png') },
  { id: '7', label: 'Cancer Screening', icon: require('../assets/images/cancer-ribbon.png') },
  { id: '8', label: 'Full Body Checkups', icon: require('../assets/images/body-scan.png') },
]

export default function LabTestCategory({
  categories = defaultCategories,
  title = 'Categories',
  actionLabel = 'See All',
  onPressCategory,
  onPressAction,
}: LabTestCategoryProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onPressAction}>
          <Text style={styles.action}>{actionLabel}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={4}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => onPressCategory?.(item)}
            activeOpacity={0.8}
          >
            <View style={styles.iconBox}>
              <Image source={item.icon} style={styles.icon} resizeMode="contain" />
            </View>
            <Text style={styles.label} numberOfLines={1}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  action: {
    color: '#6B7280',
    fontWeight: '500',
  },
  card: {
    width: ITEM_SIZE,
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBox: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: ITEM_SIZE * 0.6,
    height: ITEM_SIZE * 0.6,
  },
  label: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
})
