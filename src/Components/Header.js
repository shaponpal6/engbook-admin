import React from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components";

function Header() {
  return (
    <div>
        <MenuItem><Link to='/vocabulary'>Vocabulary</Link></MenuItem>
        <MenuItem><Link to='/home/'>Home</Link></MenuItem>
    </div>
  )
}

const MenuItem = styled.h4`
a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--secondary-color-alt);
    padding: 0.5rem 1rem;
    border-radius: 5px;
    color: var(--accent-color);
}
`

export default Header