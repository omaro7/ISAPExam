import React, { useState, useEffect } from 'react';
import './IsapMain.css';

const IsapMain = () => {
  const [selectedExam, setSelectedExam] = useState(null);
  const [activeTab, setActiveTab] = useState(1); // 1: 감리/법, 2: 소프트웨어 공학, 3: 데이터베이스론, 4: 시스템 구조, 5: 보안
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [exams, setExams] = useState([]);
  const [examLoading, setExamLoading] = useState(true);

  // 화면 크기 변화 감지 (768px 기준 모바일/PC 구분)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleOutside = (e) => {
      if (!e.target.closest('.custom-dropdown')) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [dropdownOpen]);

  // 시험 목록 API 호출
  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL || 'https://app.goms.co.kr/api/isapexam';
    fetch(`${apiBase}/exam/list`)
      .then(res => res.json())
      .then(data => setExams(data))
      .catch(err => console.error('Failed to fetch exam list:', err))
      .finally(() => setExamLoading(false));
  }, []);

  // 5개 탭 정보 (DB의 category name과 연동)
  const tabs = [
    { id: 1, name: '감리 및 사업관리/법', dbName: '감리 및 사업관리', count: 25 },
    { id: 2, name: '소프트웨어 공학', dbName: '소프트웨어 공학', count: 25 },
    { id: 3, name: '데이터베이스론', dbName: '데이터베이스', count: 25 },
    { id: 4, name: '시스템 구조', dbName: '시스템 구조', count: 25 },
    { id: 5, name: '보안', dbName: '보안', count: 20 },
  ];

  // Fetch questions from Spring Boot API when selectedExam or activeTab changes
  useEffect(() => {
    if (!selectedExam) return;

    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const currentTab = tabs.find(t => t.id === activeTab);
        const categoryParam = currentTab ? encodeURIComponent(currentTab.dbName) : '';
        const apiBase = import.meta.env.VITE_API_URL || 'https://app.goms.co.kr/api/isapexam';
        const response = await fetch(`${apiBase}/exam/questions?year=${selectedExam.year}&category=${categoryParam}`);
        if (response.ok) {
          const data = await response.json();
          // Transform Spring Boot domain objects to format matching frontend card UI
          const formattedQuestions = data.map(q => ({
            number: q.questionNumber,
            text: q.questionText,
            options: q.options ? q.options.map(o => ({
              text: o.optionText,
              imageName: o.imageName
            })) : [],
            answer: q.correctAnswer,
            imageName: q.imageName
          }));
          setQuestions(formattedQuestions);
        } else {
          console.error('Failed to fetch questions');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
    setSelectedOption(null);
  }, [selectedExam, activeTab]);

  const handleExamClick = (exam) => {
    setSelectedExam(exam);
    setActiveTab(1);
  };

  const handleBackToList = () => {
    setSelectedExam(null);
    setQuestions([]);
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const currentQuestion = questions && questions.length > 0 ? questions[currentQuestionIndex] : null;

  const handleOptionClick = (idx) => {
    if (showAnswer) return;
    setSelectedOption(idx + 1);
  };

  const handleNextQuestion = () => {
    if (questions && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
      setSelectedOption(null);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowAnswer(false);
      setSelectedOption(null);
    }
  };

  if (selectedExam) {
    return (
      <div className="isap-container">
        {/* 모바일: 뒤로가기 + 제목 + select 한 줄 / PC: 헤더 + 탭 버튼 분리 */}
        {isMobile ? (
          <div className="exam-detail-header exam-detail-header--mobile">
            <button className="back-btn" onClick={handleBackToList}>목록</button>
            <h2 className="exam-detail-title">{selectedExam.title}</h2>
            {/* 커스텀 드롭다운 - 네이티브 select 대체 */}
            <div className="custom-dropdown">
              <button
                className="custom-dropdown-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="custom-dropdown-label">
                  {tabs.find(t => t.id === activeTab)?.name}
                </span>
                <svg className={`custom-dropdown-arrow ${dropdownOpen ? 'open' : ''}`}
                  width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {dropdownOpen && (
                <ul className="custom-dropdown-list">
                  {tabs.map((tab) => (
                    <li
                      key={tab.id}
                      className={`custom-dropdown-item ${activeTab === tab.id ? 'active' : ''}`}
                      onClick={() => { handleTabClick(tab.id); setDropdownOpen(false); }}
                    >
                      {tab.name}
                      {activeTab === tab.id && <span className="custom-dropdown-check">✓</span>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="exam-detail-header">
              <button className="back-btn" onClick={handleBackToList}>
                ← 목록으로
              </button>
              <h2 className="exam-detail-title">{selectedExam.title}</h2>
            </div>
            <div className="exam-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {tab.name} <span className="tab-count">({tab.count}문항)</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Contents Area - Card Layout */}
        <div className="card-area">
          {loading ? (
            <div className="no-questions">
              <p>문제를 불러오는 중입니다...</p>
            </div>
          ) : currentQuestion ? (
            <div className="question-card">
              <div className="card-header">
                <span className="question-badge">문제 {currentQuestion.number}</span>
                <span className="subject-badge">{tabs.find(t => t.id === activeTab)?.name}</span>
              </div>
              
              <div className="question-body">
                <p className="question-text">
                  {currentQuestion.text.replace(/\[그림\s*필요\]/gi, '').trim()}
                </p>

                {(currentQuestion.imageName || /\[그림\s*필요\]/gi.test(currentQuestion.text)) && (
                  <div className="question-image-container">
                    <img 
                      src={`/isapexam/images/exam/${selectedExam.year}/${currentQuestion.imageName || `${selectedExam.year}_${currentQuestion.number}_1.png`}`} 
                      alt={`문제 ${currentQuestion.number} 그림`}
                      className="question-image"
                    />
                  </div>
                )}

                <div className="options-list">
                  {currentQuestion.options && currentQuestion.options.map((opt, idx) => {
                    const isSelected = selectedOption === (idx + 1);
                    const isCorrect = currentQuestion.answer === (idx + 1);
                    
                    let optionClass = '';
                    if (showAnswer) {
                      if (isCorrect) optionClass = 'correct';
                      else if (isSelected) optionClass = 'incorrect';
                    } else if (isSelected) {
                      optionClass = 'selected';
                    }

                    const hasOptImage = opt.imageName;

                    return (
                      <div
                        key={idx}
                        className={`option-item ${optionClass}`}
                        onClick={() => handleOptionClick(idx)}
                      >
                        <span className="option-num">{idx + 1}</span>
                        <div className="option-content">
                          {hasOptImage ? (
                            <div className="option-image-container">
                              <img 
                                src={`/isapexam/images/exam/${selectedExam.year}/${opt.imageName}`} 
                                alt={`보기 ${idx + 1} 그림`} 
                                className="option-image"
                              />
                            </div>
                          ) : (
                            <span className="option-text">{opt.text}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="card-actions">
                <div className="nav-buttons">
                  <button
                    className="nav-arrow-btn"
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    이전 문제
                  </button>
                  <span className="q-indicator">
                    {currentQuestionIndex + 1} / {questions.length}
                  </span>
                  <button
                    className="nav-arrow-btn"
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === questions.length - 1}
                  >
                    다음 문제
                  </button>
                </div>

                <div className="action-buttons">
                  <button
                    className="answer-check-btn"
                    onClick={() => setShowAnswer(!showAnswer)}
                    disabled={!selectedOption}
                  >
                    {showAnswer ? '정답 가리기' : '정답 확인'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-questions">
              <p>해당 과목의 준비된 문제가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="isap-container">
      <h2 className="isap-title">정보시스템 감리사 기출문제</h2>
      <div className="isap-count">총 {exams.length}건</div>

      <div className="table-container">
        {examLoading ? (
          <div className="no-questions"><p>목록을 불러오는 중입니다...</p></div>
        ) : (
          <table className="isap-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>번호</th>
                <th>제목</th>
                <th style={{ width: '120px' }}>작성자</th>
                <th style={{ width: '150px' }}>작성일</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam, idx) => (
                <tr key={exam.id}>
                  <td className="text-center">{idx + 1}</td>
                  <td className="exam-title-cell">
                    <span className="exam-link" onClick={() => handleExamClick(exam)}>{exam.title}</span>
                  </td>
                  <td className="text-center">{exam.author}</td>
                  <td className="text-center text-muted">
                    {exam.regDate ? exam.regDate.slice(0, 10).replace(/-/g, '.') : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default IsapMain;
