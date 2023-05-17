import 'antd/dist/reset.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import CollectorsResponse from './Components/Collector/CollectorResponse';
import AddCollector from './Components/Collector/AddCollector';
import UpdateCollector from './Components/Collector/UpdateCollector';
import AssignWorkResponse from './Components/AssaignWork/AssignWorkResponse';
import AddAssignWork from './Components/AssaignWork/AddAssignWork';
import UpdateAssignWork from './Components/AssaignWork/UpdateAssignWork';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/collector-response" element = {<CollectorsResponse/>}/>
        <Route path="/add-collector" element = {<AddCollector/>}/>
        <Route path="/update-collector/:id" element = {<UpdateCollector/>}/>
        <Route path="/work-response" element = {<AssignWorkResponse/>}/>
        <Route path="/add-work" element = {<AddAssignWork/>}/>
        <Route path="/update-work/:id" element = {<UpdateAssignWork/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
