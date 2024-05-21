import AIcon1 from '../../images/AIcon11.png';
import AIcon2 from '../../images/AIcon12.png';
import AIcon3 from '../../images/AIcon13.png';
import AIcon4 from '../../images/AIcon14.png';
import AIcon5 from '../../images/AIcon15.png';
import PreviewIcon from '../../images/Preview.png';
import Group4408 from '../../images/Group4408.png';
import Incandescent from '../../images/wb_incandescent.png';

import DashboardClient from '../../images/dashboardClient.png';
import InitialSetup from '../../images/initial_setupClient.png';
import ViewInvestorReport from '../../images/view-investor-reportClient.png';

import LoanDataTape from '../../images/loan-data-tape-reportClient.png';
import DownloadServicer from '../../images/download-servicer-dataClient.png';

import Icon from '../../images/icon.png';




const OrgName =  sessionStorage.getItem('OrgName');

export const IssuerIcons = [
  {
    'linkto': '#nogo',
    'title': 'Dashboard',
    'icon': AIcon2,
    'linkto': '/admin/issuerdashboard'
  },
  {  'linkto': '#nogo',
      'title': 'Loans',
      'icon': AIcon3,
      'linkto': '/admin/issuerloans'
  },
  {  'linkto': '#nogo',
      'title': 'Portfolio',
      'icon': Group4408,
      'linkto': '/admin/issuerinsights'
  },
];

export const InvestorIcons = [
  {
    'linkto': '#nogo',
    'title': 'Preview Pools',
    'icon': PreviewIcon,
    'linkto': '/admin/investorpreviewpools'
  },
  {
    'linkto': '#nogo',
    'title': 'Portfolio',
    'icon': Group4408,
    'linkto': '/admin/investorportfolio'
  },
  {  'linkto': '#nogo',
      'title': 'Opportunities',
      'icon': Incandescent,
      'linkto': '/admin/investoropportunites'
  },
];

export const VA_Icons = [
  {
    'linkto': '#nogo',
    'title': 'VA_Dashboard',
    'icon': AIcon1,
    'linkto': '/admin/va_dashboard'
  },
];

export const UW_Icons = [
  {
    'linkto': '#nogo',
    'title': 'Preview Pools',
    'icon': PreviewIcon,
    'linkto': '/admin/uw_preview_pools'
  },
  {
    'linkto': '#nogo',
    'title': 'Pools',
    'icon': AIcon2,
    'linkto': '/admin/uw_dashboard_pools'
  },
  {  'linkto': '#nogo',
      'title': 'Deals',
      'icon': AIcon3,
      'linkto': '/admin/uw_dashboard_deals'
  },
]
export const RA_Icons = [
  {
    'linkto': '#nogo',
    'title': 'Preview Pools',
    'icon': PreviewIcon,
    'linkto': '/admin/ra_preview_pools'
  },
  {
    'linkto': '#nogo',
    'title': 'Pools',
    'icon': AIcon2,
    'linkto': '/admin/ra_pools'
  },
  {  'linkto': '#nogo',
      'title': 'Deals',
      'icon': AIcon3,
      'linkto': '/admin/ra_deals'
  },
]

export const Servicer_Icons = [
  {
    'linkto': '#nogo',
    'title': 'ServicerDashboardDeals',
    'icon': AIcon1,
    'linkto': '/admin/servicer_deals'
  },
  {
    'linkto': '#nogo',
    'title': 'ServicerDashBoardActive',
    'icon': AIcon5,
    'linkto': '/admin/servicer_active'
  },
]

export const PayingAgent_Icons = [
  {
    'linkto': '#nogo',
    'title': 'PayingAgentDeal',
    'icon': AIcon1,
    'linkto': '/admin/payingagent_deals'
  },
]

export const Processor = [
  {
    'linkto': '#nogo',
    'title': 'Processor Dashboard',
    'icon': AIcon1,
    'linkto': '/processor/dashboard'
  },
];

