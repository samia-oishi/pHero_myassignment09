import React from "react";
import { useNavigate } from "react-router";

const OurServices = ({ servicedata }) => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/servicedetails/${id}`);
  };

  return (
    <>
      <div>
        <h1 className="text-5xl font-medium my-10 text-center">
          Our Popular <span className="text-orange-100">Services</span>
        </h1>
      </div>

      <div className="gap-5 grid grid-cols-3 mx-20 my-10">
        {servicedata.map((data, index) => (
          <div
            key={index}
            className="card bg-white text-black w-90 h-80 shadow-sm"
          >
            <figure className="h-60 object-cover">
              <img src={data.image} alt={data.serviceName} />
            </figure>

            <div className="card-body">
              <div className="flex justify-between items-center">
                <h2 className="card-title text-lg">{data.serviceName}</h2>
                <div className="badge badge-outline text-amber-400 border-amber-400">
                  Rating: {data.rating}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="card-actions flex flex-col">
                  <div className="badge badge-outline text-green-600 border-green-600">
                    Price: ${data.price}
                  </div>
                </div>

                <button
                  className="btn h-7 text-[#EBECF1] bg-[#152036] font-medium border-0"
                  onClick={() => handleCardClick(data.serviceId ?? index)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OurServices;
