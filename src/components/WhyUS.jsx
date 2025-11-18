import React from "react";

export const WhyUS = () => {
  return (
    <div>
      <div>
        <h1 className="text-3xl md:text-5xl font-medium my-10 text-center">
          Why <span className="text-orange-100">Choose Us?</span>
        </h1>
      </div>

      <div
        className="mx-30 my-5 rounded-xl text-white flex flex-col md:flex-row justify-center
                   gap-6 md:gap-20 items-center px-4 md:px-8 md:h-[30vh]"
      >
        <div className="w-full md:w-auto">
          <ul className="timeline flex flex-col md:flex-row gap-4 md:gap-6 items-center">
            <li>
              <div className="timeline-start timeline-box bg-amber-400 text-[#152036] border-0 font-bold break-words whitespace-normal px-4 py-2">
                Expert Grooming
              </div>
            </li>

            <li>
              <div className="timeline-end timeline-box bg-green-400 text-[#152036] border-0 font-bold break-words whitespace-normal px-4 py-2">
                Reliable Daycare
              </div>
            </li>

            <li>
              <div className="timeline-start timeline-box bg-purple-400 text-[#152036] border-0 font-bold break-words whitespace-normal px-4 py-2">
                Trendy Pet Outfits
              </div>
            </li>

            <li>
              <div className="timeline-end timeline-box bg-blue-400 text-[#152036] border-0 font-bold break-words whitespace-normal px-4 py-2">
                24/7 Emergency Vet Consultation
              </div>
            </li>

            <li>
              <div className="timeline-start timeline-box bg-pink-400 text-[#152036] border-0 font-bold break-words whitespace-normal px-4 py-2">
                Super Fast House Service
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
