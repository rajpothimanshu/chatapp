import React from "react";

const Features = () => {
  return (
    <section className="bg-dark text-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        {/* Heading */}
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold">
            Designed for business teams like yours
          </h2>
          <p className="sm:text-xl text-gray-400">
            Here at Swift we focus on markets where technology and capital can unlock long-term value and drive economic growth.
          </p>
        </div>

        {/* Features Grid */}
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 lg:gap-12">
          {/* Feature Item */}
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 001.414 1.414L10 14.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Marketing</h3>
            <p className="text-gray-400">
              Plan it, create it, launch it. Collaborate seamlessly across your organization and hit your marketing goals every month.
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 00-.606.924v8a2 2 0 002 2h10a2 2 0 002-2v-8a1 1 0 00-.606-.924l-7-3z"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Security</h3>
            <p className="text-gray-400">
              Protect your organization and devices while staying compliant with structured workflows and custom permissions.
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Business Automation</h3>
            <p className="text-gray-400">
              Auto-assign tasks, send notifications, and streamline workflows with hundreds of prebuilt templates.
            </p>
          </div>

          {/* Add more features similarly */}
        </div>
      </div>
    </section>
  );
};

export default Features;
