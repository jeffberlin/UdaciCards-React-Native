import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, KeyboardAvoidingView, TextInput, Keyboard, Alert } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import { saveDeckTitle } from '../utils/api'
import { styles } from '../utils/styles'
import { Button } from './Button'

class AddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    }
  }

  addNewDeck = () => {
    if (!this.state.inputText) {
      return alert('Deck Title is empty!')
    }
    return saveDeckTitle(this.state.inputText)
      .then(this.viewDeck(this.state.inputText))
  }

  viewDeck = (item) => {
    const { navigate, dispatch } = this.props.navigation
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home', params: { item }})
      ]
    })
    dispatch(resetAction)
    navigate( 'IndividualDeck', { item })
  }

  handleChange = (inputText) => {
    this.setState(() => ({
      inputText
    }))
  }

  render() {
    const { inputText } = this.state

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.headers}>New Deck Title</Text>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={this.handleChange}
            value={inputText}
            placeholder={'New Deck Title'}
          />
        </View>
        <Button onPress={this.addNewDeck}>Submit Deck</Button>
      </KeyboardAvoidingView>
    )
  }
}

export default AddDeck
