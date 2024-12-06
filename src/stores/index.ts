import AsyncStorage from '@react-native-async-storage/async-storage';
import {FundsValue, PlanConfig, User} from '@src/constants/Interfaces';
import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';

interface States {
  user: User;
  setUser: (user: User) => void;
  bears: number;
  increase: (by: number) => void;
  theme: string;
  setTheme: (theme: string) => void;
  isDidiao: boolean;
  setIsDidiao: (isDidiao: boolean) => void;
  carefulStocks: FundsValue[];
  setCarefulStocks: (carefulStocks: FundsValue[]) => void;
  plan: PlanConfig;
  setPlan: (plan: PlanConfig) => void;
  standardIndexes: string[];
  setStandardIndexes: (indexes: string[]) => void;
}

const useCaches = create<States>()(
  devtools(
    persist(
      set => ({
        bears: 0,
        user: null,
        setUser: user => set({user}),
        increase: by => set(state => ({bears: state.bears + by})),
        theme: '#987123',
        setTheme: theme => set({theme}),
        isDidiao: false,
        setIsDidiao: isDidiao => set({isDidiao}),
        carefulStocks: [],
        setCarefulStocks: carefulStocks => set({carefulStocks}),
        plan: {
          price: 1, // 当前价格
          reduceRate: 10, // 每月亏百分比
          monthBuy: 200 * 4 * 6, // 每个月定投金额
          months: 12, // 定投周期
          walletCouldUse: 500000, // 总资产
          count: 6, // 鸡的数量
          /** 纳斯达克 */
          /** 沪深300 电池 创业板 医疗 半导体 军工 */
        },
        setPlan: plan => set({plan}),
        // https://quote.eastmoney.com/center/gridlist.html#global_asia
        standardIndexes: [
          '100.NDX',
          '100.SPX',
          '100.N225',
          '100.TWII',
          '100.RTS',
        ],
        setStandardIndexes: standardIndexes => set({standardIndexes}),
      }),
      {
        storage: createJSONStorage(() => AsyncStorage),
        name: 'useCaches.ts',
        /** 白名单 */
        partialize: state => ({
          bears: state.bears,
          theme: state.theme,
          isDidiao: state.isDidiao,
          carefulStocks: state.carefulStocks,
          standardIndexes: state.standardIndexes,
          user: state.user,
        }),
      },
    ),
  ),
);

export {useCaches};
