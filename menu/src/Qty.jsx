import axios from 'axios';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Footer from './Footer';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

function Qty() {
  const [data, setData] = useState([]);  // Set initial state to an empty array
  const [open, setOpen] = useState(false);
  const [Sz, setSz] = useState('');
  const [currentQtyId, setCurrentQtyId] = useState(null); // To track the current menu id for update
  const [isUpdate, setIsUpdate] = useState(false); // To check if it's an update form

  const handleClose = () => setOpen(false);

  const handleOpen = (qty_mast = null) => {
    setIsUpdate(!!qty_mast); // If menu is passed, set to update mode
    setCurrentQtyId(qty_mast ? qty_mast.qid : null); // Set current Qty ID for update
    setSz(qty_mast ? qty_mast.size : ''); // Pre-fill size if in update mode
    setOpen(true); // Open the dialog
  };

  const getSz = (e) => {
    setSz(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Sz);
    const dt = {
      size: Sz,  // Only send the size when adding
    };

    if (isUpdate) {
      // Update operation
      dt.qid = currentQtyId;
      axios.put("http://127.0.0.2:3000/updateqty", dt)
        .then(response => {
          alert("Update Success");
          cntapi(); // Refresh the table
        })
        .catch(error => {
          console.error(error);
          alert("Failed to update");
        });
    } else {
      // Add operation (do not send qid)
      axios.post("http://127.0.0.2:3000/addqty", dt)
        .then(response => {
          alert("Add Success");
          cntapi(); // Refresh the table
        })
        .catch(error => {
          console.error(error);
          alert("Failed to add");
        });
    }

    handleClose(); // Close the dialog after submission
  };

  const del = (id) => {
    const dt = { id };
    axios.delete("http://127.0.0.2:3000/deleteqty", { data: dt })
      .then(response => {
        alert("Delete Success");
        cntapi(); // Refresh the table
      })
      .catch(error => {
        console.error(error);
        alert("Failed to delete");
      });
  };

  const cntapi = () => {
    axios.get("http://127.0.0.2:3000/qty")
      .then(response => {
        let ar = response.data.menu || [];  // Default to an empty array if undefined
        setData(ar);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    cntapi();
  }, []);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isUpdate ? "Update Size" : "Add Size"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Size"
            name="name"
            value={Sz}
            onChange={getSz}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <center>
        <h3 style={{ color: '#1A73E8' }}>Quality Master</h3>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleOpen()} // Open in Add mode
          style={{ width: '200px' }}
        >
          Add
        </Button>

        <div className="mt-4 p-5 text-white rounded" style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <Table striped bordered hover style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <thead>
              <tr>
                <th scope="col">QID</th>
                <th scope="col">Size</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((res) => {
                  return (
                    <tr key={res.qid}>
                      <td>{res.qid}</td>
                      <td>{res.size}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-warning button"
                          style={{ marginRight: '10px' }}
                          onClick={() => handleOpen(res)} // Open in update mode with specific data
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger button"
                          onClick={() => del(res.qid)} // Delete functionality
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3">No data available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </center>
      <Footer/>
    </>
  );
}

export default Qty;
