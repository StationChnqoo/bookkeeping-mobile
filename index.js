import React, {createContext, useEffect} from 'react';
import {AppRegistry, StatusBar, View} from 'react-native';
import {name as appName} from './app.json';
import Screens from './src/screens';
import {useStore} from './src/stores';
import {RootSiblingParent} from 'react-native-root-siblings';
import Reactotron, {asyncStorage, networking} from 'reactotron-react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import moment from 'moment';
import 'moment/locale/zh-cn';

const StoreContext = createContext();
const queryClient = new QueryClient();

const Bookkeeping = () => {
  const initReactNativeDebugger = async () => {
    if (__DEV__) {
      Reactotron.configure()
        .use(asyncStorage())
        .use(
          networking({
            ignoreContentTypes: /^(image)\/.*$/i,
            ignoreUrls: /\/(logs|symbolicate)$/,
          }),
        )
        .connect();
    }
  };

  useEffect(() => {
    // moment.locale('zh-cn');
    initReactNativeDebugger();
    configureReanimatedLogger({
      level: ReanimatedLogLevel.warn,
      strict: false, // Reanimated runs in strict mode by default
    });
    return function () {};
  }, []);

  return (
    <StoreContext.Provider value={useStore}>
      <QueryClientProvider client={queryClient}>
        <RootSiblingParent>
          <View style={{flex: 1}}>
            <View style={{flex: 1, position: 'relative'}}>
              <Screens />
            </View>
          </View>
        </RootSiblingParent>
      </QueryClientProvider>
    </StoreContext.Provider>
  );
};

AppRegistry.registerComponent(appName, () => Bookkeeping);
