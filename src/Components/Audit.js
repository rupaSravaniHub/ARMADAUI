
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons/faSquareXmark';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../Style/Audit/Audit.css'


const Audit =()=>{

   const [showTransactionDiv, setShowTransactionDiv] = useState(false); // State to toggle TransactionVisibleDiv

   // This will refresh the page
   const handleRefresh = () => {
    window.location.reload(); 
  };

// fetched Response

const [responseData, setData] = useState({});
// const [payload, setPayload]= useState({});

    // Handling input fields and connecting to backend 
    const [scenarioId, setScenarioId] = useState(null);
    const [scenarioname, setScenarioName] = useState(null);
    const [countrycode, setCountryCode] = useState(null);   

    const handleViewAudits = async () => {
        try {
            const getScenarioDetailsUrl = `http://localhost:8001/getScenarioById/${scenarioId}/${scenarioname}/${countrycode}`;
            const response = await axios.get(getScenarioDetailsUrl);
            setData(response.data)
            // setPayload(response.data.payload);
            setShowTransactionDiv(true);
        } catch (error) {
            console.log("Error while retrieving the data to modify the scenario", error.message);
        }

    };

    return(
        <div className='Transaction'>
            <div style={{ display: showTransactionDiv ? 'flex' : 'block', gap: '5rem', flexDirection: showTransactionDiv ? 'row' : 'column'}}>

                <div className='SearchDiv' style={{ pointerEvents: showTransactionDiv ? 'none' : 'auto' }}> {/* Disable SearchDiv when TransactionVisibleDiv is shown */}

                        <TextField 
                            className='InputFields'
                            id="demo-helper-text-misaligned"
                            label="Scenario_Id"
                            name="scenarioId" // Add the name attribute
                            value={scenarioId} // Bind value from the state
                            onChange={(e)=> setScenarioId(e.target.value)} // Handle the input change event
                               
                                                            
                        />

                        <TextField 
                            className='InputFields'
                            id="demo-helper-text-misaligned"
                            label="Scenario Name"
                            name="scenarioname" // Add the name attribute
                            value={scenarioname} // Bind value from the state
                            onChange={(e) => setScenarioName(e.target.value)} // Handle the input change event
                              
                                                    
                        />

                        <TextField 
                            className='InputFields'
                            id="demo-helper-text-misaligned"
                            label="Country Code"
                            name="countrycode" // Add the name attribute
                            value={countrycode} // Bind value from the state
                            onChange={(e)=> setCountryCode(e.target.value)} // Handle the input change event
                              
                        />

                        <button  style={{
                                // marginLeft:"17.5rem",
                                marginTop:"2rem",
                                height:"2rem",
                                width:"9rem",
                                border:"none",
                                color:"white",
                                borderRadius:"5px",
                                backgroundColor:"#012169",
                                fontSize:"15px"
                        }} 
                                onClick={handleViewAudits} // Trigger showing the TransactionVisibleDiv
                            > View Audits </button>
                </div>

                {showTransactionDiv && ( // Conditionally render the TransactionVisibleDiv

                    <div className='TransactionVisibleDiv'>
                    
                        <div className='FlowHeader'>
                            Flow Successfully Executed
                            <FontAwesomeIcon icon={faSquareXmark} style={{fontSize:"25px", color:"rgb(68, 62, 130)"}} onClick={handleRefresh} />
                        </div>
                        <div className='FlowBody'>
                            <input style={{
                                height:"5rem",
                                marginLeft:"1.2rem",
                                marginTop:"1rem",
                                width:"90%",
                                border:"none",
                                backgroundColor:"transparent",
                                // border:"1px solid whitesmoke",
                                
                            }}
                            value={responseData.hops}
                                readOnly
                                />
                        </div>

                        <div className='PayLoadHeader' style={{
                                marginTop:"2rem",
                                 }}>
                            Data Transmitted
                        </div>
                        <div className='PayLoadBody' >
                            <div style={{
                                        marginLeft:"1rem",
                                        marginTop:"1rem",
                                        height:"13rem",
                                        width:"91%",
                                        backgroundColor:"transparent",
                                        border:"1px solid whitesmoke",
                                        fontSize:"15px"
                                        }} >
                                    <input style={{
                                        fontSize:"15px",
                                        // width:"90%",
                                        // height:"25vh"
                                    }}
                                        value={JSON.stringify(responseData.payload) || ' '}
                                        readOnly
                                    />

                            </div>
                            
                        </div>

                    </div>
                )}       
            </div>

        </div>
    )

}

export default Audit;