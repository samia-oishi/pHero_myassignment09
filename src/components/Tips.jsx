import React from "react";

export const Tips = () => {
  return (
    <>
      <div>
        <div>
          <h1 className="text-5xl font-medium my-10 text-center">
            <span className="text-orange-100">Winter Care Tips</span> <br /> for
            Pets
          </h1>
        </div>
        <div className="mx-30 my-10">
          <div className="chat chat-start">
            <div
              className="chat-bubble chat-bubble-primary text-xl"
              data-aos="fade-up-right"
            >
              Dress for warmth –<br /> Use winter coats or sweaters
              <br /> for pets that feel the cold quickly.{" "}
            </div>
          </div>
          <div className="chat chat-end ">
            <div
              className="chat-bubble chat-bubble-secondary text-xl"
              data-aos="fade-up-left"
            >
              Protect sensitive paws – <br />
              Apply paw balm or use booties <br />
              to guard against ice and cold pavement.{" "}
            </div>
          </div>
          <div className="chat chat-start">
            <div
              className="chat-bubble chat-bubble-accent text-xl"
              data-aos="fade-up-right"
            >
              Keep indoor spaces cozy –<br /> Give them warm bedding <br />
              away from drafts and cold floors.{" "}
            </div>
          </div>
          <div className="chat chat-end">
            <div
              className="chat-bubble chat-bubble-neutral text-xl"
              data-aos="fade-up-left"
            >
              Limit time outside –<br /> Short, supervised outings prevent
              <br />
              frostbite and overexposure.{" "}
            </div>
          </div>
          <div className="chat chat-start">
            <div
              className="chat-bubble chat-bubble-info text-xl"
              data-aos="fade-up-right"
            >
              Increase hydration –<br /> Offer fresh water often; <br />
              winter heating can dehydrate pets.{" "}
            </div>
          </div>
          <div className="chat chat-end">
            <div
              className="chat-bubble chat-bubble-success text-xl"
              data-aos="fade-up-left"
            >
              Boost immunity with good nutrition – <br />
              Provide balanced meals to keep
              <br /> energy and warmth steady.{" "}
            </div>
          </div>
          <div className="chat chat-start">
            <div
              className="chat-bubble chat-bubble-warning text-xl"
              data-aos="fade-up-right"
            >
              Watch for warning signs – <br />
              Shivering, stiff movements, or cold ears mean
              <br /> they need warmth immediately.{" "}
            </div>
          </div>
          <div className="chat chat-end">
            <div
              className="chat-bubble chat-bubble-error text-xl"
              data-aos="fade-up-left"
            >
              Maintain a healthy coat – <br />
              Regular brushing improves insulation and
              <br /> reduces dry skin.{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
