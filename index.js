import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Layout from './src/layout';
import DreamList from './src/dreamList';

function App() {
  return (
      <Layout>
        <DreamList />
      </Layout>
  
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
