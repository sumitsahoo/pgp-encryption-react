import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import FileEncrypter from './pages/FileEncrypter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <FileEncrypter/>
  )
}

export default App
