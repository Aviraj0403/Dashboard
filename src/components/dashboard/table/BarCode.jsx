import React from "react";
import Container from "../../commonUI/Container";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import { useRestaurantId } from "../../../context/userContext";

const BarCode = () => {
  const { id } = useParams(); // id refers to the tableId
  const restaurantId = useRestaurantId(); // Get the restaurantId of the logged-in owner

  // Ensure that the restaurantId is available before rendering
  if (!restaurantId) {
    return <p>Loading...</p>;
  }

  // Dynamic URL to scan which fetches both food and table info
  const dynamicUrl = `https://scan-version.vercel.app/?restaurantId=${restaurantId}`;

  return (
    <Container
      title="Dining Tables"
      btn="Print"
      btnClick={() => {
        console.log("Print Btn Clicked");
      }}
    >
      <div className="flex flex-col items-center justify-center text-gray-600 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-semibold text-blue-600 animate__animated animate__fadeIn">
            Br Tech
          </h2>
          <p className="text-lg">Branch</p>
          <p className="text-lg">Phone Number</p>
          <p className="text-sm">House: 25, Road No: 1, Block A, Dwarka, Delhi</p>
        </div>

        {/* QR Code with dynamic URL */}
        <div className="animate__animated animate__fadeIn animate__delay-1s">
          <QRCode
            className="shadow-lg rounded-lg mt-5"
            size={200}
            bgColor="#FFFFFF"
            fgColor="#000000"
            title="Scan this QR Code to order directly with your mobile."
            value={dynamicUrl}
          />
        </div>

        <div className="text-center space-y-2 animate__animated animate__fadeIn animate__delay-2s">
          <h2 className="text-2xl font-semibold text-blue-600">Table {id}</h2>
          <p className="text-md">Please scan & send a quick order</p>
          <h2 className="text-xl font-semibold text-green-600">Thank You</h2>
        </div>
      </div>
    </Container>
  );
};

export default BarCode;
