import axios from 'axios';
import { createBrowserHistory } from "history";
// import React, { Component } from "react";
// import { confirmAlert } from 'react-confirm-alert'; // Import
// import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
// import { Button } from "@material-ui/core";

const token = sessionStorage.getItem("token");
sessionStorage.setItem("peer_insurer", "peer0.insurer-net");
const peer = sessionStorage.getItem("peer");
const peer_insurer = "peer0.insurer-net";
const peers = sessionStorage.getItem("peers");
const factor_peer = "peer0.factor-net"
const userid = sessionStorage.getItem("user_id");
const LimaPeer = "peer1.trustee.trurep.testing.emulya.com";
const role = "trustee";
const saludaPeer = sessionStorage.getItem("peer");
const ChannelName = sessionStorage.getItem('ChannelName')

export const history = createBrowserHistory();

// export const API = axios.create({
// 	baseURL: process.env.react_app_base_url_lima + 'backendapi/',
// });
export const API = axios.create({
	baseURL: process.env.react_app_base_url + 'backendapiumb/',
});

console.log('pppppppppppppppp',process.env.react_app_base_url)

API.interceptors.response.use(response => {

	console.log("response", response)
	if (response.data.token == -1) {
		alert("Token expired, please login again!")
		window.location.href = "/";
	} else {
		return response;
	}

}, error => {

	console.log("error", JSON.stringify(error));

	if (!error.response) {
		console.log("Interceptor - Server is not running");
		// window.location.href = "/server-down";


	} 
	else if (error.response.status === 401) {
      
		console.log("Interceptor - 401 - Unauthorized: Token Invalid, please login again");
		// alert("Token Missing!")
		sessionStorage.clear();
        window.location.assign("/")

	} 
	else if (error.response.status === 400) {

		console.log("Interceptor - 400" + error.response.data.messages);
		alert("Missing Arguments!")
		return null;

		

	} else if (error.response.status === 503) {

		console.log("Interceptor - 503" + error.response.data.messages);
		alert("503 service unavailable")
		return null;

	}  else if (error.response.status === 504) {

		console.log("Interceptor - 504" + error.response.data.messages);
		alert("504 Gateway Timeout")
		return null;

	} 
	else if (error.response.status === 422) {

		console.log("Interceptor - 422" + error.response.data.messages);
		return error;

	} 
	else if (error.response.status === 404) {

		console.log("Interceptor - 404" + error.response.data.messages);
		return error;

	} 
	else if (error.response.status === 500) {
	      
		console.log("Interceptor - 500" + error.response.data.messages);
		// alert("Internal Server Error")
		return error;

	} 
	
	
	else {

		return Promise.reject(error);

	}


})


// API.interceptors.response.use(function (response) {
//     console.log("response", response)
//     if (response.data.token == -1) {
//         alert("Token expired, please login again!")
//         // alert("review your answer");
//         window.location.href = "/";
//     } else {
//         return response;
//     }
// }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     console.log(error.response.data);
//     console.log(error.response.status);
//     console.log(error.response.headers);
//     if (!error.response) {
//         console.log("Interceptor - Server is not running");
//         window.location.assign('/server-down/');
//         confirmAlert({
//             customUI: ({ onClose }) => {
//                 return (
//                     <div className='custom-ui'>
//                         <h1>Down for Maintenance</h1>
//                         <p>Website is temporarily unavailable due to planned maintenance.</p>
//                         <Button variant="outlined" color="primary" onClick={onClose}>Ok</Button>
//                     </div>
//                 );
//             },
//             afterClose: () => {
//                 window.location.assign('/server-down/');
//             }
//         });
//     } else if (error.response.status === 401) {
//         console.log("Interceptor - 401 - Unauthorized: Token Invalid, please login again");
//         alert("401 - Unauthorized: Token Invalid, please login again")
//         confirmAlert({
//             customUI: ({ onClose }) => {
//                 return (
//                     <div className='custom-ui'>
//                         <h1>Token Expired</h1>
//                         <p>Unauthorized: Token expired, please login again</p>
//                         <Button variant="outlined" color="primary" onClick={onClose}>Ok</Button>
//                     </div>
//                 );
//             },
//             afterClose: () => {
//                 window.location.assign('/login/');
//             }
//         });
//     } else if (error.response.status === 400) {
//         alert()
//         console.log("Interceptor - 400" + error.response.data.messages);
//     } else if (error.response.status === 404) {
//         console.log("API not Found");
//         alert("API not Found!");
//     } else if (error.response.status === 503) {
//         console.log("Interceptor - 503");
//         alert("Error 503!");
//     } else {
//         return Promise.reject(error);
//     }
// });

