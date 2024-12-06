import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import Services from '@src/constants/Services';
import {useCaches} from '@src/stores';
import {useQueries, useQuery} from '@tanstack/react-query';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from '..';
import CarefulStocks from './components/CarefulStocks';
import ETF from './components/ETF';
import FundCounts from './components/FundCounts';
import FundRanks from './components/FundRanks';
import FundValues from './components/FundValues';
import SuggestTips from './components/SuggestTips';
import x from '@src/constants/x';
import GoldStock from './components/GoldStock';
import {StockIndexes} from '@src/constants';

interface MyProps {
  navigation?: RootStacksProp;
}

const HomeScreen: React.FC<MyProps> = props => {
  const {navigation} = props;
  const {carefulStocks, setCarefulStocks, standardIndexes} = useCaches();
  const [trends, setTrends] = useState<number[][]>(Array(4).fill([]));
  const [focused, setFocused] = useState(false);

  const fundRanksQuery = useQuery({
    enabled: focused,
    queryKey: ['fundRanksQuery'],
    queryFn: () => new Services().selectDfcfFundRanks(),
    refetchInterval: 10000,
    placeholderData: {data: {diff: []}},
  });

  const fundTrendsQuery = useQueries({
    queries: [...StockIndexes].map(it => ({
      queryKey: ['fundTrendsQuery', it],
      queryFn: () =>
        new Services().selectDfcfFundTrends(`${it.f107}.${it.f57}`),
      enabled: focused,
      refetchInterval: 10000,
      placeholderData: {data: {trends: []}},
    })),
  });

  const countsQuery = useQuery({
    enabled: focused,
    queryKey: ['countsQuery'],
    queryFn: () => new Services().selectDfcfFundCounts(),
    refetchInterval: 10000,
  });

  const fundValuesQuery = useQueries({
    queries: [...StockIndexes].map(it => ({
      queryKey: ['fundValuesQuery', `${it.f107}.${it.f57}`],
      queryFn: () =>
        new Services().selectDfcfFundValues(`${it.f107}.${it.f57}`),
      enabled: focused,
      refetchInterval: 10000,
      placeholderData: {data: null},
    })),
  });

  const carefulStocksQuery = useQueries({
    queries: carefulStocks.map(it => ({
      queryKey: ['carefulStocksQuery', `${it.f107}.${it.f57}`],
      queryFn: () =>
        new Services().selectDfcfFundValues(`${it.f107}.${it.f57}`),
      enabled: focused,
      refetchInterval: 10000,
      placeholderData: {data: null},
    })),
  });

  const otherCountryStocksQuery = useQuery({
    enabled: focused,
    queryKey: ['otherCountryStocksQuery'],
    queryFn: () => new Services().selectOtherCountryStocks(standardIndexes),
    refetchInterval: 10000,
    placeholderData: {data: {diff: []}},
  });

  const queryGold = useQuery({
    enabled: focused,
    queryKey: ['queryGold'],
    queryFn: () => new Services().selectDfcfFundValues('118.AU9999'),
    refetchInterval: 10000,
    placeholderData: {
      data: {
        f43: 0, // 净值
        f57: '--', // 英文
        f58: '--', // 中文
        f169: 0, // 涨跌额
        f170: 0, // 涨跌幅
      },
    },
  });

  const etfQuery = useQueries({
    queries: [
      '0.159649', // 国开债ETF
      '0.159972', // 5年地债ETF
      '1.511010', // 国债ETF
      '1.511020', // 活跃国债ETF
      '1.511030', // 公司债ETF
      '1.511060', // 5年地方债ETF
      '1.511090', // 30年国债ETF
      '1.511100', // 基准国债ETF
      '1.511220', // 城投债ETF
      '1.511260', // 十年国债ETF
      '1.511270', // 十年地方债ETF
      '1.511130', // 30年国债指数ETF
    ].map(it => ({
      queryKey: ['etfQuery', it],
      queryFn: () => new Services().selectEtfDetail(it),
      enabled: focused,
      refetchInterval: 10000,
      placeholderData: {data: {datas: []}},
    })),
  });

  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      // console.log(`SHA256: ${SHA256('666666')}`);
      return function () {
        setFocused(false);
      };
    }, []),
  );

  const loadFundTrends = async () => {
    let codes = ['1.000300', '0.399006', '1.000001', '0.399007'];
    let _datas = [...trends];
    for (let i = 0; i < codes.length; i++) {
      let result = await new Services().selectDfcfFundTrends(codes[i]);
      let datas: string[] = result.data?.trends || [];
      let _trends = [...datas].map(it => {
        let s = it.split(',');
        return parseFloat(s[1]);
      });
      _datas[i] = _trends;
      setTrends(_datas);
    }
  };

  const toStockDetail = (code: string) => {
    navigation.navigate('Webviewer', {
      url: x.Links.dfcfStockDetail(code),
      title: code,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f0f0f0', position: 'relative'}}>
      <View
        style={{height: useSafeAreaInsets().top, backgroundColor: '#fff'}}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" bounces={false}>
        <View style={{paddingHorizontal: 15}}>
          <View style={{height: 12}} />
          {[
            <FundCounts diff={countsQuery.data?.data?.diff || []} />,
            <GoldStock data={queryGold.data?.data} />,
            <ETF datas={etfQuery.map(it => it.data?.data)} />,
            <CarefulStocks
              datas={carefulStocksQuery.map(it => it.data?.data)}
              onPress={fd => toStockDetail(`${fd.f107}.${fd.f57}`)}
            />,
            // <FundTrends
            //   trends={trends}
            //   values={fundsValuesQuery.map(it => it.data.data)}
            // />,
            <FundValues
              datas={fundValuesQuery.map(it => it.data?.data)}
              otherCountryDatas={otherCountryStocksQuery.data?.data?.diff || []}
              onPress={fd => toStockDetail(`${fd.f107}.${fd.f57}`)}
            />,
            <FundRanks diff={fundRanksQuery.data?.data?.diff || []} />,
            <SuggestTips onClosePress={() => {}} />,
          ].map((it, i) => (
            <View key={i} style={{marginBottom: 12}}>
              {it}
            </View>
          ))}
        </View>
      </ScrollView>
      {/* <View style={styles.seconds}>
        <Text style={styles.textSeconds}>{`下一轮刷新 ${
          SECONDS - seconds
        }秒`}</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  seconds: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 4,
    right: 4,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  textSeconds: {
    fontSize: 12,
    color: 'white',
  },
});

export default HomeScreen;
