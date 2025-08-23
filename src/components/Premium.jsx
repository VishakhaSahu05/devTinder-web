import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );
    const {amount , keyId , currency , notes , orderId} = order.data;
    //it should now open the dailog box
    // Open Razorpay Checkout
    const options = {
      key: keyId, 
      amount,
      currency,
      name: "Dev Tinder",
      description: "Connect to other developers",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return (
    <div className="m-10">
      <div className="flex flex-col md:flex-row w-full items-center justify-center gap-6">
        {/* Silver Card */}
        <div className="card bg-base-300 rounded-box h-80 md:w-1/2 w-full p-6 shadow-md flex flex-col justify-between">
          <div>
            <h1 className="font-bold text-3xl mb-4 text-center">
              Silver Membership
            </h1>
            <ul className="space-y-2 list-disc list-inside">
              <li>Chat with other people</li>
              <li>100 connection requests</li>
              <li>Blue Tick</li>
              <li>3 months</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <button onClick={() => handleBuyClick("silver")} className="btn btn-secondary px-6 py-2 text-base rounded-lg">
              Buy Silver
            </button>
          </div>
        </div>

        {/* OR Divider (hidden on mobile) */}
        <div className="divider divider-horizontal hidden md:flex">OR</div>

        {/* Gold Card */}
        <div className="card bg-base-300 rounded-box h-80 md:w-1/2 w-full p-6 shadow-md flex flex-col justify-between">
          <div>
            <h1 className="font-bold text-3xl mb-4 text-center">
              Gold Membership
            </h1>
            <ul className="space-y-2 list-disc list-inside">
              <li>Chat with other people</li>
              <li>Infinite connection requests</li>
              <li>Blue Tick</li>
              <li>6 months</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => handleBuyClick("gold")}
              className="btn btn-secondary px-6 py-2 text-base rounded-lg"
            >
              Buy Gold
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
