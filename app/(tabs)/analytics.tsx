import {
    Activity,
    Calendar,
    ChevronRight,
    Droplet,
    Flame,
    Heart,
    Moon,
    TrendingDown,
    TrendingUp,
    Weight,
} from 'lucide-react-native'
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

interface HealthMetric {
  id: string
  label: string
  value: string
  unit: string
  change: number
  icon: any
  color: string
  bgColor: string
}

interface ActivityData {
  day: string
  value: number
}

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week')

  const healthMetrics: HealthMetric[] = [
    {
      id: '1',
      label: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      change: -2,
      icon: Heart,
      color: '#DC2626',
      bgColor: '#FEE2E2',
    },
    {
      id: '2',
      label: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      change: 0,
      icon: Activity,
      color: '#2563EB',
      bgColor: '#DBEAFE',
    },
    {
      id: '3',
      label: 'Blood Sugar',
      value: '95',
      unit: 'mg/dL',
      change: -5,
      icon: Droplet,
      color: '#F59E0B',
      bgColor: '#FEF3C7',
    },
    {
      id: '4',
      label: 'Weight',
      value: '75.5',
      unit: 'kg',
      change: -0.5,
      icon: Weight,
      color: '#8B5CF6',
      bgColor: '#EDE9FE',
    },
  ]

  const weeklyActivity: ActivityData[] = [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 80 },
    { day: 'Wed', value: 50 },
    { day: 'Thu', value: 90 },
    { day: 'Fri', value: 75 },
    { day: 'Sat', value: 85 },
    { day: 'Sun', value: 70 },
  ]

  const maxActivity = Math.max(...weeklyActivity.map((d) => d.value))

  const renderMetricCard = (metric: HealthMetric) => {
    const Icon = metric.icon
    return (
      <TouchableOpacity key={metric.id} style={styles.metricCard}>
        <View style={[styles.metricIcon, { backgroundColor: metric.bgColor }]}>
          <Icon size={24} color={metric.color} />
        </View>
        <View style={styles.metricInfo}>
          <Text style={styles.metricLabel}>{metric.label}</Text>
          <View style={styles.metricValueRow}>
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricUnit}>{metric.unit}</Text>
          </View>
          {metric.change !== 0 && (
            <View style={styles.changeRow}>
              {metric.change > 0 ? (
                <TrendingUp size={14} color="#16A34A" />
              ) : (
                <TrendingDown size={14} color="#DC2626" />
              )}
              <Text
                style={[
                  styles.changeText,
                  { color: metric.change > 0 ? '#16A34A' : '#DC2626' },
                ]}
              >
                {Math.abs(metric.change)}
              </Text>
            </View>
          )}
        </View>
        <ChevronRight size={20} color="#D1D5DB" />
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Health Analytics</Text>
          <Text style={styles.headerSubtitle}>Track your health progress</Text>
        </View>
        <TouchableOpacity style={styles.calendarButton}>
          <Calendar size={22} color="#4B5563" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'week' && styles.activePeriod]}
            onPress={() => setSelectedPeriod('week')}
          >
            <Text
              style={[
                styles.periodText,
                selectedPeriod === 'week' && styles.activePeriodText,
              ]}
            >
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'month' && styles.activePeriod]}
            onPress={() => setSelectedPeriod('month')}
          >
            <Text
              style={[
                styles.periodText,
                selectedPeriod === 'month' && styles.activePeriodText,
              ]}
            >
              Month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'year' && styles.activePeriod]}
            onPress={() => setSelectedPeriod('year')}
          >
            <Text
              style={[
                styles.periodText,
                selectedPeriod === 'year' && styles.activePeriodText,
              ]}
            >
              Year
            </Text>
          </TouchableOpacity>
        </View>

        {/* Activity Chart */}
        <View style={styles.chartSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Activity Overview</Text>
            <Text style={styles.sectionSubtitle}>Steps per day</Text>
          </View>

          <View style={styles.chart}>
            {weeklyActivity.map((data, index) => (
              <View key={index} style={styles.chartBar}>
                <View style={styles.barContainer}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: `${(data.value / maxActivity) * 100}%`,
                        backgroundColor:
                          data.value === maxActivity ? '#2563EB' : '#93C5FD',
                      },
                    ]}
                  />
                </View>
                <Text style={styles.barLabel}>{data.day}</Text>
              </View>
            ))}
          </View>

          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#2563EB' }]} />
              <Text style={styles.legendText}>Peak</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#93C5FD' }]} />
              <Text style={styles.legendText}>Regular</Text>
            </View>
          </View>
        </View>

        {/* Today's Stats */}
        <View style={styles.todaySection}>
          <Text style={styles.sectionTitle}>Today's Summary</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#FEE2E2' }]}>
                <Flame size={24} color="#DC2626" />
              </View>
              <Text style={styles.statValue}>1,240</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#DBEAFE' }]}>
                <Activity size={24} color="#2563EB" />
              </View>
              <Text style={styles.statValue}>8,542</Text>
              <Text style={styles.statLabel}>Steps</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#F3E8FF' }]}>
                <Moon size={24} color="#8B5CF6" />
              </View>
              <Text style={styles.statValue}>7.5h</Text>
              <Text style={styles.statLabel}>Sleep</Text>
            </View>
          </View>
        </View>

        {/* Vital Signs */}
        <View style={styles.vitalsSection}>
          <Text style={styles.sectionTitle}>Vital Signs</Text>
          {healthMetrics.map(renderMetricCard)}
        </View>

        {/* Health Goals */}
        <View style={styles.goalsSection}>
          <Text style={styles.sectionTitle}>Weekly Goals</Text>

          <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <View style={styles.goalInfo}>
                <Text style={styles.goalTitle}>Steps Goal</Text>
                <Text style={styles.goalProgress}>8,542 / 10,000 steps</Text>
              </View>
              <Text style={styles.goalPercentage}>85%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '85%' }]} />
            </View>
          </View>

          <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <View style={styles.goalInfo}>
                <Text style={styles.goalTitle}>Water Intake</Text>
                <Text style={styles.goalProgress}>1.8 / 2.5 liters</Text>
              </View>
              <Text style={styles.goalPercentage}>72%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '72%' }]} />
            </View>
          </View>

          <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <View style={styles.goalInfo}>
                <Text style={styles.goalTitle}>Exercise Time</Text>
                <Text style={styles.goalProgress}>45 / 60 minutes</Text>
              </View>
              <Text style={styles.goalPercentage}>75%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '75%' }]} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
  },

  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },

  calendarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 100,
  },

  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
    borderRadius: 12,
    padding: 4,
  },

  periodButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },

  activePeriod: {
    backgroundColor: '#2563EB',
  },

  periodText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },

  activePeriodText: {
    color: '#FFFFFF',
  },

  chartSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  sectionHeader: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },

  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },

  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 180,
    marginBottom: 16,
  },

  chartBar: {
    flex: 1,
    alignItems: 'center',
  },

  barContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: 4,
  },

  bar: {
    width: '100%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    minHeight: 20,
  },

  barLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
    fontWeight: '500',
  },

  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  legendText: {
    fontSize: 13,
    color: '#6B7280',
  },

  todaySection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 13,
    color: '#6B7280',
  },

  vitalsSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  metricCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  metricInfo: {
    flex: 1,
  },

  metricLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
  },

  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginBottom: 4,
  },

  metricValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
  },

  metricUnit: {
    fontSize: 14,
    color: '#9CA3AF',
  },

  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  changeText: {
    fontSize: 13,
    fontWeight: '600',
  },

  goalsSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  goalInfo: {
    flex: 1,
  },

  goalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },

  goalProgress: {
    fontSize: 13,
    color: '#6B7280',
  },

  goalPercentage: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2563EB',
  },

  progressBar: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 4,
  },
})