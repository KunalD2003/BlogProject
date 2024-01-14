import React from 'react'
import { Container, Logo, LogoutBtn } from '../index.js'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'

function Header() {
  const authStatus = useSelector((state) => {
    return state.auth.status
  })
  const [activeNavItem, setActiveNavItem] = useState(null);
  const navigate = useNavigate()

  const handleNavItemClick = (item) => {
    navigate(item.slug);
    setActiveNavItem(item.name);
  };
  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus
    }
  ]
  return (
    <header className='py-3 shadow bg-red-500'>
  <Container>
    <nav className='flex items-center justify-between'>
      <div className='ml-6 text-white font-bold font-serif text-2xl'>
        <Link to='/'>
          <Logo width='70px' />
        </Link>
      </div>
      <ul className='flex ml-auto'>
        {navItems.map(
          (item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => handleNavItemClick(item)}
                  className={`inline-block px-6 py-2 duration-200 rounded-full ${
                    activeNavItem === item.name
                      ? 'bg-white text-black'
                      : 'hover:bg-blue-100 text-white hover:text-black'
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ) : null
        )}
        {authStatus && (
          <li className='text-white hover:text-black'>
            <LogoutBtn />
          </li>
        )}
      </ul>
    </nav>
  </Container>
</header>


  )
}

export default Header