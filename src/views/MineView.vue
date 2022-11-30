<template>
  <div>用户名：{{ userInfo.name }}</div>
  <div>我的积分：{{ myScore }}</div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'
const userStore = useUserStore();
const { myScore } = storeToRefs(userStore)
userStore.getLeftScore()
// eslint-disable-next-line no-undef
const userInfo = ref(kintone.getLoginUser())

</script>