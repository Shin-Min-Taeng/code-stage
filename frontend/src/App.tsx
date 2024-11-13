import React from 'react';
import CodeStagePage from "./view/codestage/CodeStagePage";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './index.css';
import HomePage from "./view/home/HomePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/code-stage'} element={<CodeStagePage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
