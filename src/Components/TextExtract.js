import React, { useState } from 'react'
import styled from "styled-components";
import TextareaAutosize from 'react-textarea-autosize';

const options = [
  { value: 'space', label: 'White Space' },
  { value: 'comm', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function TextExtract({batchUpdate=()=>null}) {
  const [show, setShow] = useState(true)
  const [type, setType] = useState('')
  const [content, setContent] = useState('')
  const [extract, setExtract] = useState([])

  const extractContent = () => {

    if (type === ' ' || type === 'space') {
      setExtract(content.split(/[ ,]+/));
    } else {
      setExtract(content.split(type));
    }
    console.log('type, content', type, content)
    console.log('extract', extract)

  }
  return (
    <div className='extractor-container' style={{ color: '#fff' }}>
      <div onClick={() => setShow(!show)}>Use Text Extractor</div>
      {show ? (
        <div className='extractor-container'>
          <div className="todo-create-wrapper2">
            <input
              type="text"
              // id="create-todo"
              onChange={(e) => setType(e.target.value)}
              value={type}
              placeholder="Extractor"
            />
            <button className="btn" onClick={extractContent}>
              Extract Now
            </button>
            {extract && extract.length > 0 &&
              <button className="btn" onClick={()=>batchUpdate(extract)}>
                Publish Now
              </button>
            }
          </div>
          <div className="todo-create-wrapper2">
            <TextareaAutosize
              cacheMeasurements
              minRows={10}
              value={content}
              style={{width: '300px', height: '100px'}}
              onChange={ev => setContent(ev.target.value)}
            />
          </div>
        </div>
      ) : null}
      <div className='extract-item-container'>
        {extract && extract.length > 0 ? extract.map((item, index) => (
          <div className="extract-item">{item}</div>
        )) : null}
      </div>
    </div>
  )
}

export default TextExtract

const Styles = styled.div`
  position: relative;
  margin: 1rem 0rem;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--secondary-color-alt);
    padding: 0.5rem 1rem;
    border-radius: 5px;
    color: var(--accent-color);
    span[title] {
      font-size: 0.9rem;
      margin: 0rem 0.3rem;
    }
    .action {
      position: relative;
      display: flex;
      gap: 1rem;
      img {
        border-radius: 50%;
      }
    }
  }
  .wrapper {
    max-width: min(100% - 2rem, 500px);
    margin: 1rem auto;
    h1 {
      text-align: center;
      margin: 1rem 0rem;
      color: var(--accent-color);
    }
  }
  .todo-create-wrapper {
    position: relative;
    background-color: var(--secondary-color-alt);
    padding: 0.4rem;
    display: flex;
    align-items: stretch;
    input {
      width: 100%;
      padding: 0.7rem;
      background-color: transparent;
      border: none;
      outline: none;
      font-size: 1rem;
      color: var(--accent-color);
    }
    button {
    }
  }
`;