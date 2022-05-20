import React, { useState, useEffect, Fragment } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import BasicModal from './Modal';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Button } from '@mui/material';
import './envelope.css';


function Envelopes() {

    let [tableData, setTableData] = useState([]);
    const [select, setSelect] = useState('');

    const columns = [
        { field: 'id', headerName: 'ID', editable: true },
        { field: 'title', headerName: 'Title', width: 200, editable: true },
        { field: 'budget', headerName: 'Budget', width: 150, editable: true }
      ]

      const handleChange =(e) => {
          setSelect(e.target.value)
      }

      const refresh = () => {
          window.location.reload(true);
      }

      function handleCommit(e){
        const array = tableData.map(r => {
            if (r.id === e.id) {
                return {...r, [e.field]: e.value}
            } else {
                return {...r}
            }
           
        })
         setTableData(array)
    }

    useEffect(() => {
        fetch("http://localhost:5000/api")
          .then((data) => data.json())
          .then((data) => setTableData(data))
      }, [select])
      console.log('', tableData)

  return (
    <Fragment>
        <div className="header">

        <h1>Personal Budget</h1>    
        
        </div>
    <div className="container">

        <p>{`Double click on cell to edit`}</p>
        
     <DataGrid
       rows={tableData}
       columns={columns}
       pageSize={12}
       onCellEditCommit={handleCommit}
       onChange={handleChange}
     />
    <div className="actions">
        <BasicModal />
        

        <Button className="refresh" color="secondary" > Refresh Table
             <RefreshIcon title="Refresh" onClick={refresh} />
        </Button>
    
     </div>
     <p>{`This app is for demo purposes only. Mock data used!`}</p>
     </div>
     </Fragment>
       )
}

export default Envelopes