import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import {withCookies, useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import apiService from '../services/ApiService';


const BatchUpload = () => {
    

    const [cookies, setCookie] = useCookies(['token'])
    const [columns, setColumns] = useState([])
    const [data, setData] = useState([])
    const [message, setMessage] = useState('')
    const history = useHistory()

    // Function to update Data to DB through Backend process
    const updateData = () => {
        const token = cookies.token
        
        apiService.batchUpdate(data, token)
            .then(response =>{
                
                if (response.status === 200 && response.statusText === 'OK'){
                    setCookie('token', response.data.token, {
                        path: '/status',
                        // expires: moment.unix(response.data.expiresAt).toDate()
                    })
                   history.push('/status', {cookies})
                } else {
                    setMessage('Unexpected error on submitting the bulk data')
                    return
                }
            })
    }

    // Process CSV data 
    const processData = dataString => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/)

        const list = []
        for (let i = 1; i < dataStringLines.length; i++) {
            const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/)

            if (headers && row.length == headers.length) {
                const obj = {}

                for (let j = 0; j < headers.length; j++) {
                    let d = row[j]

                    if (d.length > 0) {
                        if (d[0] === '"') 
                            d = d.substring(1, d.length - 1)
                        if (d[d.length - 1] === '"')
                            d = d.substring(d.length - 2, 1)
                    }

                    if (headers[j]) {
                        obj[headers[j]] = d
                    }
                }

                // remove the empty rows
                if (Object.values(obj).filter(x => x).length > 0) {
                    list.push(obj)
                }
            }
        }

        //Write columns list from headers
        const columns = headers.map(column => ({
            name: column,
            selector: column,
        }));


        setData(list)
        setColumns(columns)
    }

    // Handle the file upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.onload = (evt) => {
            // Parse data
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });

            // Get first worksheet
            const wsname = wb.SheetNames[0]
            const ws = wb.Sheets[wsname]

            // Convert arrays
            const data = XLSX.utils.sheet_to_csv(ws, {header:1})

            // Call process data function
            processData(data)
        };

        reader.readAsBinaryString(file)
    }

    return (
        <div>
             {/* message: only alphabets and numbers */}
             <div className="ui info message">
                <i className="close icon"></i>
                <div className="header">
                    Upload batch delivery requests file (.csv .xlsx .xls)
                </div>
                    
                <p>Please use the following names on your header inside your file.</p>
                <p style={{color: 'red'}}><i className="exclamation triangle icon red"></i>
                    All fields are mandatory except special instructions and floor/unit for landed house.
                </p>
                
                <div className="ui menu">
                    <span className="ui basic label">item_desc</span>
                    <span className="ui basic label">qty</span>
                    <span className="ui basic label">special_instructions</span>
                    <span className="ui basic label">name</span>
                    <span className="ui basic label">house_number</span>
                    <span className="ui basic label">street_address</span>
                    <span className="ui basic label">floor</span>
                    <span className="ui basic label">unit</span>
                    <span className="ui basic label">postcode</span>
                    <span className="ui basic label">contact</span>
                    <span className="ui basic label">email</span>
                </div>
            </div>

            <div>
                <input 
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                />

                <button 
                    className="ui right floated positive button"
                    onClick={updateData}
                >
                    Submit
                </button>


                <DataTable
                    pagination
                    highlightOnHover
                    columns={columns}
                    data={data}
                />

                
            </div>

            <div>
                
            </div>
        </div>

    )
}

export default withCookies(BatchUpload)