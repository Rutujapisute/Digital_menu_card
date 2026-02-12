import axios from 'axios'
import { useState  } from 'react';

export function Api()
{
    const [api,setapi]=useState("")
    function callApi()
    {
      console.log(hi)
    }
    return(

        <>
        <center>
        <h1>api call</h1>
        <input type="button" value={"api"} onClick={callApi}></input>
        </center>
        </>
    )
}