import React, { Component } from 'react';
import Nouislider from "nouislider-react";
import { LoanCreatorABI, LoanCreatorAddress, LoanContractABI } from '../Web3/abi';
import '../../assets/vendor/font-awesome/css/font-awesome.css';
import '../../assets/vendor/nucleo/css/nucleo.css';
import './ViewAllOffers.css';
import Header from './Header';

class ViewAllRequests extends Component {
  constructor(){
    super();
    this.viewAllRequest();
    this.state = {
      loanAmount:[],
      collateralValue: [],
      earnings:[],
      loanAddresses:[],
      duration: [],
      collateralAddress: [],
      status:[],
      collateralMetadata:true,
      safeness: 'SAFE',
      expireIn: '5D 15H 30M',
      loanCurrency:'ETH',
      collateralCurrency:'TTT',
      waitingForLender:true,
      waitingForCollateral:false,
      waitingForPayback:false,
      finished:false,
      defaulted:false,
      minMonthlyInt:0,
      maxMonthlyInt:5,
      minDuration:0,
      maxDuration:12,
      erc20_tokens :  ['TTT', 'BTC','BNB', 'GTO', 'QKC', 'NEXO',
          'PAX','EGT',  'MANA','POWR',
          'TUSD','LAMB','CTXC','ENJ',
          'CELR','HTB','ICX',  'WTC',
          'USD', 'BTM','EDO', 'SXDT',
          'OMG','CRO','TOP','SXUT',
          'MEDX','ITC','REP','STO',
          'LINK','CMT','WAX',
          'MATIC','ELF', 'COSM',
          'HT','BZ','NAS',
          'FET','PPT','MCO'],
    };
  }

  //Get All Loans
  viewAllRequest = () => {
    const Instance = window.web3.eth.contract(LoanCreatorABI).at(LoanCreatorAddress);

    Instance.getAllLoans((err, loanContractAddress) => {
      let {loanAmount, collateralValue, duration, earnings,loanAddresses, collateralAddress, status} = this.state;
      // console.log("LOAN ADDRESSES : ", loanContractAddress)
      if(!err){
        // res will be array of loanContractAddresses, iterate over these addresses using the function below to get loan data for each loan.
        loanContractAddress.map((loanAddress)=>{
                const LoanInstance = window.web3.eth.contract(LoanContractABI).at(loanAddress);
                LoanInstance.getLoanData((err, res)=>{

                if(res){
                  if(res[5].toNumber()>1){

                  // console.log('Loan :', res);
                  let startedOn = res[4].toNumber();
                  let date = startedOn;
                  date = this.convertDate(date, -1);
                  // console.log('startedOn:', date);
                  console.log('loanAmount', window.web3.fromWei(res[0]).toFixed(7));
                  console.log("loanAddress ", loanAddress);

                  }
                  loanAmount.push(window.web3.fromWei(res[0]).toFixed(7));
                  collateralValue.push(res[7].toNumber());
                  duration.push(res[1].toNumber());
                  earnings.push(res[2].toFixed(2));
                  status.push(res[5].toNumber());
                  collateralAddress.push(res[6]);
                  loanAddresses.push(loanAddress);



                   this.setState({
                     loanAmount: loanAmount,
                     collateralValue: collateralValue,
                     duration: duration,
                     earnings: earnings,
                     status: status,
                     collateralAddress: collateralAddress,
                     loanAddresses: loanAddresses
                   })
                  //  console.log('collateralAddress', this.state.collateralAddress);
                 }
                });
              });
      }

    });
  }

  convertDate = (currentDueDate,i) =>{
       let date = new Date(currentDueDate* 1000)
       date.setMinutes(date.getMinutes() + ((i+1)*30));
       date = date.toString()
       return date;
  }

  approveLoanRequest = (loanAmount,loanContractAddress) => {
    const LoanInstance = window.web3.eth.contract(LoanContractABI).at(loanContractAddress);
    LoanInstance.approveLoanRequest({
      from: window.web3.eth.accounts[0],
      value: window.web3.toWei(loanAmount),
      gas: 300000
    },(err, res) => {
        if(!err)
           console.log('loanContractAddress', loanContractAddress);
        });
  }

