import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../lib';

export function SignIn( {onSignIn} ) {
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
      const res = await fetch('/api/auth/sign-in', req);
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      onSignIn(result);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  }

  function demoAccountSignIn () {
    setUsername('demo');
    setPassword('123');
  }

  return (
    <div className="container black-bg-img flex-grow-1">
      <div className="py-5 text-center text-white">
        <h2>Please Sign In to Continue</h2>
      </div>
      <form id="sign-up-form" className="p-4 col-md-6 col-12 rounded bg-none m-auto" onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <div className="form-floating">
            <input required type="text" className="form-control" id="inputUsername" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="inputUsername">Username</label>
          </div>
        </div>
        <div className="input-group mb-3">
          <div className='form-floating'>
          <input required type="password" className="form-control" id="inputPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label htmlFor="inputPassword">Password</label>
        </div>
        </div>
        <div className='d-flex justify-content-between align-items-center mt-5'>
          <button type="submit" className="btn btn-primary">Sign In</button>
          <button type="submit" className="btn btn-primary" onClick={demoAccountSignIn}>Use Demo Account</button>
          <Link to="/signup">Don't have an account? Sign Up</Link>
        </div>
        {error && <div style={{ color: 'red' }}>⚠️{error}⚠️</div>}
      </form>
    </div>
  );
};
