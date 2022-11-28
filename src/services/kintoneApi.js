import { KintoneRestAPIClient } from "@kintone/rest-api-client";
import {
  appList,
  matchInfoField,
  usersField,
  userChipInField,
  scoreField,
} from "@/config";

const client = new KintoneRestAPIClient();

//获取用户已经生效的总积分
export const GetEffectiveSocre = async () => {
  const app = appList.users;
  try {
    const params = {
      app,
      query: `${usersField.User} in (LOGINUSER())`,
    };
    const resp = await client.record.getRecords(params);
    if (resp.records.length > 0) {
      return Number(resp.records[0][usersField.Score].value);
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

//获取未开奖记录（冻结的积分）
export const GetFreezeScore = async () => {
  const app = appList.userChipIn;
  try {
    const params = {
      app,
      query: `${userChipInField.Create_user} in (LOGINUSER()) and ${userChipInField.Score_result} =0`,
    };
    const resp = await client.record.getRecords(params);
    if (resp.records.length > 0) {
      let freezeScore = 0;
      for (let value of resp.records) {
        freezeScore += Number(value[userChipInField.Chip_in_score].value);
      }
      return freezeScore;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

//获取用户当前可使用积分（总积分-未生效投注历史即积分结果为0的记录）
export const GetLeftScore = async () => {
  const effectiveSocre = await GetEffectiveSocre();
  const freezeScore = await GetFreezeScore();
  const leftScore = effectiveSocre - freezeScore;
  return leftScore;
};

//获取用户积分履历（已经生效）
export const GetEffectiveScoreList = async () => {
  const app = appList.score;
  try {
    const params = {
      app,
      query: `${scoreField.User} in (LOGINUSER())`,
    };
    const resp = await client.record.getRecords(params);
    if (resp.records.length > 0) {
      return resp.records;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

//获取用户冻结的积分履历
export const GetFreezeScoreList = async () => {
  const app = appList.score;
  try {
    const params = {
      app,
      query: `${scoreField.User} in (LOGINUSER())`,
    };
    const resp = await client.record.getRecords(params);
    if (resp.records.length > 0) {
      return resp.records;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

//获取指定场次赔率等信息
export const GetMatchInfo = async (matchId) => {
  const app = appList.matchInfo;
  try {
    const params = {
      app,
      query: `${matchInfoField.Match_id} = ${matchId}`,
    };
    const resp = await client.record.getRecords(params);
    if (resp.records.length > 0) {
      return resp.records[0];
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

//用户进行下注 需要先判断用户可使用的积分
export const UserChipIn = async (params) => {
  const { chipInScore, matchId, ChipInType } = params;
  const app = appList.userChipIn;
  const addInfo = {
    app,
    record: {
      [userChipInField.Match_id]: {
        value: matchId,
      },
      [userChipInField.Chip_in_score]: {
        value: chipInScore,
      },
      [userChipInField.Chip_in_type]: {
        value: ChipInType,
      },
    },
  };
  const leftScore = await GetLeftScore();
  if (leftScore - Number(chipInScore) >= 0) {
    return client.record.addRecord(addInfo);
  } else {
    return false;
  }
};

//获取比赛列表
export const GetMatchList = async () => {
  const app = appList.matchInfo;
  try {
    const params = {
      app,
    };
    const resp = await client.record.getRecords(params);
    if (resp.records.length > 0) {
      return resp.records;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};
