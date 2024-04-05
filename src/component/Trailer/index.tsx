"use client";
import React, { useState, useRef,useEffect } from 'react';
import { Button, Modal } from 'antd';

const Trailer = ({videoId, name}:any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const iframeRef = useRef(null); 
 
  
  const showModal = () => {
   
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    
    setIsModalOpen(false);
  };
  useEffect(() => {
   if (isModalOpen ) {
      (iframeRef.current as any)?.setAttribute("src", `https://www.youtube.com/embed/${videoId}?autoplay=1`)
   }else{
    (iframeRef.current as any)?.setAttribute("src", "")
   }
    
  }, [isModalOpen]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title={name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
      <iframe
                            className="mx-auto w-full my-10"
                            //   width="560"
                            ref={iframeRef}
                            height="480"
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in- picture"
                            allowFullScreen
                        />
      </Modal>
    </>
  );
};

export default Trailer;