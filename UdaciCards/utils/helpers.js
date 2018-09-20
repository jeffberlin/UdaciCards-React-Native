import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Notifications, Permissions } from 'expo'
import { CARDS_STORAGE_KEY } from './api'

const NOTIFICATION_KEY = 'UdaciCards:notifications'

export function getDecks() {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY)
    .then(results => {
      return (
        results ? JSON.parse(results) : defaultDeck()
      )
    })
}

export function getDeck(id) {
  return getDecks().then((decks) => (decks[id]))
}

export function saveDeckTitle(deckTitle) {
  return getDecks().then((decks) => {
    if (!decks[deckTitle]) {
      decks[deckTitle] = {
        title: deckTitle,
        questions: []
      }

      AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(decks))
      return decks
    }
  })
}

export function addCardToDeck(title, { question, answer }) {
  return getDecks().then((decks) => {
    if (decks[title] && decks[title]['questions']) {
      decks[title]['questions'].push({ question, answer })
    }

    AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(decks))
    return decks
  })
}

export function createNotification() {
  return {
    title: 'Start studying!',
    body: "Don't forget to study and take a quiz!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() * 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
