import { Scroll, Timer } from 'phosphor-react';
import { HeaderContainer } from './styles';

import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="Two triangles forming the ignite logo" />
      <nav>
        <NavLink to="/" title="Home">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
