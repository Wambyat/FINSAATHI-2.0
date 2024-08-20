import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import FinancialKnowledgeLevel from './components/FinancialKnowledgeLevel';
import KnowledgeTest from './components/KnowledgeTest';
import BasicLevelUnits from './components/BasicLevelUnits';
import AdvancedLevelUnits from './components/AdvancedLevelUnits';
import BasicUnit4 from './components/BasicUnit4';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/about" element={<CreateCourse/>}/>
                <Route path="/FinancialKnowledgeLevel" element={<FinancialKnowledgeLevel/>}/>
                <Route path="/KnowledgeTest" element={<KnowledgeTest/>}/>
                <Route path="/BasicLevelUnits" element={<BasicLevelUnits/>}/>
                <Route path="/AdvancedLevelUnits" element={<AdvancedLevelUnits/>}/>
                <Route path="/BasicUnit4" element={<BasicUnit4/>} />
            </Routes>
        </Router>
    );
}

export default App;