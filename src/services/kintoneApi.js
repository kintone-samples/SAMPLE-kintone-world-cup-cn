import { KintoneRestAPIClient } from "@kintone/rest-api-client";
import {
  appList,
  matchInfoField,
  usersField,
  userChipInField,
  picField,
} from "@/config";
import { DateTime } from "luxon";

const client = new KintoneRestAPIClient();

const dataConvert = (record) => {
  Object.keys(record).forEach((key) => {
    record[key] = record[key].value;
  });
  return record;
};

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

//获取登陆用户的投注记录
export const GetChipInList = async () => {
  const app = appList.userChipIn;
  try {
    const params = {
      app,
      query: `${userChipInField.Create_user} in (LOGINUSER())`,
    };
    const resp = await client.record.getRecords(params);
    if (resp.records.length > 0) {
      return resp.records.map((record) => {
        return dataConvert(record);
      });
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
  }
};

//获取首页显示的投注信息（包含允许显示的投注信息及该场次用户的投注信息）
export const GetHomeChipList = async () => {
  const app = appList.matchInfo;
  const chipInapp = appList.userChipIn;
  const params = {
    app,
    query: `${matchInfoField.Show} in ("show")`,
  };
  const { records } = await client.record.getRecords(params);
  const newRecords = records.map((record) => {
    return dataConvert(record);
  });

  const localString = DateTime.local().toUnixInteger();

  for (const record of newRecords) {
    const matchId = record[matchInfoField.Match_id];
    const deadLineString = DateTime.fromISO(
      record[matchInfoField.Deadline]
    ).toUnixInteger();
    if (localString > deadLineString) {
      record.isExpire = true;
    }
    record[matchInfoField.Match_start_time] = DateTime.fromISO(
      record[matchInfoField.Match_start_time]
    ).toFormat("MM-dd HH:mm");
    //获取该场次登陆用户的投注信息

    const params = {
      app: chipInapp,
      query: `${userChipInField.Create_user} in (LOGINUSER()) and ${userChipInField.Match_id} = ${matchId} limit 1`,
    };
    const resp = await client.record.getRecords(params);
    let userChipInList = {
      chipInScore: "",
      chipInType: "",
      chipInShow: { win: false, fu: false, ping: false },
    };
    if (resp.records.length > 0) {
      const temp = resp.records.map((record) => {
        return dataConvert(record);
      });
      // console.log(temp[0]);
      userChipInList.chipInScore = temp[0][userChipInField.Chip_in_score];
      userChipInList.chipInType = temp[0][userChipInField.Chip_in_type];
    }
    record.userChipInList = userChipInList;
  }
  // console.log(records);
  return records;
};

//获取用户当前可使用积分（总积分-未生效投注历史即积分结果为0的记录）
export const GetLeftScore = async () => {
  const effectiveSocre = await GetEffectiveSocre();
  const freezeScore = await GetFreezeScore();
  const leftScore = effectiveSocre - freezeScore;
  return leftScore;
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

//获取轮博图
export const GetPicList = async () => {
  const app = appList.pic;
  try {
    const params = {
      app,
      query: `${picField.Show} in ("show") order by ${picField.Sort}  asc limit 5`,
    };
    const resp = await client.record.getRecords(params);
    if (resp.records.length > 0) {
      return resp.records.map((record) => {
        return dataConvert(record);
      });
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

//获取比分
export const GetGameList = async () => {
  const app = appList.matchInfo;
  try {
    const params = {
      app,
      // query: `limit 4`,
      query: `${matchInfoField.ScoreA} !="" order by ${matchInfoField.Match_start_time} desc`,
    };
    // console.log(params);
    const resp = await client.record.getRecords(params);
    if (resp.records.length > 0) {
      return resp.records.map((record) => {
        return dataConvert(record);
      });
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
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
      return resp.records.map((record) => {
        return dataConvert(record);
      });
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};
