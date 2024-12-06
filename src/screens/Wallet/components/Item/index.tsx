import {RealBuyFund} from '@src/constants/Interfaces';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import moment from 'moment';
import {useState} from 'react';
import {
  Alert,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface MyProps {
  info: ListRenderItemInfo<RealBuyFund>;
  onPress: (rbf: RealBuyFund) => void;
}

const WalletItem = (props: MyProps) => {
  const {onPress} = props;
  const {item, index} = props.info;
  // console.log('WalletItem: ', item);
  const color = ['#666', x.Color.RED, x.Color.GREEN][item.status + 1];
  const [isShowMore, setIsShowMore] = useState(false);
  const {isDidiao, theme} = useCaches();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={x.Touchable.OPACITY}
      onPress={() => {
        onPress(item);
      }}>
      <View style={x.Styles.rowCenter('space-between')}>
        <View style={[styles.tag, {borderColor: color}]}>
          <Text style={{fontSize: x.scale(12), color}}>
            {['已停止', '已暂停', '进行中'][item.status + 1]}
          </Text>
        </View>
        <View style={{width: 12}} />
        <Text
          style={{
            fontSize: x.scale(16),
            color: '#666',
            flex: 1,
          }}
          numberOfLines={1}>
          {`${isDidiao ? x.Strings.mask(item.id, 2) : item.id}`}
        </Text>
        <TouchableOpacity
          style={x.Styles.rowCenter('flex-start')}
          activeOpacity={x.Touchable.OPACITY}
          hitSlop={x.Touchable.hitlop()}
          onPress={() => {
            if (item.records.length == 0) {
              Alert.alert('提示 ', '当前持仓还没有记录 ~', [
                {onPress: () => {}, isPreferred: true, text: '确定'},
              ]);
            } else {
              setIsShowMore(!isShowMore);
            }
          }}>
          <Text
            style={{
              color: x.Colors.STOCK(item.rateToday),
              fontSize: x.scale(16),
            }}>
            {(item?.rateToday || 0).toFixed(2)}%
          </Text>
          <View style={{width: 4}} />
          <Image
            source={
              isShowMore
                ? require('@root/assets/common/arrow_up.png')
                : require('@root/assets/common/arrow_right.png')
            }
            style={{height: x.scale(14), width: x.scale(14), tintColor: '#999'}}
          />
        </TouchableOpacity>
      </View>
      <View style={{height: 10}} />
      <View style={x.Styles.rowCenter()}>
        <Text
          style={{
            fontSize: x.scale(16),
            color: '#333',
            fontWeight: '500',
            flex: 1,
          }}
          numberOfLines={1}>
          {isDidiao ? x.Strings.mask(item.title, 3, ' **** ') : item.title}
        </Text>
        <Text style={{color: '#333', fontSize: x.scale(16)}}>
          {isDidiao ? '***' : (item.currentPrice * item.count).toFixed(2)}
        </Text>
      </View>
      <View style={{height: 10}} />
      <View style={x.Styles.rowCenter('space-between')}>
        <View style={x.Styles.rowCenter('flex-start')}>
          <Text style={{color: '#666', fontSize: x.scale(14)}}>
            持仓信息：<Text style={{color: '#333'}}>{item.price}</Text>
          </Text>
          <Text style={{color: '#999'}}> | </Text>
          <Text
            style={{
              fontSize: x.scale(14),
              color: x.Colors.STOCK(item.currentPrice - item.price),
            }}>
            {item.currentPrice}
          </Text>
          <Text style={{color: '#999'}}> | </Text>
          <Text
            style={{
              fontSize: x.scale(14),
              color: '#333',
            }}>
            {isDidiao ? '***' : item.count}份
          </Text>
        </View>
        <Text style={[{color: x.Colors.STOCK(item.currentPrice - item.price)}]}>
          {`${(((item.currentPrice - item.price) / item.price) * 100).toFixed(
            2,
          )}%${
            item.currentPrice - item.price > 0
              ? '↑'
              : item.currentPrice - item.price < 0
              ? '↓'
              : ''
          }`}
        </Text>
      </View>
      {/* <View style={{height: 6}} /> */}
      {/* <View style={x.Styles.rowCenter('space-between')}>
        <Text style={[styles.title, {color: '#666'}]}>
          骚操作次数：
          <Text style={{color: '#333'}}>
            {isDidiao ? '***' : item.records.length}
          </Text>
        </Text>
      </View> */}
      <View style={{height: 6}} />
      <View style={x.Styles.rowCenter()}>
        <View style={x.Styles.rowCenter('flex-start')}>
          <Text style={{color: '#666', fontSize: x.scale(14)}}>持仓盈亏：</Text>
          <Text
            style={{
              fontSize: x.scale(14),
              color: x.Colors.STOCK(item.currentPrice - item.price),
            }}>
            {isDidiao
              ? '***'
              : ((item.currentPrice - item.price) * item.count).toFixed(2)}
            {item.currentPrice - item.price > 0
              ? '↑'
              : item.currentPrice - item.price < 0
              ? '↓'
              : ''}
          </Text>
        </View>
        <View style={x.Styles.rowCenter('flex-start')}>
          <Text style={{color: '#666', fontSize: x.scale(14)}}>当天盈亏：</Text>
          <Text
            style={{
              fontSize: x.scale(14),
              color: x.Colors.STOCK(item.rateToday),
            }}>
            {isDidiao
              ? '***'
              : ((item.price * item.count * item.rateToday) / 100).toFixed(2)}
            {item.rateToday > 0 ? '↑' : item.rateToday < 0 ? '↓' : ''}
          </Text>
        </View>
      </View>
      {item.records.length > 0 && isShowMore ? (
        <View style={{}}>
          <View
            style={{height: 1, backgroundColor: '#ddd', marginVertical: 12}}
          />
          <View style={[x.Styles.rowCenter('flex-start'), {flexWrap: 'wrap'}]}>
            {item.records.reverse().map((it, i) => (
              <View key={i} style={[styles.item, {borderColor: '#ccc'}]}>
                <Text
                  style={{
                    fontSize: x.scale(12),
                    color: '#999',
                  }}>
                  {i < 2 || i >= item.records.length - 2
                    ? moment(it.date).format('MM-DD')
                    : '...'}
                </Text>
                <View style={{width: 4}} />
                <Text
                  style={{
                    fontSize: x.scale(12),
                    color: x.Colors.STOCK(it.value),
                  }}>
                  {it.value}
                  {it.value > 0 ? '↑' : it.value < 0 ? '↓' : ''}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}
      <View
        style={[
          styles.dot,
          {
            backgroundColor:
              item.tiantianUpdateDate == moment().format('YYYY-MM-DD')
                ? x.Color.RED
                : '#ccc',
          },
        ]}
      />
    </TouchableOpacity>
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
  title: {
    fontSize: x.scale(14),
    color: '#333',
  },
  dot: {
    height: x.scale(8),
    width: x.scale(8),
    borderRadius: x.scale(4),
    position: 'absolute',
    right: 2,
    top: 2,
  },
  tag: {
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 2,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 4,
    paddingVertical: 4,
    marginHorizontal: 1,
  },
});

export default WalletItem;
