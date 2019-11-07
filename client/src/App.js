import React from "react";
import Chat from "./components/Chat";
import Join from "./components/Join";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import "./App.css";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" exact component={Join} />
          <Route path="/chat" component={Chat} />
        </Router>
      </Provider>
    );
  }
}

export default App;
