import ZDView from '@src/components/ZdView';
import {FundsRank} from '@src/constants/Interfaces';
import x from '@src/constants/x';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface MyProps {
  diff: FundsRank[];
}

const FundRanks: React.FC<MyProps> = props => {
  const {diff} = props;
  const [datas, setDatas] = useState<FundsRank[]>([]);

  useEffect(() => {
    setDatas([...diff].sort((a, b) => b.f3 - a.f3));
    return function () {};
  }, [diff]);

  const myColor = (n: number) => {
    let color = n > 0 ? x.Color.RED : n < 0 ? x.Color.GREEN : '#999';
    return color;
  };
  /**
   *
   * @param index
   * @param items
   */
  const loadGroup = (index: number, items: FundsRank[]) => {
    return (
      <View style={styles.viewGroup}>
        <Text style={styles.textGroupTitle}>{['涨', '跌'][index]}幅排行榜</Text>
        <View style={{height: 6}} />
        {items.map((it, index) => (
          <ZDView key={index} style={styles.viewItem} value={it.f3}>
            <Text
              style={[{color: myColor(it.f3)}, styles.textItemName]}
              numberOfLines={1}>{`${index + 1}. ${it.f14}`}</Text>
            <Text style={{color: myColor(it.f3)}}>{`${it.f3.toFixed(
              2,
            )}%`}</Text>
          </ZDView>
        ))}
      </View>
    );
  };

  return datas.length > 0 ? (
    <View style={styles.view}>
      <View style={{flexDirection: 'row'}}>
        {loadGroup(0, datas.slice(0, 10))}
        <View style={{width: 16}} />
        {loadGroup(1, datas.slice(-10).reverse())}
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  view: {
    // backgroundColor: 'white',
    borderRadius: 8,
  },
  viewGroup: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 6,
  },
  textGroupTitle: {
    fontSize: x.scale(16),
    fontWeight: '500',
    color: '#333',
    paddingHorizontal: 12,
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
    marginVertical: 2,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  textItemName: {
    fontSize: x.scale(14),
    flex: 1,
  },
});

export default FundRanks;
