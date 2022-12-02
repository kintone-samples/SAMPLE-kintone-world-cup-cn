<template>
  <div class="main">
    <!-- <el-main> -->
    <el-tabs type="border-card" v-model="activeName" class="demo-tabs" @tab-change="handleClick">
      <el-tab-pane label="世界杯" name="home">
        <home />
      </el-tab-pane>
      <el-tab-pane label="我的信息" name="mine">
        <mine />
      </el-tab-pane>
    </el-tabs>
    <!-- </el-main> -->
  </div>
</template>
<script setup>
import { ref } from 'vue'
import home from "@/views/HomeView.vue"
import mine from "@/views/MineView.vue"
import { useUserStore } from '@/store/user'
const userStore = useUserStore();
userStore.init()

const hidden = (type) => {
  if (type === 'hidden') {
    document.getElementsByClassName("ocean-portal-body-left")[0].style.display = "none";
    document.getElementsByClassName("ocean-portal-body-right")[0].style.display = "none";
  }
  else {
    document.getElementsByClassName("ocean-portal-body-left")[0].style.display = "block";
    document.getElementsByClassName("ocean-portal-body-right")[0].style.display = "block";
  }

}
hidden('hidden')

const activeName = ref('home')
const handleClick = (tab) => {
  // console.log(tab, event)
  if (tab === 'home') {
    hidden('hidden')
  }
  else {
    hidden('show')
  }
}
</script>
<style>
.main {
  margin: 15px 15px 0;
}

/* @import '@/assets/app.css'; */
</style>