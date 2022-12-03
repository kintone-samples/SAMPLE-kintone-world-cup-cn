<template>
  <div class="common-layout">
    <el-alert v-if="error" :title="errorTitle" type="error" effect="dark" @close="handleClose()" />
    <div class="container">
      <div class="home">
        <header class="top">
          <div class="top_left">
            <img :src="pics.logo">
            <div class="top_time">{{ lan.matchTime }}</div>
            <div class="top_countdown">
              <div>
                <span class="top_countdown_title ">{{ lan.matchDay }}
                  <span class="countline-single-num">
                    <span class="countline-num">{{ diffDays }}</span>
                  </span>
                  {{ lan.day }}</span>
              </div>
            </div>
          </div>
        </header>

        <div class="center">
          <div class="main-left">
            <div id="vote" class="vote">
              <div class="content_title"><img :src="pics.vote">
              </div>
              <div class="content_vote_bg">
                <el-scrollbar always>
                  <el-row class="content_vote" :gutter="10" v-for="item in chipInList" :key="item.Match_id">
                    <el-col class="match_time" :span="5">{{ item.Match_start_time }}</el-col>
                    <el-col :span="9">
                      <div style="display:inline-block;line-height: 120%;text-align: center;width:30%">
                        <el-image class="flag" :src="item.FlagA" fit="contain" /><br /><span
                          :style="teamNameFontSize(teamNameLang(item.TeamA_name))">{{
                              teamNameLang(item.TeamA_name)
                          }}</span>
                      </div> <span class="vote_vs">vs</span>
                      <div style="display:inline-block;line-height: 120%;text-align: center;width:30%;"><el-image
                          class="flag" :src="item.FlagB" fit="contain" /><br />
                        <span :style="teamNameFontSize(teamNameLang(item.TeamB_name))">{{ teamNameLang(item.TeamB_name)
                        }}</span>
                      </div>
                    </el-col>
                    <el-col :span="10">
                      <div class="voted" v-if="item.userChipInList.chipInScore"><span>{{ lan.voted }}</span></div>
                      <div class="voted" v-else-if="item.isExpire"><span>{{ lan.expired }}</span></div>
                      <div v-else>
                        <el-popover :visible="item.userChipInList.chipInShow.sheng" placement="top" :width="180"
                          trigger="click">
                          <p>{{ lan.score }}</p>
                          <div style="text-align: right;line-height: 200%; margin: 0">
                            <el-input v-model="input" type="number" />
                            <el-button size="small" text @click="closePop(item)">{{ lan.cancel }}</el-button>
                            <el-button size="small" type="primary" @click="handle(item, 'sheng')">{{ lan.confirm
                            }}</el-button>
                          </div>
                          <template #reference>
                            <el-button class="chipin_button" @click="showPop(item, 'sheng')">{{ lan.win }}<span
                                class="odds">:{{
                                    item.OddsA
                                }}</span></el-button>
                          </template>
                        </el-popover>
                        <el-popover :visible="item.userChipInList.chipInShow.ping" placement="top" :width="180"
                          trigger="click">
                          <p>{{ lan.score }}</p>
                          <div style="text-align: right;line-height: 200%;  margin: 0">
                            <el-input v-model="input" type="number" />
                            <el-button size="small" text @click="closePop(item)">{{ lan.cancel }}</el-button>
                            <el-button size="small" type="primary" @click="handle(item, 'ping')">{{
                                lan.confirm
                            }}</el-button>
                          </div>
                          <template #reference>
                            <el-button class="chipin_button" @click="showPop(item, 'ping')">{{ lan.draw }}<span
                                class="odds">:{{
                                    item.OddsC
                                }}</span></el-button>
                          </template>
                        </el-popover>
                        <el-popover :visible="item.userChipInList.chipInShow.fu" placement="top" :width="180"
                          trigger="click">
                          <p>{{ lan.score }}</p>
                          <div style="text-align: right;line-height: 200%;  margin: 0">
                            <el-input v-model="input" type="number" />
                            <el-button size="small" text @click="closePop(item)">{{ lan.cancel }}</el-button>
                            <el-button size="small" type="primary" @click="handle(item, 'fu')">{{
                                lan.confirm
                            }}</el-button>
                          </div>
                          <template #reference>
                            <el-button class="chipin_button" @click="showPop(item, 'fu')">{{ lan.loss }}<span
                                class="odds">:{{ item.OddsB
                                }}</span></el-button>
                          </template>
                        </el-popover>
                      </div>
                    </el-col>
                    <el-col :span="1"></el-col>
                  </el-row>
                </el-scrollbar>
              </div>
            </div>

            <div class="content">
              <div class="left_side">
                <div class="content_title"><img :src="pics.news">
                </div>
                <el-carousel :interval="4000" arrow="always" indicator-position="none">
                  <el-carousel-item v-for="pic in picList" :key="pic.$id">
                    <el-image class="scroll" :src="pic.Link" fit="cover" />
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="right_side">
                <div class="content_title"><img :src="pics.integral">
                </div>
                <div class="content_integral">
                  <el-scrollbar>
                    <el-row v-for="(item, index) in gameList" :key="item.$id" class="game_list">
                      <el-col :span="3"><span class="team-order">{{
                          index + 1
                      }}</span></el-col>
                      <el-col :span="16">
                        <el-row class="vs_item">
                          <el-col :span="8" style="text-align: center;"><el-image class="flag" :src="item.FlagA"
                              fit="contain" /> <br />
                            <span :style="teamNameFontSizeScore(teamNameLang(item.TeamA_name))">{{
                                teamNameLang(item.TeamA_name)
                            }}</span></el-col>
                          <el-col :span="8"><span class="vs">vs</span></el-col>
                          <el-col :span="8"><el-image class="flag" :src="item.FlagB" fit="contain" /><br /><span
                              :style="teamNameFontSizeScore(teamNameLang(item.TeamB_name))">{{
                                  teamNameLang(item.TeamB_name)
                              }}</span></el-col>
                        </el-row>
                      </el-col>
                      <el-col :span="5"> <span class="score">{{ item.ScoreA }}:{{ item.ScoreB }}</span></el-col>
                    </el-row>
                  </el-scrollbar>
                </div>
              </div>
            </div>
          </div>
          <div class="main-right">
            <div class="content_title"><img :src="pics.schedule">
            </div>
            <div class="content_schedule"><img src="https://cndevdemo.oss-cn-shanghai.aliyuncs.com/fifa/schedule.png">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { UserChipIn, GetHomeChipList, GetPicList, GetGameList } from "@/services/kintoneApi"
