<script lang="ts" setup>
import { computed } from "vue"
import { useRouter } from "vue-router"
import logoPic from "~/assets/systemLogo.png"
import { useConfigWidthOut } from "~/store/modules/config"

const store = useConfigWidthOut()

defineOptions({
  name: "logo",
})

const router = useRouter()
const logo = logoPic
const title = document.title

const stationName = computed(() => store.getStationName)

const toIndex = () => {
  router.push("/")
}
</script>

<template>
  <div class="logo" @click="toIndex">
    <img :src="logo" alt="" />
    <div class="logo-content">
      <span class="logo-system-name">{{ title }}</span>
      <span class="station-name">{{ stationName }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo {
  display: flex;
  // height: 40px;
  margin: 0 16px;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;

  > img {
    height: 100%;
  }

  .logo-content {
    display: flex;
    flex-direction: column;
    margin-left: 20px;

    .logo-system-name {
      font-family: "YSBTH";
      font-size: 30px;
      color: white;
    }

    .station-name {
      font-size: 14px;
      color: white;
    }
  }
}
</style>
