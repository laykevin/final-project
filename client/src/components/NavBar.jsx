import { Outlet, Link } from "react-router-dom"
import AppContext from "./AppContext"
import { useContext } from "react";

export default function NavBar () {
  const { user } = useContext(AppContext);
  const { handleSignOut } = useContext(AppContext);
  return (
    <>
      <nav className="navbar navbar-expand-lg black-bg-img">
        <div className="container">
          <a className="navbar-brand text-white" href="#!">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span style={{ color: 'white' }} className="navbar-toggler-icon bs-"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
              <div className="d-flex">
                <li className="nav-item">
                  <Link className="nav-link active text-white" to='/'>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/catalog">Catalog</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white position-relative" to="/mycart">
                    My Cart
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    99+
                    <span className="visually-hidden">unread messages</span>
                  </span></Link>
                </li>
              </div>
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0 d-flex">
              <li className="nav-item dropdown">
                  { user && <a className="nav-link dropdown-toggle text-white" href="!#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {user.username}
                  </a>}
                  <ul className="dropdown-menu">
                    <li>
                    <Link to="/orderhistory" className="dropdown-item">Order History</Link>
                    </li>
                    <li><a className="dropdown-item" href="!#">Another action</a></li>
                    <li><hr className="dropdown-divider" /></li>
                  {user &&
                    <button className="btn btn-dark" onClick={handleSignOut}>
                      Sign out
                    </button>
                  }
                  </ul>
                </li>
              </ul>
            <div>
              {!user &&
                <>
                  <Link to="/signin" className="btn btn-primary">
                    Sign In
                  </Link>
                  <Link to="/signup" className="btn btn-dark">
                    Sign Up
                  </Link>
                </>
              }
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  )
}
