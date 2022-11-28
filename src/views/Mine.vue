<template>
  <div>Mine</div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { GetEffectiveSocre, GetFreezeScore, GetMatchInfo, GetLeftScore, GetEffectiveScoreList, GetFreezeScoreList, UserChipIn, GetMatchList } from "@/services/kintoneApi"
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
GetMatchList().then((resp) => { console.log(resp) })
</script>