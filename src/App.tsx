import { useSelector } from 'react-redux';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './pages/Login';
import CreatePlaylist from './pages/CreatePlaylist';
import Playlist from './pages/Playlist';

function App() {
  const token = useSelector((state:any) => state.accessToken.value);
  // clear local storage
  window.localStorage.clear()
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {!token ? <Login /> : <Redirect to="/create-playlist" />}
        </Route>
        <Route path="/create-playlist">
          <Navbar/>
          {token ? <CreatePlaylist /> : <Redirect to="/" />}
        </Route>
        <Route path="/playlist">
          <Navbar/>
          {token ? <Playlist /> : <Redirect to="/" />}
        </Route>
        <Route path="*">
          <h3>404</h3>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
