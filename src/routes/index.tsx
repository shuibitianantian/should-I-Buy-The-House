import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HouseAnalyzing from "../pages/HouseAnalyzing";
import Layout from "../components/Layout";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/should-i-buy-the-one" element={<HouseAnalyzing />} />
    </Route>
  )
);
