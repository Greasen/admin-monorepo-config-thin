<script lang="ts">
import { defineComponent, ref } from 'vue'
import Theme from './components/theme.vue'
import Download from './components/download.vue'
import About from './components/about.vue'
const tabs = [
  {
    key: 'Theme',
    label: '主题设置',
  },
  {
    key: 'Download',
    label: '下载设置',
  },
  {
    key: 'About',
    label: '关于系统',
  },
]

export default defineComponent({
  components: {
    Theme,
    Download,
    About,
  },
  emits: ['update'],
  setup(_props, { emit }) {
    const tabComponent = ref('Theme')

    /**
     * @Description tab
     * @date 2021-07-03
     * @param {any} val:{props:{label:string}}
     * @returns {any}
     */
    const tabClick = (val: { props: { label: string } }): void => {
      if (val.props.label === '主题设置')
        tabComponent.value = 'Theme'
      else if (val.props.label === '下载设置')
        tabComponent.value = 'Download'
      else if (val.props.label === '关于系统')
        tabComponent.value = 'About'
    }

    const confirm = () => {
      emit('update')
    }

    return {
      tabs,
      tabClick,
      tabComponent,
      confirm,
    }
  },
})
</script>

<template>
  <el-tabs tab-position="left" class="set-tabs" type="border-card" @tab-click="tabClick">
    <el-tab-pane v-for="item in tabs" :key="item.key" :label="item.label">
      <component :is="tabComponent" v-if="item.key === tabComponent" @confirm="confirm" />
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped>
.set-tabs {
  height: 240px;
}
</style>
