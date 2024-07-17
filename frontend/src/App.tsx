import { useState } from 'react'
import Header from './components/Header'
import './styles/global.scss'
import StatusBar from './components/StatusBar'
import Card from './components/Card/Card'


function App() {

  return (
    <>
      <Header/>
      <div className="status-cards">
        <StatusBar color="red" title="Pending" count={1}>
        </StatusBar>
        <StatusBar color="orange" title="In Progress" count={8} />
        <StatusBar color="green" title="Completed" count={3} />
      </div>
      <Card title={'test'} description={'안녕하세요'}></Card>
    </>
  )
}

export default App
