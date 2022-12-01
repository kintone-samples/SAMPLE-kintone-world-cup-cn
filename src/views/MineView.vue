<template>
  <div>用户名：{{ userInfo.name }}</div>
  <div>我的积分：{{ myScore }}</div>
  <div v-for="item in chipListShow" :key="item.$id">
    <div>场次：{{ item.teamInfo.TeamA_name }} vs{{ item.teamInfo.TeamB_name }} </div>
    <div>积分变化：{{ item.scoreChange }}</div>
    <div>类别：{{ item.type }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'
const userStore = useUserStore();
const { myScore, chipListShow } = storeToRefs(userStore)




//投注记录显示 场次 -  投注 -  回报 （大于0时显示，小于0）
// eslint-disable-next-line no-undef
const userInfo = ref(kintone.getLoginUser())

</script>