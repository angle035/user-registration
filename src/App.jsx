import React, { useState } from 'react'
import { Button, message, Steps, theme } from 'antd';
import UserRegistration from './project/login/multistepUserRegistration'

 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      <UserRegistration></UserRegistration>
    </>
  )
}

export default App
