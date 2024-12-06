import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {PlanBuy} from '@src/constants/Interfaces';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from '..';
import EditPlanModal from './components/EditPlanModal';

interface MyProps {
  navigation?: RootStacksProp;
}

const PlanScreen: React.FC<MyProps> = props => {
  const {plan, setPlan} = useCaches();
  const [isShowEditConfigModal, setIsShowEditConfigModal] = useState(false);
  const [datas, setDatas] = useState<PlanBuy[]>([]);
  const [currentKey, setCurrentKey] = useState<string>('');

  useEffect(() => {
    let _datas: PlanBuy[] = [];
    for (let i = 0; i < plan.months; i++) {
      let currentPrice = plan.price * Math.pow(1 - plan.reduceRate / 100, i);
      let money = plan.monthBuy * Math.pow(2, i);
      _datas.push({
        id: i + 1,
        currentPrice,
        count: money / currentPrice,
        money,
      });
      setDatas(_datas);
    }
    return function () {};
  }, [plan]);

  const calcCount = (key: keyof PlanBuy, index: number) => {
    let result = 0;
    for (let i = 0; i <= index; i++) {
      result += datas[i][key];
    }
    // console.log('calcCount: ', {key, result});
    return result;
  };

  const renderItem = (info: ListRenderItemInfo<PlanBuy>) => {
    const {item, index} = info;
    return (
      <View style={styles.card}>
        <View style={x.Styles.rowCenter('space-between')}>
          <Text
            style={{fontSize: x.scale(16), color: '#333', fontWeight: '500'}}>
            No. {item.id}
          </Text>
          <Text style={{color: '#333', fontSize: x.scale(14)}}>
            {((calcCount('money', index) / plan.walletCouldUse) * 100).toFixed(
              2,
            )}
            %
          </Text>
        </View>
        <View style={{height: 4}} />
        <View style={x.Styles.rowCenter('space-between')}>
          <Text style={styles.name}>本期</Text>
          <Text style={styles.value}>{`${item.money.toFixed(0)}元 Mo. | ${(
            item.money /
            plan.count /
            4
          ).toFixed(0)}元 Wk.`}</Text>
        </View>
        <View style={{height: 4}} />
        <View style={x.Styles.rowCenter('space-between')}>
          <Text style={styles.name}>成本</Text>
          <View style={x.Styles.rowCenter()}>
            <Text style={[styles.value]}>{item.currentPrice.toFixed(2)}元</Text>
            <Text style={{color: '#999'}}> | </Text>
            <Text style={[styles.value]}>
              {(calcCount('money', index) / calcCount('count', index)).toFixed(
                2,
              )}
              元
            </Text>
          </View>
        </View>
        <View style={{height: 4}} />
        <View style={x.Styles.rowCenter('space-between')}>
          <Text style={styles.name}>持仓</Text>
          <View style={x.Styles.rowCenter()}>
            <Text style={[styles.value]}>
              {calcCount('money', index).toFixed(2)}元
            </Text>
            <Text style={{color: '#999'}}> | </Text>
            <Text style={[styles.value]}>
              {calcCount('count', index).toFixed(2)}份
            </Text>
          </View>
        </View>
        <View style={{height: 4}} />
        <View style={x.Styles.rowCenter('space-between')}>
          <Text style={styles.name}>亏损（理论/实际）</Text>
          <View style={x.Styles.rowCenter()}>
            <Text style={[styles.value, {color: x.Color.GREEN}]}>
              {(((item.currentPrice - plan.price) / plan.price) * 100).toFixed(
                2,
              )}
              %
            </Text>
            <Text style={{color: '#999'}}> | </Text>
            <Text style={[styles.value, {color: x.Color.RED}]}>
              {(
                (item.currentPrice -
                  calcCount('money', index) / calcCount('count', index)) *
                100
              ).toFixed(2)}
              %
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderListHeader = () => {
    return (
      <View style={[styles.card, {marginVertical: 12}]}>
        <Text style={{fontSize: x.scale(16), color: '#333', fontWeight: '500'}}>
          默认配置
        </Text>
        {Object.keys(plan).map((it, i) => (
          <View
            key={i}
            style={[{marginTop: 4}, x.Styles.rowCenter('space-between')]}>
            <Text style={[styles.name, {fontSize: x.scale(16)}]}>
              {it.toUpperCase()}
            </Text>
            <TouchableOpacity
              style={x.Styles.rowCenter()}
              onPress={() => {
                setCurrentKey(it);
                setIsShowEditConfigModal(true);
              }}
              activeOpacity={x.Touchable.OPACITY}>
              <Text style={styles.value}>{plan[it]}</Text>
              <View style={{width: 4}} />
              <Image
                source={require('@root/assets/common/arrow_right.png')}
                style={{
                  height: x.scale(14),
                  width: x.scale(14),
                  tintColor: '#666',
                }}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: x.Color.PAGE}}>
      <View
        style={{height: useSafeAreaInsets().top, backgroundColor: 'white'}}
      />
      <FlatList
        data={datas}
        bounces={false}
        bouncesZoom={true}
        initialNumToRender={10}
        ListHeaderComponent={renderListHeader}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{height: 12}} />}
        keyExtractor={(item, index) => `${item.id}: ${index}`}
        ListFooterComponent={() => <View style={{height: 12}} />}
      />
      <EditPlanModal
        show={isShowEditConfigModal}
        editKey={currentKey}
        editValue={plan?.[currentKey]}
        onClose={() => {
          setIsShowEditConfigModal(false);
        }}
        onHide={() => {}}
        onConfirm={value => {
          let _config = {...plan};
          _config[currentKey] = value;
          setPlan({..._config});
          setIsShowEditConfigModal(false);
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
    position: 'relative',
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

export default PlanScreen;
