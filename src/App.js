import './App.css';

import { Tabs } from 'antd';

import TeamPage from './components/TeamPage'

function App() {
  return (
    <div className="App">
      <h1>Team management</h1>
      <Tabs
        defaultActiveKey="4"
        centered
        items={[
          {
            label: `General`,
            key: '1',
            children: `Content of General`,
          },
          {
            label: `Gnosis Safe`,
            key: '2',
            children: `Content of Gnosis Safe`,
          },
          {
            label: `Email Notification`,
            key: '3',
            children: `Content of Email Notification`,
          },
          {
            label: `Team`,
            key: '4',
            children: <TeamPage/>,
          },
        ]}
      />
    </div>
  );
}

export default App;
