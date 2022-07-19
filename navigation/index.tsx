import { FontAwesome } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
// import * as Notifications from 'expo-notifications';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import AuthScreen from '../screens/Auth';
import WelcomeScreen from '../screens/Welcome';
import NotFoundScreen from '../screens/NotFoundScreen';
import Election from '../screens/Election/Index';
import Community from '../screens/Election/Index';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Announcement from '../screens/Election/Announcement';
import Result from '../screens/Election/Result';
import Vote from '../screens/Election/Vote';
import Poll from '../screens/Community/Poll';
import Profile from '../screens/Community/Profile';
import Chat from '../screens/Community/Chat';
import Invite from '../screens/Community/Invite';
import AdminAuth from '../Admin';
import NewInfo from '../Admin/screens/NewInfo';
import Dashboard from '../Admin/screens/Dashboard';
import Members from '../Admin/screens/Members';
import { useAuthentication } from '../hooks/useAuth';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { user} = useAuthentication()
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {user ? <RootNavigator />: <AuthNav />}
    </NavigationContainer>
  );
}

const CommunityStack = createNativeStackNavigator<RootStackParamList>();

function CommunityScreens() {
  return(
    <CommunityStack.Navigator 
    >
      <CommunityStack.Screen name="FeaturedCommunity" component={Community} />
      <CommunityStack.Screen name="Invite" component={Invite} />
      <CommunityStack.Screen name="CommunityChat" component={Chat} />
      <CommunityStack.Screen name="MemberProfile" component={Profile} />
      <CommunityStack.Screen name="CommunityPoll" component={Poll} />
    </CommunityStack.Navigator>
  )
}

const AuthStack = createNativeStackNavigator<RootStackParamList>();

function AuthNav() {
  return(
    <AuthStack.Navigator
      initialRouteName='WelcomeScreen'
    >
      <AuthStack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
}

const ElectionStack = createNativeStackNavigator<RootStackParamList>();

function ElectionScreens() {
  return(
    <ElectionStack.Navigator>
      <ElectionStack.Screen name='FeaturedElection' component={Election} />
      <ElectionStack.Screen name='Annoucement' component={Announcement} />
      <ElectionStack.Screen name='Vote' component={Vote} />
      <ElectionStack.Screen name='Result' component={Result} />
    </ElectionStack.Navigator>
  )
}

const AdminStack = createNativeStackNavigator<RootStackParamList>();

function AdminScreens() {
  return(
    <AdminStack.Navigator>
      <AdminStack.Screen name="AdminAuth" component={AdminAuth} />
      <AdminStack.Screen name="AdminDashboard" component={Dashboard} />
      <AdminStack.Screen name="AdminMembers" component={Members} />
      <AdminStack.Screen name="AdminAnnoucement" component={NewInfo} />
      <AdminStack.Screen name="AdminAuth" component={AdminAuth} />
    </AdminStack.Navigator>
  )
}

const isAdmin = true

function RootNavigator() {
  return (
    isAdmin ? <AdminScreens/> : <BottomTabNavigator />
  );
}

// const DrawerNav = createDrawerNavigator()

// function DrawerNavigator() {
//   return (
//     <DrawerNav.Navigator 
//     >
//       <DrawerNav.Screen name='Home' component={RootNavigator} options={{ headerShown: false }} />
//     </DrawerNav.Navigator>
//   )

// }

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Election"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Election"
        component={ElectionScreens}
        options={({ navigation }: RootTabScreenProps<'Election'>) => ({
          title: 'ELECTION',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Community"
        component={CommunityScreens}
        options={{
          title: 'COMMUNITY',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}


function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
