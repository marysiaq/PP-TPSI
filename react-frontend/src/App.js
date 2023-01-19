
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import AddRecipe from './components/AddRecipe';
import UploadFile from './components/UploadFile';
import ShowRecipe from './components/ShowRecipe';
import RecipeList from './components/RecipeList';
import Layout from './components/Layout';
import Error404 from './components/Error404';
import EditRecipe from './components/EditRecipe';
import Error500 from './components/Error500';



function App() {
  return (
    <><BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="recipelist" element={<RecipeList />} />
        <Route path="recipelist/details/:id" element={<ShowRecipe/>}/>
        <Route path="recipelist/edit/:id"  element={<EditRecipe/>}/>
        <Route path="recipelist/add" element={<AddRecipe/>}/>
        <Route path="/error404" element={<Error404/>}/>
        <Route path="/error500" element={<Error500/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
