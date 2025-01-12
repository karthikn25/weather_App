import './App.css'
import Content from './Component/Content/Content'
import Footer from './Component/Footer/Footer'
import Topbar from './Component/Topbar/Topbar'

function App() {

  return (
    <div className='container'>
     <Topbar/>
     <Content/>
     <Footer/>
    </div>
  )
}

export default App
