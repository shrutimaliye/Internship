import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LogoImage from '../assets/logo1.png'

const LogoText = styled.h1`
  font-family: 'Akaya Telivigala', cursive;
  font-size: ${props => props.theme.fontxxxl};
  color: ${props => props.theme.text};
  transition: all 0.2s ease;
  &:hover{
    transform: scale(1.1);
  }
   display: inline-block; /* Ensures that the container only takes the necessary width */
  height: 100%; /* Adjust the height as needed */
  margin-right: 10px; /* Add margin for spacing if necessary */
  
  img {
    height: 100%; /* Make sure the image fills the height of the container */
    width: auto; /* Allow the width to adjust proportionally */
    display: block; /* Remove any default inline spacing */
  }
`;

const Logo = () => {
  return (
    <LogoText>
      <Link to = "/">
      <img src={LogoImage} alt="Logo" />
      </Link>
    </LogoText>
  );
};

export default Logo;
