import {FundsValue} from '@src/constants/Interfaces';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import React from 'react';
import {processColor, StyleSheet, Text, View} from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';

interface MyProps {
  title: string;
  datas: number[];
  fund: FundsValue;
}

const MyChart: React.FC<MyProps> = props => {
  const {title, datas, fund} = props;
  // console.log('MyChart datas.length: ', datas.length);
  const {theme} = useCaches();

  const myColor = (n: number) => {
    let color = n > 0 ? x.Color.RED : n < 0 ? x.Color.GREEN : '#999';
    return color;
  };

  const y = {
    right: {
      enabled: false,
    },
    left: {
      enabled: true,
      drawGridLines: false,
      gridLineWidth: 1,
      drawAxisLine: false,
      drawLabels: true,
      labelCountForce: true,
      yOffset: 0,
      labelCount: 6,
      position: 'OUTSIDE_CHART',
      textSize: x.scale(10),
    },
  };
  const xAlias = {
    enabled: false,
    drawAxisLine: true,
    drawGridLines: true,
    position: 'BOTTOM',
    labelCount: 6,
    // valueFormatter: [],
    // axisMinimum: -1,
    // axisMaximum: 7,
    avoidFirstLastClipping: true,
  };

  const fillRxtraDots = (array: number[], filledNumber: number) => {
    const result = new Array(240).fill(null);
    result.splice(0, array.length, ...array);
    return result;
  };

  return datas.length > 0 ? (
    <View style={{width: (x.WIDTH - 48) / 2 - 12}}>
      <View style={styles.view}>
        <Text style={{fontSize: x.scale(14), color: '#333', fontWeight: '500'}}>
          {title}
        </Text>
        <Text style={{color: myColor(fund?.f170 || 0), fontSize: x.scale(12)}}>
          {((fund?.f170 || 0) / 100).toFixed(2)}%
        </Text>
      </View>
      <View
        style={{
          height: x.scale(88),
          flex: 1,
        }}>
        <LineChart
          style={{flex: 1, margin: 0, padding: 0}}
          yAxis={y}
          xAxis={xAlias}
          legend={{enabled: false}} // 隐藏颜色块的标记
          chartDescription={{text: `${((fund?.f43 || 0) / 100).toFixed(2)}`}}
          scaleEnabled={false}
          data={{
            dataSets: [
              {
                values: fillRxtraDots(datas, datas[0]),
                label: '',
                config: {
                  lineWidth: 1,
                  drawCircles: false,
                  drawValues: false,
                  drawLabel: true,
                  drawFilled: false, // 取消颜色块
                  color: processColor(theme),
                },
              },
            ],
          }}
        />
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default MyChart;
