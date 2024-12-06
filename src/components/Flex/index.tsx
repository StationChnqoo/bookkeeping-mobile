import React, {ReactNode} from 'react';
import {FlexAlignType, FlexStyle, StyleSheet, View} from 'react-native';

interface MyProps {
  align?: FlexAlignType;
  justify?: FlexStyle['justifyContent'];
  horizontal?: boolean;
  children: ReactNode;
}

const Flex: React.FC<MyProps> = props => {
  const {align = 'center', justify = 'center', horizontal = false} = props;
  return (
    <View
      style={{
        justifyContent: justify,
        alignItems: align,
        flexDirection: horizontal ? 'row' : 'column',
      }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Flex;
