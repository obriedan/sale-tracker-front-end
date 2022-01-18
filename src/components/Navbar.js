import { Link } from 'react-router-dom';

// styles & images
import './Navbar.css';
import Logo from '../assets/Logo.svg';

export default function Navbar() {
  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <img src={Logo} alt='App Logo' />
          <span>Sale Genie</span>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/signup'>Signup</Link>
        </li>

        <li className='avatar'>
          <img src='' alt='' />
        </li>
        <li>
          <button>Logout</button>
        </li>
      </ul>
    </div>
  );
}
