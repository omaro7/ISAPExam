import React, { useState } from 'react';
import './Notices.css'; // Reusing Notice styles since the layout is identical

const FAQ = () => {
  const [expandedId, setExpandedId] = useState(null);

  const faqs = [
    { id: 9, title: '자가 검증 결과 필수 수정, 수정 권고 꼭 수정해야 하나요?', date: '2026-04-30' },
    { id: 8, title: '최종 검증 준수 여부 △ 표시 수정을 꼭 해야되나요?', date: '2026-04-30' },
    { id: 7, title: '문의 작성을 완료하고 [등록] 버튼을 누르면 어떻게 되나요?', date: '2026-04-30' },
    { id: 6, title: '첨부파일은 몇 개까지 등록할 수 있으며, 어떻게 추가하나요?', date: '2026-04-30' },
    { id: 5, title: '1:1 문의를 작성할 때 반드시 입력하거나 선택해야 하는 항목은 무엇인가요?', date: '2026-04-30' },
    { id: 4, title: '연락처만 수정하고 싶은 때는 어떻게 해야 하나요?', date: '2026-04-30' },
    { id: 3, title: '비밀번호를 변경하려면 어떤 정보를 입력해야 하나요?', date: '2026-04-30' },
    { id: 2, title: '출판사명과 아이디는 제가 직접 수정할 수 있나요?', date: '2026-04-30' },
    { id: 1, title: '처음 로그인은 어떻게 하나요?', date: '2026-04-30' },
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="notices-container">
      <h2 className="notices-title">FAQ</h2>
      <div className="notices-count">총 {faqs.length}건</div>
      
      <div className="notices-list">
        {faqs.map((faq) => (
          <div key={faq.id} className="notice-item-wrapper">
            <div className={`notice-row ${expandedId === faq.id ? 'expanded' : ''}`} onClick={() => toggleExpand(faq.id)}>
              <div className="notice-id">
                <span className="notice-number">{faq.id}</span>
              </div>
              <div className="notice-title-text">{faq.title}</div>
              <div className="notice-date">{faq.date}</div>
              <div className="notice-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`chevron-icon ${expandedId === faq.id ? 'open' : ''}`}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
            {expandedId === faq.id && (
              <div className="notice-content">
                이곳에 FAQ 답변 상세 내용이 들어갑니다.<br />
                질문에 대한 가이드 및 해결 방법입니다.
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
        <div className="page-info">1-9 / 9</div>
        <div className="page-controls">
          <button className="page-btn nav-btn" disabled>&lt;</button>
          <button className="page-btn active">1</button>
          <button className="page-btn nav-btn" disabled>&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