export const TrusteeMenu = [
  {
    'linkto': '/report/trusteedeal/dashboard',
    'title': 'Dashboard ',
    'icon': DashboardClient,
    'subitems': [
      {
        'linkto': '/report/trusteedeal/dashboard',
        'title': 'Dashboard',
        'icon': DashboardClient,
      },
    ],
  },


  {
    'linkto': '/report/trusteedeal/initial-setup',
    'title': 'initial-setup ',
    'icon': InitialSetup,
    'subitems': [
      {
        'linkto': '/report/trusteedeal/initial-setup',
        'title': 'Initial Setup',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/trusteedeal/add-new',
        'title': 'Add New',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/trusteedeal/view-servicer-mongodb-data',
        'title': 'View Servicer Data From Database ',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/trusteedeal/validate-monthly-inputs',
        'title': 'Validate Monthly Inputs',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/trusteedeal/view-servicer-blockchain-data',
        'title': 'View Servicer Data From Network',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/trusteedeal/generate-investor-report',
        'title': 'Generate Trustee Report',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/trusteedeal/customize-investor-report',
        'title': 'Customize Trustee Report',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/trusteedeal/view-loan-data-tape/monthly-trustee-report',
        'title': 'View Trustee Report',
        'icon': ViewInvestorReport,
      },

    ],
  },
  {
    'linkto': '/report/trusteedeal/view-loan-data-tape/loan-strat-analytics',
    'title': 'Loan Strat Report ',
    'icon': LoanDataTape,
    'subitems': [
      {
        'linkto': '/report/trusteedeal/view-loan-data-tape/loan-strat-analytics',
        'title': 'Loan Strat Report',
        'icon': LoanDataTape,
      },
    ],
  },
  {
    'linkto': '/report/trusteedeal/download-servicer-data',
    'title': 'Servicer Data ',
    'icon': DownloadServicer,
    'subitems': [
      {
        'linkto': '/report/trusteedeal/download-servicer-data',
        'title': 'Download Servicer Data',
        'icon': DownloadServicer,
      },
    ],
  },

];




export const InvestorMenu = [
  {
    'linkto': '/report/trusteedeal/dashboard',
    'title': 'Dashboard ',
    'icon': DashboardClient,
    'subitems': [
      {
        'linkto': '/report/trusteedeal/dashboard',
        'title': 'Dashboard',
        'icon': DashboardClient,
      },
    ],
  },
  {
    'linkto': '/report/trusteedeal/view-loan-data-tape/monthly-trustee-report',
    'title': 'View Trustee Report ',
    'icon': ViewInvestorReport,
    'subitems': [
      {
        'linkto': '/report/trusteedeal/view-loan-data-tape/monthly-trustee-report',
        'title': 'View Trustee Report',
        'icon': ViewInvestorReport,
      },
    ],
  },
  {
    'linkto': '/report/trusteedeal/view-loan-data-tape/loan-strat-analytics',
    'title': 'Loan Strat Report ',
    'icon': LoanDataTape,
    'subitems': [
      {
        'linkto': '/report/trusteedeal/view-loan-data-tape/loan-strat-analytics',
        'title': 'Loan Strat Report',
        'icon': LoanDataTape,
      },
    ],
  },
  {
    'linkto': '/report/trusteedeal/download-servicer-data',
    'title': 'Servicer Data ',
    'icon': DownloadServicer,
    'subitems': [
      {
        'linkto': '/report/trusteedeal/download-servicer-data',
        'title': 'Download Servicer Data',
        'icon': DownloadServicer,
      },
    ],
  },

];



