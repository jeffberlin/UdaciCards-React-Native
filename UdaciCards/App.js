import React from 'react'
import { Text, View, Platform, StatusBar } from 'react-native'
import { FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { styles } from './utils/styles'
import AddQuestion from './components/AddQuestion'
import AddDeck from './components/AddDeck'
import DeckList from './components/DeckList'
import Quiz from './components/Quiz'
import IndividualDeck from './components/IndividualDeck'
import { setLocalNotification } from './utils/helpers'
import { white, orange, gray } from './utils/colors'

function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => Platform.OS === 'ios' ? <Ionicons name='ios-list-box-outline' size={30} color={tintColor} /> : <MaterialIcons name='format-list-bulleted' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => Platform.OS === 'ios' ? <Ionicons name='ios-add-circle-outline' size={30} color={tintColor} /> : <MaterialIcons name='add-circle-outline' size={30} color={tintColor} />
    }
  },
},
{
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? orange : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : orange,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  IndividualDeck: {
    screen: IndividualDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: orange
      }
    }
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: orange
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: orange
      },
    }
  }
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
        <View style={{ flex: 1 }}>
          <AppStatusBar backgroundColor={orange} barStyle='light-content' />
          <MainNavigator />
        </View>
    );
  }
}
