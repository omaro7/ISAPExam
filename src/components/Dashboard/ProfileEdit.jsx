import React, { useState } from 'react';
import './ProfileEdit.css';

const ProfileEdit = ({ onCancel, onSubmit }) => {
  const [email, setEmail] = useState('omarok@hanmail.net');
  const [phone1, setPhone1] = useState('010');
  const [phone2, setPhone2] = useState('6343');
  const [phone3, setPhone3] = useState('3762');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <div className="profile-edit-container">
      <h2 className="profile-edit-title">회원 정보 수정</h2>

      <form className="profile-edit-form-box" onSubmit={handleSubmit}>
        {/* Publisher Name */}
        <div className="profile-form-row">
          <label className="profile-form-label required">출판사명</label>
          <div className="profile-form-input-wrapper">
            <input type="text" className="profile-form-input readonly-input" value="곰스북" readOnly />
          </div>
        </div>

        {/* User ID */}
        <div className="profile-form-row">
          <label className="profile-form-label required">아이디</label>
          <div className="profile-form-input-wrapper">
            <input type="text" className="profile-form-input readonly-input" value="곰스북" readOnly />
          </div>
        </div>

        {/* Email */}
        <div className="profile-form-row">
          <label className="profile-form-label required">이메일</label>
          <div className="profile-form-input-wrapper email-input-group">
            <div className="input-with-button">
              <input 
                type="email" 
                className="profile-form-input" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <button type="button" className="profile-outline-btn">인증번호 받기</button>
            </div>
            <span className="profile-form-help red-text">* 검증 결과를 받으실 이메일을 등록해 주세요.</span>
          </div>
        </div>

        {/* Phone */}
        <div className="profile-form-row">
          <label className="profile-form-label">연락처</label>
          <div className="profile-form-input-wrapper phone-input-group">
            <input 
              type="text" 
              className="profile-form-input phone-input" 
              value={phone1} 
              onChange={(e) => setPhone1(e.target.value)} 
            />
            <span className="phone-separator">-</span>
            <input 
              type="text" 
              className="profile-form-input phone-input" 
              value={phone2} 
              onChange={(e) => setPhone2(e.target.value)} 
            />
            <span className="phone-separator">-</span>
            <input 
              type="text" 
              className="profile-form-input phone-input" 
              value={phone3} 
              onChange={(e) => setPhone3(e.target.value)} 
            />
          </div>
        </div>

        {/* Existing Password */}
        <div className="profile-form-row">
          <label className="profile-form-label required">기존 비밀번호</label>
          <div className="profile-form-input-wrapper">
            <input type="text" className="profile-form-input existing-pw-input" value="************" readOnly />
          </div>
        </div>

        {/* New Password */}
        <div className="profile-form-row">
          <label className="profile-form-label">변경 비밀번호</label>
          <div className="profile-form-input-wrapper">
            <input 
              type="password" 
              className="profile-form-input" 
              placeholder="변경할 비밀번호를 입력해 주세요." 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="profile-form-row">
          <label className="profile-form-label">비밀번호 확인</label>
          <div className="profile-form-input-wrapper password-confirm-group">
            <input 
              type="password" 
              className="profile-form-input" 
              placeholder="변경할 비밀번호를 한번 더 입력해 주세요" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="profile-form-help red-text">* 특수문자, 영문, 숫자를 조합하여 최소 8자 이상으로 입력해 주세요.</span>
          </div>
        </div>
      </form>

      {/* Buttons */}
      <div className="profile-edit-actions">
        <button type="button" className="profile-cancel-btn" onClick={onCancel}>취소</button>
        <button type="button" className="profile-submit-btn" onClick={handleSubmit}>수정</button>
      </div>
    </div>
  );
};

export default ProfileEdit;
