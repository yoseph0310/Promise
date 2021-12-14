import React from 'react';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomePage from '../../pages/Home';
import Info from '../../pages/Info';
import Search from '../../pages/Search';
import Pharmacy from '../../pages/Pharmacy';
import CalendarPage from '../../pages/Calendar';
import AlarmAdd from '../../pages/AlarmAdd';
import AlarmInfo from '../../pages/AlarmInfo';
import Alarm from '../../pages/Alarm';
import Timeline from '../../pages/Timeline';
import TimelineDetail from '../../pages/TimelineDetail';
import AlarmDetail from '../../pages/AlarmDetail';
import Mypage from '../../pages/Mypage';
import ModifyInfo from '../../pages/ModifyInfo';
import MyPillNowPill from '../../pages/MyPillNowPill';
import MyPillInfo from '../../pages/MyPillInfo';
import Login from '../../pages/Login';
import PetPage from '../../pages/Pet';

const MyApp = () => {

    const Stack = createNativeStackNavigator();
    const TopTab = createMaterialTopTabNavigator();
    const Tab = createBottomTabNavigator();

    function CalendarNav(){
      return (
        <Stack.Navigator 
        screenOptions={{
          headerShown : false,
          initialRouteName : 'Calendar'
        }}
        >
          <Stack.Screen name="Calendar" component={CalendarPage} />
          <Stack.Screen name="Add" component={AlarmAdd} />
        </Stack.Navigator>
      );
    }

    function AlarmNav(){
      return(
        <Stack.Navigator 
        screenOptions={{
          headerShown : false,
          initialRouteName : 'AlarmScreen'
        }}
        >
          <Stack.Screen name="AlarmScreen" component={Alarm} />
          <Stack.Screen name="AlarmInfo" component={AlarmInfo} />
          <Stack.Screen name="AlarmDetail" component={AlarmDetail} />
        </Stack.Navigator>
      )
    }

    function TimelineNav(){
      return(
        <Stack.Navigator 
        screenOptions={{
          headerShown : false,
          initialRouteName : 'TimelineScreen'
        }}
        >
          <Stack.Screen name="TimelineScreen" component={Timeline} />
          <Stack.Screen name="TimelineDetail" component={TimelineDetail} />
        </Stack.Navigator>
      )
    }

    function CalendarTop() {
      return (
        <TopTab.Navigator screenOptions={{
          headerTitleAlign: 'center',
          tabBarActiveTintColor:'black', 
          tabBarIndicatorStyle:{backgroundColor:'black'}, 
          tabBarLabelStyle:{fontSize:15},
          initialRouteName:'CalendarScreen'
          }}>
            <TopTab.Screen name='CalendarScreen' component={CalendarNav}  options={{title:'달력'}}/>
            <TopTab.Screen name='Alarm' component={AlarmNav} options={{title:'알람'}} />
            <TopTab.Screen name='Timeline' component={TimelineNav} options={{title:'이력'}}/>
        </TopTab.Navigator>
      );
    }

    function TopTabStackScreen(){
      return(
        <Stack.Navigator screenOptions={{
          headerTitleAlign: 'center'
        }}>
          <Stack.Screen name="CalendarTab" component={CalendarTop} options={{ title: '복용 일정' }}/>
        </Stack.Navigator>
      );
    }

    function HomeNav({navigation}) {
      return (
        <Stack.Navigator 
        screenOptions={{
          headerTitleAlign: 'center',
          initialRouteName : 'Homes',
          headerRight: ()=>(<Icon.Button onPress={()=>navigation.navigate('Search', {navigation:`${navigation}`})} name="magnify" color="black" backgroundColor='white' />),
        }}>
          <Stack.Screen name="Homes" component={HomePage} options={{title: '홈'}}/>
          <Stack.Screen name="Search" component={Search} options={{ title: '검색', headerRight: null }}/>
          <Stack.Screen name="Info" component={Info} options={{ title: '약 정보' }} />
        </Stack.Navigator>
      );
    }

    function MyPageNav() {
      return (
        <Stack.Navigator 
        screenOptions={{
          headerTitleAlign: 'center',
          initialRouteName:'mypageScreen'
        }}>
          <Stack.Screen name='mypageScreen' component={Mypage} options={{ title: '내 정보' }}/>
          <Stack.Screen name='modifyInfo' component={ModifyInfo} options={{ title: '정보수정' }}/>
          <Stack.Screen name='mypill' component={NowPillNav} options={{ title: '복용중인 약' }}/>
          <Stack.Screen name='mypet' component={PetPage} options={{ title: '마이펫' }}/>
        </Stack.Navigator>
      )
    }

    function NowPillNav() {
      return (
        <Stack.Navigator screenOptions={{initialRouteName : 'MyPillNowPill'}}>
            <Stack.Screen name="MyPillNowPill" component={MyPillNowPill} options={{ headerShown : false }}/>
            <Stack.Screen name="MyPillInfo" component={MyPillInfo} options={{ headerShown : false }} />
        </Stack.Navigator>
      )
    }

    function MyAppNav() {
      return(
      <Tab.Navigator 
        screenOptions={({route})=>({
          initialRouteName:'Home',
          tabBarActiveTintColor: 'black',
          headerShown : false, 
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ color, size }) => {
            const icons = {
              Home: 'home',
              Pharmacy : 'map-marker',
              CalendarPage: 'calendar-blank',
              Mypage: 'account',
              CommunityScreen: 'account-group'
            }
            return(
              <Icon name={icons[route.name]} color={color} size={size} />
            )},
        })}>
          <Tab.Screen name="Home" component={HomeNav} options={{tabBarLabel:'홈'}}/>
          <Tab.Screen name="Pharmacy" component={Pharmacy} options={{ title: '약국' }} />
          <Tab.Screen name="CalendarPage" component={TopTabStackScreen} options={{ title: '일정' }} />
          <Tab.Screen name="Mypage" component={MyPageNav} options={{ title: '내 정보' }}/>
        </Tab.Navigator>
        )
    }

    return (
      <Stack.Navigator 
      screenOptions={{
        headerShown : false
        }}>
          <Stack.Screen name="LoginScreen" component={Login} />
          <Stack.Screen name="appscreen" component={MyAppNav} />
      </Stack.Navigator>
    )
}

export default MyApp;