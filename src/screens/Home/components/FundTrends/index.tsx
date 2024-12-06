import * as Types from '@src/constants/Interfaces';
import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MyChart from './components/MyChart';

interface MyProps {
  datas: number[][];
  values: Types.FundsValue[];
}

const FundTrends: React.FC<MyProps> = props => {
  const {datas, values} = props;
  const titles = ['沪深300', '创业板指', '上证指数', '深证300'];

  const isNotTrading = () => {
    let now = moment();
    let start = moment().set({hour: 8, minute: 59, second: 59});
    let end = moment().set({hour: 9, minute: 31, second: 0});
    return now.isBetween(start, end);
  };

  return (
    <View style={styles.view}>
      {datas.length > 0 && !isNotTrading() ? (
        <View style={styles.viewCharts}>
          {Array.from({length: 4}, (_, i) => (
            <MyChart
              key={i}
              title={titles[i]}
              datas={datas[i]}
              fund={values?.[i]}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    // height: Dimensions.get('screen').width / 3,
  },
  viewCharts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default FundTrends;
