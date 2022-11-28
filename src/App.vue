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
import home from "@/views/Home.vue"
import mine from "@/views/Mine.vue"

const activeName = ref('home')

const handleClick = (tab, event) => {
  console.log(tab, event)
}
</script>
<style>
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.common-layout {
  background-color: white;
}
</style>