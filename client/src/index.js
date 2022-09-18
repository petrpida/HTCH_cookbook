import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import IngredientsListPage from "./routes/IngredientsListPage";
import RecipeDetailPage from "./routes/RecipeDetailPage";
import RecipesListPage from "./routes/RecipesListPage";
import HomePage from "./routes/HomePage";
import {UserProvider} from "./UserProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route path="" element={<HomePage/>}/>
                        <Route path="recipesListPage" element={<RecipesListPage/>}/>
                        <Route path="recipeDetailPage" element={<RecipeDetailPage/>}/>
                        <Route path="ingredientsListPage" element={<IngredientsListPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </UserProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
