import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React from 'react';
import {Image} from 'react-native';
import HomeScreen from '../Home';
import {useCaches} from '@src/stores';
import My from '../My';
import PlanScreen from '../Plan';
import WalletScreen from '../Wallet';

const Tab = createBottomTabNavigator();

function MainScreen() {
  const {theme} = useCaches();
  const screens = [
    {
      name: 'Home',
      component: HomeScreen,
      icon: require('./assets/menu_home.png'),
      label: '首页',
    },
    // {
    //   name: 'Plan',
    //   component: PlanScreen,
    //   icon: require('./assets/menu_plan.png'),
    //   label: '计划',
    // },
    {
      name: 'Wallet',
      component: WalletScreen,
      icon: require('./assets/menu_wallet.png'),
      label: '钱包',
    },
    {
      name: 'Me',
      component: My,
      icon: require('./assets/menu_me.png'),
      label: '我的',
    },
  ];
  return (
    <Tab.Navigator>
      {screens.map((it, i) => (
        <Tab.Screen
          name={it.name}
          key={i}
          component={it.component}
          options={{
            headerShown: false,
            tabBarLabel: it.label,
            tabBarActiveTintColor: theme,
            tabBarIcon: ({color}) => (
              <Image
                source={it.icon}
                style={{height: 24, width: 24, tintColor: color}}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default MainScreen;
