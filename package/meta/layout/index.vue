<script lang="ts" setup>
import appNav from './nav/index.vue'
import appMain from './main/index.vue'
import { useSetMenu } from '~/hooks/web/useSetMenu'
import { getAuthCache } from '~/utils/storage'
import { PROJ_CFG_KEY } from '~/enum/cache'
import { VITE_STSYTM_TITLE_ } from '~/config/config'

import { DogKey } from "~/logics/dogkey"
import { useSignaturewithOut } from "~/store/modules/signature"
import { computed } from 'vue'

const { initMenu } = useSetMenu()
initMenu()

document.title = getAuthCache(PROJ_CFG_KEY) as string || VITE_STSYTM_TITLE_

const dogKeyStore = useSignaturewithOut()
const isCheck = computed(() => dogKeyStore.getSignatureCheck)

if (isCheck.value === "1") {
  new DogKey()
}

</script>

<template>
  <div class="layout">
    <app-nav />
    <app-main />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  transform: translate(0);
}
</style>
