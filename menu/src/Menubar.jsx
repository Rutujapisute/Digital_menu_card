import axios from 'axios';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

function Menubar() {
  const [open, setOpen] = useState(false);
  const [mnm, setMn] = useState('');
  const [prz, setPrz] = useState(0);
  const [fid, setFid] = useState(0);
  const [qid, setQid] = useState(0);
  const [currentMenuId, setCurrentMenuId] = useState(null); // To track the current menu id for update
  const [isUpdate, setIsUpdate] = useState(false); // Flag to check if it's an update form or add

  const [data, setData] = useState([]);

  // Handle open/close of the dialog
  const handleOpen = (menu = null) => {
    setIsUpdate(!!menu); // If menu is passed, set to update mode
    setCurrentMenuId(menu ? menu.mid : null);
    setMn(menu ? menu.mname : ''); // Pre-fill form if in update mode
    setPrz(menu ? menu.price : '');
    setFid(menu ? menu.fid : '');
    setQid(menu ? menu.qid : '');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsUpdate(false); // Reset update state
  };

  const getmn = (e) => setMn(e.target.value);
  const getprice = (e) => setPrz(e.target.value);
  const getfid = (e) => setFid(e.target.value);
  const getqid = (e) => setQid(e.target.value);

  // Fetching menu data from API
  const cntapi = () => {
    axios.get("http://127.0.0.2:3000/menu")
      .then(response => {
        setData(response.data.menu);
      });
  };

  useEffect(() => {
    cntapi(); // Load data on component mount
  }, []);

  // Handle submit (Add or Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    const menuData = {
      mname: mnm,
      price: prz,
      fid: fid,
      qid: qid,
    };

    if (isUpdate) {
      // Update the menu item
      menuData.id = currentMenuId;
      axios.put("http://127.0.0.2:3000/updatemenu", menuData)
        .then(response => {
            alert("Update Success");
            cntapi(); // Refresh the table
            handleClose();
        });
    } else {
      // Add new menu item
      axios.post("http://127.0.0.2:3000/addmenu", menuData)
        .then(response => {
            alert("Success");
            cntapi(); // Refresh the table
            handleClose();
        });
    }
  };

  // Delete menu item
  const del = (id) => {
    const dt = { id };
    axios.delete("http://127.0.0.2:3000/delmenuById", { data: dt })
      .then(response => {
          alert("Delete Success");
          cntapi(); // Refresh the table
      });
  };

  return (
    <>
      {/* Dialog for Add or Update Menu */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isUpdate ? 'Update Menu' : 'Add Menu'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Menu Name"
            name="mname"
            value={mnm}
            onChange={getmn}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Price"
            name="price"
            type="number"
            value={prz}
            onChange={getprice}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Fid"
            name="fid"
            type="number"
            value={fid}
            onChange={getfid}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Qid"
            name="qid"
            type="number"
            value={qid}
            onChange={getqid}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            {isUpdate ? 'Update' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white' }}>
        <h1 style={{ textAlign: 'center', paddingTop: '20px' }}>Menu</h1>
        <Button variant="contained" color="success" onClick={() => handleOpen()} style={{ width: '200px', display: 'block', margin: '0 auto' }}>
          Add Menu
        </Button>

        <center>
          <div className="mt-4 p-5 text-white rounded" style={{ backgroundColor: '#333' }}>
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">Mid</th>
                  <th scope="col">Menu Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Fid</th>
                  <th scope="col">Qid</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((res) => (
                  <tr key={res.mid}>
                    <td>{res.mid}</td>
                    <td>{res.mname}</td>
                    <td>{res.price}</td>
                    <td>{res.fid}</td>
                    <td>{res.qid}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => handleOpen(res)}
                      >
                        Update
                      </button>&nbsp;&nbsp;
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => del(res.mid)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </center>
      </div>
    </>
  );
}

export default Menubar;
