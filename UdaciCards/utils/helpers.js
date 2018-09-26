import React from 'react'
import { View, AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

export function formatQuestions(questionsResults) {
  const qr = questionsResults

  if (qr === 1) {
    return `${qr} card`
  }
  return `${qr} cards`
}

const NOTIFICATION_KEY = 'UdaciCards:notifications'

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

export function getDailyReminderValue() {
  return {
    today: "Don't forget to take a quiz!"
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

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}
