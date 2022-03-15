import { atom } from "recoil";

const defaultState = {
  data: [],
  message: "",
  state: "",
  loading: false,
};

export const stateMien = atom({
  key: "STATE-MIEN",
  default: {
    ...defaultState,
  },
});

export const stateKhuVuc = atom({
  key: "STATE-KHU-VUC",
  default: {
    ...defaultState,
  },
});
