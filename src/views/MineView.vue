<template>
  <div class="mine">
    <div id="container">
      <div class="myscore">{{ lan.myScore }}<span>{{ myScore }}</span></div>
      <div class="gaia-argoui-widget">
        <div class="gaia-argoui-widget-header gaia-argoui-widget-header-icon"
          style="background-image: url('https://static.cybozu.com/contents/k/image/argo/uiparts/widget/spaces_56.png'); background-position: left top; background-repeat: no-repeat;">
          <h3 class="gaia-argoui-widget-title">{{ lan.scoreList }}</h3>
        </div>
        <el-table :data="chipListShow" stripe style="width: 1400px">
          <el-table-column :label="lan.matchId" width="500">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-image class="flag" :src="scope.row.teamInfo.FlagA" fit="contain" /><span class="team_name">{{
                    teamNameLang(scope.row.teamInfo.TeamA_name)
                }}</span> <span class="vs">vs</span> <el-image class="flag" :src="scope.row.teamInfo.FlagB"
                  fit="contain" /><span class="team_name">{{
                      teamNameLang(scope.row.teamInfo.TeamB_name)
                  }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="lan.result">
            <template #default="scope">
              <span>{{ scope.row.teamInfo.Score }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="lan.myVote">
            <template #default="scope">
              <span>{{ voteChange(scope.row.Chip_in_type) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="Chip_in_score" :label="lan.score" width="180">
            <template #default="scope">
              <span> - {{ scope.row.Chip_in_score }} </span>
            </template>
          </el-table-column>
          <el-table-column prop="scoreWin" :label="lan.scoreWin" width="220" />
          <el-table-column :label="lan.type">
            <template #default="scope">
              <span :class="scope.row.type">{{ scope.row.type }}</span>
            </template>
          </el-table-column>
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

const voteChange = (type) => {
  if (type === 'Awin') { return lang[language].win }
  else if (type === 'Bwin') { { return lang[language].loss } }
  else {
    { return lang[language].draw }
  }

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

.flag {
  line-height: 100%;
}

.flag img {
  width: 40px;
  /* border-radius: 5px; */
}

.team_name {
  /* width: 150px; */
  font-weight: 700;
  display: inline-block;
  margin: 10px;
}

.vs {
  font-size: 18px
}

.win {
  color: red
}

.loss {
  color: green
}

.chip_in {
  color: green
}
</style>