//User 

// export const authenticate = async (data) => {
// 	const response = await API.post(process.env.react_app_base_url + 'authenticate', data)
// 	return response;
// };
//-------------------------------------------INTAIN-MARKET--------------------------------------------------------------
export const createNewAccount = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/createnewaccount',data)
	return response;
};
export const Login = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/login',data)
	return response;
};
export const Register = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/signUp',data)
	return response;
};
export const ForgotPassword = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/forgotPassword?EmailAddress=' + data.EmailId + '&Role='+data.Role)
	return response;
}; // login is not happened
export const ResetPassword = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/resetPassword',data)
	return response;
};// login is not happened
export const GetAllPools = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getallpoolsbyIssuerId?issuerId=' +data.issuerId +'&mailid='+ data.mailid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const SetUpPool = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/createpool',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const downloadlogo = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/downloadlogo',data ,{ headers: {"authorization" : `Bearer ${data.token}`} , responseType : 'arraybuffer' })
	return response;
};
export const Downloadpreviewstdloantape = async (data)=>{
	const response = await API.post(`https://nodeapp.imtest.intainmarkets.us/downloadpreviewstdloantape`,data, { headers: {"authorization" : `Bearer ${data.token}`} ,responseType : 'arraybuffer'  })
	return response;
}
export const UpdatePool = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/updatepool',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const UpdateReadlist = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/updatereadlist',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const Uploadloanlms = async (data,token) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/uploadloanlms',data ,{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};
export const UploadLoanTape = async (data,token) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/UploadLoanTape',data ,{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};
export const SaveLoanProcessDate = async (data,token) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/iasaveloanprocessdate',data ,{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};
export const dealPreviewLoanTape = async (data,token) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/PreviewLoanTape?DealName=' + data.DealName + '&Month=' + data.Month + '&Year=' + data.Year + '&ServicerName=' + data.ServicerName  + '&peer=' + data.peer ,{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};
export const StdfieldsQuery = async (data,token) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/StdfieldsQuery?DealName=' + data.DealName + '&Month=' + data.Month + '&Year=' + data.Year + '&ServicerName=' + data.ServicerName  + '&peer=' + data.peer + '&AssetType=' + data.AssetType,{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};
export const getMapping = async (data,token) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getMapping?DealName='+ data.DealName + '&Month=' + data.Month + '&Year=' + data.Year + '&ServicerName=' + data.ServicerName + '&peer=' + data.peer,{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};
export const saveMapping = async (data,token) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/saveMapping',data,{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};
export const summarize = async (data,token) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/summarize',data,{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};
export const saveaggregatesummarytobc = async (data,token) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/saveaggregatesummarytobc',data,{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};
export const viewaggregatesummary = async (data,token) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/viewaggregatesummary?DealName='+ data.DealName + '&Month=' + data.Month + '&Year=' + data.Year + '&ServicerName=' + data.ServicerName + '&peer=' + data.peer,{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};

