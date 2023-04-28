import React, { useState, useEffect } from 'react';
import '../Styles/booklist.css';
import { API_URL } from '../API';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        console.log(res.data);
        setBooks(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredBooks = books.filter(book => {
    return book.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredBooks.length / itemsPerPage); i++) {
      pageNumbers.push(
        <span
          key={i}
          id={i}
          onClick={handlePageClick}
          className={i === currentPage ? "active" : null}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  };

  return (
    <div class='container'>
      <div class='row justify-content-center'>
        <div class='col-md-6 col-lg-4 d-flex justify-content-center'>
          <div class="form-outline mb-3 d-flex justify-content-center">
            <input
              type="text"
              className="form-input"
              placeholder="Cari buku"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
              style={{ backgroundColor: "transparent", borderBottom: "1px solid black", width: "400px" }}
            >
            </input>
            <div className='pt-2'>
            <i className="fa fa-search" aria-hidden="true"></i> 
            </div>
            <div className='form-line'></div>
          </div>
        </div>
      </div>
      <div className='row pt-3' >
        {currentItems.length ? (
          currentItems.map((book) => (
            <div className="col-md-6 col-lg-4 mb-3" key={book.id}>
              <div className="card bg-white cardimage">
                <img src={book.image_url} alt="#" className="card-img-top mt-4" />
                <div className="card-body">
                  <h2 className="card-title text-center pt-2">{book.title}</h2>
                  <p className="card-text text-center pt-2">{book.Quote1}</p>
                  <div className='d-flex justify-content-center pt-2 '>
                    <Link to={`/book/${book.id}`} className="btn btn-black btn-block gradient-custom-2" style={{width : "150px"}}>Lihat Detail</Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='col text-center'>Data tidak ada</div>
        )}
      </div>
      <div class="row justify-content-center">
        <div class="col-auto">
          <div id="page-numbers">
            {renderPageNumbers()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList
