import { useState } from 'react'
import '../styles/App.css'
import Footer from './Footer'
import BoardDisplay from './BoardDisplay'
import Header from './Header.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <main>
        <BoardDisplay/>
      </main>
      <Footer/>
    </>
  )
}

export default App
