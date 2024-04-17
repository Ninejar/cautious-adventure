import React from 'react';
import ReactQuill from 'react-quill';

const Page = ({ content, onChange }) => {
  return (
    // <textarea className="page" value={content} onInput={onChange} dir="ltr" />
    <ReactQuill theme="snow" value={content} onChange={onChange} />
  );
};

export default Page;
