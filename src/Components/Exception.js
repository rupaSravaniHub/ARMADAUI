import React, { useState } from 'react';

import { Dropdown, DropdownButton } from 'react-bootstrap';
import axios from "axios";
import Button from '@mui/material/Button';
import '../Style/Exception/exceptionStyling.css'
import { TextField } from '@mui/material';
const ExceptionDetails = () => {
    const [idInputField, setIdInputField] = useState('');
    const [nameInputField, setNameInputField] = useState('');
    const [ccInputField, setCcInputField] = useState('');
    
    const [details, setDetails] = useState({});

    const [showException, setShowException] = useState(false);
    const showExceptions = () => {
       
        const scenarioDetailsUrl = `http://localhost:8080/getExceptionDetails/${idInputField}/${nameInputField}/${ccInputField}`;
      
        axios.get(scenarioDetailsUrl)
            .then(response => {
                setDetails(response.data);
                console.log(response.data);
                setViewExcepDetails(!viewExcepDetails);
            })
            .catch(error => console.error('Error fetching data:', error));
            
       
    };

    const [viewExcepDetails, setViewExcepDetails] = useState(false);
    const viewDetails = () => {
        setShowException(false);
        setViewExcepDetails(!viewExcepDetails);
    };

    //function to show Exception Details
    const [showExcepStack, setShowExcepStack] = useState(false);
    const excepStack = () => {
        setShowExcepStack(!showExcepStack);
    };

    //functiion to show payload Details
    const [payload, setPayload] = useState(false);
    const displayPayload = () => {
        setPayload(!payload);
    };

    return (
        <div className='mainGrid'>
            <div className='inputField_container'>
            <TextField label="Scenario Id" variant="outlined"  className='InputFields' sx={{width:' 400px',marginTop:'2rem'}} value={idInputField} onChange={(e) => setIdInputField(e.target.value)} />
            <TextField label="Scenario Name" variant="outlined"  className='InputFields' sx={{width:' 400px',marginTop:'2rem'}} value={nameInputField}  onChange={(e) => setNameInputField(e.target.value)}/>
            <TextField label="Country Code" variant="outlined"  className='InputFields' sx={{width:' 400px',marginTop:'2rem'}} value={ccInputField}  onChange={(e) => setCcInputField(e.target.value)} />
                {/* <div className="InputField">
                    <label>Scenario Id</label>
                    <input type="text" id="input" name='idInputField' value={idInputField} onChange={(e) => setIdInputField(e.target.value)}/>
                </div>
                <div className="InputField">
                    <label>Scenario Name</label>
                    <input type="text" id="input" name='nameInputField' value={nameInputField} onChange={(e) => setNameInputField(e.target.value)}/>
                </div>
                <div className="InputField">
                    <label>Country Code</label>
                    <input type="text" id="input" name='ccInputField' value={ccInputField} onChange={(e) => setCcInputField(e.target.value)}/>
                </div> */}
                {/* <button className='exceptionBtn' onClick={showExceptions}>Exceptions</button> */}

                <Button variant='contained' sx={{backgroundColor:'#012169',height:'2rem',width:'10rem',marginTop:'2REM'}} onClick={showExceptions}>Exceptions</Button>
            </div>

            {viewExcepDetails && (
                <div className='displayExcepDet'>
                    <p >Exception Info</p>
                    <table>
                        <tbody>
                            <tr>
                                <td color='white'><span>Source Queue:</span></td>
                                <td> <input className='tdInput' value={details?.sourceQueue || ''} readOnly/> </td>
                            </tr>
                            <tr>
                                <td><span>Target Queue:</span></td>
                                <td> <input  className='tdInput'  value={details?.targetQueue || ''} readOnly/> </td>
                            </tr>
                            <tr>
                                <td><span>Message ID:</span></td>
                                <td> <input className='tdInput' value={details?.messageId || ''} readOnly /> </td>
                            </tr>
                            <tr>
                                <td><span>Timestamp:</span></td>
                                <td> <input className='tdInput' value={details?.timeStamp || ''} readOnly/></td>
                            </tr>
                        </tbody>
                    </table>
                    {/* exception Button */}
                    <button className='ExcepBtn' onClick={excepStack}>Exception Details</button>
                    {showExcepStack && (
                        <div className='exceptionStack'>
                           <span> {details?.exceptionDetails || ''}</span>
                        </div>
                    )}
                    {/* payload button */}
                    <button className='PayloadBtn' onClick={displayPayload}>Payload</button>
                    {payload && (
                        <div className='payloadDisplay'>
                           <span> {JSON.stringify(details?.payload, null, 2) || ''}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
export default ExceptionDetails;