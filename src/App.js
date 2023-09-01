import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import HomePage from './components/HomePage';
import AddItemPage from './components/AddItemPage';
import ShoppingListPage from './components/ShopingListPage';
import EditItemPage from './components/EditItemPage';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" exact element={<HomePage/>} />
          <Route path="/add" element={<AddItemPage/>} />
          <Route path="/list" element={<ShoppingListPage/>} />
          <Route path="/edit/:itemId" element={<EditItemPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
