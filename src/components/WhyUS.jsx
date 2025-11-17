import React from "react";

export const WhyUS = () => {
  return (
    <div>
      <div>
        <h1 className="text-5xl font-medium my-10 text-center">
          Why <span className="text-orange-100">Choose Us?</span>
        </h1>
      </div>
      <div className="mx-30 my-5 h-[30vh] rounded-xl text-white flex justify-center gap-20 items-center px-8">
        <div>
          <ul className="timeline">
            <li>
              <div className="timeline-start timeline-box bg-amber-400 text-[#152036] border-0 font-bold">
                Expert Grooming
              </div>
            </li>
            <li>
              <div className="timeline-end timeline-box bg-green-400 text-[#152036] border-0 font-bold">
                Reliable Daycare
              </div>
            </li>
            <li>
              <div className="timeline-start timeline-box bg-purple-400 text-[#152036] border-0 font-bold">
                Trendy Pet Outfits
              </div>
            </li>
            <li>
              <div className="timeline-end timeline-box bg-blue-400 text-[#152036] border-0 font-bold">
                24/7 Emergency Vet Consultation
              </div>
            </li>
            <li>
              <div className="timeline-start timeline-box bg-pink-400 text-[#152036] border-0 font-bold">
                Super Fast House Service
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
