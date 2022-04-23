import { useSelector } from 'react-redux';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './pages/Login';
import CreatePlaylist from './pages/CreatePlaylist';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  const token = useSelector((state) => state.accessToken.value);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {!token ? <Login /> : <Redirect to="/create-playlist" />}
        </Route>
        <Route path="/create-playlist">
          {token ? <CreatePlaylist /> : <Redirect to="/" />}
        </Route>
        <Route path="*">
          <h3>404</h3>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
