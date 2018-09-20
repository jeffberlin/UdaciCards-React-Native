import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { addCard } from '../actions'
import { addCardToDeck } from '../utils/helpers'

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  handleChange(type, value) {
    this.setState({
      [type]: value
    })
  }

  handleAddCard = (title) => {
    const { question, answer } = this.state

    if (question && answer) {
      addCardToDeck(title, { question, answer })
        .then((decks) => {
          this.props.dispatch(addCard(title, { question, answer }))
          this.props.navigation.goBack()
        })
    }
  }

  render() {
    const { deckTitle } = this.props.navigation.state.params

    return (
      <KeyboardAvoidingView behavior='padding'>
        <Text>{deckTitle}</Text>
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(AddCard)
