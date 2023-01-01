import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login, Home } from './pages';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
