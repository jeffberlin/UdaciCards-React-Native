import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, KeyboardAvoidingView, Animated, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'
import { addCardToDeck } from '../utils/api'
import { styles } from '../utils/styles'
import { Button } from './Button'

class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      title: '',
      opacity: new Animated.Value(0)
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.item
  })

  componentDidMount() {
    const { opacity } = this.state

    this.setState(() => ({
      title: this.props.navigation.state.params.item
    }))
    Animated.timing(opacity, { toValue: 1, duration: 800 }).start()
  }

  sumbitCard = title => {
    const info = {
      question: this.state.question,
      answer: this.state.answer
    }

    return addCardToDeck(title, info)
      .then(() => this.returnToDecks(this.state.title, info))
  }

  returnToDecks = (item, info) => {
    const { navigate, dispatch } = this.props.navigation
    const resetNavAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })]
    })
    dispatch(resetNavAction)
    navigate('IndividualDeck', { item })
  }

  render() {
    const { opacity } = this.state

    return (
      <Animated.View style={[styles.container, { opacity }]}>
        <Text>Question</Text>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={question => this.setState({ question })}
            value={this.question}
            placeholder={'What\'s your new question?'}
          />
        </View>
        <Text>Answer</Text>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={answer => this.setState({ answer })}
            value={this.answer}
            placeholder={'What\'s the answer?'}
          />
        </View>
        <Button style={styles.button} onPress={() => this.sumbitCard(this.props.navigation.state.params.item)}>
          Add Card
        </Button>
      </Animated.View>
    )
  }
}

export default AddQuestion
