
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { FocusCards } from './ui/focus-cards'
import { FocusCardsDemo } from './components/cards'
import Story from './components/Story'
import Feedbacks from './components/feedbacks'
import Partners from './components/Partners'
import Footer from './components/Footer'

function App() {
  

  return (
    <>
     <main className=' min-h-screen w-screen'>
       <Navbar/>
       <Hero/>
       <FocusCardsDemo/>
        
       <Feedbacks/>
       <Story/>
       <Partners/>
       <Footer/>
       
     </main>
    </>
  )
}

export default App
