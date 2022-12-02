<template>
  <div class="mine">
    <div id="container">
      <div class="myscore">{{ lan.myScore }}<span>{{ myScore }}</span></div>
      <div class="gaia-argoui-widget">
        <div class="gaia-argoui-widget-header gaia-argoui-widget-header-icon"
          style="background-image: url('https://static.cybozu.com/contents/k/image/argo/uiparts/widget/spaces_56.png'); background-position: left top; background-repeat: no-repeat;">
          <h3 class="gaia-argoui-widget-title">{{ lan.scoreList }}</h3>
        </div>
        <el-table :data="chipListShow" stripe style="width: 50%" max-height="800">
          <el-table-column :label="lan.matchId" width="180">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                {{ teamNameLang(scope.row.teamInfo.TeamA_name) }} vs{{ teamNameLang(scope.row.teamInfo.TeamB_name) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="scoreChange" :label="lan.scoreChange" width="180" />
          <el-table-column prop="type" :label="lan.type" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useStore } from '@/store/store'
import { lang, teamsLang } from "@/i18n.js"
const store = useStore();
const { myScore, chipListShow } = storeToRefs(store)
const { language } = kintone.getLoginUser();

const lan = ref(lang[language])
const teamNameLang = (name) => {
  if (language !== 'en') {
    return teamsLang[language][name]
  }
  return name
}
// eslint-disable-next-line no-undef

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