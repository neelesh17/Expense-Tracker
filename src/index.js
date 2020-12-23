import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from './context/context';
import { SpeechProvider } from  '@speechly/react-client';
import './index.css';

ReactDOM.render(
  <SpeechProvider appId="4e202d14-992b-4af0-81cb-a72bee726f6f" language="en-US">
    <Provider>
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById('root')
);
