import React, { useState, useEffect, useRef } from 'react';
import './InquiryWrite.css';
import BookSearchModal from './BookSearchModal';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const InquiryWrite = ({ onCancel, onSubmit }) => {
  const [format, setFormat] = useState('epub2');
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState('');
  const [attachments, setAttachments] = useState([{ id: Date.now(), name: '' }]);
  const [editorContent, setEditorContent] = useState('');

  const editorRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: '본문을 입력하세요',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
          ]
        }
      });

      quillInstance.current.on('text-change', () => {
        setEditorContent(quillInstance.current.root.innerHTML);
      });
    }
  }, []);

  const handleBrowseClick = (id) => {
    document.getElementById(`file-input-${id}`).click();
  };

  const handleFileChange = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachments(attachments.map(att => 
        att.id === id ? { ...att, name: file.name } : att
      ));
    }
  };

  const addAttachmentRow = () => {
    setAttachments([...attachments, { id: Date.now() + Math.random(), name: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <div className="inquiry-write-container">
      <h2 className="inquiry-title">1:1 문의 작성</h2>

      <form className="inquiry-form-box" onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="form-label required">제목</label>
          <div className="form-input-wrapper">
            <input type="text" className="form-input" placeholder="제목을 입력하세요." />
          </div>
        </div>

        <div className="form-row">
          <label className="form-label required">도서명</label>
          <div className="form-input-wrapper input-with-btn">
            <input 
              type="text" 
              className="form-input" 
              placeholder="도서명을 검색하세요." 
              value={selectedBook}
              readOnly 
            />
            <button 
              type="button" 
              className="inline-btn" 
              onClick={(e) => {
                e.preventDefault();
                setIsBookModalOpen(true);
              }}
            >검색</button>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label required">카테고리</label>
          <div className="form-input-wrapper">
            <div className="select-wrapper">
              <select className="form-select">
                <option value="">선택하기</option>
                <option value="error">자가검증 오류 문의</option>
                <option value="production">제작문의</option>
                <option value="etc">기타문의</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label required">제작 형태</label>
          <div className="form-input-wrapper radio-group">
            <label className="radio-label">
              <input 
                type="radio" 
                name="format" 
                value="epub2" 
                checked={format === 'epub2'}
                onChange={() => setFormat('epub2')}
              />
              <span className="custom-radio"></span>
              EPUB 2.0
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="format" 
                value="epub3" 
                checked={format === 'epub3'}
                onChange={() => setFormat('epub3')}
              />
              <span className="custom-radio"></span>
              EPUB 3.0
            </label>
          </div>
        </div>

        <div className="form-row content-row">
          <label className="form-label required">본문 내용</label>
          <div className="form-input-wrapper editor-wrapper">
            <div ref={editorRef} />
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">첨부 파일</label>
          <div className="form-input-wrapper attachment-wrapper">
            {attachments.map((att) => (
              <div className="file-input-group" key={att.id}>
                <input 
                  type="text" 
                  className="form-input file-display" 
                  placeholder="선택된 파일 없음" 
                  value={att.name}
                  readOnly 
                />
                <button 
                  type="button" 
                  className="outline-btn file-browse-btn"
                  onClick={() => handleBrowseClick(att.id)}
                >찾아보기</button>
                <input 
                  type="file" 
                  id={`file-input-${att.id}`} 
                  style={{ display: 'none' }} 
                  onChange={(e) => handleFileChange(att.id, e)}
                />
              </div>
            ))}
            <button 
              type="button" 
              className="inline-btn add-attachment-btn"
              onClick={addAttachmentRow}
            >첨부파일 추가</button>
          </div>
        </div>

      </form>

      {/* Bottom Actions */}
      <div className="form-actions">
        <button type="button" className="inquiry-submit-btn" onClick={handleSubmit}>등록</button>
        <button type="button" className="inquiry-cancel-btn" onClick={onCancel}>취소</button>
      </div>

      {/* Book Search Modal */}
      <BookSearchModal 
        isOpen={isBookModalOpen} 
        onClose={() => setIsBookModalOpen(false)} 
        onSelect={(book) => {
          setSelectedBook(book.title);
          setIsBookModalOpen(false);
        }}
      />
    </div>
  );
};

export default InquiryWrite;
