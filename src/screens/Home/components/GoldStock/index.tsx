import ZDView from '@src/components/ZdView';
import {FundsValue} from '@src/constants/Interfaces';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import moment from 'moment';
import {Image, StyleSheet, Text, View} from 'react-native';

interface MyProps {
  data: FundsValue;
}

const GoldStock = (props: MyProps) => {
  const {data} = props;
  const {isDidiao, theme} = useCaches();
  const renderUpOrDown = (n: number) => {
    return n > 0 ? '↑' : n < 0 ? '↓' : '';
  };

  return (
    <ZDView value={data?.f169} style={styles.view}>
      <View style={[x.Styles.rowCenter('space-between')]}>
        <View style={x.Styles.rowCenter('flex-start')}>
          <Image
            source={require('../assets/beans.png')}
            style={{height: x.scale(16), width: x.scale(16), tintColor: theme}}
          />
          <View style={{width: 6}} />
          <Text
            style={{fontSize: x.scale(14), color: '#333', fontWeight: '500'}}>
            {isDidiao ? '******' : `${data?.f58}`}
          </Text>
        </View>
        <View style={x.Styles.rowCenter('flex-start')}>
          <Text
            style={{color: x.Colors.STOCK(data?.f169), fontSize: x.scale(14)}}>
            {(data?.f169 / 100).toFixed(2)}
          </Text>
          <Text style={{color: '#999', marginHorizontal: 2}}> | </Text>
          <Text
            style={{color: x.Colors.STOCK(data?.f170), fontSize: x.scale(14)}}>
            {(data?.f170 / 100).toFixed(2)}%{renderUpOrDown(data?.f170)}
          </Text>
          <Text style={{color: '#999', marginHorizontal: 2}}> | </Text>
          <Text style={{fontSize: x.scale(14), color: '#999'}}>
            {moment(data?.f86 * 1000).fromNow()}
          </Text>
        </View>
      </View>
    </ZDView>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
});

export default GoldStock;
