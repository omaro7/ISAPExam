import React from 'react';
import './BookSearchModal.css';

const BookSearchModal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  const mockBooks = [
    { id: 5, title: '이 시대의 이솝우화', publisher: '곰스북', format: 'EPUB3' },
    { id: 4, title: '나는 실버타운에 근무한다', publisher: '곰스북', format: 'EPUB3' },
    { id: 3, title: '나는 도시의 청소부', publisher: '곰스북', format: 'EPUB3' },
    { id: 2, title: '나는 왜 끝까지 하지 못했을까?', publisher: '곰스북', format: 'EPUB3' },
    { id: 1, title: '괜찮지 않아도 괜찮은 하루', publisher: '곰스북', format: 'EPUB3' },
  ];

  const handleRowClick = (book) => {
    onSelect(book);
  };

  return (
    <div className="book-modal-overlay">
      <div className="modal-content book-search-modal">
        <div className="modal-header">
          <h2 className="modal-title">문의 도서 추가</h2>
        </div>
        
        <div className="modal-body">
          {/* Search Area */}
          <div className="book-search-box">
            <input type="text" className="book-search-input" placeholder="도서명을 입력하세요." />
            <button type="button" className="book-search-btn">검색</button>
          </div>

          <div className="book-list-container">
            <div className="book-list-count">총 {mockBooks.length}건</div>
            
            <div className="book-table-wrapper">
              <table className="book-table">
                <thead>
                  <tr>
                    <th width="15%">번호</th>
                    <th width="45%">제목</th>
                    <th width="20%">출판사</th>
                    <th width="20%">제작 형태</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBooks.map(book => (
                    <tr key={book.id} onClick={() => handleRowClick(book)} className="clickable-row">
                      <td>{book.id}</td>
                      <td className="book-title-cell">{book.title}</td>
                      <td>{book.publisher}</td>
                      <td>{book.format}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Mock */}
            <div className="modal-pagination">
              <div className="pagination-select-wrapper">
                <select className="pagination-select">
                  <option>10개씩 보기</option>
                </select>
              </div>
              <div className="pagination-info">1-5 / 5</div>
              <div className="pagination-controls">
                <button className="page-nav-btn" disabled>&lt;</button>
                <button className="page-num-btn active">1</button>
                <button className="page-nav-btn" disabled>&gt;</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="modal-close-btn" onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default BookSearchModal;
