import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';

import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import Card from '../Card';
import { RootStacksProp } from '@src/screens';

interface MyProps {
  navigation?: RootStacksProp;
}

const Secret: React.FC<MyProps> = props => {
  const {isDidiao, setIsDidiao, theme} = useCaches();
  return (
    <Card title={'隐私'}>
      <View style={{height: 6}} />
      <View style={x.Styles.rowCenter('space-between')}>
        <Text style={{fontSize: x.scale(14), color: '#333'}}>低调模式</Text>
        <Switch
          value={isDidiao}
          onValueChange={() => setIsDidiao(!isDidiao)}
          thumbColor={isDidiao ? theme : '#999'}
          trackColor={{false: '#ccc', true: x.Colors.hex2Rgba(theme, 0.28)}}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Secret;
