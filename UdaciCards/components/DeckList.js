import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, ScrollView, StyleSheet } from 'react-native'
import { AppLoading } from 'expo'
import { styles } from '../utils/styles'
import { IndividualDeck } from './IndividualDeck'
import { getDecks } from '../utils/api'
import { formatQuestions } from '../utils/helpers'

class DeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckList: {},
    }
  }

  componentDidMount() {
    getDecks().then(results => {
      this.setState(() => ({ deckList: results }))
    })
  }

  navigateToOpenDeck(item) {
    const { navigate } = this.props.navigation

    return navigate('IndividualDeck', { item })
  }

  render() {
    const { deckList } = this.state

    return (
      <ScrollView>
        <View style={{marginBottom: 40, marginTop: 20}}>
          <Text style={[styles.headers, {textAlign: 'center', fontSize: 24}]}>Choose a deck!</Text>
          {Object.keys(deckList).map(item => {
            return (
              <View key={deckList[item].title} style={styles.deckView}>
                <TouchableOpacity onPress={() => this.navigateToOpenDeck(deckList[item].title)}>
                  <View>
                    <Text style={styles.deckTitle}>{deckList[item].title}</Text>
                    <Text style={{marginBottom: 20}}>
                      {formatQuestions(deckList[item].questions.length)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          })}
        </View>
      </ScrollView>
    )
  }
}

export default DeckList
