<template>
  <div>
    <Listbox v-model="modelValue" class="relative inline-block text-left mb-3">
      <div class="relative mt-1">
        <ListboxButton class="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow focus:outline-none sm:text-sm">
          <span class="block truncate">Items per page: {{ modelValue }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <font-awesome-icon class="-mr-1 w-5 text-gray-400" icon="fa-chevron-down" size="sm" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <ListboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow focus:outline-none sm:text-sm text-center">
            <ListboxOption v-slot="{ active, selected }" v-for="option in ddlOptions" :key="option" :value="option" as="template" @click="handleOptionClick(option)">
              <li :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-900', 'relative cursor-default select-none p-2', selected ? 'font-bold bg-gray-200' : 'font-normal', 'block truncate']">
                <span>{{ option }}</span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import { perPageOptions, type PerPageOption } from '@/types/pagination'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'

const modelValue = defineModel<PerPageOption>({ required: true })

const emit = defineEmits<{
  (e: 'change', option: PerPageOption): void
}>()

const ddlOptions = perPageOptions

function handleOptionClick(option: PerPageOption) {
  emit('change', option)
}
</script>