export const Originator = [
  // {
  //   'linkto': '#nogo',
  //   'title': 'Portfolio Setup Wizard',
  //   'icon': AIcon1,
  //   'linkto': '/portfolio-setup-wizard/eligible-portfolio-import',
  // },
  // {
  //   'linkto': '#nogo',
  //   'title': 'Loan Pool Setup',
  //   'icon': AIcon2,
  //   'linkto': '/pool-details'
  // },
  // {
  //   'linkto': '#nogo',
  //   'title': 'Transaction Details',
  //   'icon': AIcon3,
  //   'linkto': '/transaction-details/bank-details',
  //   'subitems': [
  //     {
  //       'linkto': '/transaction-details/bank-details',
  //       'title': 'Bank Details',
  //       'icon': Icon,
  //     },
  //     {
  //       'linkto': '/transaction-details/payment-details',
  //       'title': 'Transaction Details',
  //       'icon': Icon,
  //     },
  //   ],
  // },
  // {
  //   'linkto': '#nogo',
  //   'title': 'Admin Dashboard',
  //   'icon': AIcon1,
  //   'linkto': '/admin/dashboard'
  // },
  {
    'linkto': '#nogo',
    'title': 'Processor Dashboard',
    'icon': AIcon1,
    'linkto': '/processor/dashboard'
  },
  // {
  //   'linkto': '#nogo',
  //   'title': 'Processor Dashboard',
  //   'icon': AIcon2,
  //   'linkto': '/processor/rundd'
  // },
  // {
  //   'linkto': '#nogo',
  //   'title': 'Processor Dashboard',
  //   'icon': AIcon2,
  //   'linkto': '/processor/rundd/ddreport'
  // },
  
];

export const Preprocessing = [
  {
    'linkto': '#nogo',
    'title': 'View LMS Loans',
    'icon': AIcon2,
    'linkto': '/preprocessingviewloans'
  },
  {
    'linkto': '#nogo',
    'title': 'Bulk Document Uploads',
    'icon': AIcon2,
    'linkto': '/bulkupload'
  }
];

export const Issuer = [
  {
    'linkto': '#nogo',
    'title': 'Pool List',
    'icon': AIcon1,
    'linkto':'/pool-details'
   
  },

  {
    'linkto': '#nogo',
    'title': 'Issuer SPV',
    'icon': AIcon2,
    'subitems': [
      {
        'linkto': '/issuer-spv/spv-details',
        'title': 'SPV Details',
        'icon': Icon,
      },
      {
        'linkto': '/issuer-spv/tranche',
        'title': 'Tranche ',
        'icon': Icon,
      },
      {
        'linkto': '/issuer-spv/payment-waterfall',
        'title': 'Payment Waterfall',
        'icon': Icon,
      },
    ],
  },
  {
    'linkto': '#nogo',
    'title': 'Transaction Details',
    'linkto': '/transaction-details/payment-details',
    'icon': AIcon3,
    'subitems': [
      {
        'linkto': '/transaction-details/bank-details',
        'title': 'Bank Details',
        'icon': Icon,
      },
      {
        'linkto': '/transaction-details/payment-details',
        'title': 'Transaction Details',
        'icon': Icon,
      },
    ],
  }, 
];

export const IntainABSInvestor = [
  {
    'linkto': '#nogo',
    'title': 'Pool List',
    'icon': AIcon1,
    'linkto': '/pool-details',
  },

  {
    'linkto': '#nogo',
    'title': 'Investor Buyer',
    'icon': AIcon2,
    'linkto': '/investorBuyer/tranche-list',
 
  },
  {
    'linkto': '/report/trusteedeal/dashboard',
    'title': 'Dashboard ',
    'icon': DashboardClient,
    'subitems': [
      {
        'linkto': '/report/trusteedeal/dashboard',
        'title': 'Dashboard',
        'icon': DashboardClient,
      },
    ],
  },
  {
    'linkto': '/report/trusteedeal/view-loan-data-tape/monthly-trustee-report',
    'title': 'View Trustee Report ',
    'icon': ViewInvestorReport,
    'subitems': [
      {
        'linkto': '/report/trusteedeal/view-loan-data-tape/monthly-trustee-report',
        'title': 'View Trustee Report',
        'icon': ViewInvestorReport,
      },
    ],
  },
  {
    'linkto': '/report/trusteedeal/view-loan-data-tape/loan-strat-analytics',
    'title': 'Loan Strat Report ',
    'icon': LoanDataTape,
    'subitems': [
      {
        'linkto': '/report/trusteedeal/view-loan-data-tape/loan-strat-analytics',
        'title': 'Loan Strat Report',
        'icon': LoanDataTape,
      },
    ],
  },
  {
    'linkto': '/report/trusteedeal/download-servicer-data',
    'title': 'Servicer Data ',
    'icon': DownloadServicer,
    'subitems': [
      {
        'linkto': '/report/trusteedeal/download-servicer-data',
        'title': 'Download Servicer Data',
        'icon': DownloadServicer,
      },
    ],
  },
  {
    'linkto': '#nogo',
    'title': 'Transaction Details',
    'linkto': '/transaction-details/payment-details',
    'icon': AIcon3,
    'subitems': [
      {
        'linkto': '/transaction-details/bank-details',
        'title': 'Bank Details',
        'icon': Icon,
      },
      {
        'linkto': '/transaction-details/payment-details',
        'title': 'Transaction Details',
        'icon': Icon,
      },
    ],
  }
];


