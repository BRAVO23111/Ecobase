// atoms/dashboardDataAtom.js
import { atom } from 'recoil';

export const dashboardDataAtom = atom({
  key: 'dashboardDataAtom',
  default: {
    actions: [],
    actionSummary: {}
  }
});
