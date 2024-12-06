import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

import Button from '@src/components/Button';
import ToolBar from '@src/components/ToolBar';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import {RootStacksProp} from '..';
import {SHA256} from 'crypto-js';
import Toaster from '@src/constants/Toaster';
import Services from '@src/constants/Services';

interface MyProps {
  navigation?: RootStacksProp;
}

const LoginScreen: React.FC<MyProps> = props => {
  const {navigation} = props;
  const {theme, setUser} = useCaches();
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    if (code && password) {
      let result = await new Services().selectLogin(code, password);
      if (result.success) {
        setUser(result.data);
        Toaster.show('登录成功 ~');
        navigation.goBack();
      } else {
        Toaster.show(result.message);
      }
    } else {
      Toaster.show('请填完后登录 ~');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ToolBar
        title={'登录'}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{padding: 32}}>
        <TextInput
          placeholder="账号"
          style={styles.input}
          value={code}
          onChangeText={setCode}
        />
        <View style={{height: 16}} />
        <TextInput
          placeholder="密码"
          style={styles.input}
          textContentType="password"
          value={password}
          onChangeText={setPassword}
        />
        <View style={{height: 16}} />
        <Button
          title={'登录'}
          style={{
            backgroundColor: theme,
            height: x.scale(36),
            borderRadius: 12,
          }}
          textStyle={{color: '#fff'}}
          onPress={submit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: x.scale(16),
    paddingVertical: 0,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    flexDirection: 'row',
    height: x.scale(36),
  },
});

export default LoginScreen;
