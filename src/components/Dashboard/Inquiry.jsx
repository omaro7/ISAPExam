import React from 'react';
import './Inquiry.css';

const Inquiry = ({ onWriteClick }) => {
  const inquiries = [
    { id: 6, category: '기타문의', format: 'EPUB 3.0', title: '접수만 되어 있고 진행이 되지 않고 있습니다.', publisher: '곰스북', status: '완료', date: '2026-06-06' },
    { id: 5, category: '기타문의', format: 'EPUB 3.0', title: '접수만 되어 있고 진행이 되지 않고 있습니다.', publisher: '곰스북', status: '완료', date: '2026-06-06' },
    { id: 4, category: '기타문의', format: 'EPUB 3.0', title: '최종 검증 접수상태의 epub 파일 변경 건', publisher: '곰스북', status: '완료', date: '2026-06-30' },
    { id: 3, category: '기타문의', format: 'EPUB 3.0', title: '최종 검증 접수상태의 epub 파일 변경 건', publisher: '곰스북', status: '완료', date: '2026-05-30' },
    { id: 2, category: '기타문의', format: 'EPUB 3.0', title: '뷰어에 대한 정보를 알려주세요', publisher: '곰스북', status: '완료', date: '2026-05-27' },
    { id: 1, category: '기타문의', format: 'EPUB 3.0', title: '접수만 되어 있네요', publisher: '곰스북', status: '완료', date: '2026-05-20' },
  ];

  return (
    <div className="inquiry-container">
      <h2 className="inquiry-title">1:1 문의</h2>

      {/* Search Filter Section */}
      <div className="inquiry-search-box">
        <div className="search-row">
          <label className="search-label">검색어</label>
          <input type="text" className="search-input" placeholder="제목을 입력하세요." />
        </div>
        
        <div className="search-row">
          <label className="search-label">제작 형태</label>
          <div className="select-wrapper">
            <select className="search-select">
              <option value="all">전체</option>
              <option value="epub2">EPUB 2.0</option>
              <option value="epub3">EPUB 3.0</option>
            </select>
          </div>
        </div>
        
        <div className="search-row">
          <label className="search-label">카테고리</label>
          <div className="select-wrapper">
            <select className="search-select">
              <option value="all">전체</option>
              <option value="error">자가검증 오류 문의</option>
              <option value="production">제작문의</option>
              <option value="etc">기타문의</option>
            </select>
          </div>
          <button className="search-btn">검색</button>
        </div>
      </div>

      {/* List Section */}
      <div className="inquiry-list-section">
        <div className="list-header-row">
          <div className="list-count">총 {inquiries.length}건</div>
          <button className="write-btn" onClick={onWriteClick}>작성하기</button>
        </div>

        <div className="table-responsive">
          <table className="inquiry-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>카테고리</th>
                <th>제작 형태</th>
                <th className="title-col">제목</th>
                <th>출판사</th>
                <th>답변상태</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((item) => (
                <tr key={item.id}>
                  <td className="text-gray">{item.id}</td>
                  <td>{item.category}</td>
                  <td>{item.format}</td>
                  <td className="title-col">
                    <a href="#" className="inquiry-link">{item.title}</a>
                  </td>
                  <td>{item.publisher}</td>
                  <td>{item.status}</td>
                  <td className="text-gray">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination-wrapper">
          <div className="page-size-selector">
            <select className="size-select">
              <option>10개씩 보기</option>
              <option>20개씩 보기</option>
              <option>50개씩 보기</option>
            </select>
          </div>
          <div className="page-info">1-6 / 6</div>
          <div className="page-controls">
            <button className="page-btn nav-btn" disabled>&lt;</button>
            <button className="page-btn active">1</button>
            <button className="page-btn nav-btn" disabled>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
