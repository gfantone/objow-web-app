import React from 'react';
const Iframe = (props) => {
  let iframe_ref = null;


  const writeHTML = (frame) => {
    if (!frame) {
       return;
    }

    iframe_ref = frame;
    let doc = frame.contentDocument;
    doc.open();
    doc.write(props.content);
    doc.close();
  };
  return (
    <iframe src="about:blank" scrolling="no" frameBorder="0"  ref={writeHTML}
    />
  );
};
export default Iframe;
