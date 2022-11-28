<template>
  <div>用户名：{{ userInfo.name }}</div>
  <div>我的积分：{{ myScore }}</div>
</template>

<script setup>
import { ref } from 'vue'
import { GetLeftScore } from "@/services/kintoneApi"
// eslint-disable-next-line no-undef
const userInfo = ref(kintone.getLoginUser())
const myScore = ref(0)
GetLeftScore().then(resp => { myScore.value = resp })
</script>