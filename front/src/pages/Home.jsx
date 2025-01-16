import React from 'react';
import AppForm from '../components/appComponents/AppForm.jsx';
import AppList from '../components/appComponents/AppList.jsx';
import PathForm from '../components/pathComponents/PathForm.jsx';
import PathList from '../components/pathComponents/PathList.jsx';
import StartCveFetch from '../components/cveComponents/StartCveFetch.jsx';
import StopCveFetch from '../components/cveComponents/StopCveFetch.jsx';

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-cyan-600">Hello world!</h1>
      <StartCveFetch />
      <StopCveFetch />
      <h1>App Manager</h1>

      <AppForm />
      <AppList />
      <PathForm />
      <PathList />
    </div>
  );
};

export default Home;
