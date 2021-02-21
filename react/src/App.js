import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Search from './components/search';
import Login from './containers/login';



function App() {
  return (
    <div className="App">
      <>
        <Router>

          <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">Login </Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/search">Search </Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <Route exact path="/" component={Login}></Route>
            <Route exact path="/search" component={Search}></Route>
          </div>
        </Router>
      </>
    </div>
  );
}

export default App;


