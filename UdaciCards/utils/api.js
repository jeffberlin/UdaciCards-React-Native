import { AsyncStorage } from 'react-native'

export const CARDS_STORAGE_KEY = 'UdaciCards:cards'

let defaultDeck = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

function setDefaultDeck() {
  AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(defaultDeck))

  return defaultDeck
}

export function formatDeckResults(results) {
  return results === null
    ? setDefaultDeck()
    : JSON.parse(results)
}

export function getDecks() {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY)
    .then(formatDeckResults)
}

export function getDeck(item) {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY)
    .then(formatDeckResults)
    .then(results => results[item])
}

export function saveDeckTitle(title, key) {
  return AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }))
}

export function addCardToDeck(title, info) {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY)
    .then(data => {
      decks = JSON.parse(data)
      decks[title].questions.push(info)
      AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(decks))
    })
}
