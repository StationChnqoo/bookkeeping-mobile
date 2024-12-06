import Flex from '@src/components/Flex';
import x from '@src/constants/x';
import React, {useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from '..';
import {useCaches} from '@src/stores';
import Button from '@src/components/Button';

interface MyProps {
  navigation?: RootStacksProp;
}

const Books: React.FC<MyProps> = props => {
  const {navigation} = props;
  const {theme} = useCaches();
  const [sortView, setSortView] = useState(0);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          height: Platform.select({ios: useSafeAreaInsets().top, android: 0}),
          borderColor: 'white',
        }}></View>
      <View style={[{flex: 1}, x.Page]}>
        <TouchableOpacity
          activeOpacity={x.Touchable.OPACITY}
          onPress={() => {
            setSortView(t => -t + 1);
          }}>
          <Button
            onPress={() => {
              setSortView(t => -t + 1);
            }}
            style={{
              borderColor: theme,
              ...styles.viewButton,
            }}>
            <Flex justify={'flex-end'} horizontal>
              <Image
                key={sortView}
                source={
                  [
                    require('@root/assets/common/sort_list.png'),
                    require('@root/assets/common/sort_square.png'),
                  ][sortView]
                }
                style={{
                  height: x.scale(24),
                  width: x.scale(24),
                  tintColor: theme,
                }}
              />
              <View style={{width: 8}} />
              <Text style={{color: theme, fontSize: x.scale(14)}}>
                {['列表视图', '网格视图'][sortView]}
              </Text>
            </Flex>
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewButton: {
    borderWidth: 1,
    borderRadius: 12,
    height: x.scale(34),
    width: x.scale(108),
  },
});

export default Books;
