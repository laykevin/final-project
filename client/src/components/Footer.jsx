import './Carousel.css'
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';

export function Footer () {
  return (
    <footer className="page-footer font-small blue pt-4 black-bg-img">
    <div className="container-fluid text-md-left text-white">
      <div className="row">
        <div className="col-md-5 mt-md-0 mt-3 offset-md-1 text-center">
          <h5 className="text-uppercase">Mario Mart</h5>
          <p>Your one stop shop for all things Mario Kart!</p>
        </div>
        <hr className="clearfix w-100 d-md-none pb-0" />
        <div className="col-md-5 mb-md-0 mb-3">
          <ul className="list-unstyled d-flex justify-content-center">
            <div>
              <li className='my-1'><AiFillLinkedin size={28} /> <a className='footer-links' href="https://www.linkedin.com/in/laykevin/" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li className='my-1'><AiFillGithub size={28} /> <a className='footer-links' href="https://github.com/laykevin" target="_blank" rel="noreferrer">GitHub</a></li>
            </div>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-copyright text-center py-3 text-white">© 2023 Copyright: Kevin Lay
    </div>
  </footer>
  )
}
