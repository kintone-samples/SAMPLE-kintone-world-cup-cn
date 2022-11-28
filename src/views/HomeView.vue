<template>
  <div>投注列表：</div>
  <el-table :data="chipInList" stripe style="width: 100%">
    <el-table-column prop="Match_id" label="比赛id" width="180" />
    <el-table-column prop="Chip_in_score" label="押注金额" width="180" />
    <el-table-column prop="Chip_in_type" label="押注类型" width="180" />
  </el-table>

  <div>比赛列表：</div>
  <el-table :data="matchList" stripe style="width:1200px">
    <el-table-column prop="Match_id" label="比赛id" width="180" />
    <el-table-column prop="Match_start_time" label="开始时间" width="180" />
    <el-table-column prop="TeamA_name" label="队伍A" width="180" />
    <el-table-column prop="TeamB_name" label="队伍B" width="180" />
    <el-table-column label="投注" width="180">
      <template #default="scope">
        <el-input v-model="chipInScore" />
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template #default="scope">
        <el-button size="small" @click="handle($event, scope.$index, scope.row)">胜</el-button>
        <el-button size="small" @click="handle($event, scope.$index, scope.row)">负</el-button>
        <el-button size="small" @click="handle($event, scope.$index, scope.row)">平</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { GetEffectiveSocre, GetFreezeScore, GetMatchInfo, GetLeftScore, GetEffectiveScoreList, GetFreezeScoreList, UserChipIn, GetMatchList, GetChipInList } from "@/services/kintoneApi"
import {
  userChipInField,
} from "@/config";
// GetEffectiveSocre().then((resp) => { console.log(resp) })
// GetFreezeScore().then((resp) => { console.log(resp) })
// GetLeftScore().then((resp) => { console.log(resp) })
// GetUserScore().then((resp) => { console.log(resp) })
// GetMatchInfo(123).then((resp) => { console.log(resp) })
// GetFreezeScore().then((resp) => { console.log(resp) })
// GetEffectiveScoreList().then((resp) => { console.log(resp) })
// GetFreezeScoreList().then((resp) => { console.log(resp) })
// const params = {
//   chipInScore: 10, matchId: 123, ChipInType:
//     "A平B"
// };
// UserChipIn(params).then((resp) => { console.log(resp) })
// GetMatchList().then((resp) => { console.log(resp) })
const chipInList = ref([])
GetChipInList().then((resp) => {
  console.log("chipInList:", resp)
  chipInList.value = resp
})

const matchList = ref([])
GetMatchList().then((resp) => {
  console.log("matchList:", resp)
  matchList.value = resp
})

const chipInScore = ref('')

const handle = (e, index, row) => {
  console.log(row)
  let type = ''
  console.log(e.target.tagName)
  if (e.target.tagName !== 'SPAN') {
    type = e.target.getElementsByTagName("span")[0].innerHTML
  } else {
    type = e.target.innerHTML
  }
  const typeMapping = { "胜": "A胜B", "负": "A负B", "平": "A平B" }
  const params = {
    chipInScore: chipInScore.value,
    matchId: row[userChipInField.Match_id],
    ChipInType:
      typeMapping[type]
  };
  console.log(params)
  UserChipIn(params).then((r) => {
    if (r) {
      GetChipInList().then((resp) => {
        chipInList.value = resp
      })
    }
    else {
      console.log("积分不够")
    }

  })


}
</script>