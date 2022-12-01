<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="pic in picList" :key="pic.$id">
      <el-image style="width: 200px; height: 200px" :src="pic.Link" fit="cover" />
    </el-carousel-item>
  </el-carousel>
  <el-row :gutter="20" v-for="item in chipInList" :key="item.Match_id">
    <el-col :span="5">{{ item.TeamA_name }}
      <el-image style="width: 40px; height: 30px" :src="item.FlagA" fit="cover" />
      vs {{ item.TeamB_name }}
      <el-image style="width: 40px; height: 30px" :src="item.FlagB" fit="cover" />
    </el-col>
    <el-col :span="5">{{ item.Match_start_time }}</el-col>
    <el-col :span="2">胜赔率{{ item.OddsA }}</el-col>
    <el-col :span="2">平赔率{{ item.OddsB }}</el-col>
    <el-col :span="2">负赔率{{ item.OddsC }}</el-col>

    <el-col :span="2" v-if="item.userChipInList.chipInScore">已投注</el-col>
    <el-col :span="2" v-else-if="item.isExpire">已过期</el-col>
    <el-col :span="4" v-else>
      <el-popover :visible="item.userChipInList.chipInShow.sheng" placement="top" :width="160" trigger="click">
        <p>押注：</p>
        <div style="text-align: right; margin: 0">
          <el-input v-model="input" type="number" />
          <el-button size="small" text @click="closePop(item)">取消</el-button>
          <el-button size="small" type="primary" @click="handle(item, 'sheng')">确认</el-button>
        </div>
        <template #reference>
          <el-button size="small" @click="showPop(item, 'sheng')">胜</el-button>
        </template>
      </el-popover>
      <el-popover :visible="item.userChipInList.chipInShow.fu" placement="top" :width="160" trigger="click">
        <p>押注：</p>
        <div style="text-align: right; margin: 0">
          <el-input v-model="input" type="number" />
          <el-button size="small" text @click="closePop(item)">取消</el-button>
          <el-button size="small" type="primary" @click="handle(item, 'fu')">确认</el-button>
        </div>
        <template #reference>
          <el-button size="small" @click="showPop(item, 'fu')">负</el-button>
        </template>
      </el-popover>
      <el-popover :visible="item.userChipInList.chipInShow.ping" placement="top" :width="160" trigger="click">
        <p>押注：</p>
        <div style="text-align: right; margin: 0">
          <el-input v-model="input" type="number" />
          <el-button size="small" text @click="closePop(item)">取消</el-button>
          <el-button size="small" type="primary" @click="handle(item, 'ping')">确认</el-button>
        </div>
        <template #reference>
          <el-button size="small" @click="showPop(item, 'ping')">平</el-button>
        </template>
      </el-popover>
    </el-col>
  </el-row>

  <div v-for="item in gameList" :key="item.$id">
    <div>场次：{{ item.TeamA_name }}
      <el-image style="width: 40px; height: 30px" :src="item.FlagA" fit="cover" />
      vs {{ item.TeamB_name }}
      <el-image style="width: 40px; height: 30px" :src="item.FlagB" fit="cover" />
      {{ item.ScoreA }}:{{ item.ScoreB }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { UserChipIn, GetHomeChipList, GetPicList, GetGameList } from "@/services/kintoneApi"
import {
  matchInfoField,
  userChipInField,
} from "@/config";
import { DateTime } from 'luxon'
import { useUserStore } from '@/store/user'
const userStore = useUserStore();
const typeMapping = { "sheng": "A胜B", "fu": "A负B", "ping": "A平B" }

const chipInList = ref([])
const input = ref(10)
const picList = ref([])
const gameList = ref([])

GetHomeChipList().then((resp) => {
  chipInList.value = resp
})

GetPicList().then((resp) => {
  picList.value = resp
})

GetGameList().then((resp) => {
  console.log(resp)
  gameList.value = resp
})

const closePop = (item) => {
  Object.keys(typeMapping).forEach((i) => {
    item.userChipInList.chipInShow[i] = false
  });
}

const showPop = (item, type) => {
  Object.keys(typeMapping).forEach((i) => {
    if (i === type) {
      item.userChipInList.chipInShow[i] = true
    }
    else {
      item.userChipInList.chipInShow[i] = false
    }
  });
}

const localRef = ref(DateTime.local().toUnixInteger())

const handle = async (item, type) => {
  item.userChipInList.chipInShow[type] = false
  const deadLine = item[matchInfoField.Deadline]

  const deadLineString = DateTime.fromISO(deadLine).toUnixInteger()
  if (deadLineString < localRef.value) {
    alert("超过时间")
    return
  }
  const params = {
    chipInScore: input.value,
    matchId: item[userChipInField.Match_id],
    ChipInType: typeMapping[type]
  };
  if (input.value) {
    UserChipIn(params).then(async (r) => {
      if (r) {
        userStore.getLeftScore()
        userStore.getChipInList()
        GetHomeChipList().then((resp) => {
          chipInList.value = resp
        })
      }
      else {
        alert("积分不够")
      }
    })
  }
}
</script>