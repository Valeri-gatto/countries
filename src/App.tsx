import { Route, Routes } from 'react-router-dom'
import './App.css'
import Content from './Content'
import Layout from './Layout'
import Details from './Details'

function App() {
  return (<>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Content />} />
        <Route path=':country' element={<Details />} />
      </Route>
    </Routes>
  </>
  )
}

export default App
