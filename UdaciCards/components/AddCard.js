import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, KeyboardAvoidingView, Animated, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { addCard } from '../actions'
import { addCardToDeck } from '../utils/helpers'
import { styles } from '../utils/styles'
import { Button } from './Button'

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
    title: '',
    opacity: new Animated.Value(0)
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

  // handleChange(type, value) {
  //   this.setState({
  //     [type]: value
  //   })
  // }

  handleAddCard = (title) => {
    const { question, answer } = this.state

    return addCardToDeck(title, question, answer)
      .then(() => this.returnToDeck(this.state.title, question, answer))
  }

  returnToDeck = (item, question, answer) => {
    const { navigate, dispatch } = this.props.navigation
    const resetNavAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'MainView' })]
    })
    dispatch(resetNavAction)
    navigate('DeckItem', { item })
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
        <Button style={styles.button} onPress={() => this.addCardToDeck(this.props.navigate.state.params.item)}>
          Add Card
        </Button>
      </Animated.View>
    )
  }
}

export default connect()(AddCard)
