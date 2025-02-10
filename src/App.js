import React, { useState } from 'react'                                                                                 
import { InputSnowTelegram } from './features/snow/inputTelegram'                                                     
import Container from 'react-bootstrap/Container';                                                                      
import Navbar from 'react-bootstrap/Navbar'                                                                             
import logo from './components/images/logo2015_2.png'                                                                   
import Card from 'react-bootstrap/Card'                                                                                 
import Button from 'react-bootstrap/Button'

function App() {
  const currentUrl = window.location.href                                                                                        
  const [show, setShow] = useState(false)                                                                                 
  const about = show? <Card className='text-center' bg='success' >                                                          
    <Card.Body>                                                                                                               
      <Card.Title>УГМС ДНР</Card.Title>                                                                                       
      <Card.Text>Дата сборки 2025-02-07</Card.Text>                                                                           
      <Button onClick={()=>setShow(false)} variant='info'>Закрыть</Button>                                                  
    </Card.Body>                                                                                                          
  </Card> : null
  return (
    <div >                                                                                                                    
      <Navbar bg="primary" data-bs-theme="dark" expand="lg">                                                                    
        <Container>                                                                                                               
          <Navbar.Brand href="#home">                                                                                               
            <img                                                                                                                      
              src = {logo}                                                                                                            
              width="50"                                                                                                              
              height="50"                                                                                                             
              alt="UGMS logo"                                                                                                         
              onClick={()=>setShow(true)}                                                                                           
            />{'  '}                                                                                                                
            Гидрометцентр ДНР                                                                                                     
          </Navbar.Brand>                                                                                                       
        </Container>                                                                                                          
      </Navbar>                                                                                                               
      {about}                                                                                                                 
      <InputSnowTelegram  currentUrl={currentUrl}/>                                                                            
    </div>
  );
}

export default App;
