import { useState, useEffect } from 'react'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [toast, setToast] = useState({ open: false, message: '' })

  // Handle clipboard copy
  const handleCopy = (text, message) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setToast({ open: true, message })
        // Hide toast after 2.5 seconds
        setTimeout(() => {
          setToast({ open: false, message: '' })
        }, 2500)
      })
      .catch((err) => {
        console.error('Failed to copy: ', err)
      })
  }

  // Handle KakaoTalk click
  const handleKakaoClick = () => {
    window.open('http://pf.kakao.com/_iUpEG/chat', '_blank', 'noopener,noreferrer')
  }

  // Handle Login submit
  const handleLogin = (e) => {
    e.preventDefault()
    
    // Check credentials (mock auth for demo purposes)
    // admin / admin123! will succeed, anything else will show error modal
    if (username.trim() === 'admin' && password === 'admin123!') {
      setIsLoggedIn(true)
      setToast({ open: true, message: '로그인에 성공하였습니다!' })
      setTimeout(() => {
        setToast({ open: false, message: '' })
      }, 2500)
    } else {
      setShowErrorModal(true)
    }
  }

  return (
    <>
      {/* Background radial gradient animation */}
      <div className="bg-animated"></div>

      <div className="login-container">
        <div className="login-card">
          {/* Header Logo & Title */}
          <div className="header">
            <img 
              src="/images/logos/gomsbook_symbol.png" 
              alt="logo" 
              className="logo-img" 
            />
            <span className="header-title">전자책 검수 시스템</span>
          </div>

          {!isLoggedIn ? (
            /* Login Form */
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="text"
                  id="username"
                  className="input-field"
                  placeholder="아이디를 입력하세요."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  className="input-field"
                  placeholder="비밀번호를 입력해 주세요."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="options-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span className="checkbox-custom"></span>
                  <span>자동 로그인</span>
                </label>
              </div>

              <button type="submit" className="submit-btn">
                Sign In
              </button>

              {/* Cautions Box */}
              <div className="notice-box">
                <div className="notice-title">유의 사항</div>
                <ul className="notice-list">
                  <li className="notice-item">
                    전자책 제작 지원 사업에서 안내해 드린 아이디와 비밀번호로 로그인 해주세요.
                  </li>
                  <li className="notice-item">
                    아이디와 비밀번호를 모르신다면 문의 부탁드립니다.
                  </li>
                </ul>
              </div>

              {/* Inquiry Methods */}
              <div>
                <div className="contact-title">문의 방법</div>
                <div className="contact-row">
                  {/* Email Inquiry */}
                  <div 
                    className="contact-card" 
                    onClick={() => handleCopy('publish@bookswage.com', 'E-Mail 주소가 복사되었습니다.')}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="contact-icon"
                    >
                      <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                      <path d="M3 7l9 6l9 -6" />
                    </svg>
                    <span className="contact-label">E-Mail 문의</span>
                    <span className="contact-value">publish@bookswage.com</span>
                  </div>

                  {/* Phone Inquiry */}
                  <div 
                    className="contact-card"
                    onClick={() => handleCopy('010-7516-9387', '문의 번호가 복사되었습니다.')}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="contact-icon"
                    >
                      <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                    </svg>
                    <span className="contact-label">전화 문의</span>
                    <span className="contact-value">010-7516-9387</span>
                  </div>

                  {/* KakaoTalk Inquiry */}
                  <div className="contact-card" onClick={handleKakaoClick}>
                    <img 
                      src="/images/logos/kakaotalk_icon.png" 
                      alt="카카오톡" 
                      width="24" 
                      height="24" 
                    />
                    <span className="contact-label">카카오톡 문의</span>
                    <span className="contact-value">카카오톡 상담</span>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            /* Logged In View (Mock Dashboard Page) */
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
                안녕하세요, {username}님!
              </div>
              <p style={{ color: '#718096', fontSize: '14px', marginBottom: '24px' }}>
                전자책 검수 시스템 대시보드에 로그인되었습니다.
              </p>
              <button 
                type="button" 
                className="submit-btn" 
                onClick={() => {
                  setIsLoggedIn(false)
                  setUsername('')
                  setPassword('')
                }}
              >
                로그아웃 (Sign Out)
              </button>
            </div>
          )}

          {/* Footer Rights */}
          <div className="footer">
            &copy; 한국출판문화산업진흥원 &middot; 주식회사 곰스북 | All rights reserved
          </div>
        </div>
      </div>

      {/* Toast Alert Notification */}
      <div className={`snackbar ${toast.open ? 'show' : ''}`}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M5 12l5 5l10 -10" />
        </svg>
        <span>{toast.message}</span>
      </div>

      {/* Login Failure Modal Dialog */}
      <div className={`modal-overlay ${showErrorModal ? 'open' : ''}`} onClick={() => setShowErrorModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-title">로그인 실패</div>
          <div className="modal-text">
            현재 입력하신 아이디가 등록되어 있지 않거나,{"\n"}
            아이디 또는 비밀번호를 잘못 입력하셨습니다.
          </div>
          <button type="button" className="modal-btn" onClick={() => setShowErrorModal(false)}>
            확인
          </button>
        </div>
      </div>
    </>
  )
}

export default App
