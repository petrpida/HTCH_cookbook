import logo from './logo.svg';
import './App.css';

const title = "Cookbook App"


function App() {
  return (
    <div className="App">
        <h1>{title}</h1>
        <div className='box'>
            <p>Welcome to my very first {title} made with React!</p>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    </div>
  );
}

export default App;
