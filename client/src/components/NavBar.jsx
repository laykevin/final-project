import { Outlet, Link } from "react-router-dom"

export default function NavBar () {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#!">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              {/* <a className="nav-link" href="#!">Home <span className="sr-only"></span></a> */}
              <Link className="nav-link" to='/'>Home</Link>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link" href="#!">Catalog</a> */}
              <Link className="nav-link" to="/catalog">Catalog</Link>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link" href="#!">My Cart</a> */}
              <Link className="nav-link" to="/mycart">My Cart</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#!">Disabled</a>
            </li>
          </ul>
          <form className="form-flex form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
      <Outlet />
    </>
  )
}
