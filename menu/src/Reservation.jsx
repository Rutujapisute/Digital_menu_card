import React, { useState } from 'react';
import 'wow.js/css/libs/animate.css';
import WOW from 'wow.js';
import Footer from './Footer'
import { Modal } from 'react-bootstrap';

const Reservation = () => {
  const [showModal, setShowModal] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  // Initialize WOW.js
  React.useEffect(() => {
    new WOW().init();
  }, []);

  const handleShowModal = (src) => {
    setVideoSrc(src);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setVideoSrc("");
  };

  return (
    <>
    <div className="container-xxl py-5 px-0 wow fadeInUp" data-wow-delay="0.1s">
      <div className="row g-0">
        <div className="col-md-6">
          <div className="video">
            <button
              type="button"
              className="btn-play"
              onClick={() => handleShowModal("https://www.youtube.com/embed/DWRcNpR6Kdc")}
            >
              <span></span>
            </button>
          </div>
        </div>
        <div className="col-md-6 bg-dark d-flex align-items-center">
          <div className="p-5 wow fadeInUp" data-wow-delay="0.2s">
            <h5 className="section-title ff-secondary text-start text-primary fw-normal">Reservation</h5>
            <h1 className="text-white mb-4">Book A Table Online</h1>
            <form>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input 
                      type="text" 
                      className="form-control input-custom" 
                      id="name" 
                      placeholder="Your Name" 
                    />
                    <label htmlFor="name">Your Name</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input 
                      type="email" 
                      className="form-control input-custom" 
                      id="email" 
                      placeholder="Your Email" 
                    /><br></br>
                    <label htmlFor="email">Your Email</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating date" id="date3" data-target-input="nearest">
                    <input
                      type="text"
                      className="form-control datetimepicker-input input-custom"
                      id="datetime"
                      placeholder="Date & Time"
                      data-target="#date3"
                      data-toggle="datetimepicker"
                    /><br></br>
                    <label htmlFor="datetime">Date & Time</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <select className="form-select input-custom" id="select1">
                      <option value="1">People 1</option>
                      <option value="2">People 2</option>
                      <option value="3">People 3</option>
                    </select>
                    <label htmlFor="select1">No Of People</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating">
                    <textarea
                      className="form-control input-custom"
                      placeholder="Special Request"
                      id="message"
                      style={{ height: '100px' }}
                    ></textarea>
                    <label htmlFor="message">Special Request</label>
                  </div>
                </div>
                <br/><br/>
                <div className="col-12">
                  <button className="btn btn-primary w-100 py-3" type="submit">
                    Book Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal for Video */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>YouTube Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* 16:9 aspect ratio */}
          <div className="ratio ratio-16x9">
            <iframe
              className="embed-responsive-item"
              src={videoSrc}
              allowFullScreen
              allow="autoplay"
            ></iframe>
          </div>
        </Modal.Body>
      </Modal>
    </div>
    <Footer/>
    </>
  );
};

export default Reservation;
