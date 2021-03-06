import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation';
import SignUp from './SignUp';
import Loading from './Loading';
import LogIn from './Login';
// import UserPage from "./UserPage";
import Groups from './Groups';
import AddGroupForm from './AddGroupForm';
import Events from './Events';
import AddEventForm from './AddEventForm';
import Items from './Items';
import UpdateGroup from './UpdateGroup';
import UpdateEvent from './UpdateEvent';
import Chat from './Chat';
import AddModal from './AddModal';
import OurCamera from './OurCamera'

const MainNavigator = createStackNavigator(
  {
    Loading: { screen: Loading },
    Signup: { screen: SignUp },
    Login: { screen: LogIn },
    // UserPage: { screen: UserPage },
    Groups: { screen: Groups },
    AddGroupForm: { screen: AddGroupForm },
    Events: { screen: Events },
    AddEventForm: { screen: AddEventForm },
    Items: { screen: Items },
    UpdateGroup: { screen: UpdateGroup },
    UpdateEvent: { screen: UpdateEvent },
    Chat: { screen: Chat },
    AddModal: { screen: AddModal },
    OurCamera: {screen: OurCamera}
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'lightpink'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
);

const App = createAppContainer(MainNavigator);

export default App;
