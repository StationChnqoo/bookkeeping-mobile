import Button from '@src/components/Button';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface MyProps {
  onClosePress: () => void;
}

const SuggestTips: React.FC<MyProps> = props => {
  const {onClosePress} = props;
  return (
    <View style={styles.view}>
      <TouchableOpacity
        activeOpacity={0.9}
        hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}
        onPress={onClosePress}>
        <Image
          source={require('@root/assets/common/close.png')}
          style={styles.imageClose}
        />
      </TouchableOpacity>
      <View style={{width: 8}} />
      <Image
        source={require('../assets/suggest.png')}
        style={styles.imageIcon}
      />
      <View style={{width: 8}} />
      <Text style={styles.text}>您对记账本还满意吗😊？</Text>
      <Button
        title={'去评价'}
        onPress={() => {}}
        style={styles.viewButton}
        textStyle={{color: 'green'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  imageIcon: {
    height: 24,
    width: 24,
  },
  imageClose: {
    height: 10,
    width: 10,
    tintColor: '#666',
  },
  text: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  viewButton: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: 'green',
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
});

export default SuggestTips;
