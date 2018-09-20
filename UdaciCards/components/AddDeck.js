import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, KeyboardAvoidingView, TextInput } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { saveDeckTitle } from '../utils/helpers'
import { styles } from '../utils/styles'
import { Button } from './Button'

class AddDeck extends Component {
  constructor(props) {
    super(props); {
      this.state = {
        inputText: ''
      }
    }
  }

  addNewDeck = () => {
    return saveDeckTitle(this.state.inputText)
      .then(this.navigateToDeckItem(this.state.inputText),
    )
  }

  navigateToDeckItem = () => {
    const { navigate, dispatch } = this.props.navigation

    const resetNavAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routName: 'Home', params: { item }})
      ]
    })
    dispatch(resetNavAction)
    navigate('DeckItem', { item })
  }
  render() {
    const { inputText } = this.state

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.headers}>New Deck Title</Text>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={inputText => this.setState({ inputText })}
            value={inputText}
            placeholder={'New Deck Title'}
          />
        </View>
        <Button onPress={this.createDeck}>Create Deck</Button>
      </KeyboardAvoidingView>
    )
  }
}

export default AddDeck
