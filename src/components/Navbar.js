import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

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
              <img src='' alt='' />
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
