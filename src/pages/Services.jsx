import React, { useEffect, useState } from "react";
import { NavLink, useLoaderData } from "react-router";

export const Services = () => {
  const servdata = useLoaderData();

  // normalize loader result to an array safely
  const servlist = Array.isArray(servdata)
    ? servdata
    : Array.isArray(servdata?.services)
    ? servdata.services
    : [];

  const [service, setservice] = useState(servlist);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // keep displayed list in sync with loader updates
    setservice(servlist);
  }, [servdata]); // keep dependency on servdata so it resets when loader changes

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setservice(servlist);
      return;
    }

    const filtered = servlist.filter((app) => {
      // check serviceName first (your data), fallback to title if present
      const name = (app?.serviceName || app?.title || "")
        .toString()
        .toLowerCase();
      return name.includes(query);
    });

    setservice(filtered);
  };

  if (servlist.length === 0) {
    return <p className="text-center my-6">No services available.</p>;
  }
  return (
    <div>
      <div>
        <h1 className="text-5xl font-medium my-10 text-center">
          Take a look at <span className="text-orange-100">Our Services</span>
        </h1>
        <p className="text-center">
          Welcome to our service page. Here, you can look at the services we
          provide,
          <br /> see their details or book them from the details page!
        </p>
      </div>

      <div className="flex justify-between items-center mx-10 mt-8 mb-5">
        <p className="text-sm font-semibold text-[#152036] bg-pink-400 rounded shadow-sm p-2">
          Services Found ({service.length})
        </p>
        <label className="input input-bordered flex items-center gap-2 bg-white outline-0 shadow-sm text-black">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            placeholder="Search Apps"
            value={searchQuery}
            onChange={handleSearch}
            className="grow"
          />
        </label>
      </div>

      <div className=" gap-5 grid grid-cols-3 mx-20 my-10">
        {service.map((data, index) => (
          <div
            key={index}
            className="card bg-white text-black w-90 h-80 shadow-sm"
          >
            <figure className="h-60 object-cover">
              <img src={data.image} alt="Shoes" />
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
                <NavLink
                  to="/servicedetails"
                  className="btn h-7 text-[#EBECF1] bg-[#152036] font-medium border-0 "
                >
                  View Details
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
