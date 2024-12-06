import React, {ReactNode} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface MyProps {
  title?: String;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  children?: ReactNode;
}

const Button: React.FC<MyProps> = props => {
  const {title, onPress, style, textStyle, disabled, children} = props;
  return (
    <TouchableOpacity
      style={[styles.view, style, {opacity: disabled ? 0.38 : 1}]}
      activeOpacity={0.9}
      onPress={onPress}
      disabled={disabled}>
      {children || <Text style={[styles.text, textStyle]}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
  },
});

export default Button;
