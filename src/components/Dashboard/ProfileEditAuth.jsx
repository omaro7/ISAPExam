import React, { useState } from 'react';
import './ProfileEditAuth.css';

const ProfileEditAuth = ({ onCancel, onConfirm }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onConfirm) onConfirm(password);
  };

  return (
    <div className="profile-edit-auth-container">
      <h2 className="profile-edit-title">회원 정보 변경</h2>

      <div className="auth-header-section">
        <h3 className="auth-subtitle">비밀번호 재입력</h3>
        <p className="auth-desc">안전한 회원정보 보호를 위해 비밀번호를 재입력해 주세요.</p>
      </div>

      <form className="auth-form-box" onSubmit={handleSubmit}>
        <div className="auth-form-row">
          <label className="auth-label"><span className="required-star">*</span> 비밀번호</label>
          <div className="auth-input-wrapper">
            <input 
              type="password" 
              className="auth-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요."
            />
          </div>
        </div>
      </form>

      <div className="auth-actions">
        <button type="button" className="auth-cancel-btn" onClick={onCancel}>취소</button>
        <button type="button" className="auth-confirm-btn" onClick={handleSubmit}>확인</button>
      </div>
    </div>
  );
};

export default ProfileEditAuth;
