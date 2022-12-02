<template>
  <div class="main">
    <!-- <el-main> -->
    <el-tabs type="border-card" v-model="activeName" class="demo-tabs" @tab-change="handleClick">
      <el-tab-pane :label="lan.worldCpu" name="home">
        <home />
      </el-tab-pane>
      <el-tab-pane :label="lan.personInfo" name="mine">
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
import { useStore } from '@/store/store'
import { lang } from "@/i18n.js"
const { language } = kintone.getLoginUser();
const lan = ref(lang[language])
const store = useStore();
store.init()

const displayFlag = (type) => {
  let value = 'block'
  if (type === 'hidden') {
    value = "none"
  }
  document.getElementsByClassName("ocean-portal-body-left")[0].style.display = value;
  document.getElementsByClassName("ocean-portal-body-right")[0].style.display = value;
}

//延时执行，防止通知出现显示样式问题
setTimeout(function () {
  displayFlag('hidden')
}, 1000);


const activeName = ref('home')
const handleClick = (tab) => {
  // console.log(tab, event)
  if (tab === 'home') {
    displayFlag('hidden')
  }
  else {
    displayFlag('show')
  }
}
</script>
<style>
.main {
  margin: 15px 15px 0;
}

/* @import '@/assets/app.css'; */
</style>