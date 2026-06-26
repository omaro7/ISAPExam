import React, { useState } from 'react';
import './Dashboard.css';
import Notices from './Notices';
import FAQ from './FAQ';
import Inquiry from './Inquiry';
import InquiryWrite from './InquiryWrite';
import ProfileEditAuth from './ProfileEditAuth';
import ProfileEdit from './ProfileEdit';
import IsapMain from './IsapMain';

const Dashboard = ({ username, onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('main'); // 'main' or 'notices'
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  React.useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.header-profile')) {
        setIsProfileDropdownOpen(false);
      }
    };
    if (isProfileDropdownOpen) {
      window.addEventListener('click', handleOutsideClick);
    }
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isProfileDropdownOpen]);

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsMobileSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${isSidebarCollapsed ? 'collapsed' : ''} ${isMobileSidebarOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-logo">
          <img src="/isapexam/images/logos/gomsbook_symbol.png" alt="logo" className="sidebar-logo-img" />
          <span className="sidebar-logo-text">정보시스템 감리사</span>
        </div>
        
        <div className="sidebar-menu-label">MENU</div>
        <nav className="sidebar-nav">
          <a href="#" className={`nav-item ${currentView === 'main' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentView('main'); setIsMobileSidebarOpen(false); }}>
            <span className="nav-icon">📊</span>
            <span>대시보드</span>
          </a>
          
          <a href="#" className={`nav-item ${currentView === 'isap-main' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentView('isap-main'); setIsMobileSidebarOpen(false); }}>
            <span className="nav-icon">📝</span>
            <span>기출문제</span>
          </a>
          
          <div className="nav-group" style={{ display: "none" }}>
            <div className="nav-group-title">
              <span className="nav-icon">🔍</span>
              <span>자가 검증</span>
            </div>
            <a href="#" className="nav-subitem">
              <span className="nav-subicon">↳</span> 검증 결과
            </a>
          </div>

          <div className="nav-group" style={{ display: "none" }}>
            <div className="nav-group-title">
              <span className="nav-icon">✅</span>
              <span>최종 검증</span>
            </div>
            <a href="#" className="nav-subitem">
              <span className="nav-subicon">↳</span> 신청하기
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content Container */}
      <div className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <button className="menu-toggle-btn" onClick={toggleSidebar}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>
          <div className="header-right">
            <a href="#" className={`header-link ${currentView === 'notices' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentView('notices'); setIsMobileSidebarOpen(false); }}><span className="icon">🔔</span> <span className="link-text">공지사항</span></a>
            <a href="#" className={`header-link ${currentView === 'faq' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentView('faq'); setIsMobileSidebarOpen(false); }}><span className="icon">❓</span> <span className="link-text">FAQ</span></a>
            <a href="#" className={`header-link ${currentView === 'inquiry' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentView('inquiry'); setIsMobileSidebarOpen(false); }}><span className="icon">💬</span> <span className="link-text">1:1 문의</span></a>
            <a href="#" className="header-link"><span className="icon">📱</span> <span className="link-text">카카오톡 문의</span></a>
            <div className="header-profile" onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
              <img src="/isapexam/images/logos/gomsbook_symbol.png" alt="profile" className="profile-img" />
              <span className="profile-name">곰스북</span>
              <span className="profile-dropdown">▼</span>

              {isProfileDropdownOpen && (
                <div className="profile-dropdown-card" onClick={(e) => e.stopPropagation()}>
                  <div className="dropdown-user-info">
                    <img src="/isapexam/images/logos/gomsbook_symbol.png" alt="avatar" className="dropdown-avatar" />
                    <div className="dropdown-user-details">
                      <div className="dropdown-username">곰스북 님</div>
                      <div className="dropdown-user-role">출판사 제작 담당자</div>
                      <div className="dropdown-user-company">
                        <span className="company-icon">👤</span> 곰스북
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-actions">
                    <button 
                      type="button" 
                      className="dropdown-action-btn edit-info-btn"
                      onClick={() => {
                        setCurrentView('profile-edit-auth');
                        setIsProfileDropdownOpen(false);
                      }}
                    >회원정보 변경</button>
                    <button type="button" className="dropdown-action-btn logout-btn" onClick={onLogout}>로그아웃</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="dashboard-content-scroll">
          {currentView === 'main' ? (
            <>
              {/* Greeting */}
              <section className="greeting-section">
                <h1>안녕하세요. 곰스북 님, 반갑습니다!</h1>
                <h2>전자책 제작 지원 1차입니다.</h2>
              </section>

          {/* Inquiry Options */}
          <section className="inquiry-section">
            <div className="inquiry-notice">해결되지 않은 궁금증, 다양한 방법으로 문의해 주세요.</div>
            <div className="inquiry-cards">
              <div className="inquiry-card" onClick={() => setCurrentView('inquiry')}>
                <div className="inquiry-icon">💬</div>
                <div className="inquiry-title">1:1 문의</div>
              </div>
              <div className="inquiry-card">
                <div className="inquiry-icon">✉️</div>
                <div className="inquiry-title">E-Mail 문의</div>
                <div className="inquiry-desc">publish@bookswage.com</div>
              </div>
              <div className="inquiry-card">
                <div className="inquiry-icon">📞</div>
                <div className="inquiry-title">전화 문의</div>
                <div className="inquiry-desc">010-7516-9387</div>
              </div>
              <div className="inquiry-card">
                <div className="inquiry-icon">📱</div>
                <div className="inquiry-title">카카오톡 문의</div>
              </div>
            </div>
          </section>

          {/* Process Guide */}
          <section className="process-section">
            <h3 className="section-title">검증 프로세스 안내</h3>
            <div className="process-divider"></div>
            <div className="process-diagram-wrapper">
              {/* CSS Process Diagram approximation */}
              <div className="process-diagram">
                 <div className="process-step">
                    <div className="step-circle"><span className="step-icon">📄</span></div>
                    <div className="step-text">제작 파일</div>
                    <div className="step-subs">
                       <div>✔️ EPUB 2.0</div>
                       <div>✔️ EPUB 3.0</div>
                    </div>
                 </div>
                 <div className="process-arrow">→</div>
                 <div className="process-step">
                    <div className="step-circle highlight"><span className="step-icon">⚙️</span></div>
                    <div className="step-text">자가 검증 실행</div>
                 </div>
                 <div className="process-arrow">→</div>
                 <div className="process-step">
                    <div className="step-circle highlight"><span className="step-icon">🔑</span></div>
                    <div className="step-text">최종 검증 신청</div>
                 </div>
                 <div className="process-arrow">→</div>
                 <div className="process-step">
                    <div className="step-circle success"><span className="step-icon">✔️</span></div>
                    <div className="step-text">검증 통과</div>
                 </div>
              </div>
              <div className="process-descriptions">
                <div className="desc-box">
                  <div className="desc-title">자가 검증</div>
                  <div className="desc-text">자동 검증 시스템으로<br/>수분내에 결과 도출</div>
                </div>
                <div className="desc-box">
                  <div className="desc-title">최종 검증</div>
                  <div className="desc-text">수동으로 진행되며,<br/>상황에 따라 결과 도출의<br/>수일이 소요될 수 있음</div>
                </div>
              </div>
            </div>
          </section>

          {/* Books List */}
          <section className="books-section">
            <h3 className="section-title left-align">제작 지원 사업 선정 도서 총 <span className="highlight-text">5</span>권</h3>
            <div className="table-container">
              <div className="table-header">총 5건</div>
              <table className="books-table">
                <thead>
                  <tr>
                    <th>NO</th>
                    <th>도서 정보</th>
                    <th>제작 형태</th>
                    <th>제작 난이도</th>
                    <th>자가 검증</th>
                    <th>최종 검증</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 5, title: '괜찮지 않아도 괜찮은 하루', author: '민정은', status1: '자가 검증 신청', status2: '성공' },
                    { id: 4, title: '나는 왜 끝까지 하지 못했을까?', author: '김정은', status1: '자가 검증 신청', status2: '성공' },
                    { id: 3, title: '이 시대의 이솝우화', author: '민정은', status1: '자가 검증 신청', status2: '성공' },
                    { id: 2, title: '나는 도시의 청소부', author: '황상훈', status1: '자가 검증 신청', status2: '성공' },
                    { id: 1, title: '나는 실버타운에 근무한다', author: '김정은', status1: '자가 검증 신청', status2: '성공' },
                  ].map((book) => (
                    <tr key={book.id}>
                      <td>{book.id}</td>
                      <td>
                        <div className="book-title">{book.title}</div>
                        <div className="book-author">{book.author}</div>
                        <div className="book-publisher">곰스북</div>
                      </td>
                      <td>EPUB 3.0</td>
                      <td>일반</td>
                      <td><span className="badge outline-primary">{book.status1}</span></td>
                      <td><span className="badge outline-success">{book.status2}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Announcements */}
          <section className="announcements-section">
            <h3 className="section-title left-align">공지사항</h3>
            <div className="announcements-layout">
              <div className="announcements-list">
                {[
                  { id: 1, title: '전자책 최종 검수 신청 파업 안내' },
                  { id: 2, title: '최종 검증 완료 후 추가 절차 공지' },
                  { id: 3, title: '매주 목요일 시스템 점검 공지' },
                  { id: 4, title: '카카오톡 실시간 상담 안내' }
                ].map(item => (
                  <div className="announcement-item" key={item.id}>
                    <span className="ann-no">{item.id}</span>
                    <span className="ann-title">{item.title}</span>
                  </div>
                ))}
              </div>
              <div className="announcements-links">
                <button className="side-btn" onClick={() => setCurrentView('faq')}>FAQ</button>
                <button className="side-btn" onClick={() => setCurrentView('inquiry')}>1:1 문의</button>
                <button className="side-btn outline" onClick={() => setCurrentView('notices')}>공지사항</button>
              </div>
            </div>
          </section>
          </>
          ) : currentView === 'isap-main' ? (
            <IsapMain />
          ) : currentView === 'notices' ? (
            <Notices />
          ) : currentView === 'faq' ? (
            <FAQ />
          ) : currentView === 'inquiry' ? (
            <Inquiry onWriteClick={() => setCurrentView('inquiry-write')} />
          ) : currentView === 'inquiry-write' ? (
            <InquiryWrite onCancel={() => setCurrentView('inquiry')} onSubmit={() => setCurrentView('inquiry')} />
          ) : currentView === 'profile-edit-auth' ? (
            <ProfileEditAuth onCancel={() => setCurrentView('main')} onConfirm={() => setCurrentView('profile-edit')} />
          ) : currentView === 'profile-edit' ? (
            <ProfileEdit onCancel={() => setCurrentView('main')} onSubmit={() => setCurrentView('main')} />
          ) : null}

          <footer className="dashboard-footer">
            &copy; 정보시스템감리사 &middot; 주식회사 곰스북 | All rights reserved
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
