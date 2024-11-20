import React from 'react';
import CodeStagePage from "./view/codestage/CodeStagePage";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './index.css';
import HomePage from "./view/home/HomePage";
import NotFountPage from "./view/notfound/NotFoundPage";
import {hello} from "shared";

function App() {
    alert(hello);
    return (
        <Router>
            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/code-stage'} element={<CodeStagePage/>}/>
                <Route path={'*'} element={<NotFountPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
