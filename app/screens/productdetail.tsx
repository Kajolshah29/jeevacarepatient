import { useLocalSearchParams, useRouter } from 'expo-router'
import { ArrowLeft, Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react-native'
import React, { useState } from 'react'
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function ProductDetailScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  // Mock product data - in real app, fetch based on params.id
  const product = {
    id: params.id || '1',
    name: 'Limcee Chewable Natural Vitamin C Chewable Tablets 500mg',
    image: require('@/assets/images/supplement.png'),
    price: 24.68,
    originalPrice: 30.0,
    discount: 18,
    rating: 4.5,
    reviews: 1247,
    seller: 'pharmacy',
    inStock: true,
    description:
      'Limcee Chewable tablets are a dietary supplement containing Vitamin C. Each tablet provides 500mg of Vitamin C which helps boost immunity, promotes healthy skin, and acts as an antioxidant.',
    features: [
      'Contains 500mg Vitamin C per tablet',
      'Chewable tablets with orange flavor',
      'Helps boost immunity',
      'Promotes healthy skin and hair',
      'Acts as a powerful antioxidant',
      'Suitable for adults and children above 12 years',
    ],
    dosage: 'Take 1 tablet daily or as directed by physician',
    freeDeliveryDate: 'Sat, 21 Feb',
    fastestDeliveryDate: 'Fri, 20 Feb',
    minOrderValue: 399,
  }

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} items to cart`)
    router.push('/screens/cart' as any)
  }

  const updateQuantity = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/screens/cart' as any)}>
          <ShoppingCart size={22} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageSection}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              size={24}
              color={isFavorite ? '#DC2626' : '#9CA3AF'}
              fill={isFavorite ? '#DC2626' : 'none'}
            />
          </TouchableOpacity>
          <Image source={product.image} style={styles.productImage} resizeMode="contain" />
        </View>

        {/* Product Info */}
        <View style={styles.infoSection}>
          {/* Seller */}
          {product.seller && <Text style={styles.seller}>{product.seller}</Text>}

          {/* Product Name */}
          <Text style={styles.productName}>{product.name}</Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.ratingText}>{product.rating}</Text>
            </View>
            <Text style={styles.reviewsText}>({product.reviews} reviews)</Text>
          </View>

          {/* Price Section */}
          <View style={styles.priceSection}>
            <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>₹{product.originalPrice.toFixed(2)}</Text>
            )}
            {product.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{product.discount}% OFF</Text>
              </View>
            )}
          </View>

          {/* Stock Status */}
          <View style={styles.stockRow}>
            <View style={[styles.stockIndicator, product.inStock && styles.inStock]} />
            <Text style={[styles.stockText, product.inStock && styles.inStockText]}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </Text>
          </View>

          {/* Delivery Info */}
          <View style={styles.deliverySection}>
            <Text style={styles.sectionTitle}>Delivery Options</Text>
            <Text style={styles.deliveryText}>
              FREE delivery <Text style={styles.deliveryDate}>{product.freeDeliveryDate}</Text> on
              ₹{product.minOrderValue} of items
            </Text>
            <Text style={styles.deliveryText}>
              Or fastest delivery <Text style={styles.deliveryDate}>{product.fastestDeliveryDate}</Text>
            </Text>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About this item</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            {product.features.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* Dosage */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dosage</Text>
            <Text style={styles.description}>{product.dosage}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.quantitySection}>
          <Text style={styles.quantityLabel}>Quantity</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(-1)}
            >
              <Minus size={18} color="#333" />
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(1)}
            >
              <Plus size={18} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.addToCartButton, !product.inStock && styles.disabledButton]}
          onPress={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart size={20} color="#FFFFFF" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  imageSection: {
    backgroundColor: '#F8F8F8',
    paddingVertical: 40,
    alignItems: 'center',
    position: 'relative',
  },

  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },

  productImage: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.7,
  },

  infoSection: {
    padding: 20,
  },

  seller: {
    fontSize: 14,
    fontWeight: '700',
    color: '#007185',
    marginBottom: 8,
  },

  productName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: 26,
    marginBottom: 12,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 8,
  },

  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
  },

  reviewsText: {
    fontSize: 14,
    color: '#6B7280',
  },

  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },

  price: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
  },

  originalPrice: {
    fontSize: 18,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },

  discountBadge: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },

  discountText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  stockIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#DC2626',
    marginRight: 8,
  },

  inStock: {
    backgroundColor: '#16A34A',
  },

  stockText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
  },

  inStockText: {
    color: '#16A34A',
  },

  deliverySection: {
    backgroundColor: '#F0F9FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },

  deliveryText: {
    fontSize: 13,
    color: '#374151',
    marginBottom: 4,
  },

  deliveryDate: {
    fontWeight: '700',
    color: '#1A1A1A',
  },

  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },

  featureRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },

  bullet: {
    fontSize: 14,
    color: '#4B5563',
    marginRight: 8,
  },

  featureText: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },

  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },

  quantitySection: {
    flex: 1,
  },

  quantityLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
  },

  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    minWidth: 24,
    textAlign: 'center',
  },

  addToCartButton: {
    flex: 2,
    backgroundColor: '#4169E1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    paddingVertical: 12,
  },

  disabledButton: {
    backgroundColor: '#9CA3AF',
  },

  addToCartText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
})
