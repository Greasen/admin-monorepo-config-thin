<script lang="ts" setup>
import { provide } from "vue"
import * as echarts from "echarts"
import { useSetTheme } from "~/hooks/setting/useSetTheme"
import "~/router/usePermission"
import { useTokenHooks } from "./hooks/web/useToken"

useSetTheme()
useTokenHooks()

provide("$echarts", echarts)
</script>

<template>
  <router-view />
</template>
