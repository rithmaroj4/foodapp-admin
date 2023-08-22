import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();



const DrawerScreen = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
      
        <Drawer.Screen name= 'STAFF' component={Staff}/>
        <Drawer.Screen name= 'ITEMS ' component={Items}/>
        <Drawer.Screen name= 'CATEGORY' component={AddCategory}/>
        <Drawer.Screen name= 'ORDERS' component={OrderScreen}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerScreen;
