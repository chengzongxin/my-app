import { Tabs } from 'expo-router';
import React from 'react';

// import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { RouteProp, ParamListBase } from '@react-navigation/native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const block = (props:{
    route: RouteProp<ParamListBase, string>;
    navigation: any;
}) => {
    console.log('screenOptions  erer = ', props);
    return {}
  }

  const block2 = (props:{
    route: RouteProp<ParamListBase, string>;
    navigation: any;
}) => {
    console.log('screenListeners  erer = ', props);
    return {}
  }

  return (
    <Tabs 
    screenOptions={block}
    screenListeners={{
      tabPress:(e:any)=>{console.log("tabPress = ",e)},
      beforeRemove:(e:any)=>{console.log("beforeRemove = ",e)},
    }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          headerTransparent: true,
          // tabBarIcon: ({ color, focused }) => (
            // <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          // ),
          // tabBarActiveTintColor:'red'
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          // tabBarIcon: ({ color, focused }) => (
            // <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          // ),
          // tabBarActiveTintColor:'aqua'
        }}
      />
    </Tabs>
  );
}
