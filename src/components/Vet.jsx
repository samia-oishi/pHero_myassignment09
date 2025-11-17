import React from "react";

const Vet = ({ vetdata }) => {
  return (
    <>
      <div>
        <div>
          <h1 className="text-5xl font-medium my-10 text-center">
            Meet Our <span className="text-orange-100">Expert Vets</span>
          </h1>
        </div>
        <div className="grid grid-cols-4 gap-2 m-10">
          {vetdata.map((data, index) => (
            <div
              key={index}
              className="card bg-green-100 text-black w-72 h-70 shadow-sm"
            >
              <figure className="h-60 object-cover">
                <img src={data.image} alt="Shoes" />
              </figure>
              <div className="card-body">
                <div className="flex justify-between gap-15 items-center">
                  <h2 className="card-title text-sm">{data.name}</h2>
                  <p className="bg-amber-300 rounded-lg text-center text-amber-900">
                    Rating: {data.rating}
                  </p>
                </div>
                <p className="text-[12px]">{data.expertise}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Vet;
