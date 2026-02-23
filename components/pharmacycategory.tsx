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

interface PharmacyCategoryItem {
  id: string
  label: string
  icon: any
}

interface PharmacyCategoryProps {
  categories?: PharmacyCategoryItem[]
  title?: string
  actionLabel?: string
  onPressCategory?: (item: PharmacyCategoryItem) => void
  onPressAction?: () => void
}

const defaultCategories: PharmacyCategoryItem[] = [
  { id: '1', label: 'Medicines', icon: require('../assets/images/meds.png') },
  { id: '2', label: 'Prescriptions', icon: require('../assets/images/rx.png') },
  { id: '3', label: 'Wellness', icon: require('../assets/images/supplement.png') },
  { id: '4', label: 'Diabetes', icon: require('../assets/images/diabetes.png') },
  { id: '5', label: 'Skin Care', icon: require('../assets/images/skin.png') },
  { id: '6', label: 'Baby Care', icon: require('../assets/images/child.png') },
  { id: '7', label: 'Heart Care', icon: require('../assets/images/heart.png') },
  { id: '8', label: 'Devices', icon: require('../assets/images/technician.png') },
]

export default function PharmacyCategory({
  categories = defaultCategories,
  title = 'Shop by Category',
  actionLabel = 'See All',
  onPressCategory,
  onPressAction,
}: PharmacyCategoryProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onPressAction}>
          <Text style={styles.viewAll}>{actionLabel}</Text>
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
  viewAll: {
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
