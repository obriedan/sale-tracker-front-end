import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import Avatar from 'boring-avatars';

// styles & images
import './Navbar.css';
import Logo from '../assets/Logo.svg';

export default function Navbar() {
  const { isPending, logout } = useLogout();
  const { user } = useAuthContext();
  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <img src={Logo} alt='App Logo' />
          <span>Sale Genie</span>
        </li>
        {!user && (
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/signup'>Signup</Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li className='avatar'>
              <Link to='/profile'>
                <Avatar
                  size={40}
                  name={user.uid}
                  variant='beam'
                  colors={['#4E7CB9', '#B1CFF7', '#67A4F5', '#546375', '#5182C2']}
                />
              </Link>
            </li>
            <li>
              {!isPending ? (
                <button onClick={logout}>Logout</button>
              ) : (
                <button disabled>Logging out...</button>
              )}
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
