import React, { useState } from "react";
import { useLoaderData } from "react-router";
import toast from "react-hot-toast";

export const ServiceDetails = () => {
  const { allserv, id } = useLoaderData();
  const serv =
    allserv.find(
      (s) =>
        String(s.serviceId) === String(id) ||
        String(s.id) === String(id) ||
        String(s._id) === String(id)
    ) ?? null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pet: "",
  });

  if (!serv) {
    return (
      <div className="m-10 text-center">
        <h2 className="text-2xl font-semibold">Service not found</h2>
        <p className="text-sm text-gray-600 mt-2">
          We couldn't find the service you requested.
        </p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Close modal
    document.getElementById("my_modal_5").close();

    // Show toast
    toast.success("You have booked a service, we will email you soon");

    // Optional: reset form
    setFormData({ name: "", email: "", pet: "" });
  };

  return (
    <>
      <div>
        <div>
          <div className="flex items-center m-10 gap-5 max-sm:block">
            <img
              src={serv.image}
              alt={serv.serviceName}
              className="rounded-lg w-90"
            />
            <div>
              <h1 className="text-2xl text-white font-bold mt-5">
                {serv.serviceName}
              </h1>

              <p>Catergory: {serv.category}</p>

              <p className="text-sm text-gray-100 mb-5">
                Provided by{" "}
                <span className="text-purple-700 font-medium">
                  {serv.providerName}
                </span>
              </p>

              <p className="text-sm text-green-300 font-medium">
                Price: ${serv.price}
              </p>

              <p className="text-sm text-gray-100">
                Average Ratings: {serv.rating} / 5
              </p>
            </div>
          </div>

          <div className="m-10">
            <h1 className="text-2xl text-white font-bold my-5">Description</h1>
            <div>{serv.description}</div>
          </div>

          {/* BOOK NOW BUTTON */}
          <div className="m-10">
            <button
              className="btn bg-orange-400 text-white font-bold my-2"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              Book Now
            </button>

            {/* MODAL */}
            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg">Book This Service</h3>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="input input-bordered w-full"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />

                  <input
                    type="email"
                    placeholder="Your Email"
                    className="input input-bordered w-full"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Type of Pet (Dog, Cat...)"
                    className="input input-bordered w-full"
                    required
                    value={formData.pet}
                    onChange={(e) =>
                      setFormData({ ...formData, pet: e.target.value })
                    }
                  />

                  <button
                    type="submit"
                    className="btn bg-orange-400 w-full text-white font-bold"
                  >
                    Submit Booking
                  </button>
                </form>

                {/* CLOSE BUTTON */}
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </>
  );
};
