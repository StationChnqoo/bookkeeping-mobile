import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import React, {useCallback, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Card from '../Card';
import {useFocusEffect} from '@react-navigation/native';
import {useQueries} from '@tanstack/react-query';
import Services from '@src/constants/Services';

interface MyProps {
  onNewStockPress: () => void;
}

const Stocks: React.FC<MyProps> = props => {
  const {onNewStockPress} = props;
  const {theme} = useCaches();
  const {carefulStocks, setCarefulStocks} = useCaches();
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return function () {
        return false;
      };
    }, []),
  );

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

  const renderUpOrDown = (n: number) => {
    return n > 0 ? '↑' : n < 0 ? '↓' : '';
  };

  const onDeletePress = (index: number, code: string, name: string) => {
    Alert.alert(code, `确认删除${name}?`, [
      {text: '取消'},
      {
        text: '确认',
        onPress: () => {
          let stocks = [...carefulStocks];
          stocks.splice(index, 1);
          setCarefulStocks([...stocks]);
        },
      },
    ]);
  };

  const onMovePress = (n: number, index: number) => {
    if (
      (n == -1 && index == 0) ||
      (n == 1 && index == carefulStocks.length - 1)
    ) {
      // 越界
    } else {
      let datas = [...carefulStocks];
      let t = datas[index];
      datas[index] = datas[index + n];
      datas[index + n] = t;
      setCarefulStocks([...datas]);
    }
  };

  return (
    <Card
      title={'我的关注'}
      moreView={
        <View style={x.Styles.rowCenter('flex-start')}>
          <TouchableOpacity
            onPress={onNewStockPress}
            activeOpacity={x.Touchable.OPACITY}>
            <Text style={{color: theme, fontSize: x.scale(14)}}>新增</Text>
          </TouchableOpacity>
          <View style={{width: 12}} />
          <TouchableOpacity
            onPress={() => {
              setOpen(!open);
            }}
            activeOpacity={x.Touchable.OPACITY}>
            <Text style={{color: theme, fontSize: x.scale(14)}}>
              {open ? '收起' : '展开'}
            </Text>
          </TouchableOpacity>
        </View>
      }>
      <View>
        {carefulStocksQuery
          .slice(0, open ? carefulStocksQuery.length : 3)
          .map((item, index) => {
            let it = item.data.data;
            let i = index;
            return it ? (
              <View key={i} style={styles.view}>
                <View style={x.Styles.rowCenter()}>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        color: '#333',
                        fontWeight: '500',
                        fontSize: x.scale(14),
                      }}>
                      {it.f58}
                    </Text>
                    <View style={{height: 4}} />
                    <View style={[x.Styles.rowCenter('space-between')]}>
                      <Text style={{fontSize: x.scale(12), color: '#666'}}>
                        股票代号: {it.f57}
                      </Text>
                      <Text
                        style={{
                          fontSize: x.scale(12),
                          color: x.Colors.STOCK(it.f170),
                        }}>
                        {`${renderUpOrDown(it.f170)}${(it.f170 / 100).toFixed(
                          2,
                        )}%`}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: 1,
                      marginHorizontal: 12,
                      backgroundColor: '#ccc',
                      height: x.scale(32),
                    }}
                  />
                  <View style={x.Styles.rowCenter()}>
                    <TouchableOpacity
                      activeOpacity={x.Touchable.OPACITY}
                      disabled={i == 0}
                      onPress={() => {
                        onMovePress(-1, i);
                      }}>
                      <Image
                        source={require('@root/assets/common/move_up.png')}
                        style={{
                          height: x.scale(18),
                          width: x.scale(18),
                          tintColor: i == 0 ? '#ccc' : theme,
                        }}
                      />
                    </TouchableOpacity>
                    <View style={{width: 12}} />
                    <TouchableOpacity
                      activeOpacity={x.Touchable.OPACITY}
                      disabled={i == carefulStocks.length - 1}
                      onPress={() => {
                        onMovePress(1, i);
                      }}>
                      <Image
                        source={require('@root/assets/common/move_down.png')}
                        style={{
                          height: x.scale(18),
                          width: x.scale(18),
                          tintColor:
                            i == carefulStocks.length - 1 ? '#ccc' : theme,
                        }}
                      />
                    </TouchableOpacity>
                    <View style={{width: 12}} />
                    <TouchableOpacity
                      activeOpacity={x.Touchable.OPACITY}
                      onPress={() => {
                        onDeletePress(i, it.f57, it.f58);
                      }}>
                      <Image
                        source={require('../../assets/delete.png')}
                        style={{
                          height: x.scale(18),
                          width: x.scale(18),
                          tintColor: theme,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : null;
          })}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    fontSize: x.scale(18),
    fontWeight: '500',
    color: '#333',
  },
});

export default Stocks;
