import { Header, Footer } from "./components"
import { AllRoutes } from './routes/AllRoutes';
import './App.css';

function App() {
  return (
    <div className="App dark:bg-darkbg">
      <Header/>
      <AllRoutes/>
      <Footer/>   
    </div>
  );
}

export default App;
