import React from "react";
import Container from "../../commonUI/Container";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
const BarCode = () => {
  const url = "http://localhost:5173/x";
  const { id } = useParams();
  return (
    <Container
      title="Dinning Tables"
      btn="Print"
      btnClick={() => {
        console.log("Print Btn Clicked");
      }}
    >
      <div className=" flex items-center flex-col justify-center text-gray-600">
        <h2 className=" pb-2 text-2xl font-semibold">Br Tech</h2>
        <p>Branch</p>
        <p>Phone nUmber</p>
        <p>House : 25, Road No: 1, Block A, Hajipur-1, Vaishali, Bihar</p>
        <QRCode
          className=" mt-3"
          size={200}
          xlinkTitle="https://localhost/"
          bgColor="#FFFFFF"
          fgColor="#000000"
          title="Scan This QR Code to order directly with your mobile."
          value="Welcome to Br Tech we provide best online foods over the India \nClick on the Link\https://www.brtechsolution.com/"
        />
        <h2 className=" p-4">Table {id}</h2>
        <p>Please scan & send quick order</p>
        <h2 className=" text-xl font-semibold">Thank You</h2>
      </div>
      {/* <img src={`https://chart.googleapis.com/chart?cht=qr&chs=180x180&chl=${url}`} alt="" /> */}
    </Container>
  );
};

export default BarCode;
