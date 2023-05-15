import 'antd/dist/reset.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import CollectorsResponse from './Components/Collector/CollectorResponse';
import AddCollector from './Components/Collector/AddCollector';
import UpdateCollector from './Components/Collector/UpdateCollector';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/collector-response" element = {<CollectorsResponse/>}/>
        <Route path="/add-collector" element = {<AddCollector/>}/>
        <Route path="/update-collector/:id" element = {<UpdateCollector/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
