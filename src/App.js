import React, { Component, Suspense, lazy } from 'react';
import CacheBuster from './CacheBuster';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ScrollToTop from './components/scrollToTop';
import setUpAxios from "./interceptor";
import { SnackbarProvider } from 'notistack';
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import { LoginLayoutRoute } from './container/LoginLayoutRoute';
import Login from './container/admin/Login/login';
import KycAdditionalInvester from './container/admin/kyc/kycAdditionalInvestor'
import ResetPassword from './container/admin/Login/resetPassword';
import Popup1 from './container/admin/popup/popup1';
import Popup2 from './container/admin/popup/popup2';
import PopupVerifyMail from './container/admin/popup/popupVerifyMail';
import Popup3 from './container/admin/popup/popup3';
import Register from './container/admin/Register/register';
import BorrowingBase from './container/admin/PayingAgent/PayingAgent_General/BorrowingBase';

const history = createBrowserHistory();


const LayoutRoute = lazy(() => import('./container/LayoutRoute'));
const LayoutRouteBlank = lazy(() => import('./container/LayoutRouteBlank'));
const UpdateProfile = lazy(() => import('./container/admin/UpdateProfile/UpdateProfile'));
const Users = lazy(() => import('./container/admin/users/Users'));
const ServerDown = lazy(() => import('./container/Misl/ServerDown'));
const IssuerLoans = lazy(() => import('./container/admin/Issuer_ListofLoans/Issuer_Loans'));
const FilteredLoans = lazy(() => import('./container/admin/Issuer_FilteredLoans/Issuer_Filterloan'));
const IssuerDealsTab = lazy(() => import('./container/admin/IssuerDashboard/issuerDealsTab'));
const Kyc1 = lazy(() => import('./container/admin/kyc/kyc1'));
const KycAttestation = lazy(() => import('./container/admin/kyc/kycAttestination'));
const QIBForm = lazy(() => import('./container/admin/QIBForm/form'));
const IssuerDashboard = lazy(() => import('./container/admin/IssuerDashboard/issuerDashboard'));
const IssuerInsights = lazy(() => import('./container/admin/IssuerDashboard/IssuerInsight'));
const PoolDetailsIssuer = lazy(() => import('./container/admin/PoolDetails/poolDetails'));
const Issuer_Deals_Details = lazy(() => import('./container/admin/PoolDetails/DealDetails'));
const InvestorPreviewPools = lazy(() => import('./container/admin/InvestorPreviewPools/InvestorPreviewPools'));
const InvestorPreviewPoolDetails = lazy(() => import('./container/admin/InvestorPreviewPools/InvestorPreviewPoolDetails'));
const InvestorDashboard_Portfolio = lazy(() => import('./container/admin/InvestorDashboard/investorDashboard_portfolio'));
const InvestorDashboard_Insights = lazy(() => import('./container/admin/InvestorDashboard/investorDashboard_insights'));
const InvestorDashboard_Opportunities = lazy(() => import('./container/admin/InvestorDashboard/investorDashboard_opportunities'));
const InvestorDealDetails = lazy(() => import('./container/admin/InvestorDealDetails/investorDealDetails'));
const InvestorPoolDetails = lazy(() => import('./container/admin/InvestorPoolDeatils/investorPoolDetails'));
const VA_Dashboard = lazy(() => import('./container/admin/VerificationAgent/VerificationAgentAdmin/VA_Dashboard'));
const VA_Pooldetails = lazy(() => import('./container/admin/VerificationAgent/VA_PoolDetails/VA_Pooldetails'));
const VA_Loans = lazy(() => import('./container/admin/VerificationAgent/VA_Loans'));
const VA_Review = lazy(() => import('./container/admin/VerificationAgent/VA_Review/VA_Review'));
const UW_Dashboard_Pools = lazy(() => import("./container/admin/Underwriter/UW_Dashboard_Pools/UW_Dashboard_Pools"));
const UW_Dashboard_Deals = lazy(() => import('./container/admin/Underwriter/UW_Dashboard_Deals/UW_Dashboard_Deals'));
const UW_Deals_Details = lazy(() => import('./container/admin/Underwriter/UW_Deal_Details/UW_Deal_Details'));
const UW_Pool_Details = lazy(() => import('./container/admin/Underwriter/UW_Pool_Details/UW_Pool_Details'));
const UW_Tools = lazy(() => import('./container/admin/Underwriter/UW_Deal_Details/Tools'));
const ServicerDashboardDeals = lazy(() => import('./container/admin/Servicer/Servicer_Deal/ServicerDashBoardDeals'));
const ServicerDashBoardActive = lazy(() => import('./container/admin/Servicer/Servicer_Active/ServicerDashboardActive'));
const ServicerDealDetails = lazy(() => import('./container/admin/Servicer/Servicer_Dealdetails/ServicerDealDetails'));
const ServicerPoolDetails = lazy(() => import('./container/admin/Servicer/Servicer_Dealdetails/ServicerPoolDetails'));
const ServicerData = lazy(() => import('./container/admin/Servicer/Servicer_Data/ServiceData'));
const ServicerMapField = lazy(() => import('./container/admin/Servicer/Servicer_MapFields/ServicerMapField'));
const Payment = lazy(() => import('./container/admin/Payment_Folder/Payment'));
const Profile = lazy(() => import('./container/admin/Profile/Profile'));
const PayingAgentDeal = lazy(() => import('./container/admin/PayingAgent/PayingAgent_Deals/PayingAgentDeal'));
const PayingAgentActive = lazy(() => import('./container/admin/PayingAgent/PayingAgent_Active/PayingAgentActive'));
const PaymentAgentDealDetails = lazy(() => import('./container/admin/PayingAgent/PayingAgent_DealDetails/PayingAgentDealDetails'));
const PayingAgent_OffChain = lazy(() => import('./container/admin/PayingAgent/PayingAgent_DealDetails/PayingAgent_OffChain'));
const PendingKYCPopup = lazy(() => import('./container/admin/IssuerDashboard/pendingKycPopup'));
const KYCLoginPopupStep1 = lazy(() => import('./container/admin/IssuerDashboard/kycLoginpopup1'));
const KYCLoginPopupStep2 = lazy(() => import('./container/admin/IssuerDashboard/kycLoginpopup2'));
const AttributeAutomation = lazy(() => import('./container/admin/AdminLogin/AtrributeAutomation'));
const ErrorPage = lazy(() => import('./components/custom_404'));
const Account = lazy(() => import('./container/admin/IADesign/Account'));
const UW_Preview_Pools = lazy(() => import('./container/admin/Underwriter/UW_Preview_Pools/UW_Preview_Pools'));
const Preview_Pool_Details = lazy(() => import('./container/admin/Underwriter/Preview_Pool_Details/Preview_Pool_Details'));
const Preview_LoanTape = lazy(() => import('./container/admin/Servicer/Servicer/Preview_LoanTape'));
const ServicerUploadLoanTape = lazy(() => import('./container/admin/Servicer/Servicer/ServicerUploadLoanTape'));
const Servicer_Map_Fields = lazy(()=>import('./container/admin/Servicer/Servicer/Servicer_Map_Fields'))
const Preview_Map_Fields =lazy(()=>import('./container/admin/Servicer/Servicer/Preview_Map_Fields'))
const Servicer_Summarize=lazy(()=>import('./container/admin/Servicer/Servicer/Servicer_Summarize'));
const RA_PreviewPools = lazy(()=>import('./container/admin/RatingAgency/RA_PreviewPools'));
const RA_PreviewPoolDetails = lazy(()=>import('./container/admin/RatingAgency/RA_PreviewPoolDetails'));
const RA_Deals = lazy(()=>import('./container/admin/RatingAgency/RA_Deals'));
const RA_DealDetails = lazy(()=>import('./container/admin/RatingAgency/RA_DealDetails'));
const RA_DashboardPools = lazy(()=>import('./container/admin/RatingAgency/RA_DashboardPools'));
const RA_PoolDetails = lazy(()=>import('./container/admin/RatingAgency/RA_PoolDetails'));
const General_DealCreation = lazy(()=>import("./container/admin/PayingAgent/PayingAgent_General/General_DealCreation"))
const General_Recurring  = lazy(()=>import("./container/admin/PayingAgent/PayingAgent_General/General_Recurring"))
const Trancehes_DealCreation = lazy(()=>import("./container/admin/PayingAgent/PayingAgent_General/Tranches_DealCreation"));
const Fees_DealCreation = lazy(()=>import("./container/admin/PayingAgent/PayingAgent_General/Fees_DealCreation"));
const Expenses = lazy(()=>import("./container/admin/PayingAgent/PayingAgent_General/Expenses"));
const Accounts = lazy(()=>import("./container/admin/PayingAgent/PayingAgent_General/Accounts"));
const Tests = lazy(()=>import("./container/admin/PayingAgent/PayingAgent_General/Tests"));
const Variables = lazy(()=>import("./container/admin/PayingAgent/PayingAgent_General/Variables"));
const PaymentRules = lazy(()=>import("./container/admin/PayingAgent/PayingAgent_General/PaymentRules"));

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFC000',
      light: '#FFC000',
      dark: '#FFC000'
    },
    secondary: {
      main: '#49ae46',
      light: '#d5f2f0',
      dark: '#2e9a2b'
    }
  },
  props: {
    MuiButton: {
      size: 'medium',
    },
    MuiFilledInput: {

    },
    MuiFormControl: {

    },
    MuiFormHelperText: {

    },
    MuiIconButton: {
      size: 'medium',
    },
    MuiInputBase: {

    },
    MuiInputLabel: {


    },
    MuiListItem: {
      dense: true,
    },
    MuiOutlinedInput: {

    },
    MuiFab: {
      size: 'medium',
    },
    MuiTable: {
      size: 'medium',
    },
    MuiTextField: {

      variant: "filled",
      size: "medium",
    },
    MuiToolbar: {
      variant: 'dense',
    },
  },

  overrides: {
  },
});
class App extends Component {
  render() {
    setUpAxios()
    return (
      // <CacheBuster>
      //   {({ loading, isLatestVersion, refreshCacheAndReload }) => {
      //     if (loading) return null;
      //     if (!loading && !isLatestVersion) {
      //       refreshCacheAndReload();
      //     }

      //     return (
            <div className="App">
              <ThemeProvider theme={theme}>
                <SnackbarProvider
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  maxSnack={3}>
                  <Router  >
                    <ScrollToTop />
                    <Suspense fallback={<div style={{textAlign:'center'}}>Loading...</div>}>
                      <Routes>
                        <Route element={<LoginLayoutRoute/>}>
                          <Route path='/' element={<Login />} />
                          <Route path='/resetPassword' element={<ResetPassword />} />
                          <Route path='/register' element={<Register />} />
                          <Route path='/update-profile' element={<UpdateProfile />} />
                          <Route path='/kyc1' element={<Kyc1 />} />
                          <Route path='/kycattestination' element={<KycAttestation />} />
                          <Route path='/kycadditionalinvestor' element={<KycAdditionalInvester />} />
                          <Route path='/qibform' element={<QIBForm />} />
                        </Route>
                        <Route element={<LayoutRoute />}>
                        <Route path="/kycloginstep2" element={<KYCLoginPopupStep2/>} />
                        <Route path="/admin/users/:orgname/:status" element={<Users />} />
                        <Route path='/admin/issuerdashboard' element={<IssuerDashboard history={history}/>} />
                        <Route path='/admin/pooldetails' element={<PoolDetailsIssuer />} />
                        <Route path="/admin/investorpreviewpools" element={<InvestorPreviewPools/>} />
                        <Route path="/admin/investorpreviewpooldetails" element={<InvestorPreviewPoolDetails  />} />
                        <Route path="/admin/investorportfolio" element={<InvestorDashboard_Portfolio  />} />
                        <Route path="/admin/investorinsight" element={<InvestorDashboard_Insights />} />
                        <Route path="/admin/investoropportunites" element={<InvestorDashboard_Opportunities  />} />
                        <Route path="/admin/investordealdetails" element={<InvestorDealDetails  />} />
                        <Route path="/admin/investorpooldetails" element={<InvestorPoolDetails  />} />
                        <Route path="/admin/issuerinsights" element={<IssuerInsights  />} />
                        <Route path="/admin/issuerloans" element={<IssuerLoans  />} />
                        <Route path="/admin/filteredloans" element={<FilteredLoans />} />
                        <Route path="/admin/issuerdeals" element={<IssuerDealsTab  />} />
                        <Route path="/confirmemail" element={<Popup1 />} />
                        <Route path="/popup2" element={<Popup2 />} />
                        <Route path="/popupverifymail" element={<PopupVerifyMail />} />
                        <Route path="/admin/popup3" element={<Popup3 />} />
                        <Route path="/admin/va_dashboard" element={<VA_Dashboard />} />
                        <Route path="/admin/va_listofloans" element={<VA_Loans  />} />
                        <Route path='/admin/va_review' element={<VA_Review />} />
                        <Route path='/admin/va_pooldetails' element={<VA_Pooldetails  />} />
                        <Route path='/admin/uw_dashboard_pools' element={<UW_Dashboard_Pools />} />
                        <Route path='/admin/uw_pool_details' element={<UW_Pool_Details />} />
                        <Route path='/admin/uw_preview_pools' element={<UW_Preview_Pools/>} />
                        <Route path='/admin/preview_pool_details' element={<Preview_Pool_Details  />} />
                        <Route path='/admin/uw_dashboard_deals' element={<UW_Dashboard_Deals />} />
                        <Route path='/admin/uw_deal_details' element={<UW_Deals_Details  />} />
                        <Route path='/admin/uw_tools' element={<UW_Tools />} />
                        <Route path='/admin/servicer_deals' element={<ServicerDashboardDeals />} />
                        <Route path='/admin/servicer_active' element={<ServicerDashBoardActive />} />
                        <Route path='/admin/servicer_deals_details' element={<ServicerDealDetails />} />
                        <Route path='/admin/servicer_pool_details' element={<ServicerPoolDetails  />} />
                        <Route path='/admin/servicer_servicerdata' element={<ServicerData />} />
                        <Route path='/admin/servicer_mapfields' element={<ServicerMapField />} />
                        <Route path='/admin/payment' element={<Payment />} />
                        <Route path='/admin/profile' element={<Profile />} />
                        <Route path='/admin/payingagent_deals' element={<PayingAgentDeal />} />
                        <Route path="/admin/general" element={<General_DealCreation />} />
                        <Route path="/admin/general_recurring" element={<General_Recurring />} />
                        <Route path="/admin/tranches" element={<Trancehes_DealCreation />} />
                        <Route path="/admin/fees" element={<Fees_DealCreation />} />
                        <Route path="/admin/expenses" element={<Expenses />} />
                        <Route path="/admin/account" element={<Accounts />} />
                        <Route path="/admin/tests" element={<Tests />} />
                        <Route  path="/admin/borrowingBase" element={<BorrowingBase />} />
                        <Route path="/admin/variables" element={<Variables />} />
                        <Route path="/admin/paymentrules" element={<PaymentRules />} />
                        <Route path='/admin/payingagent_active' element={<PayingAgentActive />} />
                        <Route path='/admin/payingagent_dealdetails' element={<PaymentAgentDealDetails />} />
                        <Route path='/admin/payingagent_offchaindetails' element={<PayingAgent_OffChain  />} />
                        <Route path='/admin/issuer_dealdetails' element={<Issuer_Deals_Details />} />
                        <Route path='/admin/account' element={<Account  />} />
                        <Route path='/pendingkyc' element={<PendingKYCPopup />} />
                        <Route path='/kycloginstep1' element={<KYCLoginPopupStep1 />} />
                        <Route path='/kycloginstep2' element={<KYCLoginPopupStep2 />} />
                        <Route path='/attributeautomation' element={<AttributeAutomation />} />

                        <Route  path="/admin/previewloantapedetails" element={<Preview_LoanTape />} />
                        <Route path="/admin/uploadLoanTape" element={<ServicerUploadLoanTape />} />
                        <Route path="/admin/mapfields" element={<Servicer_Map_Fields />} />
                        <Route path="/admin/previewmapfields" element={<Preview_Map_Fields />} />
                        <Route path="/admin/summarize" element={<Servicer_Summarize />} />                        

                        <Route path="/admin/ra_preview_pools" element={<RA_PreviewPools />} />                        
                        <Route path="/admin/ra_previewpooldetails" element={<RA_PreviewPoolDetails />} />                        
                        <Route path="/admin/ra_deals" element={<RA_Deals />} />                        
                        <Route path="/admin/ra_dealdetails" element={<RA_DealDetails />} />    
                        <Route path="/admin/ra_pools" element={<RA_DashboardPools />} />   
                        <Route path="/admin/ra_pool_details"  element={<RA_PoolDetails />}  />              

                        <Route path='*' element={<ErrorPage />} />
                        </Route>
                      </Routes>
                    </Suspense>
                  </Router>
                </SnackbarProvider>
              </ThemeProvider>
            </div>
      //     );
      //   }}
      // </CacheBuster>
    );
  }
}


export default App;