import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/bookdetail.css"
import Navbarpage2 from "./Navbar";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    axios.get(`https://example-data.draftbit.com/books/${id}`)
      .then(response => {
        setBook(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
    <Navbarpage2 />
    <div class="container">
  <div class="row justify-content-center align-items-center" style={{height : "100vh"}}>
    <div class="col-md-9 mx-auto my-auto">
      <div class="card">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src={book.image_url} class="card-img" alt="Gambar"/>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{book.title}</h5>
              <p class="card-text">Authors : {book.authors}</p>
              <p class="card-text">Description : {book.description}</p>
              <p className="card-text">Genre : {book.genres}</p>
              <p className="card-text">Edition : {book.edition}</p>
              <p className="card-text">Format : {book.format}</p>
              <p className="card-text">Jumlah Halaman : {book.num_pages}</p>
              <p className="card-text">Quotes  : {book.Quote1}</p>
              <h5 className="mt-2">Rating {book.rating} <i class="fa-solid fa-star text-warning"></i></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</>

  )
}

export default BookDetail;
