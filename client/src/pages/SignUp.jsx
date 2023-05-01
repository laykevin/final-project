import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../components/AppContext';

export default function SignUp () {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [error, setError] = useState('');

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
        body: JSON.stringify({ username, password, email}),
      };
      console.log(req);
      const res = await fetch('/api/auth/sign-up', req);
      const result = await res.json();
      if (!res.ok) {
        console.log(result.error);
        throw new Error(result.error)
      }
      navigate('/signin');
      console.log(result);
    } catch (err) {
      console.error(err);
      console.log(err.message);
      setError(err.message);
    }
  }

  return (
    <div className="container black-bg-img text-white flex-grow-1">
      <div className="py-5 text-center">
        <h2>Sign Up</h2>
      </div>
      <form id="sign-up-form" className="p-5 w-50 bg-light m-auto" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="inputusername">Username</label>
          <input required type="text" className="form-control" id="inputusername" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail">Email address</label>
          <input required type="email" className="form-control" id="inputEmail" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input required type="password" className="form-control" id="inputPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
        <Link to="/signin">Already have an account? Sign In</Link>
        <p className="text-danger">{error && `⚠️${error}⚠️`}</p>
      </form>
      </div>
  );
};
