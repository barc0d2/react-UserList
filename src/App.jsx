import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './assets/context/UserContext'

import UserList from './assets/pages/UserList'
import UserDetail from './assets/pages/UserDetail'
import UserRegistration from './assets/pages/UserRegistration'
import NotFound from './assets/pages/NotFound'

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/user" element={<UserRegistration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

// 여기서 바로 렌더링까지!
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

export default App
