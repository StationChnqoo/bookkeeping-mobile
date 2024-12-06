import {FundsValue, OtherCountryStock} from '@src/constants/Interfaces';
import x from '@src/constants/x';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Marquee} from '@animatereactnative/marquee';
import ZDView from '@src/components/ZdView';
import {useInterval} from 'ahooks';
import {useCaches} from '@src/stores';
import {useFocusEffect} from '@react-navigation/native';

interface MyProps {
  datas: FundsValue[];
  otherCountryDatas: OtherCountryStock[];
  onPress: (fd: FundsValue) => void;
}

const FundValues: React.FC<MyProps> = props => {
  const {datas, onPress, otherCountryDatas} = props;
  const [timer, setTimer] = useState<number | undefined>(undefined);
  const [s, setS] = useState(0);
  const {theme} = useCaches();
  const [focus, setFocus] = useState(false);

  // console.log(datas);

  useFocusEffect(
    useCallback(() => {
      setFocus(true);
      return () => setFocus(false);
    }, []),
  );

  useInterval(() => {
    setS(t => (t + 1) % datas.length);
  }, timer);

  useEffect(() => {
    if (focus && datas.length > 0) {
      setTimer(2000);
    } else {
      setTimer(undefined);
    }
    return function () {};
  }, [datas, focus]);

  return (
    <View style={styles.view}>
      <Text style={styles.textTitle}>指数看板</Text>
      <Marquee
        spacing={0}
        speed={1}
        style={{marginTop: 8, paddingHorizontal: 8}}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          {otherCountryDatas.map((it, i) => (
            <ZDView
              key={i}
              style={[x.Styles.rowCenter('flex-start'), styles.viewOtherStock]}
              value={it.f3}>
              <Text key={i} style={{color: '#666', fontSize: x.scale(14)}}>
                {`${it.f14}: `}
              </Text>
              <Text
                style={{
                  fontSize: x.scale(14),
                  color: x.Colors.STOCK(it.f3),
                }}>
                {`${(it.f3 / 100).toFixed(2)}%`}
                {it.f3 > 0 ? '↑' : it.f3 < 0 ? '↓' : ''}
              </Text>
            </ZDView>
          ))}
        </View>
      </Marquee>
      <View style={x.Styles.rowCenter()}>
        <View style={{flex: 1}}>
          {datas
            .filter(it => it?.f170)
            .map((it, index) => (
              <TouchableOpacity
                activeOpacity={x.Touchable.OPACITY}
                key={it.f57}
                style={{}}
                onPress={() => {
                  onPress(it);
                }}>
                <ZDView
                  style={[
                    styles.viewItem,
                    {borderColor: index == s ? theme : '#fff'},
                  ]}
                  value={it.f170}>
                  <Text style={[styles.textName, {flex: 1}]} numberOfLines={1}>
                    {`${it.f58}`}
                    {/* <Text style={{color: '#666'}}> / </Text>
                    <Text
                      style={{
                        color: '#999',
                        fontSize: x.scale(12),
                      }}>{`${it.f107}.${it.f57}`}</Text> */}
                  </Text>

                  <Text style={{color: '#999'}}> | </Text>
                  <View style={x.Styles.rowCenter('space-between')}>
                    <Text
                      style={[
                        styles.textZdf,
                        {
                          color: x.Colors.STOCK(it.f170),
                          textAlign: 'right',
                        },
                      ]}>
                      {(it.f170 / 100).toFixed(2)}%
                    </Text>
                  </View>
                </ZDView>
              </TouchableOpacity>
            ))}
        </View>
        <View style={{width: 6}} />
        <View style={{position: 'relative'}}>
          <Image
            key={`${datas?.[s]?.f107}.${datas?.[s]?.f57}.${(
              new Date().getTime() /
              1000 /
              5
            ).toFixed(0)}`}
            source={{
              uri: x.Links.previewStockChart(
                `${datas?.[s]?.f107}.${datas?.[s]?.f57}&_=${(
                  new Date().getTime() /
                  1000 /
                  5
                ).toFixed(0)}`,
              ),
            }}
            style={{width: x.scale(160), height: x.scale(90)}}
          />
          <ZDView style={styles.bagde} value={datas?.[s]?.f43 / 100}>
            <Text style={styles.currentValue}>
              {(datas?.[s]?.f43 / 100).toFixed(2)}
            </Text>
          </ZDView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  bagde: {
    width: x.scale(64),
    height: x.scale(24),
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  currentValue: {
    fontSize: x.scale(12),
    color: '#333',
  },
  textTitle: {
    fontSize: x.scale(16),
    fontWeight: '500',
    color: '#333',
    paddingHorizontal: 8,
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
    marginHorizontal: 2,
    borderRadius: 4,
    marginTop: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
  },
  textName: {
    fontSize: x.scale(14),
    color: '#333',
    // fontWeight: '500',
  },
  textZdf: {
    fontSize: x.scale(14),
    width: x.scale(60),
    // fontFamily: 'Dosis',
  },
  viewOtherStock: {
    marginHorizontal: x.scale(4),
    marginVertical: 2,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },
});

export default FundValues;
