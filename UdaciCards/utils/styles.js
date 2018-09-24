import { StyleSheet, Platform } from 'react-native'
import { white, black, gray, orange, blue, red, green } from './colors'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headers: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 8,
    letterSpacing: 0.7,
    color: black,
  },
  input: {
    height: 40,
    width: 300,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: Platform.OS === 'ios' ? white : 'transparent',
    borderColor: Platform.OS === 'ios' ? gray : white,
    borderRadius: Platform.OS === 'ios' ? 3 : 0,
    borderWidth: Platform.OS === 'ios' ? 1 : 0
  },
  button: {
    backgroundColor: orange,
    width: 150,
    marginTop: 20,
    borderRadius: Platform.OS === 'ios' ? 3 : 0,
    overflow: 'hidden',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 12,
    paddingBottom: 12,
    textAlign: 'center',
    color: white,
    fontSize: 18,
    fontWeight: Platform.OS === 'ios' ? '500' : '300'
  },
  deckView: {
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 3
    },
    backgroundColor: white,
  },
  deckTitle: {
    color: orange,
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: .7
  }
})
