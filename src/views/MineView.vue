<template>
  <div>用户名：{{ userInfo.name }}</div>
  <div>我的积分：{{ myScore }}</div>
  <div v-for="item in chipInList" :key="item.$id">
    <div>场次：{{ item.teamInfo.TeamA_name }} vs{{ item.teamInfo.TeamB_name }} </div>
    <div>投注点数：{{ item.Chip_in_score }}</div>
    <div>投注结果：{{ item.Score_result }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'
const userStore = useUserStore();
const { myScore, chipInList } = storeToRefs(userStore)

// eslint-disable-next-line no-undef
const userInfo = ref(kintone.getLoginUser())

</script>