import {FundsValue} from '@src/constants/Interfaces';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

interface MyProps {
  datas: FundsValue[];
  onPress: (fd: FundsValue) => void;
}

const CarefulStocks: React.FC<MyProps> = props => {
  const {datas, onPress} = props;
  const {isDidiao} = useCaches();
  const renderUpOrDown = (n: number) => {
    return n > 0 ? '↑' : n < 0 ? '↓' : '';
  };
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={{position: 'relative', alignItems: 'center'}}>
      <Carousel
        style={{padding: 0, margin: 0}}
        width={x.WIDTH - 30}
        height={x.scale(56)}
        autoPlay={true}
        scrollAnimationDuration={618}
        autoPlayInterval={618}
        vertical={true}
        data={datas.filter(it => (it?.f57 ? true : false))}
        onSnapToItem={setCurrentIndex}
        snapEnabled={true}
        renderItem={({item, index}) => {
          let stock = datas[index];
          return (
            <TouchableOpacity
              style={styles.stock}
              key={index}
              activeOpacity={x.Touchable.OPACITY}
              onPress={() => {
                onPress(stock);
              }}>
              <View style={x.Styles.rowCenter()}>
                <Text
                  style={{
                    color: '#333',
                    fontWeight: '500',
                    fontSize: x.scale(14),
                  }}>
                  {isDidiao ? '******' : stock?.f58}
                </Text>
              </View>
              <View style={{height: 4}} />
              <View style={[x.Styles.rowCenter('space-between')]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: x.scale(14), color: '#333'}}>
                    {`${(stock.f43 / 1000).toFixed(3)}`}
                  </Text>
                  <Text style={{marginHorizontal: 6, color: '#999'}}>|</Text>
                  <Text
                    style={{
                      fontSize: x.scale(14),
                      color: x.Colors.STOCK(stock.f170),
                    }}>
                    {`${(stock.f170 / 100).toFixed(2)}%${renderUpOrDown(
                      stock.f170,
                    )}`}
                  </Text>
                </View>
                <Text style={{fontSize: x.scale(12), color: '#999'}}>
                  股票代码: {isDidiao ? '******' : stock.f57}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <View style={styles.dots}>
        <Text style={{fontSize: x.scale(12), color: 'white'}}>
          {currentIndex + 1}/{datas.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
  },
  stock: {
    paddingVertical: x.scale(8),
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    // marginTop: 6,
    // borderWidth: 1,
    // borderColor: '#ccc',
    height: x.scale(56),
    justifyContent: 'space-between',
  },
  viewCounts: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewProgressBar: {
    height: 4,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  dots: {
    position: 'absolute',
    right: 0,
    top: 0,
    // borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.58)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: x.scale(10),
    borderBottomLeftRadius: x.scale(10),
    height: x.scale(20),
    width: x.scale(36),
  },
});

export default CarefulStocks;
