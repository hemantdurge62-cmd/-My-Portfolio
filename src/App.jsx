import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MyOwnInfo from './components/Myowninfo'
import LinkedinCard from './components/LinkedinCard'
import Project from './components/Project'
import Certificate from './components/Certificate'
import Resume from './components/Resume'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import AdminPanel from './components/AdminPanel'

const App = () => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showLinkedinModal, setShowLinkedinModal] = useState(false);

  return (
    <div className="app-container">
      {/* Background Ambient Glows */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>
      
      <Navbar />
      <Hero />
      <MyOwnInfo />
      <Project />
      <Certificate />
      <Resume />
      <ContactSection />
      <Footer 
        onOpenAdmin={() => setShowAdminPanel(true)} 
        onOpenLinkedin={() => setShowLinkedinModal(true)} 
      />

      {/* Admin Panel Overlay */}
      {showAdminPanel && <AdminPanel onClose={() => setShowAdminPanel(false)} />}

      {/* LinkedIn Profile Overlay */}
      {showLinkedinModal && <LinkedinCard onClose={() => setShowLinkedinModal(false)} />}
    </div>
  )
}

export default App
