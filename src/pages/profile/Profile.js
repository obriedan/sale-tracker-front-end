import { useAuthContext } from '../../hooks/useAuthContext';
import { useState } from 'react';

import { getMessaging, getToken } from 'firebase/messaging';

const publicKey =
  'BHD6mDvdr5XP6BAELtbrYIAFuFn3iliXFAZ8GvhSIjKClq8H7lnVgQWibjZD21Oi9-rip2zLWwKInytOS-JFnMs';

export default function Profile() {
  const messaging = getMessaging();
  const [email, setEmail] = useState(null);
  const [isTokenFound, setIsTokenFound] = useState(false);

  const { user } = useAuthContext();

  getToken(messaging, { vapidKey: publicKey }).then((currentToken) => {});

  return (
    <div className='user-details'>
      <form>
        <label>
          <span>e-mail:</span>
          <input type='text' value={email ? email : user.email} />
        </label>
      </form>
    </div>
  );
}