  render() {
    const { erc20_tokens, duration, minDuration, maxDuration, earnings, minMonthlyInt, maxMonthlyInt, loanAddress, status, collateralAddress, collateralValue, loanAddresses, collateralCurrency, loanCurrency,
    collateralMetadata } = this.state;
    return (
      <div className="ViewAllRequests text-center">
        <Header/>
        <div className="position-relative">
          <section className="section-hero section-shaped my-0">
            <div className="shape shape-style-1 shape-primary">
              <span className="span-150"></span>
              <span className="span-50"></span>
              <span className="span-50"></span>
              <span className="span-75"></span>
              <span className="span-100"></span>
              <span className="span-75"></span>
              <span className="span-50"></span>
              <span className="span-100"></span>
              <span className="span-50"></span>
              <span className="span-100"></span>
            </div>

            <div className="container d-flex align-items-left" style={{marginLeft:'-15px'}}>



            <div className="card card-pricing border-0 col-md-4">
            <div className="card-header bg-transparent">
              <i className="fa fa-filter" aria-hidden="true"></i>
              <a className="ls-1 text-primary py-3 mb-0 ml-2">View All Requests</a>
            </div>
            <div className="card-body">

              <ul className="list-unstyled my-4">
                <li>
                  <div className="form-group">
                      <label for="exampleFormControlSelect1">Loan Currency</label>
                      <select className="form-control" id="exampleFormControlSelect1" onClick={ (e) => {
                        this.setState({loanCurrency:e.target.value});
                      }}>
                      <option>ETH</option>;
                      </select>
                  </div>
                </li>
                <li>
                <div className="form-group">
                    <label for="exampleFormControlSelect1">Collateral Currency</label>
                    <select className="form-control" id="exampleFormControlSelect1" onClick={ (e) => {
                      this.setState({collateralCurrency:e.target.value});
                    }}>
                    {
                      erc20_tokens.map((item,i) => {
                        return <option>{item}</option>;
                    })
                    }
                    </select>
                </div>
                </li>
                <li>
                <div className="card">
                  <label for="">Loan state</label>
                    <div className="card-body">
                      <form>
                        <div className="row">
                          <div className="col text-left">
                            <div className="custom-control custom-checkbox mb-3">
                              <input className="custom-control-input" id="customCheck1" type="checkbox" checked={this.state.waitingForLender} onClick={()=>{this.setState({waitingForLender:!this.state.waitingForLender})}}/>
                              <label className="custom-control-label" for="customCheck1">Waiting for Lenders</label>
                            </div>
                            <div className="custom-control custom-checkbox mb-3">
                              <input className="custom-control-input" id="customCheck2" type="checkbox" checked={this.state.waitingForCollateral} onClick={()=>{this.setState({waitingForCollateral:!this.state.waitingForCollateral})}}/>
                              <label className="custom-control-label" for="customCheck2">Waiting for collateral</label>
                            </div>
                            <div className="custom-control custom-checkbox mb-3">
                              <input className="custom-control-input" id="customCheck3" type="checkbox" checked={this.state.waitingForPayback} onClick={()=>{this.setState({waitingForPayback:!this.state.waitingForPayback})}}/>
                              <label className="custom-control-label" for="customCheck3">Waiting for Payback</label>
                            </div>
                            <div className="custom-control custom-checkbox mb-3">
                              <input className="custom-control-input" id="customCheck4" type="checkbox" checked={this.state.finished} onClick={()=>{this.setState({finished:!this.state.finished})}}/>
                              <label className="custom-control-label" for="customCheck4">Finished</label>
                            </div>  <div className="custom-control custom-checkbox mb-3">
                                <input className="custom-control-input" id="customCheck5" type="checkbox" checked={this.state.defaulted} onClick={()=>{this.setState({defaulted:!this.state.defaulted})}}/>
                                <label className="custom-control-label" for="customCheck5">Defaulted</label>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </li>
                <li>
                <div className="mt-3">
                  <label for="">Monthly Interest</label>
                  <div className="">
                  <label style={{marginLeft:'-180px'}}> ({minMonthlyInt} %) </label>
                  </div>
                  <div className="" style={{marginRight:'-180px',marginTop:'-30px'}}>
                  <label> ({maxMonthlyInt} %)</label>
                  </div>
                  <Nouislider range={{ min: 0, max: 5 }} start={[0, 5]} connect onChange={(e)=>{this.setState({minMonthlyInt:e[0],maxMonthlyInt:e[1]});}} />
                </div>
                </li>
                <li>
                <div className="mt-3">
                  <label for="">Duration</label>
                  <div className="">
                  <label style={{marginLeft:'-180px'}}> ({minDuration} Month) </label>
                  </div>
                  <div className="" style={{marginRight:'-180px',marginTop:'-30px'}}>
                  <label> ({maxDuration} Month)</label>
                  </div>
                  <Nouislider range={{ min: 0, max: 12 }} start={[0, 12]} connect onChange={(e)=>{this.setState({minDuration:e[0],maxDuration:e[1]});}} />
                  </div>
                </li>
              </ul>
            </div>
            <div className="card-footer" style={{marginTop:'-40px'}} onClick={()=>{
              this.setState({ loanCurrency:'ETH',
                    collateralCurrency:'TTT',
                    waitingForLender:true,
                    waitingForCollateral:false,
                    waitingForPayback:false,
                    finished:false,
                    defaulted:false,
                    minMonthlyInt:0,
                    maxMonthlyInt:5,
                    minDuration:0,
                    maxDuration:12,})
            }}>
              <a href="#!" className=" text-muted">Reset Filters</a>
            </div>
          </div>
            <div className="ml-4 row">
              {
                this.state.loanAmount.map((loanAmount,i)=>{
                return this.state.waitingForLender && status[i]>1 && status[i]<3 && collateralCurrency==='TTT' && duration[i]/30>minDuration && duration[i]/30<=maxDuration && earnings[i]/100>minMonthlyInt && earnings[i]/100<=maxMonthlyInt && <div className="col">
                 <div className="card">
                   <div className="card-header">

                   <div className="row row-example">
                 <div className="col-sm">
                   <span><p>Amount  </p></span>
                   <span className="btn-inner--text"><img style={{width:'25px'}} src="/assets/img/eth.png"/> {loanAmount} ETH </span>
                 </div>
                 <div className="col-sm">
                   <span><p>Collateral </p></span>
                   <span className="btn-inner--text"> {this.state.collateralValue[i]} TTT</span>
                 </div>
               </div>
                   </div>
                   <div className="card-body text-left">
                   <p>Earnings : {this.state.earnings[i]/100} %</p>
                   <p>Duration  : {this.state.duration[i]} days</p>
                   <p>Safeness : {this.state.safeness}</p>
                   <p>Expires in : {this.state.expireIn}</p>
                   </div>
                  {status[i]==2 &&
                  <div className="btn-wrapper text-center" onClick={()=>this.approveLoanRequest(loanAmount, loanAddresses[i])}>
                   <a href="#" className="btn btn-primary btn-icon m-1">
                     <span className="btn-inner--text">Fund Now</span>
                   </a>
                 </div>}
                 </div>
                 {status[i]==3 && <div className="alert alert-primary alert-dismissible fade show text-center" role="alert">
                   <span className="alert-text">Already Funded</span>
                 </div>
                }
                {
                   status[i]==2 &&
                   <div className="alert alert-primary alert-dismissible fade show text-center" role="alert">
                     <span className="alert-text">Waiting for lender</span>
                   </div>
               }
               </div>;
                })
            }
            </div>
              {/*
                this.state.waitingForPayback && duration[1]/30>minDuration && duration[1]/30<=maxDuration && earnings[1]>minMonthlyInt && earnings[1]<=maxMonthlyInt &&
                <div className="col-md-4">
                <div className="card">
                  <div className="card-header">

                  <div className="row row-example">
                <div className="col-sm">
                  <span><p>Loan amount  </p></span>
                  <span className="btn-inner--text"><img style={{width:'25px'}} src="/assets/img/eth.png"/> {this.state.loanAmount} ETH</span>

                </div>
                <div className="col-sm">
                  <span><p>Collateral </p></span>
                  <span className="btn-inner--text"><img style={{width:'25px'}} src="/assets/img/32/color/powr.png"/> 300 POWR</span>
                </div>
              </div>
                  </div>
                  <div className="card-body text-left" style={{marginBottom:'80px'}}>
                  <p>Earnings : {this.state.earnings[1]} %</p>
                  <p>Duration  : {this.state.duration[1]} days</p>
                  <p>Safeness : {this.state.safeness}</p>

                  </div>
                </div>
                <div className="alert alert-warning alert-dismissible fade show text-center" role="alert">
                  <span className="alert-text">Waiting for Payback</span>
                </div>
              </div>

              */}

            </div>
          </section>
        </div>

      </div>
    );
  }
}

export default ViewAllRequests;
