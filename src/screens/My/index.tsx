import React from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from '..';
import Color from './components/Color';
import Secret from './components/Secret';
import Stocks from './components/Stocks';
import Indexes from './components/Indexes';
import Profile from './components/Profile';
import {useCaches} from '@src/stores';
import Toaster from '@src/constants/Toaster';

interface MyProps {
  navigation?: RootStacksProp;
}

const My: React.FC<MyProps> = props => {
  const {navigation} = props;
  const {setUser} = useCaches();

  const onLoginPress = (logined: boolean) => {
    if (logined) {
      Alert.alert('提示', '确认要退出登录吗？', [
        {text: '取消'},
        {
          text: '确认',
          onPress: () => {
            setUser(null);
            Toaster.show('退出成功 ~');
            setTimeout(() => {
              navigation.navigate('Login');
            }, 1000);
          },
        },
      ]);
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{height: useSafeAreaInsets().top, backgroundColor: '#fff'}}
      />
      <ScrollView>
        <View style={{flex: 1}}>
          <View style={{height: 6}} />
          {[
            <Profile onLoginPress={onLoginPress} />,
            <Stocks
              onNewStockPress={() => {
                navigation.navigate('EditStock');
              }}
            />,
            <Indexes
              onPress={() => {
                navigation.navigate('GlobalIndexes');
              }}
            />,
            <Color />,
            <Secret />,
          ].map((it, i) => (
            <View key={i} style={{marginVertical: 6}}>
              {it}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default My;
