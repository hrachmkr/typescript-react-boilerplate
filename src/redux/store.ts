import { createStore, applyMiddleware, compose, Store } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

import { IApplicationState } from 'reducerTypes/app'
import { IRootAction } from 'actionTypes/index'

const middlewaresToApply = [thunk]

export default function configureStore(): Store<
  IApplicationState,
  IRootAction
> {
  const store = createStore(
    rootReducer,

    // we can skip this lines because there is no type for __REDUX_DEVTOOLS_EXTENSION__
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? compose(
          applyMiddleware(...middlewaresToApply),
          // @ts-ignore
          window.__REDUX_DEVTOOLS_EXTENSION__()
        )
      : applyMiddleware(...middlewaresToApply)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
