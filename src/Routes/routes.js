import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookDetail from "../Components/BookDetail";
import Favorites from "../Components/Favorites";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import { auth } from '../Pages/Config';

const Rotas = () => {
  const [user, setUser] = React.useState(null);

  // Cek apakah user sudah login dengan akun Google atau login manual
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        const logado = localStorage.getItem('@user');
        if (logado) {
          setUser(logado);
        } else {
          setUser(null);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Jika user telah login dengan akun Google atau login manual, tampilkan Home */}
        {user && <Route path="/" exact element={<Home />} />}

        {/* Jika user belum login, tampilkan Login dan Register */}
        {!user && <Route path="/" element={<Login />} />}
        {!user && <Route path="/register" element={<Register />} />}

        <Route path="/favorites" element={<Favorites />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
