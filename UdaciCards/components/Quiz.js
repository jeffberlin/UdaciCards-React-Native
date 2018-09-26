import React, { Component } from 'react'
import { styles } from '../utils/styles'
import { View, Text, Platform, Animated, ScrollView } from 'react-native'
import { Button } from './Button'
import { NavigationActions } from 'react-navigation'
import { getDeck } from '../utils/api'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: {
        questions: [
          {
            question: '',
            answer: '',
          }
        ]
      },
      toggleAnswer: false,
      currentCardNumber: 0,
      counter: 0,
      quizEnd: false,
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
      .then(() => Animated.timing(
        opacity,
        { toValue: 1,
          duration: 800
        }
      ).start(),)
  }

  nextCard = (currentCardNumber, deck) => {
    currentCardNumber++

    if (currentCardNumber < deck.questions.length) {
      this.setState(() => ({ currentCardNumber: currentCardNumber }))
    } else {
      this.setState(() => ({ quizEnd: true }))
      clearLocalNotification().then(setLocalNotification)
    }
  }

  flipCard = toggleAnswer => this.setState(() => ({
    toggleAnswer: !toggleAnswer
  }))

  toHome = item => {
    const { navigate } = this.props.navigation

    return navigate('Home')
  }

  restartQuiz = () => {
    this.setState(() => ({
      quizEnd: false,
      counter: 0,
      currentCardNumber: 0
    }))
  }

  incrementCounter = (currentCardNumber, deck) => {
    this.setState(() => ({ counter: this.state.counter + 1 }))
    this.nextCard(currentCardNumber, deck)
  }

  render() {
    const { deck, toggleAnswer, currentCardNumber, quizEnd, counter, opacity } = this.state

    return quizEnd ? (
      <Animated.View style={[styles.container, { opacity }]}>
        <View>
          <Text>
            You scored{' '}
            {`${parseFloat(
              (counter / deck.questions.length * 100).toFixed(2),
            )}%`}
          </Text>
          <Text>
            {counter / deck.questions.length * 100 >= 75
              ? "Great job!"
              : "Study a bit more and take the quiz again!"}
          </Text>
        </View>
        <Button onPress={() => this.toHome(deck.title)}>
          Back to Decks
        </Button>
        <Button onPress={() => this.restartQuiz()}>
          Restart Quiz
        </Button>
      </Animated.View>
    ) : (
      <ScrollView>
        <Animated.View style={[styles.container, { opacity }]}>
          <Text>Quiz</Text>
          <Text>
            Question {`${currentCardNumber + 1} of ${deck.questions.length}`}
          </Text>
          <View>
            <Text>
              {toggleAnswer
                ? deck.questions[currentCardNumber].answer
                : deck.questions[currentCardNumber].question}
            </Text>
          </View>
          <Button onPress={() => this.flipCard(toggleAnswer)}>
            {!toggleAnswer ? 'Show Answer' : 'Show Question'}
          </Button>
          <View>
            <Text style={{ textAlign: 'center' }}>
              Your answer is:
            </Text>
            <Button onPress={() => this.incrementCounter(currentCardNumber, deck)}>
              Correct
            </Button>
            <Button onPress={() => this.nextCard(currentCardNumber, deck)}>
              Incorrect
            </Button>
          </View>
        </Animated.View>
      </ScrollView>
    )
  }
}

export default Quiz
