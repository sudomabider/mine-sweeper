import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import { gridReducer, boardReducer } from './reducers'
import App from './components/App'

const appReducer = combineReducers({
    gridReducer,
    boardReducer
});

let store = createStore(appReducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)