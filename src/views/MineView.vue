<template>
  <div class="mine">
    <div id="container">
      <div class="myscore">我的积分：<span>{{ myScore }}</span></div>
      <div class="gaia-argoui-widget">
        <div class="gaia-argoui-widget-header gaia-argoui-widget-header-icon"
          style="background-image: url('https://static.cybozu.com/contents/k/image/argo/uiparts/widget/spaces_56.png'); background-position: left top; background-repeat: no-repeat;">
          <h3 class="gaia-argoui-widget-title">积分变化记录</h3>
        </div>
        <el-table :data="chipListShow" stripe style="width: 50%" max-height="800">
          <el-table-column label="场次" width="180">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                {{ scope.row.teamInfo.TeamA_name }} vs{{ scope.row.teamInfo.TeamB_name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="scoreChange" label="积分变化" width="180" />
          <el-table-column prop="type" label="类别" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'
const userStore = useUserStore();
const { myScore, chipListShow } = storeToRefs(userStore)

// eslint-disable-next-line no-undef
// const userInfo = ref(kintone.getLoginUser())

</script>
<style>
.myscore {
  padding: 20px 0 20px 5px;
  font-size: 40px;
}

.myscore span {
  color: #fe421d
}
</style>