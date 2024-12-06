import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import * as React from 'react';
import App from '@root/App';
import MainScreen from './Main';
import EditStock from './EditStock';
import Webviewer from './Webviewer';
import GlobalIndexes from './GlobalIndexes';
import Login from './Login';
import Books from './Books';

export type RootStacksParams = {
  App: undefined;
  MainScreen: undefined;
  EditStock: {id?: string};
  Webviewer: {title: string; url: string};
  GlobalIndexes: undefined;
  Login: undefined;
  Books: undefined;
};

const RootStack = createNativeStackNavigator<RootStacksParams>();

export type RootStacksProp = NativeStackNavigationProp<RootStacksParams>;

export default function Stacks() {
  const navigator = useNavigationContainerRef();
  // useFlipper(navigator);
  return (
    <NavigationContainer ref={navigator}>
      <RootStack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
          headerShown: false,
          animationDuration: 618,
        }}>
        <RootStack.Screen name="MainScreen" component={MainScreen} />
        <RootStack.Screen name="App" component={App} />
        <RootStack.Screen name="EditStock" component={EditStock} />
        <RootStack.Screen name="Webviewer" component={Webviewer} />
        <RootStack.Screen name="GlobalIndexes" component={GlobalIndexes} />
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="Books" component={Books} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
