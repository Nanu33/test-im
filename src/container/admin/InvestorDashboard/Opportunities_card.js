import React from "react";
import logo from "./logo.png";
import Logo1 from "../../../images/wellslogo.png";
import Logo2 from "../../../images/wellslogored.png";
import NumberComp from "../../../components/NumberComp";

const OpprtunitiesCard = (props) => {
  const SetUp = (value) => {
    sessionStorage.setItem("dealId", value);
    window.location.assign('/admin/investordealdetails')
  }
  const { data } = props;
  return (
    <div className="op-main-container">
      <div className="op-card-outer-container">
        {/* first container */}
        <div className="op-card-first-container">
          <div className="op-card-first-container-left">
            <div className="op-card-first-container-left-logo-container">
              {/* {data.underwriterId=="36bf3604-cea2-494f-9627-be347c5e4f0c" ?
             <div className="op-card-wellslogo">
              <img
                src={Logo2}
                alt="logo"
                className="wellslogo"
              />
              </div>
              : */}
              <div>
                <img src={process.env.react_app_base_url + "root_folder/" + data.logo} alt="logo" className="op-card-logo" />
              </div>
            </div>
            <div className="op-card-first-container-left-text-container">
              <p className="op-card-first-container-left-text-container-first-para">
                {data.issuerName} presents
              </p>
              <p className="op-card-first-container-left-text-container-second-para">
              <a href="#" onClick={()=>SetUp(data.dealId)} className="login-sign_up-links-css">
              {data.dealName}
               </a>{" "}
              </p>
            </div>
          </div>
          <div className="op-card-first-container-right">
            <p className="op-card-first-container-right-para">{data.daysleft} days left</p>
          </div>
        </div>

        {/* second container */}
        <div className="op-second-container-paragraph">
          <p>{data.dealsummary.substring(0, 97) + "..."}</p>
        </div>

        {/* third container */}
        <div className="op-third-container">
          <p className="op-third-container-first-para">
            <NumberComp value={data.originalbalance}></NumberComp>
          </p>
          
          <p className="op-third-container-second-para">
         {/* <span className="displayFlexItem"><NumberComp value={data.originalbalance}></NumberComp> */}
         <p className="displayFlexItemp">exposure to {data.assetclass} loans</p>
         {/* </span> */}
          </p>
        </div>

        {/* fourth container */}
        <div className="op-third-container">
          <p className="op-third-container-first-para">
            {data.numberofTranches + " Tranches"}
          </p>
          <p className="op-third-container-second-para">
            offered with yields ranging from {data.interestRateRange}
          </p>
        </div>
      </div>
      <div className="op-range-container">
        <div
          className="op-range-container-first-container"
          style= {{ width: `${data.Funded}%` }}
        > 
        {data.Funded === "0.00" ?
          <p>{data.Funded}Funded</p>
          :
          <p>{data.Funded} Funded</p>
        }
        </div>
        <div className="op-range-container-second-container" />
      </div>
    </div>
  );
};

export default OpprtunitiesCard;
