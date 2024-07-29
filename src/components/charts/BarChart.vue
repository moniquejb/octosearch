<template>
  <div class="w-full" v-if="data">
    <Bar :data="data" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, BarElement, CategoryScale, LinearScale, type ChartData } from 'chart.js'
import { computed, type ComputedRef } from 'vue'
import { formatThousand } from '@/utilities'

interface Props {
  data: [number, number] | null
}
const props = withDefaults(defineProps<Props>(), {
  data: null,
})

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

const data: ComputedRef<ChartData<'bar'>> = computed(() => {
  return {
    labels: [`Open: ${formatThousand(props.data?.[0] || 0) || ''}`, `Closed: ${formatThousand(props.data?.[1] || 0) || ''}`],
    datasets: [
      {
        backgroundColor: ['#16a34a', '#a855f7'],
        data: props.data || [],
        indexAxis: 'y',
      },
    ],
  }
})

const options = {
  responsive: true,
  maintainAspectRatio: true,
}
</script>
