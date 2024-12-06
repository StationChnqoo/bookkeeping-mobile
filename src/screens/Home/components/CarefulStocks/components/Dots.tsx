import x from '@src/constants/x';
import {useCaches} from '@src/stores';
import {View} from 'react-native';

interface MyProps {
  total: number;
  current: number;
  size?: number;
}

const Dots = (props: MyProps) => {
  const {total, current, size = x.scale(6)} = props;
  const {theme} = useCaches();
  return (
    <View style={x.Styles.rowCenter('center')}>
      <View style={x.Styles.rowCenter('center')}>
        {Array.from({length: total}, (it, i) => (
          <View
            key={i}
            style={{
              height: size,
              width: size,
              borderRadius: size / 2,
              marginHorizontal: 2,
              backgroundColor: i == current ? theme : '#ccc',
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default Dots;
