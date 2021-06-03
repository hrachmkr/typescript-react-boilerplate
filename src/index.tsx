import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './redux/store'

const store = configureStore()

import { App } from './containers'

ReactDOM.render(
  <Provider store={store}>
    <App name="Gago" />
  </Provider>,

  document.getElementById('root')
)
