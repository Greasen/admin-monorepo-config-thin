<script lang="ts">
import { defineComponent, ref } from 'vue'
import MenuItem from './components/MenuItem.vue'
import Submenu from './components/Submenu.vue'
export default defineComponent({
  name: 'MenuComponent',
  components: { MenuItem, Submenu },
})
</script>

<script lang="ts" setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => {},
    required: true,
  },
})

const itemComponent = ref()
const routeChildren = ref()

function setMenu() {
  const showChildren = props.item?.children || []

  if (showChildren.length === 0) {
    itemComponent.value = 'MenuItem'
    routeChildren.value = props.item
  }
  else {
    itemComponent.value = 'Submenu'
  }
}

setMenu()
</script>

<template>
  <component :is="itemComponent" :item="item" :route-children="routeChildren">
    <template v-if="item.children && item.children.length">
      <menu-component v-for="route in item.children" :key="route.name" :item="route" />
    </template>
  </component>
</template>
