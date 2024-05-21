import React, { Component } from "react";
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Button } from "@material-ui/core";



export default function setUpAxios() {
  
    axios.interceptors.response.use(response => {
        console.log("response", response)
        // alert("axios.interceptors");
        return response;
    }, error => {

        if (!error.response) {
            console.log("Interceptor - Server is not running");
            // window.location.assign('/server-down/');

            // confirmAlert({
            //     customUI: ({ onClose }) => {
            //         return (
            //             <div className='custom-ui'>
            //                 <h1>Down for Maintenance</h1>
            //                 <p>Website is temporarily unavailable due to planned maintenance.</p>
            //                 <Button variant="outlined" color="primary" onClick={onClose}>Ok</Button>
            //             </div>
            //         );
            //     },
            //     afterClose: () => {
            //         window.location.assign('/server-down/');
            //     }
            // });

        } else if (error.response.status === 401) {
            console.log("Interceptor - 401 - Unauthorized: Token Invalid, please login again");
            
            // alert("401 - Unauthorized: Token Invalid, please login again")

            // confirmAlert({
            //     customUI: ({ onClose }) => {
            //         return (
            //             <div className='custom-ui'>
            //                 <h1>Token Expired</h1>
            //                 <p>Unauthorized: Token expired, please login again</p>
            //                 <Button variant="outlined" color="primary" onClick={onClose}>Ok</Button>
            //             </div>
            //         );
            //     },
            //     afterClose: () => {
            //         window.location.assign('/login/');
            //     }
            // });

            //
        } else if (error.response.status === 400) {

            console.log("Interceptor - 400" + error.response.data.messages);

        } else if (error.response.status === 404) {

            console.log("API not Found");
            // alert("API not Found!");
        } else if (error.response.status === 503) {

            console.log("Interceptor - 503");
            // alert("API not Found!");
        } else {

            return Promise.reject(error);
            
        }
        

        
    });

}

