import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Animated } from 'react-native'
import { getDeck } from '../utils/api'
import { formatQuestions } from '../utils/helpers'
import { Button } from './Button'
import { NavigationActions } from 'react-navigation'
import { styles } from '../utils/styles'

class OpenDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: { questions: [] },
      opacity: new Animated.Value(0)
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.item
  })

  componentDidMount() {
    const { opacity } = this.state
    getDeck(this.props.navigation.state.params.item)
      .then(results => this.setState(() => ({ deck: results })))
      .then(() => Animated.timing(opacity, { toValue: 1, duration: 800 }).start()
    )
  }

  quizStart = item => {
    const { navigate } = this.props.navigation

    return navigate('Quiz', { item })
  }

  backToDecks = info => {
    const newDeck = this.state.deck
    newDeck.questions.push(info)
    this.setState(() => ({ deck: newDeck }))
  }

  addNewCard = item => {
    const { navigate } = this.props.navigation

    return navigate('AddCard', {
      item,
      navBack: this.backToDecks
    })
  }

  render() {
    const { deck, opacity } = this.state

    return (
      <Animated.View style={[styles.container, { opacity }]}>
        <Text style={styles.deckTitle}>{deck.title}</Text>
        <Text style={{alignContent: 'flex-start'}}>
          {formatQuestions(deck.questions.length)}
        </Text>
        <Button onPress={() => this.addNewCard(deck.title)}>
          Add Card
        </Button>
        {deck.questions.length > 0 ? (
          <Button onPress={() => this.quizStart(deck.title)}>
            Start Quiz
          </Button>
        ) : (
          <Text>
            No cards in this deck. Please add at least one card to take a quiz.
          </Text>
        )}
      </Animated.View>
    )
  }
}

export default OpenDeck
