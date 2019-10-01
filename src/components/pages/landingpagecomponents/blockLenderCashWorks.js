import React from "react";
import cashflowScreen from "../../images/blocklendr-cash.png";
import Point1 from "../../images/cashflow/1.png";
import Point2 from "../../images/cashflow/2.png";
import Point3 from "../../images/cashflow/3.png";
import Point4 from "../../images/cashflow/4.png";
import Point5 from "../../images/cashflow/5.png";

const DATA = [
  { text: "Register Account", img: Point1 },
  { text: "Add funds to secure Blocklendr account", img: Point2 },
  { text: "Credit line becomes instantly available", img: Point3 },
  {
    text:
      "Spend money instantly with Blocklendr card or withdraw to Bank Account",
    img: Point4
  },
  { text: "No minimum payments or hidden fee", img: Point5 }
];
const Points = ({ points }) => (
  <ul className="list-group list-group-flush list my--3">
    {points.map(({ text, img }, index) => (
      <li key={index} className="list-group-item px-0">
        <div className="row align-items-center">
          <div className="col-auto">
            <img
              src={img}
              alt="Cashflow point"
              className="icon icon-xs icon-shape bg-gradient-primary shadow rounded-circle text-white"
            />
          </div>
          <div className="col">
            <h5>{text}</h5>
          </div>
        </div>
      </li>
    ))}
  </ul>
);

export default function() {
  return (
    <div className="position-relative">
      <section className="section-shaped my-0">
        <div className="container shape-container d-flex align-items-center">
          <div className="col px-0">
            <div className="pricing card-group flex-column flex-md-row mb-3">
              <div className="card card-pricing border-0 text-center mb-4">
                <div className="card-header bg-transparent">
                  <h4 className="text-uppercase ls-1 text-primary py-3 mb-0">
                    How Blocklendr Cash Works{" "}
                  </h4>
                </div>
                <div className="card-body" style={{ margin: "10%" }}>
                  <Points points={DATA} />
                </div>
              </div>
              <div className="card card-pricing zoom-in rounded border-0 text-center mb-4 d-flex justify-content-center">
                <img
                  style={{
                    width: "120%"
                  }}
                  className="card-img"
                  src={cashflowScreen}
                  alt="App screens"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}