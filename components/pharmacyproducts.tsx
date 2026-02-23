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

interface Product {
  id: string
  name: string
  image: any
  price: number
  originalPrice?: number
  discount?: number
  freeDeliveryDate?: string
  fastestDeliveryDate?: string
  minOrderValue?: number
  seller?: string
}

interface PharmacyProductsProps {
  products?: Product[]
  title?: string
  onProductPress?: (product: Product) => void
  onAddToCart?: (product: Product) => void
}

const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Limcee Chewable Natural Vitamin C Chewable Tablets...',
    image: require('../assets/images/supplement.png'),
    price: 24.68,
    seller: 'pharmacy',
    freeDeliveryDate: 'Sat, 21 Feb',
    fastestDeliveryDate: 'Fri, 20 Feb',
    minOrderValue: 399,
  },
  {
    id: '2',
    name: 'Neurobion Forte - Strip of 30 Tablets',
    image: require('../assets/images/meds.png'),
    price: 40.88,
    originalPrice: 47.53,
    discount: 14,
    seller: 'pharmacy',
    freeDeliveryDate: 'Sat, 21 Feb',
    fastestDeliveryDate: 'Fri, 20 Feb',
    minOrderValue: 399,
  },
  {
    id: '3',
    name: 'Calcium Supplement Granules',
    image: require('../assets/images/supplement.png'),
    price: 35.0,
    discount: 14,
    seller: 'pharmacy',
    freeDeliveryDate: 'Sat, 21 Feb',
    fastestDeliveryDate: 'Fri, 20 Feb',
    minOrderValue: 399,
  },
]

export default function PharmacyProducts({
  products = defaultProducts,
  title = 'Multivitamins & Supplements',
  onProductPress,
  onAddToCart,
}: PharmacyProductsProps) {
  const router = useRouter()

  const handleProductPress = (product: Product) => {
    if (onProductPress) {
      onProductPress(product)
    } else {
      router.push(`/screens/productdetail?id=${product.id}` as any)
    }
  }

  const handleAddToCart = (product: Product) => {
    if (onAddToCart) {
      onAddToCart(product)
    }
  }

  const renderProductCard = (product: Product) => (
    <TouchableOpacity
      key={product.id}
      style={styles.card}
      onPress={() => handleProductPress(product)}
      activeOpacity={0.9}
    >
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image source={product.image} style={styles.productImage} resizeMode="contain" />
      </View>

      {/* Product Name */}
      <Text style={styles.productName} numberOfLines={2}>
        {product.name}
      </Text>

      {/* Price Section */}
      <View style={styles.priceRow}>
        <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
        {product.originalPrice && (
          <Text style={styles.originalPrice}>₹{product.originalPrice.toFixed(2)}</Text>
        )}
      </View>

      {/* Discount Badge */}
      {product.discount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{product.discount}% OFF</Text>
        </View>
      )}

      {/* Seller Info */}
      {product.seller && (
        <Text style={styles.seller}>{product.seller}</Text>
      )}

      {/* Delivery Info */}
      <View style={styles.deliveryInfo}>
        {product.freeDeliveryDate && (
          <Text style={styles.deliveryText} numberOfLines={2}>
            FREE delivery <Text style={styles.deliveryDate}>{product.freeDeliveryDate}</Text> on{' '}
            ₹{product.minOrderValue} of items fulfilled by Amazon
          </Text>
        )}
        {product.fastestDeliveryDate && (
          <Text style={styles.deliveryText}>
            Or fastest delivery <Text style={styles.deliveryDate}>{product.fastestDeliveryDate}</Text>
          </Text>
        )}
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => handleAddToCart(product)}
        activeOpacity={0.8}
      >
        <Text style={styles.addToCartText}>Add to cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {/* Section Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {products.map((product) => renderProductCard(product))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  scrollContent: {
    paddingHorizontal: 20,
    gap: 16,
  },

  card: {
    width: SCREEN_WIDTH * 0.7,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  imageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  productImage: {
    width: '80%',
    height: '80%',
  },

  productName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1A1A1A',
    lineHeight: 18,
    marginBottom: 8,
    minHeight: 36,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 4,
  },

  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },

  originalPrice: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'line-through',
  },

  discountBadge: {
    backgroundColor: '#CC0C39',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 8,
  },

  discountText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  seller: {
    fontSize: 14,
    fontWeight: '700',
    color: '#007185',
    marginBottom: 6,
  },

  deliveryInfo: {
    marginBottom: 12,
  },

  deliveryText: {
    fontSize: 12,
    color: '#565959',
    lineHeight: 16,
    marginBottom: 2,
  },

  deliveryDate: {
    fontWeight: '700',
    color: '#1A1A1A',
  },

  addToCartButton: {
    backgroundColor: '#4169E1',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  addToCartText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
})
