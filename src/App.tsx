import React from 'react';
import {ApolloProvider} from "@apollo/client";
import {ToastContainer} from "react-toastify";

import {GRAPHQL_CLIENT} from "./config";
import {AppRoute} from "./routes";

import './App.css'

function App() {
  return (
      <ApolloProvider client={GRAPHQL_CLIENT}>
          <AppRoute/>
          <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
          />
      </ApolloProvider>
  );
}

export default App;
