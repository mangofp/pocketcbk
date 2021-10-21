import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import RecipeList  from './RecipeList';
import Recipe from './Recipe'
import { matchPath } from "react-router";

function App() {
  return (
    <Router>
    <div className="App">
      <h1>My Pocket Cookbook</h1>
    </div>
    <Switch>
      <Route exact path={`/pocketcbk/`} ><RecipeList/></Route>
      <Route path={`/pocketcbk/recipe/:recipeId`}><Recipe/></Route>
    </Switch>
    </Router>
  );
}


export default App;