export const PreviewMappedFields = async (data,token) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/PreviewMappedFields?DealName=' + data.DealName + '&Month=' + data.Month + '&Year=' + data.Year + '&ServicerName=' + data.ServicerName  + '&peer=' + data.peer + '&AssetType=' + data.AssetType,{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};
export const Onboradloans = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/onboardloans',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const GetAllLoans = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getallloans?issuerId='+data.issuerId,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const FilteredLoans = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/filterloans',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const updateVerificationTemplate = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/updateVerificationTemplate',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getOriginatorlist = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getOriginatorlist?poolid='+data.poolid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getverficationtemplatedetails = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getverficationtemplatedetails',{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};
export const QueryStandardFieldnames = async (data,token) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/querystandardfieldnames?AssetType=' + data.AssetType,{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};
export const PreviewSaveMapping = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/previewsavemapping',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const PreviewQueryPoolMappingDetails = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/previewquerypoolmappingdetails?poolid='+data.poolid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const MapPoolToLoan = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/mappoolstoloans',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const PoolDetails = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getbypoolid?poolid='+ data.poolid+'&issuerId='+ data.issuerId + '&userid='+data.userid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const UpdateLoanAndPoolStatus = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/updateLoanAndPoolStatus?poolid='+ data.poolid + '&poolStatus='+ data.poolStatus + '&loanStatus='+ data.loanStatus,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getNotificationList = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getnotificationlist?poolid='+ data.poolid + '&userid='+ data.userid ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getVaToken = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/fetchVAToken?VAToken=' + data.VAToken , { headers: {"authorization" : `Bearer ${data.token}`} } )
	return response;
};
export const downloadVaCertificate = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/downloadVAcertificate' , data , { headers: {"authorization" : `Bearer ${data.token}`}, responseType: "arraybuffer"} )
	return response;
};
export const updateVAcertificate = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/updateVAcertificate', data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const MoveVAcontractfiles = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/MoveVAcontractfiles', data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const UploadKyc = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/upload',data)
	return response;
};

