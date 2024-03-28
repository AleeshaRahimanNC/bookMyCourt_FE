import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Routing from "./components/Routing";
import Loader from "./components/common/Loader/Loader";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <>
      <ToastContainer/>
      {/*<Loader/>*/}
      <Routing/>
    </>
  );
}

export default App;
