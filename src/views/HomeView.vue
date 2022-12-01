<template>
  <div class="home">
    <header class="top">
      <div class="top_left">
        <img src="https://cndevdemo.oss-cn-shanghai.aliyuncs.com/fifa/logo.png">
        <div class="top_time">比赛时间：11月21日-12月18日</div>
        <div class="top_countdown">
          <div>
            <span class="top_countdown_title ">世界杯比赛第
              <span class="countline-single-num">
                <span class="countline-num">{{ diffDays }}</span>
              </span>
              天</span>
          </div>
        </div>
      </div>
    </header>

    <div class="center">
      <div class="main-left">
        <div id="vote" class="vote">
          <div class="content_title"><img src="https://cndevdemo.oss-cn-shanghai.aliyuncs.com/fifa/title_vote.png">
          </div>
          <div class="content_vote_bg">
            <el-row class="content_vote" :gutter="20" v-for="item in chipInList" :key="item.Match_id">
              <el-col :span="1"></el-col>
              <el-col class="match_time" :span="5">{{ item.Match_start_time }}</el-col>
              <el-col :span="8">
                <div style="display:inline-block;line-height: 120%;text-align: center;width:70px;">
                  <el-image class="flag" :src="item.FlagA" fit="contain" /><br />{{
                      item.TeamA_name
                  }}
                </div> <span class="vote_vs">vs</span>
                <div style="display:inline-block;line-height: 120%;text-align: center;width:70px;"><el-image
                    class="flag" :src="item.FlagB" fit="contain" /><br />{{
                        item.TeamB_name
                    }}</div>
              </el-col>
              <!-- <el-col :span="2">胜赔率{{ item.OddsA }}</el-col>
        <el-col :span="2">平赔率{{ item.OddsB }}</el-col>
        <el-col :span="2">负赔率{{ item.OddsC }}</el-col> -->
              <el-col :span="10">
                <div class="voted" v-if="item.userChipInList.chipInScore"><span>已投注</span></div>
                <div class="voted" v-else-if="item.isExpire"><span>已过期</span></div>
                <div v-else>
                  <el-popover :visible="item.userChipInList.chipInShow.sheng" placement="top" :width="180"
                    trigger="click">
                    <p>押注：</p>
                    <div style="text-align: right;line-height: 200%; margin: 0">
                      <el-input v-model="input" type="number" />
                      <el-button size="small" text @click="closePop(item)">取消</el-button>
                      <el-button size="small" type="primary" @click="handle(item, 'sheng')">确认</el-button>
                    </div>
                    <template #reference>
                      <el-button type="" @click="showPop(item, 'sheng')">胜<br /><span class="odds">：{{
                          item.OddsA
                      }}</span></el-button>
                    </template>
                  </el-popover>
                  <el-popover :visible="item.userChipInList.chipInShow.ping" placement="top" :width="180"
                    trigger="click">
                    <p>押注：</p>
                    <div style="text-align: right;line-height: 200%;  margin: 0">
                      <el-input v-model="input" type="number" />
                      <el-button size="small" text @click="closePop(item)">取消</el-button>
                      <el-button size="small" type="primary" @click="handle(item, 'ping')">确认</el-button>
                    </div>
                    <template #reference>
                      <el-button @click="showPop(item, 'ping')">平<br /><span class="odds">：{{
                          item.OddsC
                      }}</span></el-button>
                    </template>
                  </el-popover>
                  <el-popover :visible="item.userChipInList.chipInShow.fu" placement="top" :width="180" trigger="click">
                    <p>押注：</p>
                    <div style="text-align: right;line-height: 200%;  margin: 0">
                      <el-input v-model="input" type="number" />
                      <el-button size="small" text @click="closePop(item)">取消</el-button>
                      <el-button size="small" type="primary" @click="handle(item, 'fu')">确认</el-button>
                    </div>
                    <template #reference>
                      <el-button @click="showPop(item, 'fu')">负<br /><span class="odds">：{{ item.OddsB
                      }}</span></el-button>
                    </template>
                  </el-popover>
                </div>
              </el-col>
              <el-col :span="1"></el-col>
            </el-row>
          </div>
        </div>

        <div class="content">
          <div id="left_side">
            <div class="content_title"><img
                src="https://cndevdemo.oss-cn-shanghai.aliyuncs.com/fifa/title_headlines_news.png">
            </div>
            <el-carousel :interval="4000" arrow="always" indicator-position="none">
              <el-carousel-item v-for="pic in picList" :key="pic.$id">
                <el-image class="scroll" :src="pic.Link" fit="cover" />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div id="right_side">
            <div class="content_title"><img
                src="https://cndevdemo.oss-cn-shanghai.aliyuncs.com/fifa/title_integral.png">
            </div>
            <div class="content_integral">
              <ul style="padding:0;margin:0;text-align: left;list-style-type: none;">
                <li style="height:50px;padding:13px 0;" v-for="(item, index) in gameList" :key="item.$id"><span
                    class="team-order">{{
                        index + 1
                    }}</span>
                  <div style="display:inline-block;line-height: 120%;text-align: center;width:70px;"><el-image
                      class="flag" :src="item.FlagA" fit="contain" /> <br /> {{ item.TeamA_name }}</div>
                  <span class="vs">vs</span>
                  <div style="display:inline-block;line-height: 120%;text-align: center;width:70px;">
                    <el-image class="flag" :src="item.FlagB" fit="contain" /><br />{{ item.TeamB_name }}
                  </div>
                  <span class="score"> {{ item.ScoreA }}:{{ item.ScoreB }}</span>
                </li>
              </ul>
            </div>
            <!-- <div class="content_title"><img src="https://cndevdemo.oss-cn-shanghai.aliyuncs.com/fifa/title_schedule.png">
      </div>
      <div class="content_schedule"><img src="https://cndevdemo.oss-cn-shanghai.aliyuncs.com/fifa/schedule.png"></div> -->
          </div>
        </div>
      </div>
      <div class="main-right">
        <div class="content_title"><img src="https://cndevdemo.oss-cn-shanghai.aliyuncs.com/fifa/title_schedule.png">
        </div>
        <div class="content_schedule"><img src="https://cndevdemo.oss-cn-shanghai.aliyuncs.com/fifa/schedule.png"></div>
      </div>
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


const end = DateTime.local()
const start = DateTime.fromISO('2022-11-21');
const diffDays = ref(Math.round(end.diff(start, 'days').values.days));


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
<style>
.home {
  width: 1280px;
  margin: 0 auto;
}

.center {
  display: flex;
  width: 100%;
  justify-content: space-between
}

.main-left {
  flex: 2;
}

.main-right {
  flex: 1;
}

.el-row {
  margin: 20px 0;
}

.el-carousel__item {

  text-align: center;
}

.scroll {
  border-radius: 10px 10px 10px 10px;
  width: 416px;
  height: 300px;
}

.flag {
  line-height: 100%;
}

.flag img {
  width: 40px;
  border-radius: 5px;
}

.score {
  font-size: 24px;
  font-weight: 900;
  line-height: 150%;
  padding: 0 10px;
  vertical-align: top;
}

#left_side {
  top: 0px;
  left: 0px;
}

#right_side {

  /* width: 80%; */
}

.match_time {
  width: 100px;
  font-size: 22px;
  text-align: left;
}
</style>