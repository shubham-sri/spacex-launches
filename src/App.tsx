import React from 'react';
import {ApolloProvider} from "@apollo/client";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {GRAPHQL_CLIENT} from "./config";
import {AppRoute} from "./routes";

import './App.css'

function App() {
  return (
      <div>
          <ApolloProvider client={GRAPHQL_CLIENT}>
              <AppRoute/>
          </ApolloProvider>
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
      </div>
  );
}

export default App;
