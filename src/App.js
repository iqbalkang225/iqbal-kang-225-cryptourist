import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CoinPage from './pages/CoinPage';
import Home from './pages/Home';
import CoinProvider from './context/coin-context';
import WatchList from './components/WatchList';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = ":id" element = {<CoinProvider> <CoinPage /> </CoinProvider>} />
        <Route path = "watchlist" element = { <WatchList /> } />
      </Routes>

    </div>
  );
}

export default App;