import {
  matchInfoField,
  userChipInField,
} from "@/config";
import { DateTime } from 'luxon'
import { useStore } from '@/store/store'
import { lang, teamsLang } from "@/i18n.js"

const { language } = kintone.getLoginUser();
const lan = ref(lang[language])
const store = useStore();
const typeMapping = { "sheng": "Awin", "fu": "Bwin", "ping": "draw" }
const preUrl = "https://cndevdemo.oss-cn-shanghai.aliyuncs.com/fifa/"
const pics = reactive({
  logo: `${preUrl}logo_${language}.png`,
  news: `${preUrl}title_headlines_news_${language}.png`,
  integral: `${preUrl}title_integral_${language}.png`,
  schedule: `${preUrl}title_schedule_${language}.png`,
  vote: `${preUrl}title_vote_${language}.png`,
})
const chipInList = ref([])
const input = ref(10)
const picList = ref([])
const gameList = ref([])
const error = ref(false)
const errorTitle = ref('')

const handleClose = () => {
  error.value = false
}

GetHomeChipList().then((resp) => {
  chipInList.value = resp
})

GetPicList().then((resp) => {
  picList.value = resp
})

GetGameList().then((resp) => {
  // console.log(resp)
  gameList.value = resp
})

const teamNameLang = (name) => {
  if (language !== 'en') {
    return teamsLang[language][name]
  }
  return name
}

const teamNameFontSize = (name) => {
  if (language === 'ja') {
    if (name.length > 4 && name.length < 6) {
      return "font-size:15px"
    }
    if (name.length > 5) {
      return "font-size:10px"
    }
    return "font-size:18px"
  }
  else if (language === 'en') {
    if (name.length > 8) {
      return "font-size:15px"
    }
    return "font-size:18px"
  }
  else {
    return "font-size:18px"
  }
}

const teamNameFontSizeScore = (name) => {
  if (language === 'ja') {
    if (name.length > 4 && name.length < 6) {
      return "font-size:12px"
    }
    if (name.length > 5) {
      return "font-size:8px"
    }
    return "font-size:15px"
  }
  else if (language === 'en') {
    if (name.length > 8) {
      return "font-size:12px"
    }
    return "font-size:15px"
  }
  else {
    if (name.length > 4) {
      return "font-size:12px"
    }
    return "font-size:15px"
  }
}

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

const start = DateTime.fromISO('2022-11-21');
const diffDays = ref(Math.ceil(Math.abs(start.diffNow('days').values.days)));


const handle = async (item, type) => {
  item.userChipInList.chipInShow[type] = false
  const deadLine = item[matchInfoField.Deadline]

  const deadLineString = DateTime.fromISO(deadLine).toUnixInteger()
  if (deadLineString < localRef.value) {
    errorTitle.value = lang[language].overTime
    error.value = true
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
        store.getLeftScore()
        store.getChipInList()
        GetHomeChipList().then((resp) => {
          chipInList.value = resp
        })
      }
      else {
        errorTitle.value = lang[language].noScore
        error.value = true
      }
    })
  }
}
</script>
<style>
.el-alert {
  margin: 20px 0 0;
}

