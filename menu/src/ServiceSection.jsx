import React, { useState, useEffect } from 'react';
import './App.css'; // Ensure you have the correct CSS file
import 'animate.css'; // Make sure animate.css is installed
import WOW from 'wow.js'; // Import WOW.js
import axios from 'axios';

const ServiceSection = () => {
  const [menuc, setMenuc] = useState('Loading...');
  const [foodc, setFoodc] = useState('Loading...');
  const [qtyc, setQtyc] = useState('Loading...');

 
  function cntapi() {
    axios
      .get('http://127.0.0.2:3000/count')
      .then((response) => {
        console.log('API Response: ', response.data);
        setMenuc(response.data.menu_count || 'No data');
        setFoodc(response.data.food_cat_count || 'No data');
        setQtyc(response.data.qty_mast_count || 'No data');
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setMenuc('Error loading data');
        setFoodc('Error loading data');
        setQtyc('Error loading data');
      });
  }

  
  useEffect(() => {
    cntapi();
   
    const wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated', 
      offset: 100, 
      mobile: true, 
      live: true,
    });
    wow.init(); 
    
    return () => {
      wow.sync(); 
    };
  }, []);

  const services = [
    {
      id: 1,
      icon: 'fa-user-tie',
      title: 'Menu',
      description: menuc,
      delay: '0.1s',
    },
    {
      id: 2,
      icon: 'fa-utensils',
      title: 'Food category',
      description: foodc,
      delay: '0.3s',
    },
    {
      id: 3,
      icon: 'fa-cart-plus',
      title: 'Quantity Master',
      description: qtyc,
      delay: '0.5s',
    },
  ];

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-4">
          {services.map((service) => (
            <div
              key={service.id}
              className={`col-lg-3 col-sm-6 wow fadeInUp`} // WOW.js animation class
              data-wow-delay={service.delay} // Set animation delay
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className={`fa fa-3x ${service.icon} text-primary mb-4`} />
                  <h5>{service.title}</h5>
                  <p>{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
