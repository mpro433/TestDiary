import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import DairyScreen from './components/screens/DairyScreen';

import reducer from './src/redux/reducer';

const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
        <DairyScreen/>
    </Provider>    
  );
};

export default App;