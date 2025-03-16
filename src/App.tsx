
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import ListMenu from "./ListMenu";
import AddRecipe from "./AddRecipe";
import RecipeDetail from "./RecipeDetail";
import EditRecipe from "./EditRecipe";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list-menu" element={<ListMenu />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/edit-recipe/:id" element={<EditRecipe />} />
      </Routes>
    </Router>
  );
};

export default App;
