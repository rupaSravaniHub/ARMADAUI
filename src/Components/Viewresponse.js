import { useState } from "react";
import { useLocation } from "react-router-dom"
import '../Style/Display/table.css'

export default function Viewresponse(){

    const location=useLocation();

    const details=location.state;



    return(

      <div className="displays">
      <table className="viewtable" >
            <tr>
                <th>scenerioId</th>
                <th>scenerioName</th>
                <th>countrycode</th>
                <th>inboundadapter</th>
                <th>outboundadapter</th>
                <th>flow</th>
            </tr>
            <tr>
                <td>{details.scenarioId}</td>
                <td>{details.scenarioName}</td>
                <td>{details.countryCode}</td>
                <td>{details.inboundQueue}</td>
                <td>{details.outboundQueue}</td>
                <td style={{width:'15%'}}>{details.hops}</td>
            </tr>

      </table>
      
      </div>



    )
}