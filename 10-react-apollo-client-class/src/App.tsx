import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useGetPostsQuery } from "./Types";
import { AuthProvider } from "./contexts";
import { Dashboard } from "./views/Dashboard";

function App() {
  const { data, loading, error } = useGetPostsQuery();
  console.log({ data, loading, error });
  return (
    <AuthProvider>
      <div className="App">
        <Dashboard />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </AuthProvider>
  );
}

export default App;
