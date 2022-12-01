<template>
  <div class="common-layout">
    <el-main>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="Home" name="home">
          <home />
        </el-tab-pane>
        <el-tab-pane label="Mine" name="mine">
          <mine />
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import home from "@/views/HomeView.vue"
import mine from "@/views/MineView.vue"
import { useUserStore } from '@/store/user'
const userStore = useUserStore();
userStore.init()

const activeName = ref('home')
const handleClick = (tab, event) => {
  // console.log(tab, event)
}
</script>
<style>
@import '@/assets/app.css';
</style>