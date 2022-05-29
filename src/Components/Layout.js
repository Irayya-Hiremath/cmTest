import React from 'react'
import { Container } from 'react-bootstrap'


function Layout({children}) {
  return (
    <Container className='layout'>


        {children}

       

    </Container>
  )
}

export default Layout