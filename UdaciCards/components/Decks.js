import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native'
import { getDecks } from '../utils/helpers'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { AppLoading } from 'expo'


class Decks extends Component {
  state = {
    ready: false
  }

  componentDidMount() {
    getDecks().then((decks) => {
      this.props.dispatch(addDeck(decks))
      this.setState({
        ready: true
      })
    })
  }

  onItemPress = (item) => {
    this.props.navigation.navigate(
      'DeckDetails', { deckTitle: item.title })
  }
  render() {

    if (!this.state.ready) {
      return <AppLoading />
    }
    return (
      <View>
        <Text>Decks</Text>
      </View>
    )
  }
}

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks)
