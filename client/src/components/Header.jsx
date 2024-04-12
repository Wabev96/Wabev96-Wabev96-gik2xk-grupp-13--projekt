import * as React from 'react';

import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authAtom } from '../atoms/authAtom';
import { useCart } from '../features/Cart/useCart';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Button, Badge } from 'react-bootstrap';

const pages = [
  {
    name: 'Products',
    path: '/products',
  },
  {
    name: 'Cart',
    path: '/cart',
  },
  {
    name: 'Admin',
    path: '/admin',
  },
];

function Header() {
  const navigate = useNavigate();
  const [{ isAuthenticated }, setState] = useRecoilState(authAtom);

  const { cart } = useCart();
  const [totalProduct, setTotalProduct] = React.useState(0);
  React.useEffect(() => {
    if (cart) {
      setTotalProduct(
        cart?.cartRows?.reduce((acc, curr) => acc + curr.amount, 0)
      );
    }
  }, [cart]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setState({
      isAuthenticated: false,
      user: null,
    });
    location.assign('/');
  };

  return (
    <>
      <Navbar
        sticky='top'
        collapseOnSelect
        expand='lg'
        bg='dark'
        data-bs-theme='dark'
        className='bg-body-tertiary'
      >
        <Container>
          <Link to='/' style={{ border: 'none', textDecoration: 'none' }}>
            <Navbar.Brand href='#home'>My Technology</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'></Nav>
            <Nav>
              {pages.map((page) => (
                <Nav.Link>
                  <NavLink style={{ textDecoration: 'none' }} to={page.path}>
                    {page.name}
                    {page.name === 'Cart' && totalProduct > 0 && (
                      <Badge style={{ marginLeft: '5px' }} bg='primary'>
                        {totalProduct}
                      </Badge>
                    )}
                  </NavLink>
                </Nav.Link>
              ))}
              {isAuthenticated && (
                <Button onClick={handleLogout} variant='primary'>
                  Logout
                </Button>
              )}
              {!isAuthenticated && (
                <Button
                  onClick={() => {
                    navigate('/auth');
                  }}
                  variant='primary'
                >
                  Login
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default Header;
