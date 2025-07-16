import React, { useEffect, useState } from 'react'                                                                                 
import Container from 'react-bootstrap/Container';                                                                      
import Navbar from 'react-bootstrap/Navbar'           
import { Routes, Route } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'                                                                  
import logo from './components/images/logo2015_2.png'                                                                   
import Card from 'react-bootstrap/Card'                                                                                 
import Button from 'react-bootstrap/Button'
import { SnowReactForm } from './features/snow/snowReactForm'
import { InputPrecipitation } from './features/precipitation/inputPrec';
// import { LastPrecipitation } from './features/precipitation/lastPrecipitation';
import 'bootstrap/dist/css/bootstrap.min.css'

const currentUrl = window.location.href         
const pointCode = (currentUrl.indexOf('pointCode')>-1)? currentUrl.slice(-5):'99999'
const hydroPoints = {
  '99999': 'Тестовый',
  '83028': 'Авдотьино',
  '83035': 'Раздольное',
  '83040': 'Николаевка',
  '83056': 'Стрюково',
  '83060': 'Дмитровка',
  '83068': 'Новоселовка',
  '83074': 'Благодатное',
  '83083': 'Алексеево-Орловка',
  '83050': 'Кременевка',
  '83026': 'Захаровка'
}
const pointName = hydroPoints[pointCode]
function App() {
  useEffect(() => {
    document.title = (currentUrl.indexOf('precipitation')>-1)? 'Осадки':'Снегосъемка'
  }, [])
  // const currentUrl = window.location.href         
  // const pointCode = (currentUrl.indexOf('pointCode')>-1)? currentUrl.slice(-5):'99999'
  
  const [show, setShow] = useState(false)            
  const firstPage = (currentUrl.indexOf('precipitation')>-1)? <InputPrecipitation pointName={pointName}/>:<SnowReactForm pointCode={pointCode}/>
  const about = show? <Card className='text-center' bg='success' >                                                          
    <Card.Body>                                                                                                               
      <Card.Title>УГМС ДНР</Card.Title>                                                                                       
      <Card.Text>Дата сборки 2025-07-16</Card.Text>                                                                           
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
          {about}
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Снег</Nav.Link>
              <Nav.Link href="/features/precipitation">Осадки</Nav.Link>
            </Nav>
          </Navbar.Collapse> */}
        </Container>                                                                                                          
      </Navbar>                                                                                                               
      <Routes>
        <Route path="/" element={null}/>
        {/* <Route path="/precipitation" element={<InputPrecipitation pointName={pointName}/>} /> */}
        {/* <Route path="/precipitationList" element={<LastPrecipitation />} /> */}
      </Routes>
      {firstPage}
      {/* {about} */}
      {/* <InputSnowTelegram  currentUrl={currentUrl}/>                                                                             */}
      {/* <SnowReactForm pointCode={pointCode}/> */}
      {/* <InputPrecipitation pointCode={pointCode}/> */}
      
    </div>
  );
}

export default App;
