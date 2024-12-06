import Button from '@src/components/Button';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Card from '../Card';

interface MyProps {
  onLoginPress: (logined: boolean) => void;
}

const Profile: React.FC<MyProps> = props => {
  const {theme, setTheme, user} = useCaches();
  const {onLoginPress} = props;

  useEffect(() => {
    return function () {};
  }, []);

  const logined = user?.token ? true : false;
  // const logined = true;
  return (
    <Card title={'账号'}>
      <View style={{height: 6}} />
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        {logined ? (
          <Image source={{uri: user.avatar}} style={styles.avatar} />
        ) : (
          <View style={styles.avatar} />
        )}
        <View style={{width: 12}} />
        <View
          style={{
            flex: 1,
            height: x.scale(58),
            justifyContent: 'space-around',
          }}>
          <Text
            style={{color: '#333', fontWeight: '500', fontSize: x.scale(16)}}>
            {user?.name || '请登录'}
          </Text>
          <Text
            style={{color: '#666', fontSize: x.scale(14)}}
            numberOfLines={1}>
            {user?.id ? `ID: ${user?.id}` : '请点击登录按钮进行登录 ~'}
          </Text>
        </View>
        <Button
          title={logined ? '退出' : '登录'}
          textStyle={{color: 'white', fontSize: x.scale(12)}}
          style={[
            styles.button,
            {
              backgroundColor: theme,
            },
          ]}
          onPress={() => {
            onLoginPress(logined);
          }}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  circle: {
    height: x.scale(20),
    width: x.scale(20),
    marginRight: 12,
    borderRadius: x.scale(10),
  },
  button: {
    borderRadius: x.scale(15),
    height: x.scale(30),
    paddingHorizontal: 12,
  },
  avatar: {
    height: x.scale(58),
    width: x.scale(58),
    backgroundColor: '#eee',
    borderRadius: x.scale(29),
  },
});

export default Profile;
