import ToolBar from '@src/components/ToolBar';

import {RouteProp} from '@react-navigation/native';
import {StandardIndexes} from '@src/constants';
import {OtherCountryStock} from '@src/constants/Interfaces';
import Services from '@src/constants/Services';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksParams, RootStacksProp} from '..';

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'GlobalIndexes'>;
}

const GlobalIndexes: React.FC<MyProps> = props => {
  const {navigation, route} = props;
  const {theme, standardIndexes, setStandardIndexes} = useCaches();
  const [datas, setDatas] = useState<any>(Object.assign({}));
  const [key, setKey] = useState('');
  // useFocusEffect(useCallback(() => {}, [sound]));

  const otherCountryStocksQuery = useQuery({
    enabled: true,
    queryKey: ['otherCountryStocksQuery', key],
    queryFn: () =>
      new Services().selectOtherCountryStocks(
        datas[key].value.map(it => it.value),
      ),
    placeholderData: {data: {diff: []}},
  });

  useEffect(() => {
    setDatas(JSON.parse(JSON.stringify(StandardIndexes)));
    setKey(Object.keys(StandardIndexes)[0]);
    return function () {};
  }, []);

  const renderUpOrDown = (n: number) => (n > 0 ? '↑' : n < 0 ? '↓' : '');

  return (
    <View style={{flex: 1}}>
      <ToolBar
        title={'全球指数'}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{height: 1, backgroundColor: '#eee'}} />
      <View style={styles.view}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{width: x.scale(108), justifyContent: 'flex-start'}}>
            {Object.keys(datas).map((it, i) => {
              let indexes = datas[it].value.filter((si: any) =>
                standardIndexes.includes(si.value),
              );
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    setKey(it);
                  }}
                  style={[
                    x.Styles.rowCenter('center'),
                    {
                      height: x.scale(36),
                      backgroundColor: key == it ? '#fff' : '#f5f5f5',
                    },
                  ]}
                  activeOpacity={x.Touchable.OPACITY}>
                  <Text
                    style={{
                      fontSize: x.scale(14),
                      color: key == it ? theme : '#666',
                    }}>
                    {datas[it].name}
                    {indexes.length == 0 ? '' : `（${indexes.length}）`}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{width: 1, height: '100%', backgroundColor: '#eee'}} />
          <ScrollView>
            <View style={styles.indexes}>
              {key &&
                (
                  otherCountryStocksQuery.data.data.diff as OtherCountryStock[]
                ).map((it, i) => {
                  let thisKey = `${it.f13}.${it.f12}`;
                  let checked = standardIndexes.some(si => si == thisKey);
                  // console.log(it);
                  return (
                    <TouchableOpacity
                      key={i}
                      activeOpacity={x.Touchable.OPACITY}
                      style={[
                        styles.index,
                        {borderColor: checked ? theme : '#ccc'},
                      ]}
                      onPress={() => {
                        let _datas = [...standardIndexes];
                        let index = _datas.findIndex(si => si == thisKey);
                        if (index >= 0) {
                          _datas.splice(index, 1);
                        } else {
                          _datas.push(thisKey);
                        }
                        setStandardIndexes([..._datas]);
                      }}>
                      <Text
                        style={{
                          fontSize: x.scale(14),
                          color: checked ? theme : '#666',
                          flex: 1,
                        }}
                        numberOfLines={1}>
                        {/* {it.f13}.{it.f12}.{it.f14} */}
                        {it.f14}
                      </Text>
                      <View style={{width: 4}} />
                      <View style={x.Styles.rowCenter('flex-start')}>
                        <Text style={{color: '#999'}}>
                          {(it.f2 / 100).toFixed(2)}
                        </Text>
                      </View>
                      <Text style={{color: '#999'}}> | </Text>
                      <Text style={{color: x.Colors.STOCK(it.f3)}}>
                        {(it.f3 / 100).toFixed(2)}%{renderUpOrDown(it.f3)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={{height: useSafeAreaInsets().bottom}} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  index: {
    height: x.scale(32),
    paddingHorizontal: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 6,
  },
  indexes: {
    // alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
});

export default GlobalIndexes;