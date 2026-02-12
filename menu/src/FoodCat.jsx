import axios from 'axios';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

function FoodCat() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState('');
  const [currentFoodId, setCurrentFoodId] = useState(null); // To track the current menu id for update
  const [isUpdate, setIsUpdate] = useState(false); // To check if it's an update form
  
  const handleClose = () => setOpen(false);

  const handleOpen = (foodCat = null) => {
    setIsUpdate(!!foodCat); // If menu is passed, set to update mode
    setCurrentFoodId(foodCat ? foodCat.fid : null); // Set current Food ID for update
    setCat(foodCat ? foodCat.category : ''); // Pre-fill category if in update mode
    setOpen(true); // Open the dialog
  };

  const getCat = (e) => {
    setCat(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cat)
    const dt = {
      category: cat,
    };

    if (isUpdate) {
      // Update operation
      dt.fid = currentFoodId;
      axios.put("http://127.0.0.2:3000/updateFood", dt)
        .then(response => {
          alert("Update Success");
          cntapi();
        })
        .catch(error => {
          console.error(error);
          alert("Failed to update");
        });
    } else {
      // Add operation
      axios.post("http://127.0.0.2:3000/addfood", dt)
        .then(response => {
          alert("Add Success");
          cntapi();
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
    axios.delete("http://127.0.0.2:3000/foodDeleteById", { data: dt })
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
    axios.get("http://127.0.0.2:3000/foodcat")
      .then(response => {
        let ar = response.data.food_cat;
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
        <DialogTitle>{isUpdate ? "Update Food Category" : "Add Food Category"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="category"
            name="category"
            value={cat} // Bind value to the state
            onChange={getCat}
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
        <h3 style={{ color: '#1A73E8' }}>Food Category</h3>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleOpen()}
          style={{ width: '200px' }}
        >
          Add
        </Button>

        <div
          style={{
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
          }}
        >
          <Table
            striped
            bordered
            hover
            style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
          >
            <thead>
              <tr style={{ backgroundColor: '#f1f1f1' }}>
                <th scope="col">Fid</th>
                <th scope="col">Category</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((res) => (
                <tr key={res.fid}>
                  <td>{res.fid}</td>
                  <td>{res.category}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      style={{ marginRight: '10px' }}
                      onClick={() => handleOpen(res)} // Open in update mode
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => del(res.fid)} // Delete functionality
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </center>
    </>
  );
}

export default FoodCat;
