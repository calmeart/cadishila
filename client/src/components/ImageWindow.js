import React, { useState } from 'react';

function ImageWindow({ imageLink }) {
  const [selectedImage, setSelectedImage] = useState(imageLink[0]);

  function handleClick(e) {
    const { name } = e.target;
    setSelectedImage(name);
  }

  return (
    <div className="w-100">
      <div className="imagePort">
        <img src={selectedImage} alt="product description" />
      </div>
      <div className="row imageSelect">
        {
          imageLink.map(image => (
            <div className="col-2">
              <button name={image} onClick={handleClick}><img src={image} alt="product description" /></button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ImageWindow;
