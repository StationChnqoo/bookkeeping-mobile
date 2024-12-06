import BottomSheet from '@src/components/BottomSheet';
import Button from '@src/components/Button';
import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

interface MyProps {
  show: boolean;
  editKey: string;
  editValue: number;
  onClose: () => void;
  onHide: () => void;
  onConfirm: (value: number) => void;
}

const EditPlanModal = (props: MyProps) => {
  const {show, editKey, editValue, onClose, onHide, onConfirm} = props;
  const [myValue, setMyValue] = useState('');
  const {theme} = useCaches();

  const isInt = (s: string) => {
    const num = parseInt(s);
    return !isNaN(num) && num > 0;
  };
  return (
    <BottomSheet
      show={show}
      onClose={onClose}
      onShow={() => {
        setMyValue(`${editValue}`);
      }}>
      <View style={styles.view}>
        <View>
          <Text
            style={{fontSize: x.scale(18), color: '#333', fontWeight: '500'}}>
            编辑配置
          </Text>
        </View>
        <View style={{height: 12}} />
        <View style={x.Styles.rowCenter('space-between')}>
          <Text style={{color: '#333', fontSize: x.scale(16)}}>
            {(editKey || '').toUpperCase()}
          </Text>
          <TextInput
            style={styles.input}
            value={myValue}
            onChangeText={setMyValue}
            keyboardType="numeric"
          />
        </View>
        <View style={{height: 12}} />
        <View style={x.Styles.rowCenter('space-between')}>
          <Button
            style={[styles.bottonCancel, {borderColor: theme}]}
            textStyle={{color: theme}}
            title={'取消'}
            onPress={onClose}
          />
          <View style={{width: 24}} />
          <Button
            disabled={!isInt(myValue)}
            style={{
              backgroundColor: theme,
              height: x.scale(36),
              borderRadius: 5,
              flex: 1,
            }}
            textStyle={{color: 'white'}}
            title={'确认'}
            onPress={() => {
              onConfirm(parseInt(myValue));
            }}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  view: {
    padding: 16,
  },
  bottonCancel: {
    borderWidth: 1,
    height: x.scale(36),
    borderRadius: 5,
    flex: 1,
  },
  input: {
    textAlign: 'right',
    borderRadius: 4,
    borderWidth: 1,
    height: x.scale(32),
    borderColor: '#999',
    width: x.scale(128),
    paddingHorizontal: 12,
    // paddingVertical: 2,
    fontSize: x.scale(16),
  },
});

export default EditPlanModal;
