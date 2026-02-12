import React from 'react';
import Footer from './Footer';
import FoodCat from './FoodCat';

const FoodCategory = () => {
  return (
    <>
      <div className="container-xxl pt-5 pb-3">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">Food Categories</h5>
            <h1 className="mb-5">Explore Our Delicious Dishes</h1>
          </div>
          <div className="row g-4">
            {/* Existing Food Categories */}

            {/* Food Category 5 */}
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item text-center rounded overflow-hidden">
                <div className="rounded-circle overflow-hidden m-4">
                  <img
                    className="img-fluid"
                    src="src/img/team-1.jpg"
                    alt="Food Category 5"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <h5 className="mb-0">Dish Name</h5>
                <small>Description of Dish</small>
              </div>
            </div>

            {/* Food Category 6 */}
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="team-item text-center rounded overflow-hidden">
                <div className="rounded-circle overflow-hidden m-4">
                  <img
                    className="img-fluid"
                    src="src/img/team-2.jpg"
                    alt="Food Category 6"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <h5 className="mb-0">Dish Name</h5>
                <small>Description of Dish</small>
              </div>
            </div>

            {/* Food Category 7 */}
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="team-item text-center rounded overflow-hidden">
                <div className="rounded-circle overflow-hidden m-4">
                  <img
                    className="img-fluid"
                    src="src/img/team-3.jpg"
                    alt="Food Category 7"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <h5 className="mb-0">Dish Name</h5>
                <small>Description of Dish</small>
              </div>
            </div>

            {/* Food Category 8 */}
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
              <div className="team-item text-center rounded overflow-hidden">
                <div className="rounded-circle overflow-hidden m-4">
                  <img
                    className="img-fluid"
                    src="src/img/team-4.jpg"
                    alt="Food Category 8"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <h5 className="mb-0">Dish Name</h5>
                <small>Description of Dish</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FoodCat />
      <Footer />
    </>
  );
};

export default FoodCategory;