export const Servicer = [
  
  {
    'linkto': '#nogo',
    'title': 'Loan Pool Setup',
    'icon': AIcon2,
    'linkto': '/pool-details'
  },
  {
    'linkto': '#nogo',
    'title': 'Pool Transfer Servicer',
    'icon': AIcon1,
    'linkto': '/poolTransfer/pooltransferservicer'
  },

  // {
  //   'linkto': '/report/trusteedeal/dashboard',
  //   'title': 'Dashboard ',
  //   'icon': DashboardClient,
  //   'subitems': [
  //     {
  //       'linkto': '/report/trusteedeal/dashboard',
  //       'title': 'Dashboard',
  //       'icon': DashboardClient,
  //     },
  //   ],
  // },
  // {
  //   'linkto': '/report/trusteedeal/initial-setup',
  //   'title': 'initial-setup ',
  //   'icon': InitialSetup,
  //   'subitems': [
  //     {
  //       'linkto': '/report/trusteedeal/initial-setup',
  //       'title': 'Initial Setup',
  //       'icon': InitialSetup,
  //     },
  //     {
  //       'linkto': '/report/trusteedeal/add-new',
  //       'title': 'Add New',
  //       'icon': InitialSetup,
  //     },
  //     {
  //       'linkto': '/report/trusteedeal/view-servicer-mongodb-data',
  //       'title': 'View Servicer Mongodb Data',
  //       'icon': InitialSetup,
  //     },
  //     {
  //       'linkto': '/report/trusteedeal/validate-monthly-inputs',
  //       'title': 'Validate Monthly Inputs',
  //       'icon': InitialSetup,
  //     },
  //     {
  //       'linkto': '/report/trusteedeal/view-servicer-blockchain-data',
  //       'title': 'View Servicer Blockchain Data',
  //       'icon': InitialSetup,
  //     },
  //     {
  //       'linkto': '/report/trusteedeal/generate-investor-report',
  //       'title': 'Generate Trustee Report',
  //       'icon': InitialSetup,
  //     },
  //     {
  //       'linkto': '/report/trusteedeal/customize-investor-report',
  //       'title': 'Customize Trustee Report',
  //       'icon': InitialSetup,
  //     },
  //     {
  //       'linkto': '/report/trusteedeal/view-loan-data-tape/monthly-trustee-report',
  //       'title': 'View Trustee Report',
  //       'icon': ViewInvestorReport,
  //     },
  //   ],
  // },
  // {
  //   'linkto': '/report/trusteedeal/view-loan-data-tape',
  //   'title': 'Loan Strat Report ',
  //   'icon': LoanDataTape,
  //   'subitems': [
  //     {
  //       'linkto': '/report/trusteedeal/view-loan-data-tape',
  //       'title': 'Loan Strat Report',
  //       'icon': LoanDataTape,
  //     },
  //   ],
  // },
  // {
  //   'linkto': '/report/trusteedeal/download-servicer-data',
  //   'title': 'Servicer Data ',
  //   'icon': DownloadServicer,
  //   'subitems': [
  //     {
  //       'linkto': '/report/trusteedeal/download-servicer-data',
  //       'title': 'Download Servicer Data',
  //       'icon': DownloadServicer,
  //     },
  //   ],
  // },

  {
    'linkto': '#nogo',
    'title': 'Transaction Details',
    'linkto': '/transaction-details/payment-details',
    'icon': AIcon3,
    'subitems': [
      {
        'linkto': '/transaction-details/bank-details',
        'title': 'Bank Details',
        'icon': Icon,
      },
      {
        'linkto': '/transaction-details/payment-details',
        'title': 'Transaction Details',
        'icon': Icon,
      },
    ],
  }, 
];


