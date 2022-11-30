import { GetLeftScore } from "@/services/kintoneApi";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      myScore: 0,
    };
  },

  getters: {},

  actions: {
    async getLeftScore() {
      GetLeftScore().then((resp) => {
        this.myScore = resp;
      });
    },
  },
});
