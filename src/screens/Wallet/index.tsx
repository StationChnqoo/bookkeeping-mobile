import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {RealBuyFund} from '@src/constants/Interfaces';
import Services from '@src/constants/Services';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from '..';
import List from './components/List';

interface MyProps {
  navigation?: RootStacksProp;
  datas: RealBuyFund[];
}

const WalletScreen: React.FC<MyProps> = props => {
  // const [step, setStep] = useState(0);
  const {navigation, datas} = props;
  const {theme, isDidiao, user} = useCaches();
  const [focused, setFocused] = useState(false);
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);

  const planQuery = useQuery({
    enabled: focused && (user?.token ? true : false),
    queryKey: ['planQuery', page, user?.token, page],
    queryFn: () => new Services().selectPlans(page),
    refetchInterval: 10000,
    placeholderData: keepPreviousData,
  });

  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return function () {
        setFocused(false);
      };
    }, []),
  );

  useEffect(() => {
    if (user?.token && focused) {
      planQuery.refetch();
    }
    return function () {};
  }, [user?.token, focused]);

  return (
    <View style={{flex: 1, backgroundColor: x.Color.PAGE}}>
      <View
        style={{height: useSafeAreaInsets().top, backgroundColor: 'white'}}
      />
      <List
        datas={planQuery.data?.data?.datas || []}
        onNext={() => setPage(t => t + 1)}
        onPress={rbf => {
          navigation.navigate('Webviewer', {
            url: x.Links.fundDetail(rbf.id),
            title: rbf.title,
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  tabs: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
});

export default WalletScreen;
