<template>
  <div class="common-layout">
    <div class="container">
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
                      <el-popover :visible="item.userChipInList.chipInShow.fu" placement="top" :width="180"
                        trigger="click">
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
              <div class="left_side">
                <div class="content_title"><img
                    src="https://cndevdemo.oss-cn-shanghai.aliyuncs.com/fifa/title_headlines_news.png">
                </div>
                <el-carousel :interval="4000" arrow="always" indicator-position="none">
                  <el-carousel-item v-for="pic in picList" :key="pic.$id">
                    <el-image class="scroll" :src="pic.Link" fit="cover" />
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="right_side">
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
            <div class="content_title"><img
                src="https://cndevdemo.oss-cn-shanghai.aliyuncs.com/fifa/title_schedule.png">
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
  width: 9px;
  font-family: baidunumber-Medium;
  font-size: 24px;
  letter-spacing: -1.12px;
  font-weight: 900;
  text-align: left;
  color: #fe7873;
  padding: 0 10px;
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
  font-weight: 900;
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
  padding: 0 10px;
  vertical-align: top;
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
  font-size: 22px;
  text-align: left;
}
</style>