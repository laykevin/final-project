import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../components/AppContext';

export default function SignIn( {onSignIn} ) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  useEffect(() => {
    user && navigate('/');
  }, [user, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      };
      console.log(req);
      const res = await fetch('/api/auth/sign-in', req);
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
      const result = await res.json();
      onSignIn(result);
      console.log(result);
    } catch (err) {
      setError(err);
      console.error(err);
    }
  }

  return (
    <div className="container black-bg-img text-white flex-grow-1">
      <div className="py-5 text-center">
        <h2>Please Sign In to Continue</h2>
      </div>
      <form id="sign-up-form" className="p-5 w-50 bg-light m-auto" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="inputusername">Username</label>
          <input required type="text" className="form-control" id="inputusername" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input required type="password" className="form-control" id="inputPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
        <Link to="/signup">Don't have an account? Sign Up</Link>
        {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
      </form>
    </div>
  );
};
