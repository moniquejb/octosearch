<template>
  <div :class="className" class="relative group/octo aspect-[98/103] mx-1 -ml-7 cursor-search" @click="focusElement('search')">
    <OctocatSvgHandler name="octocatBody" className="w-full transition-opacity absolute top-0 left-0" :tertiary-class="`transition-opacity fill-gray-400 ${animate ? 'animate-opacity-in-out md:animate-none md:opacity-0 md:group-hover/octo:animate-opacity-in-out' : ''}`" />
    <OctocatSvgHandler name="octocatTentacle" :className="`${animate ? 'animate-wave' : ''} transform-origin-right-center w-full absolute top-0 left-0`" />
  </div>
</template>

<script setup lang="ts">
import { focusElement } from '@/utilities'
import OctocatSvgHandler from '@/components/svgs/OctocatSvgHandler.vue'

interface Props {
  className?: string
  animate?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  className: 'w-2/4 xs:w-2/6 md:w-1/5 max-w-40 md:max-w-64',
  animate: true,
})
</script>
