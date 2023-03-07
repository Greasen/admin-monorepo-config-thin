<script lang="ts" setup>
import { ElLoading } from "element-plus"

const openFullScreen2 = () => {
  const loading = ElLoading.service({
    lock: true,
    text: "页面加载中...",
    background: "rgba(0, 0, 0, 0.7)",
  })

  setTimeout(() => {
    loading.close()
  }, 2000)
}

openFullScreen2()
</script>
