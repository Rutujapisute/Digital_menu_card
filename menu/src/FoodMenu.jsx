import React, { useState, useEffect } from 'react';
import './App.css';
import 'animate.css'; // Import Animate.css for animations
import WOW from 'wow.js'; // Import WOW.js for scroll animations

const FoodMenu = () => {
  const [activeTab, setActiveTab] = useState('tab-1');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  // Initialize WOW.js for scroll animations
  useEffect(() => {
    new WOW().init();
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        {/* Section Title */}
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h5 className="section-title ff-secondary text-center text-primary fw-normal">Food Menu</h5>
          <h1 className="mb-5">Most Popular Items</h1>
        </div>

        {/* Tab Navigation */}
        <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.1s">
          <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
            <li className="nav-item">
              <a
                className={`d-flex align-items-center text-start mx-3 ms-0 pb-3 ${activeTab === 'tab-1' ? 'active' : ''}`}
                onClick={() => handleTabClick('tab-1')}
              >
                <i className="fa fa-coffee fa-2x text-primary"></i>
                <div className="ps-3">
                  <small className="text-body">Popular</small>
                  <h6 className="mt-n1 mb-0">Breakfast</h6>
                </div>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`d-flex align-items-center text-start mx-3 pb-3 ${activeTab === 'tab-2' ? 'active' : ''}`}
                onClick={() => handleTabClick('tab-2')}
              >
                <i className="fa fa-hamburger fa-2x text-primary"></i>
                <div className="ps-3">
                  <small className="text-body">Special</small>
                  <h6 className="mt-n1 mb-0">Lunch</h6>
                </div>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`d-flex align-items-center text-start mx-3 me-0 pb-3 ${activeTab === 'tab-3' ? 'active' : ''}`}
                onClick={() => handleTabClick('tab-3')}
              >
                <i className="fa fa-utensils fa-2x text-primary"></i>
                <div className="ps-3">
                  <small className="text-body">Lovely</small>
                  <h6 className="mt-n1 mb-0">Dinner</h6>
                </div>
              </a>
            </li>
          </ul>

          {/* Tab Content */}
          <div className="tab-content">
            {/* Breakfast Tab */}
            <div
              id="tab-1"
              className={`tab-pane fade show p-0 ${activeTab === 'tab-1' ? 'active' : ''}`}
            >
              <div className="row g-4">
                {/* Example Items */}
                {[...Array(8).keys()].map((index) => (
                  <div className="col-lg-6 mb-4 wow fadeInUp" data-wow-delay={`${index * 0.1}s`} key={index}>
                    <div className="d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded"
                        src={`src/img/menu-${index + 1}.jpg`}
                        alt=""
                        style={{ width: '80px' }}
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <h5 className="d-flex justify-content-between border-bottom pb-2">
                          <span>Chicken Burger</span>
                          <span className="text-primary">$115</span>
                        </h5>
                        <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lunch Tab */}
            <div
              id="tab-2"
              className={`tab-pane fade show p-0 ${activeTab === 'tab-2' ? 'active' : ''}`}
            >
              {/* Add your Lunch tab items here */}
              <div className="row g-4">
                {[...Array(8).keys()].map((index) => (
                  <div className="col-lg-6 mb-4 wow fadeInUp" data-wow-delay={`${index * 0.1}s`} key={index}>
                    <div className="d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded"
                        src={`src/img/menu-${index + 1}.jpg`}
                        alt=""
                        style={{ width: '80px' }}
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <h5 className="d-flex justify-content-between border-bottom pb-2">
                          <span>Special Burger</span>
                          <span className="text-primary">$125</span>
                        </h5>
                        <small className="fst-italic">Delicious, fresh ingredients</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dinner Tab */}
            <div
              id="tab-3"
              className={`tab-pane fade show p-0 ${activeTab === 'tab-3' ? 'active' : ''}`}
            >
              {/* Add your Dinner tab items here */}
              <div className="row g-4">
                {[...Array(8).keys()].map((index) => (
                  <div className="col-lg-6 mb-4 wow fadeInUp" data-wow-delay={`${index * 0.1}s`} key={index}>
                    <div className="d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded"
                        src={`src/img/menu-${index + 1}.jpg`}
                        alt=""
                        style={{ width: '80px' }}
                      />
                      <div className="w-100 d-flex flex-column text-start ps-4">
                        <h5 className="d-flex justify-content-between border-bottom pb-2">
                          <span>Classic Steak</span>
                          <span className="text-primary">$150</span>
                        </h5>
                        <small className="fst-italic">A classic, juicy steak</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodMenu;
