// Page.js

import React from 'react';

const Page = ({ content, onChange }) => {
  return (
    <textarea className="page" value={content} onInput={onChange} dir="ltr" />
  );
};

export default Page;
