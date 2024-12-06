import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {RealBuyFund} from '@src/constants/Interfaces';
import Services from '@src/constants/Services';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import {useQueries} from '@tanstack/react-query';
import WalletItem from '../Item';

interface MyProps {
  datas: RealBuyFund[];
  onNext: () => void;
  onPress: (rbf: RealBuyFund) => void;
}

const List: React.FC<MyProps> = props => {
  // const [step, setStep] = useState(0);
  const {onPress, datas, onNext} = props;
  const {theme, isDidiao} = useCaches();
  const [focused, setFocused] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return function () {
        setFocused(false);
      };
    }, []),
  );

  const loadConclusionItem = (name: string, value: number, unit?: string) => {
    return (
      <View style={{alignItems: 'center'}}>
        <Text
          style={[
            {color: '#333', fontSize: x.scale(16)},
            {color: x.Colors.STOCK(value)},
          ]}>
          {isDidiao ? '***' : value.toFixed(2)}
          {unit || ''}
          {value > 0 ? '↑' : value < 0 ? '↓' : ''}
        </Text>
        <View style={{height: 6}} />
        <Text style={{color: '#666', fontSize: x.scale(12)}}>{name}</Text>
      </View>
    );
  };

  const tiantianFundsQuery = useQueries({
    queries: [...datas].map(it => ({
      queryKey: ['tiantianFundsQuery', it.id],
      queryFn: () => new Services().selectTianTianFundDetail(it.id),
      enabled: focused,
      // refetchInterval: 10000,
      placeholderData: {data: null},
    })),
  });

  const newDatas = tiantianFundsQuery.map((query, index) => {
    let wallet = datas[index];
    let data = query.data?.data?.[0];
    wallet.currentPrice = data?.DWJZ;
    wallet.tiantianUpdateDate = data?.FSRQ;
    wallet.rateToday = data?.RZDF;
    return wallet;
  });

  const renderListHeader = () => {
    // console.log(`renderListHeader: ${new Date().toISOString()}`);
    let price = newDatas.reduce((count, it) => count + it.price * it.count, 0);
    let currentPrice = newDatas.reduce(
      (count, it) => count + it.currentPrice * it.count,
      0,
    );
    let incomeTotal = currentPrice - price;
    let incomeToday = newDatas.reduce(
      (count, it) => count + (it.count * it.rateToday) / 100,
      0,
    );
    let rates = ((currentPrice - price) / price) * 100;
    return (
      <View>
        <View style={{height: 12}} />
        <View style={styles.card}>
          <Text
            style={{color: '#333', fontSize: x.scale(18), fontWeight: '500'}}>
            概览
          </Text>
          <View style={{height: 12}} />
          <View style={x.Styles.rowCenter('space-between')}>
            {loadConclusionItem('当前持仓', currentPrice)}
            {loadConclusionItem('当日盈亏', incomeToday)}
            {loadConclusionItem('持仓盈亏', incomeTotal)}
            {loadConclusionItem('总收益率', rates, '%')}
            {/* {loadConclusionItem('骚操作次数', calcCount())} */}
          </View>
        </View>
        <View style={{height: 12}} />
      </View>
    );
  };

  return (
    <FlatList
      data={newDatas}
      bounces={false}
      bouncesZoom={true}
      initialNumToRender={10}
      ListHeaderComponent={renderListHeader}
      renderItem={info => <WalletItem info={info} onPress={onPress} />}
      ItemSeparatorComponent={() => <View style={{height: 12}} />}
      keyExtractor={(item, index) => `${item.id}: ${index}`}
      ListFooterComponent={() => <View style={{height: 12}} />}
      onEndReached={onNext}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  name: {
    color: '#333',
    fontSize: x.scale(14),
  },
  value: {
    color: '#666',
    fontSize: x.scale(14),
  },
});

export default List;
