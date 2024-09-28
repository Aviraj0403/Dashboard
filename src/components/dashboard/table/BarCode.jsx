import React from "react";
import Container from "../../commonUI/Container";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import { useRestaurantId } from "../../../context/userContext"; // Import the new function to get restaurantId

const BarCode = () => {
  const { id } = useParams(); // id refers to the tableId
  const restaurantId = useRestaurantId(); // Get the restaurantId of the logged-in owner

  // Ensure that the restaurantId is available before rendering
  if (!restaurantId) {
    return <p>Loading...</p>;
  }

  // Dynamic URL based on the restaurantId and tableId
  const dynamicUrl = `http://localhost:4000/api/food/restaurants/${restaurantId}/table/${id}`;

  return (
    <Container
      title="Dining Tables"
      btn="Print"
      btnClick={() => {
        console.log("Print Btn Clicked");
      }}
    >
      <div className="flex items-center flex-col justify-center text-gray-600">
        <h2 className="pb-2 text-2xl font-semibold">Br Tech</h2>
        <p>Branch</p>
        <p>Phone Number</p>
        <p>House: 25, Road No: 1, Block A, Hajipur-1, Vaishali, Bihar</p>

        {/* QR Code with dynamic URL */}
        <QRCode
          className="mt-3"
          size={200}
          bgColor="#FFFFFF"
          fgColor="#000000"
          title="Scan This QR Code to order directly with your mobile."
          value={dynamicUrl}
        />

        <h2 className="p-4">Table {id}</h2>
        <p>Please scan & send quick order</p>
        <h2 className="text-xl font-semibold">Thank You</h2>
      </div>
    </Container>
  );
};

export default BarCode;
