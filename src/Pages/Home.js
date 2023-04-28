import React from "react";
import Navbar from "../Components/Navbar";
import '../Styles/home.css';
import BookList from "../Components/BookList";
import Footer from "../Components/Footer";


function Home() {

   
    return (
        <div>
            
            <Navbar />
            <BookList />
            <Footer />
        </div>
    )
}

export default Home; 