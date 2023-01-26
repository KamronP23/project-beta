import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <div className="dropdown">
              <NavLink className="btn btn-secondary dropdown-toggle bg-success" to="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                Autos
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li><NavLink className="dropdown-item" to="/manufacturers">Manufacturers</NavLink></li>
                <li><NavLink className="dropdown-item" to="/manufacturers/new">Create a new manufacturer</NavLink></li>
                <li><NavLink className="dropdown-item" to="/models">Models</NavLink></li>
                <li><NavLink className="dropdown-item" to="/models/new">Create a new model</NavLink></li>
                <li><NavLink className="dropdown-item" to="/automobiles">Automobiles</NavLink></li>
                <li><NavLink className="dropdown-item" to="/automobiles/new">Create a new automobile</NavLink></li>
              </ul>
            </div>
            <div className="dropdown">
              <NavLink className="btn btn-secondary dropdown-toggle bg-success" to="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                Services
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li><NavLink className="dropdown-item" to="/services">List all active service appointments</NavLink></li>
                <li><NavLink className="dropdown-item" to="/services/new">Enter a new service appointment</NavLink></li>
                <li><NavLink className="dropdown-item" to="/technicians/new">Create a technician employee</NavLink></li>
                <li><NavLink className="dropdown-item" to="/services/history">List all service records by VIN</NavLink></li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
