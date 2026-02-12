import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const Login = () => {
  const [show, setShow] = useState(false); // State to control modal visibility

  // Open modal only on the first page load or session
  useEffect(() => {
    // Check if modal has been shown during the current session
    const modalShown = sessionStorage.getItem('modalShown');

    if (!modalShown) {
      // If not, show the modal and set the flag in sessionStorage
      setShow(true);
      sessionStorage.setItem('modalShown', 'true');
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Handle closing of the modal
  const handleClose=()=>setShow(false);


  return (
    <div>
      {/* Modal Component */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form for login */}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
