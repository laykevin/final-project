import { Outlet, Link } from "react-router-dom"
import AppContext from "./AppContext"
import { useContext } from "react";

export default function NavBar () {
  const { user, handleSignOut } = useContext(AppContext);
  return (
    <>
      <nav className="navbar navbar-expand-lg black-bg-img">
        <div className="container">
          <Link className="navbar-brand text-white" to='/'>Mario Mart</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span style={{ color: 'white' }} className="navbar-toggler-icon bs-"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
              <div className="d-flex">
                {/* <li className="nav-item">
                  <Link className="nav-link active text-white" to='/'>Home</Link>
                </li> */}
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/catalog">Items</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/mycart">
                    My Kart
                  {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    99+
                    <span className="visually-hidden">unread messages</span>
                  </span> */}
                  </Link>
                </li>
              </div>
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0 d-flex">
              <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-white" href="!#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {user ? user.username : 'Sign-in/Sign-up'}
                  </a>
                  <ul className="dropdown-menu" style={{ zIndex: 1021 }}>
                    <li>
                    {user ? <Link to="/orderhistory" className="dropdown-item">Order History</Link> : <Link to="/signin" className="dropdown-item">Sign In</Link>}
                    </li>
                  <li>
                    {user && <Link to="/mycart" className="dropdown-item">My Kart</Link>}
                  </li>
                    <li><hr className="dropdown-divider" /></li>
                  {user ?
                    <button className="dropdown-item text-danger" onClick={handleSignOut}>
                      Sign out
                    </button>
                    :
                  <Link to="/signup" className="dropdown-item">Sign Up</Link>
                  }
                  </ul>
                </li>
              </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  )
}