.common-layout {
  margin: 0;
  background-image: url('https://cndevdemo.oss-cn-shanghai.aliyuncs.com/fifa/bg.png');
  background-color: rgb(10, 62, 178);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: left top;
}

.container {
  width: 100%;
  height: 1100px;
  margin: 0 auto;
  position: relative;
  background-image: linear-gradient(rgba(60, 116, 255, 0), rgb(10, 62, 178));
}

.top {
  width: 1400px;
  height: 280px;
  margin: 0 auto;
}

.top_left {
  color: #fff;
}

.top_left img {
  height: 75px;
  margin: 20px 0 0 0;
  display: inline-block;
}

.top_time {
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 10px;
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 3px;
  line-height: 13px;
  padding-top: 4px;
  text-shadow: 0px 2px 4px #06399d;
}

.top_countdown {
  position: relative;
  height: 62px;
  margin: 6px 0 0 0;
  line-height: 50px;
}

.top_countdown_title {
  font-size: 18px;
  height: 30px;
  display: inline-block;
  color: #FFFFFF;
  line-height: 31px;
  text-shadow: 0px 2px 4px #06399d;
}

.top_countdown_title span {
  display: inline-block;
  font-weight: bold;
  font-size: 24px;
  color: #A00735;
  text-align: center;
  border-radius: 4px;
  position: relative;
  z-index: 3;
  line-height: 27px;
  height: 27px;
}

.countline-single-num {
  margin: 0 6px;
}

.countline-num {
  background: #FFFFFF;
  border: 0.5px solid rgba(255, 255, 255, 0.39);
  border-radius: 3px;
  width: 40px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  text-shadow: none;
  box-shadow: 0px 2px 4px #06399d;
  padding-right: 1px;
  padding-left: 1px;
  font-family: baidunumber-Medium;
}

.content {
  width: 90%;

  /*height: 100%;
  border: 1px solid #fff;*/
  margin: 0 auto;

  display: flex;
  justify-content: space-between;

}

.content_title img {
  height: 20px;
  margin: 30px 0 15px 0;
  text-align: center;
}

.content_scroll,
.content_schedule {
  display: inline-block;
}

.content_scroll img {
  height: 350px;
}

.content_schedule img {
  height: 600px;
  border-radius: 10px;
}

.content_integral {
  margin: 0 auto;
  padding: 0 20px;
  width: 70%;
  height: 300px;
  border-radius: 10px;
  color: #fff;
  background: rgba(6, 50, 138, 0.6);
}

.content_integral ul {
  list-style-type: none;
}

.content_integral ul li {
  line-height: 250%;
}

.team-order {
  display: inline-block;
  /* width: 9px; */
  /* font-family: baidunumber-Medium; */
  font-size: 24px;
  letter-spacing: -1.12px;
  font-weight: 900;
  text-align: left;
  color: #fe7873;
  line-height: 180%;
  vertical-align: top;
}

.vote {
  /* width: 850px; */
  width: 90%;
  margin: 0 auto;
  text-align: center;
  position: relative;

}

.content_vote_bg {
  width: 100%;
  padding: 5px;
  height: 200px;
  display: inline-block;
  border-radius: 10px;
  background: rgba(6, 50, 138, 0.6);
  vertical-align: middle;
}

.content_vote {
  display: inline-block;
  width: 100%;
  line-height: 180%;
  color: #fff;
  font-size: 20px;
}

.content_vote ul {
  list-style-type: none;

}

.content_vote ul li {
  line-height: 180%;
}

.content_vote ul li:first-child {
  width: 100px;
  text-align: left;
}



.content_vote ul li .country {
  display: inline-block;
  text-align: left;
  width: 60px;
  padding-left: 10px;
  vertical-align: top;
}

.vote_vs {
  font-size: 40px;
  font-weight: 900;
  line-height: 120%;
  padding: 0 10px;
  vertical-align: top;
}

.vs {
  font-size: 30px;
  line-height: 120%;
  padding: 0 10px;
  vertical-align: top;
}

.voted {
  display: inline-block;
  text-align: right;
}

.voted span {
  display: inline-block;
  width: 120px;
  color: gray;
  border-radius: 5px;
  background-color: gainsboro;
  text-align: center;
  font-size: 14px;
}

.content_vote ul .vote_button {
  display: inline-block;
  text-align: right;
  width: 350px;
}


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
  display: inline-block;
  padding: 0 0 0 15px;
}

.left_side {
  top: 0px;
  left: 0px;
}

.right_side {

  /* width: 80%; */
}

.match_time {
  width: 100px;
  font-size: 20px;
  text-align: center;
}

.integral_row {
  margin: 0;
  padding: 0;
}

.game_list {
  height: 50px;
}

.vs_item {
  margin: 0;
}
</style>