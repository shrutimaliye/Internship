import {React} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import TypeWriter from '../parts/TypeWriter'
import CoverVideo from '../parts/CoverVideo';
import Navigation from '../parts/Navigation';


const Section = styled.section`
min-height: ${props => `calc(100vh - ${props.theme.navHeight})`};
width: 100vw;
position: relative;
background-color: ${props => props.theme.body};


`

const Container = styled.div`
width: 75%;
min-height: 85vh;
margin:0 auto;
${'' /* background-color: lightblue; */}
display: flex;
justify-content: center;
align-items:center;
`
const Box = styled.div`
width:50%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const ButtonContainer = styled.div`
width: 80%;
align-self: flex-start;
`

function Home() {
  
  return (
    <div>
       <Section id = "home">
       <Navigation></Navigation>
      <Container>
      <Box><TypeWriter/>
      <ButtonContainer>
      <Link to="/AdminLogin">
                <button>Admin</button>
        </Link>
        <br />
        <Link to="/Userlogin">
                <button>User</button>
        </Link>
      </ButtonContainer>
      </Box>
      <Box><CoverVideo/></Box>
      
      </Container>
    </Section>     
    </div>
  )
}

export default Home