export const NextAPI = async (data) => {
    const response = await API.post('https://nodeapp.imtest.intainmarkets.us/ERC20',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
    return response;
};
export const UploadContract = async (data) => {
    const response = await API.post('https://indumb.imtest.intainmarkets.us/api/upload_documents',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
    return response;
};
export const ValidateLoan = async (data) => {
    const response = await API.post('https://indumb.imtest.intainmarkets.us/api/validate_loan',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
    return response;
};
export const ViewLoans = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getbypoolid?poolid='+data.poolid+'&VAId='+data.VAId,{ headers: {"authorization" : `Bearer ${data.token}`} })
    return response;
};	
export const ViewLoansAI = async (data) => {
	const response = await API.post('https://indumb.imtest.intainmarkets.us/api/view_single_loan',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })

    return response;
};	

export const UpdateReviewedResults = async (data)=> {
	const response = await API.post('https://indumb.imtest.intainmarkets.us/api/update_results',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
}

export const GetValidateResults = async (data)=>{
	const response = await API.post('https://indumb.imtest.intainmarkets.us/api/get_validate_results',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
}

export const VAExceptionalReport = async (data)=>{
	const response = await API.post(`https://nodeapp.imtest.intainmarkets.us/exceptionReport`,data, { headers: {"authorization" : `Bearer ${data.token}`} ,responseType : 'arraybuffer'  })
	return response;
}

export const SetUpPoolRoles = async (data) => {
    const response = await API.get('https://nodeapp.imtest.intainmarkets.us/GetAllUsersByUserRole',{ headers: {"authorization" : `Bearer ${data.token}`} })
    return response;
};	

export const GetAItrainedPoolNames  = async (data) => {
    const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getAItrainedPoolNames',{ headers: {"authorization" : `Bearer ${data.token}`} })
    return response;
};	

export const GetAllPoolsByVaId = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getallpoolsbyVAId?VAId='+data.VAId + '&mailid='+ data.mailid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const UpdatePoolStatus = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/updatePoolStatus?poolid='+ data.poolid + '&status='+ data.status,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const UpdateLoanStatus = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/updateLoanStatus?loanid='+ data.loanid + '&status='+ data.status+ `&poolid=` + data.poolid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const retrieveFeedback = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/retrievefeedback?loanid='+ data.loanid + '&poolid='+ data.poolid + '&userid='+data.userid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const updateArrayofLoanStatus = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/updateArrayofLoanStatus', data,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const saveFeedback = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/saveFeedback', data,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};

export const UpdateData = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/updatedatas',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const NFTmint = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/NFTmint',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getpoolsfrombcbyunderwriter = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getpoolsfrombcbyunderwriter?underwriterid='+ data.underwriterid + '&mailid='+ data.mailid ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const previewunderwriterpool = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/previewunderwriterpool?underwriterId='+ data.underwriterId + '&mailid='+ data.mailid ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const previewupdatePoolStatus = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/previewupdatePoolStatus',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const UpdatePoolUWStatus = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/updatepoolstatusbc',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const UpdateDealUW = async (data,token) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/updatedeal',data ,{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};
export const CreateDealUW = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/createDeal',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getDealsByUnderwriter = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getDealsByUnderwriterId?underwriterId='+data.underwriterId + '&mailid='+ data.mailid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const addDealDocument = async (data,token) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/addDealDocuments',data ,{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};
export const updateDealDocument = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/updateDealDocument',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const PublishUW= async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/updatedealstatus',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const downloadDealTemplate = async (token) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/downloadDealTemplate',{ headers: {"authorization" : `Bearer ${token}`} ,responseType: 'arraybuffer'})
	return response;
};
export const getDealDetailsByDealId = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getDealDetailsByDealId?dealid='+data.dealid+'&userid='+data.userid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getDealsbyServicerId= async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getDealsbyServicerId?servicerid='+data.servicerid + '&mailid='+ data.mailid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getAllDeals= async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getAllDeals?mailid='+data.mailid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const InvestmentCommit = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/InvesmentCommit',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const EditCommit = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/EditCommit',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const DealDetailsRedirect = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/DealDetailsRedirect?dealid='+data.dealid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const uploadapproach = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/uploadapproach',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const Invest = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/Invest',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const RecurringsetupDateQuery= async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/datequery?dealid='+data.dealid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const RecurringsetupDateAnalyse = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/dateanalyse',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const RecurringsetupUploadServicerReport = async (data,token) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/uploadservicerreport',data ,{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};
export const ServicerShowColumns= async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/showcolumns?dealid='+data.dealid + '&assetclass='+ data.assetclass + '&month='+ data.month + '&year='+ data.year,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const ServicerSaveMapping = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/savemapping',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const viewservicerdatadb = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/viewservicerdatadb?dealid='+data.dealid + '&confirmation='+ data.confirmation + '&month='+ data.month + '&year='+ data.year,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const saveservicerdata = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/saveservicerdata',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getcommitmentdetails = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getcommitmentdetails?trancheid='+data.trancheid+'&closingdate='+data.closingdate,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const saveDealDetailsbyDealIdPostClosing = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/saveDealDetailsbyDealIdPostClosing',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getDealDetailsbyDealIdPostClosing = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getDealDetailsbyDealIdPostClosing?dealid='+data.dealid + '&month='+ data.month + '&year='+ data.year,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getPreviousDealDetails = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getPreviousDealDetails?dealid='+data.dealid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getInvestorDealDetailsByDealId = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getInvestorDealDetailsByDealId?dealid='+data.dealid+'&investorid='+data.investorid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
}
export const previewInvestorPool = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/previewinvestorpool?investorId='+ data.investorId + '&mailid='+ data.mailid ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getAllInvestmentsByInvId = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getAllInvestmentsByInvId?investorid='+data.investorid + '&mailid='+ data.mailid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
}
export const getDealDetailsbyInvIdPostClosing = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getDealDetailsbyInvIdPostClosing?dealid='+data.dealid + '&month='+ data.month + '&year='+ data.year+'&investorid='+data.investorid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const SavePaymentSettings = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/SavePaymentSettings',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getwiretransferdetails = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getwiretransferdetails?trancheid='+data.trancheid +'&investorid='+data.investorid+'&issuerid='+data.issuerid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
}
export const transferUSDCtoInvestor = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/transferUSDCtoInvestor',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const layerzerosendmessage = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/layerzerosendmessage',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getDealsByIssuerId = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getDealsByIssuerId?issuerid='+data.issuerid + '&mailid='+ data.mailid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const updatetranchestatus = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/updatetranchestatus',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getservicertransactiondetails = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getservicertransactiondetails?dealid='+data.dealid ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
}
export const transferUSDCtoServicer = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/transferUSDCtoServicer',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const SaveTransactionDetails = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/SaveTransactionDetails',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
//paying agent
export const getDealsbyPayingAgentId= async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getDealsbyPayingagentId?payingagentid='+data.payingagentid + '&mailid='+ data.mailid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const updatedealreviewstatus = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/updateDealreviewstatus',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getTransferTableDetails= async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getAllInvestorInvestmentsbyDealID?dealid='+data.dealid+ '&month='+ data.month + '&year='+ data.year,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getpayingagenttransactiondetails= async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getpayingagenttransactiondetails?investorid='+data.investorid+ '&payingagentid='+ data.payingagentid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const updateUSDCtransferstatus = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/updateUSDCtransferstatus',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const servicerRedirect = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/servicerRedirect?dealid='+data.dealid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getdealstatusbydealid = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getdealstatusbydealid?dealid='+data.dealid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getAttributesByPoolName = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getAttributesByPoolName?aitrainedpoolname='+data.aitrainedpoolname,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const savebankdetailsoffchain = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/savebankdetailsoffchain',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getUserOffchainBankDetails = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getUserOffchainBankDetails?userid='+data.userid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const savetransactiondetailsoffchain = async (data,token) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/savetransactiondetailsoffchain',data ,{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};
export const gettransactiondetailsoffchainbydealid = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/gettransactiondetailsoffchainbydealid?dealid='+data.dealid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const updatetransactiondetailsoffchain = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/updatetransactiondetailsoffchain',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const updatepaymentmode = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/updatepaymentmode',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const updateaccountsoffchain = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/updateaccountsoffchain',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getaccountdetailsbydealidoffchain = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getaccountdetailsbydealidoffchain?dealid='+data.dealid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const addaccountdetailsoffchain = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/addaccountdetailsoffchain',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getinvestorsoffchainwiredetails = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getinvestorsoffchainwiredetails?dealid='+data.dealid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getAllInvestorCommitmentsbyDealID = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getAllInvestorCommitmentsbyDealID?dealid='+data.dealid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const InvestOffchain = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/InvestOffchain',data ,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getserviceroffchainwiredetails= async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getserviceroffchainwiredetails?dealid='+data.dealid+ '&month='+ data.month + '&year='+ data.year,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getpayingagentoffchainwiredetails= async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getpayingagentoffchainwiredetails?dealid='+data.dealid+ '&month='+ data.month + '&year='+ data.year,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const updatepostclosingscreenstatus= async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/updatepostclosingscreenstatus',data,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const deletetransactiondetailsoffchain= async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/deletetransactiondetailsoffchain',data,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const deleteaccountsoffchain= async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/deleteaccountsoffchain',data,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const getaccountdetailsbydealidoffchainpendingtransaction= async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getaccountdetailsbydealidoffchainpendingtransaction?dealid='+data.dealid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const updateTermsOfService= async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/updateTermsOfService',data,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const updatepreviewinvestorlist= async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/updatepreviewinvestorlist',data,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const addAttribute= async (data,token) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/addAttribute',data,{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};
export const getAllAttributes= async (token) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getAllAttributes',{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};
export const mapAttributesToPool= async (data,token) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/mapAttributesToPool?poolid='+data.poolid+ '&poolname='+ data.poolname,{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};
export const getuserbyid= async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getuserbyid?userid='+data.userid,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const approvetranche= async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/approvetranche',data,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const approvetranchebywalletfile= async (data,token) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/approvetranchebywalletfile',data,{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};
export const deleteloans= async (data,token) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/deleteloans',data,{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};
export const previewDeleteLoans= async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/previewdeleteloans',data,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const DownloadIPFSFile = async (data,filetype) => {
	if(filetype == 'pdf'){
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/DownloadIPFSFile?documentid='+data.documentid,{ headers: {"authorization" : `Bearer ${data.token}`},responseType: 'arraybuffer'})
	return response;
}
else{
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/DownloadIPFSFile?documentid='+data.documentid,{ headers: {"authorization" : `Bearer ${data.token}`},responseType: 'arraybuffer'})
	return response;
}
};
export const downloadpayagentdetails = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/downloadpayagentdetails?dealid='+data.dealid + '&month='+ data.month + '&year='+ data.year,{ headers: {"authorization" : `Bearer ${data.token}`} ,responseType: 'arraybuffer'})
	return response;
};
export const getPoolDocument = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getPoolDocument?issuerid='+data.issuerid + '&poolid='+ data.poolid,{ headers: {"authorization" : `Bearer ${data.token}`}})
	return response;
};
export const addPoolDocument= async (data,token) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/addPoolDocument',data,{ headers: {"authorization" : `Bearer ${token}`} })
	return response;
};
export const updatepooldocuments= async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/updatepooldocuments',data,{ headers: {"authorization" : `Bearer ${data.token}`} })
	return response;
};
export const DownloadPoolDoc = async (data,filetype) => {
	if(filetype == 'pdf'){
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/DownloadPoolDoc?documentid='+data.documentid,{ headers: {"authorization" : `Bearer ${data.token}`},responseType: 'arraybuffer'})
	return response;
}
else{
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/DownloadPoolDoc?documentid='+data.documentid,{ headers: {"authorization" : `Bearer ${data.token}`},responseType: 'arraybuffer'})
	return response;
}
};
export const getFileListByDealName = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getFileListByDealName?poolname='+data.poolname + '&verificationtemplate=' + data.verificationtemplate,{ headers: {"authorization" : `Bearer ${data.token}`}})
	return response;
};
export const addlogo = async (data,token) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/addlogo',data,{ headers: {"authorization" : `Bearer ${token}`}})
	return response;
};
export const DeleteDealDocument = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/DeleteDealDocument',data,{ headers: {"authorization" : `Bearer ${token}`}})
	return response;
};
export const uploadPreclosingXl = async (data,token) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/uploadPreclosingXl',data,{ headers: {"authorization" : `Bearer ${token}`}})
	return response;
};
export const DownloadPreclosingTemplate = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/DownloadPreclosingTemplate',data,{ headers: {"authorization" : `Bearer ${data.token}`},responseType: 'arraybuffer'})
	return response;
};
export const DeletePoolDocument = async (data) => {
	const response = await API.post('https://nodeapp.imtest.intainmarkets.us/DeletePoolDocument',data,{ headers: {"authorization" : `Bearer ${data.token}`}})
	return response;
};


