import React from 'react';
import AppForm from '../components/appComponents/AppForm.jsx';
import AppList from '../components/appComponents/AppList.jsx';
import PathForm from '../components/pathComponents/PathForm.jsx';
import PathList from '../components/pathComponents/PathList.jsx';

const Home = () => {
  return (
    <div>
      <h1>App Manager</h1>
      <AppForm/>
      <AppList />
      <PathForm/>
      <PathList/>
    </div>
  );
};

export default Home;
