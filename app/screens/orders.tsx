import { useRouter } from 'expo-router'
import { ArrowLeft, Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react-native'
import React, { useState } from 'react'
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Order {
  id: string
  orderNumber: string
  date: string
  items: number
  total: number
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled'
  trackingId?: string
}

const orders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: 'Feb 20, 2026',
    items: 3,
    total: 450.50,
    status: 'delivered',
    trackingId: 'TRK123456789',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: 'Feb 22, 2026',
    items: 2,
    total: 320.00,
    status: 'shipped',
    trackingId: 'TRK987654321',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: 'Feb 23, 2026',
    items: 1,
    total: 125.00,
    status: 'processing',
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    date: 'Feb 18, 2026',
    items: 5,
    total: 680.00,
    status: 'cancelled',
  },
]

export default function OrdersScreen() {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState<'all' | 'processing' | 'delivered'>('all')

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return '#10B981'
      case 'shipped':
        return '#3B82F6'
      case 'processing':
        return '#F59E0B'
      case 'cancelled':
        return '#EF4444'
    }
  }

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return CheckCircle
      case 'shipped':
        return Truck
      case 'processing':
        return Clock
      case 'cancelled':
        return XCircle
    }
  }

  const filteredOrders = orders.filter((order) => {
    if (selectedTab === 'all') return true
    if (selectedTab === 'processing') return order.status === 'processing' || order.status === 'shipped'
    if (selectedTab === 'delivered') return order.status === 'delivered'
    return true
  })

  const OrderCard = ({ order }: { order: Order }) => {
    const StatusIcon = getStatusIcon(order.status)
    const statusColor = getStatusColor(order.status)

    return (
      <TouchableOpacity style={styles.orderCard} activeOpacity={0.7}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderNumber}>{order.orderNumber}</Text>
            <Text style={styles.orderDate}>{order.date}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: `${statusColor}15` }]}>
            <StatusIcon size={16} color={statusColor} />
            <Text style={[styles.statusText, { color: statusColor }]}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.orderDetails}>
          <View style={styles.orderDetailRow}>
            <Text style={styles.orderLabel}>Items:</Text>
            <Text style={styles.orderValue}>{order.items} items</Text>
          </View>
          <View style={styles.orderDetailRow}>
            <Text style={styles.orderLabel}>Total:</Text>
            <Text style={styles.orderTotal}>₹{order.total.toFixed(2)}</Text>
          </View>
          {order.trackingId && (
            <View style={styles.orderDetailRow}>
              <Text style={styles.orderLabel}>Tracking:</Text>
              <Text style={styles.trackingId}>{order.trackingId}</Text>
            </View>
          )}
        </View>

        <View style={styles.orderActions}>
          <TouchableOpacity style={styles.actionButtonOutline}>
            <Text style={styles.actionButtonOutlineText}>View Details</Text>
          </TouchableOpacity>
          {order.status === 'delivered' && (
            <TouchableOpacity style={styles.actionButtonPrimary}>
              <Text style={styles.actionButtonPrimaryText}>Reorder</Text>
            </TouchableOpacity>
          )}
          {(order.status === 'shipped' || order.status === 'processing') && (
            <TouchableOpacity style={styles.actionButtonPrimary}>
              <Text style={styles.actionButtonPrimaryText}>Track Order</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'all' && styles.tabActive]}
          onPress={() => setSelectedTab('all')}
        >
          <Text style={[styles.tabText, selectedTab === 'all' && styles.tabTextActive]}>
            All Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'processing' && styles.tabActive]}
          onPress={() => setSelectedTab('processing')}
        >
          <Text style={[styles.tabText, selectedTab === 'processing' && styles.tabTextActive]}>
            In Progress
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'delivered' && styles.tabActive]}
          onPress={() => setSelectedTab('delivered')}
        >
          <Text style={[styles.tabText, selectedTab === 'delivered' && styles.tabTextActive]}>
            Delivered
          </Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ordersList}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
          ) : (
            <View style={styles.emptyState}>
              <Package size={64} color="#D1D5DB" />
              <Text style={styles.emptyStateText}>No orders found</Text>
              <Text style={styles.emptyStateSubtext}>
                {selectedTab === 'all'
                  ? 'You haven\'t placed any orders yet'
                  : `No ${selectedTab} orders`}
              </Text>
            </View>
          )}
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

  tabs: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#2567E8',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabTextActive: {
    color: 'white',
  },

  ordersList: {
    padding: 20,
    gap: 12,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 13,
    color: '#6B7280',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },

  orderDetails: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
    marginBottom: 12,
    gap: 8,
  },
  orderDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  orderValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2567E8',
  },
  trackingId: {
    fontSize: 13,
    fontWeight: '500',
    color: '#3B82F6',
  },

  orderActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButtonOutline: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  actionButtonOutlineText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  actionButtonPrimary: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#2567E8',
    alignItems: 'center',
  },
  actionButtonPrimaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
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
})
