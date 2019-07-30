import React, { Fragment } from 'react';
import MainLayout from './layouts/MainLayout';
import TasksPage from './pages/TasksPage';

const App = () => (
  <MainLayout>
      <TasksPage />
  </MainLayout>
);

export default App;
