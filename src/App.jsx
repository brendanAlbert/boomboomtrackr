import { useState } from 'react'
import Form from './components/form/Form'
import './App.css'
import { Dashboard } from './components/dashboard/Dashboard'

function App() {

  return (
    <>
    <div className="container d-flex flex-column mt-1 p-5 align-items-center">
      <h1>BoomBoomTrackr <span>💩</span></h1>
      <Form />
      <Dashboard />
    </div>
    </>
  )
}

export default App
