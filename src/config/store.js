import { createStore, applyMiddleware,compose } from 'redux';
import reduxThunk from "redux-thunk";
import reducers from './reducers/';
let devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
    devTools = a => a;};
const enhancer = compose(
    applyMiddleware(reduxThunk),
    devTools,
    // other store enhancers if any
  );
export const store = createStore(reducers,enhancer);