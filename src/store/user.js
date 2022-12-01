import {
  GetLeftScore,
  GetChipInList,
  GetMatchList,
} from "@/services/kintoneApi";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      myScore: 0,
      chipInList: [],
    };
  },

  getters: {},

  actions: {
    async init() {
      const initLeftScorePromise = this.getLeftScore();
      const initChipInListPromise = this.getChipInList();
      return Promise.all([initLeftScorePromise, initChipInListPromise]);
    },

    async getLeftScore() {
      this.myScore = await GetLeftScore();
    },

    async getChipInList() {
      const chipInList = await GetChipInList();
      const matches = await GetMatchList();
      const matchMapping = {};
      for (const item of matches) {
        matchMapping[item.Match_id] = {
          FlagA: item.FlagA,
          FlagB: item.FlagB,
          TeamA_name: item.TeamA_name,
          TeamB_name: item.TeamB_name,
        };
      }
      chipInList.map((chip) => {
        chip.teamInfo = matchMapping[chip.Match_id];
        return chip;
      });
      this.chipInList = chipInList;
    },
  },
});
