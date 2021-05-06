import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem'

const PaginationInfluencer = ({ dataPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalPosts / dataPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            //    <Pagination.Item key={number}  size="lg">
            //    <a onClick={() => paginate(number)}  className='page-link'>
            //    {number}
            //    </a>
            //  </Pagination.Item>
            <li key={number} className='page-item'>
              <a onClick={() => paginate(number)}  className='page-link' style={{color:"#F6413E", fontSize:"1em", cursor:"pointer"}}>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

export default PaginationInfluencer;