export const IntainABSTrustee = [
  
  {
    'linkto': '#nogo',
    'title': 'Loan Pool Setup',
    'icon': AIcon2,
    'linkto': '/pool-details'
  },
 
  {
    'linkto': '/report/trusteedeal/dashboard',
    'title': 'Dashboard ',
    'icon': DashboardClient,
    'subitems': [
      {
        'linkto': '/report/trusteedeal/dashboard',
        'title': 'Dashboard',
        'icon': DashboardClient,
      },
    ],
  },

  {
    'linkto': '/report/trusteedeal/initial-setup',
    'title': 'initial-setup ',
    'icon': InitialSetup,
    'subitems': [
      {
        'linkto': '/report/trusteedeal/initial-setup',
        'title': 'Initial Setup',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/trusteedeal/add-new',
        'title': 'Add New',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/trusteedeal/view-servicer-mongodb-data',
        'title': 'View Servicer Data From Database',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/trusteedeal/validate-monthly-inputs',
        'title': 'Validate Monthly Inputs',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/trusteedeal/view-servicer-blockchain-data',
        'title': 'View Servicer Data From Network',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/trusteedeal/generate-investor-report',
        'title': 'Generate Trustee Report',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/trusteedeal/customize-investor-report',
        'title': 'Customize Trustee Report',
        'icon': InitialSetup,
      },
      {
        'linkto': '/report/trusteedeal/view-loan-data-tape/monthly-trustee-report',
        'title': 'View Trustee Report',
        'icon': ViewInvestorReport,
      },

    ],
  },
  {
    'linkto': '/report/trusteedeal/view-loan-data-tape/loan-strat-analytics',
    'title': 'Loan Strat Report ',
    'icon': LoanDataTape,
    'subitems': [
      {
        'linkto': '/report/trusteedeal/view-loan-data-tape/loan-strat-analytics',
        'title': 'Loan Strat Report',
        'icon': LoanDataTape,
      },
    ],
  },
  {
    'linkto': '/report/trusteedeal/download-servicer-data',
    'title': 'Servicer Data ',
    'icon': DownloadServicer,
    'subitems': [
      {
        'linkto': '/report/trusteedeal/download-servicer-data',
        'title': 'Download Servicer Data',
        'icon': DownloadServicer,
      },
    ],
  },
  {
    'linkto': '#nogo',
    'title': 'Transaction Details',
    'linkto': '/transaction-details/payment-details',
    'icon': AIcon3,
    'subitems': [
      {
        'linkto': '/transaction-details/bank-details',
        'title': 'Bank Details',
        'icon': Icon,
      },
      {
        'linkto': '/transaction-details/payment-details',
        'title': 'Transaction Details',
        'icon': Icon,
      },
    ],
  }, 
];


export const portfolioSetupWizard = [
  {
    'linkto': '/portfolio-setup-wizard/eligible-portfolio-import',
    'title': 'Eligible Portfolio Import',
    'className': 'step1',
    'step': '1',
  },
  {
    'linkto': '/portfolio-setup-wizard/due-diligence',
    'title': 'Due Diligence',
    'className': 'step2',
    'step': '2',
  },
  {
    'linkto': '/portfolio-setup-wizard/pool-formation',
    'title': 'Pool Formation',
    'className': 'step3',
    'step': '3',
  },
  {
    'linkto': '/portfolio-setup-wizard/pool-details',
    'title': 'Pool Details',
    'className': 'step4',
    'step': '4',
  },
];


export const adminUser = [
  {
    'linkto': '/admin/users/'+OrgName+'/Pending',
    'title': 'Pending Users ',
    'icon': DashboardClient,
    'subitems': [
      {
        'linkto': '/admin/users/'+OrgName+'/Pending',
        'title': 'Pending Users',
        'icon': DashboardClient,
      },
      {
        'linkto': '/admin/users/'+OrgName+'/Approved',
        'title': 'Approved Users',
        'icon': DashboardClient,
      },
    ],
  },
];