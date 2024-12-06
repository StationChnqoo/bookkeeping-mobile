import {RootStacksProp} from '@src/screens';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface MyProps {
  navigation?: RootStacksProp;
}

const buildPoint = (index: number, area: String, distance: number) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View
        style={[
          styles.viewCircle,
          {backgroundColor: ['green', 'orange'][index]},
        ]}
      />
      <View style={{width: 8}} />
      <Text style={styles.textPoint}>{area}</Text>
      <View style={{width: 6}} />
      <Text style={{color: '#999', fontSize: 14}}>{distance}KM</Text>
    </View>
  );
};

const MarketItem: React.FC<MyProps> = props => {
  return (
    <View style={styles.views}>
      <Text style={styles.textTime}>7月25日 05:30~6:30</Text>
      <View style={{height: 12}} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          {buildPoint(0, '深圳市 · 福田保税区市花路', 12.3)}
          <View style={{height: 8}} />
          {buildPoint(1, '深圳市 · 龙岗区坂雪岗大道', 23.4)}
        </View>
        <View style={{width: 24}} />
        <View style={{alignItems: 'baseline', flexDirection: 'row'}}>
          <Text style={styles.textPrice}>199.8</Text>
          <View style={{width: 4}} />
          <Text style={styles.textYuan}>元</Text>
        </View>
      </View>
      <View style={styles.note}>
        <Text style={{}}></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  views: {
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 15,
    marginTop: 15,
  },
  textTime: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  textPrice: {
    fontSize: 20,
    color: '#333',
    fontFamily: 'Dosis',
  },
  viewCircle: {
    height: 8,
    width: 8,
    borderRadius: 4,
  },
  textPoint: {
    fontSize: 14,
    color: '#333',
    // flex: 1,
  },
  textYuan: {
    fontSize: 10,
    color: '#333',
    // flex: 1,
  },
  viewNote: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  textNote: {},
});

export default MarketItem;
