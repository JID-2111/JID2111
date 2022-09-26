import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './scss/App.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import Execute from './components/Execute';
import Home from './components/Home';
import NewConnections from './components/NewConnections';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/execute" element={<Execute />} />
        <Route path="newconnection" element={<NewConnections />} />
      </Routes>
    </Router>
  );
}
