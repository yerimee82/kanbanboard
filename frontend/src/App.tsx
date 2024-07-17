import React from 'react';
import Header from './components/Header'
import './styles/global.scss'
import StatusBar from './components/StatusBar'
import Card from './components/Card/Card'
import KanbanList from './components/KanbanList'


function App() {

  return (
    <>
      <Header/>
      <div className="boardContainer">
      <KanbanList>
        <StatusBar color="red" title="Pending" count={1} />
        <Card title="Test" description="안녕하세요" />
      </KanbanList>
      <KanbanList>
        <StatusBar color="orange" title="In Progress" count={2} />
        <Card title="Test 2" description="진행 중입니다" />
      </KanbanList>
      <KanbanList>
        <StatusBar color="green" title="Completed" count={3} />
        <Card title="Test 3" description="완료되었습니다" />
      </KanbanList>
      </div>
    </>
  )
}

export default App
