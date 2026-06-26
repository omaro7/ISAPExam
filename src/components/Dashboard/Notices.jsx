import React, { useState } from 'react';
import './Notices.css';

const Notices = () => {
  const [expandedId, setExpandedId] = useState(null);

  const notices = [
    { id: 10, title: '2026년 1차 전자책 검수 공지', date: '2026-04-30', isImportant: true },
    { id: 9, title: '2026년 1차 전자책 검수 일정 안내', date: '2026-04-30', isImportant: true },
    { id: 8, title: '전자책 제작 지원 사업(EPUB 2.0, EPUB 3.0) 검증 프로세스 안내', date: '2026-04-30', isImportant: true },
    { id: 7, title: '전자책 최종 검수 신청 마감 안내', date: '2026-06-10', isImportant: false },
    { id: 6, title: '최종 검증 완료 후 추가 절차 공지', date: '2026-04-30', isImportant: false },
    { id: 5, title: '라이트모드/다크모드 설정', date: '2026-04-30', isImportant: false },
    { id: 4, title: '최종 검증 결과 확인', date: '2026-04-30', isImportant: false },
    { id: 3, title: '최종 검증 신청 안내', date: '2026-04-30', isImportant: false },
    { id: 2, title: '자가 검증 결과 확인 및 보고서 예시', date: '2026-04-30', isImportant: false },
    { id: 1, title: '자가 검증 신청 안내', date: '2026-04-30', isImportant: false },
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="notices-container">
      <h2 className="notices-title">공지사항</h2>
      <div className="notices-count">총 {notices.length}건</div>
      
      <div className="notices-list">
        {notices.map((notice) => (
          <div key={notice.id} className="notice-item-wrapper">
            <div className={`notice-row ${expandedId === notice.id ? 'expanded' : ''}`} onClick={() => toggleExpand(notice.id)}>
              <div className="notice-id">
                {notice.isImportant ? (
                  <span className="notice-badge"><span className="horn-icon">📢</span> 공지</span>
                ) : (
                  <span className="notice-number">{notice.id}</span>
                )}
              </div>
              <div className="notice-title-text">{notice.title}</div>
              <div className="notice-date">{notice.date}</div>
              <div className="notice-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`chevron-icon ${expandedId === notice.id ? 'open' : ''}`}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
            {expandedId === notice.id && (
              <div className="notice-content">
                이곳에 공지사항의 상세 내용이 들어갑니다.<br />
                {notice.title} 내용입니다.
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pagination-wrapper">
        <div className="page-size-selector">
          <select className="size-select">
            <option>10개씩 보기</option>
            <option>20개씩 보기</option>
            <option>50개씩 보기</option>
          </select>
        </div>
        <div className="page-info">1-10 / 10</div>
        <div className="page-controls">
          <button className="page-btn nav-btn" disabled>&lt;</button>
          <button className="page-btn active">1</button>
          <button className="page-btn nav-btn" disabled>&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default Notices;