//  Rating AGency  

export const previewratingagencypool = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/previewratingagencypool?ratingagency='+data.ratingagency + '&mailid=' + data.mailid,{ headers: {"authorization" : `Bearer ${data.token}`}})
	return response;
};

export const getallratingagencypool = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getallratingagencypool?ratingagency='+data.ratingagency + '&mailid=' + data.mailid,{ headers: {"authorization" : `Bearer ${data.token}`}})
	return response;
};

export const getDealsByRatingagencyId = async (data) => {
	const response = await API.get('https://nodeapp.imtest.intainmarkets.us/getDealsByRatingagencyId?ratingagency='+data.ratingagency + '&mailid=' + data.mailid,{ headers: {"authorization" : `Bearer ${data.token}`}})
	return response;
};

//Paying Agent - IA Replication

export const dealCreationTable = async (data,token) => {
	const response = await API.get(
	  process.env.react_app_base_url +"trustee/viewtableexp?DealName=" +data.DealName +"&TableName=" +data.TableName +"&dealid=" +data.dealid,{ headers: { authorization: `Bearer ${token}` } }
	);
	return response;
};

export const generalRecurring = async (data,token) => {
	const response = await API.post(
	  process.env.react_app_base_url +"trustee/recurring", data ,{ headers: { authorization: `Bearer ${token}` } }
	);
	return response;
};
export const dealCreation_BC_Status = async (data,token) => {
	const response = await API.get(
	  process.env.react_app_base_url +"trustee/bcstatus?DealName=" +data.DealName ,{ headers: { authorization: `Bearer ${token}` } }
	);
	return response;
};
export const viewPdfLogo = async (data,token) => {
	const response = await API.get(
	  process.env.react_app_base_url +"trustee/viewpdflogo?userid=" +data.userid ,{ headers: { authorization: `Bearer ${token}` } }
	);
	return response;
};
export const dealCreationSaveForNow = async (data,token) => {
	const response = await API.post(
	  process.env.react_app_base_url +"trustee/savefornow", data ,{ headers: { authorization: `Bearer ${token}` } }
	);
	return response;
};
export const savedealservicerdate = async (data,token) => {
	const response = await API.post(
	  process.env.react_app_base_url +"trustee/savedealservicerdate", data ,{ headers: { authorization: `Bearer ${token}` } }
	);
	return response;
};
export const ViewBorrowingTable = async (data,token) => {
	const response = await API.post(
	  process.env.react_app_base_url +"trustee/viewborrowingbasetable", data ,{ headers: { authorization: `Bearer ${token}` } }
	);
	return response;
};
export const dealCreationCreateUpdate = async (data,token) => {
	const response = await API.post(
	  process.env.react_app_base_url +"trustee/createupdate", data ,{ headers: { authorization: `Bearer ${token}` } }
	);
	return response;
};
export const uploadpdflogo = async (data,token) => {
	const response = await API.post(
	  process.env.react_app_base_url +"trustee/uploadpdflogo", data ,{ headers: { authorization: `Bearer ${token}` } }
	);
	return response;
};
export const dealCreationAutoSave = async (data,token) => {
	const response = await API.post(
	  process.env.react_app_base_url +"trustee/autosave", data ,{ headers: { authorization: `Bearer ${token}` } }
	);
	return response;
};
export const recurring = async (data,token) => {
	const response = await API.get(
	  process.env.react_app_base_url + "trustee/recurring?DealName=" +data.DealName +"&Month=" +data.Month +"&Year=" + data.Year + "&TableName=" + data.TableName +"&Version=" + data.Version ,{ headers: { authorization: `Bearer ${token}` } }
	);
	return response;
};
export const dealCreationAddSave = async (data,token) => {
	const response = await API.post(
	  process.env.react_app_base_url +"trustee/savetableexp", data ,{ headers: { authorization: `Bearer ${token}` } }
	);
	return response;
};
export const dealCreationEdit = async (data,token) => {
	const response = await API.post(
	  process.env.react_app_base_url +"trustee/edittableexp", data ,{ headers: { authorization: `Bearer ${token}` } }
	);
	return response;
};
export const ViewAccountTable = async (data,token) => {
	const response = await API.post(
	  process.env.react_app_base_url +"trustee/viewaccounttable", data ,{ headers: { authorization: `Bearer ${token}` } }
	);
	return response;
};
export const dealCreationDelete = async (data,token) => {
	const response = await API.post(
	  process.env.react_app_base_url +"trustee/deletetableexp", data ,{ headers: { authorization: `Bearer ${token}` } }
	);
	return response;
};
//----------------------------------------------------------UMB--VERIFICATION----------------------------------------------------------------


//-------------------------------------------------UMB VERIFICATION----------222UCC1------------------------------------------------------------



export const months = [
	{
		value: '1',
		label: 'January',
	},
	{
		value: '2',
		label: 'February',
	},
	{
		value: '3',
		label: 'March',
	},
	{
		value: '4',
		label: 'April',
	},
	{
		value: '5',
		label: 'May',
	},
	{
		value: '6',
		label: 'June',
	},
	{
		value: '7',
		label: 'July',
	},
	{
		value: '8',
		label: 'August',
	},
	{
		value: '9',
		label: 'September',
	},
	{
		value: '10',
		label: 'October',
	},
	{
		value: '11',
		label: 'November',
	},
	{
		value: '12',
		label: 'December',
	},
];

export function generateYears() {
	let min = 2010;
	console.log("min", min)
	let max = new Date().getFullYear();
	console.log("max", max)
	let years = []
	for (var i = min; i <= max; i++) {
		console.log("asdasd", i)
		years.push(
			{
				value: i.toString(),
				label: i.toString()
			}
		)

	}
	let reversarray = years.reverse();
	return reversarray

}


















