import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Container from '@material-ui/core/Container'
import App from './App'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <Container>
      <App />
    </Container>
  </Provider>
  , document.getElementById('root'))