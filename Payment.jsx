import React from "react";

const Payments = () => {
  return (
    <section className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
      <div className="mx-auto max-w-screen-md text-center mb-8">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold">
          Designed for business teams like yours
        </h2>
        <p className="mb-5 font-light sm:text-xl text-gray-400">
          Here at Swift we focus on markets where technology and capital can unlock long-term value and drive economic growth.
        </p>
      </div>

      <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 lg:gap-8">
        {/* Starter Plan */}
        <div className="flex flex-col p-6 mx-auto max-w-lg text-center bg-gray-800 rounded-lg">
          <h3 className="mb-4 text-2xl font-semibold">Starter</h3>
          <p className="font-light sm:text-lg text-gray-400">
            Best option for personal use & for your next project
          </p>
          <div className="flex justify-center items-baseline my-4">
            <span className="mr-2 text-5xl font-extrabold">$29</span>
            <span className="text-gray-400">/month</span>
          </div>
          <ul role="list" className="mb-8 space-y-4 text-left">
            <li className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0L3.293 11.707a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Individual configuration</span>
            </li>
            <li className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0L3.293 11.707a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>No setup, or hidden fees</span>
            </li>
          </ul>
          <a href="#" className="text-white bg-primary hover:bg-[#1B57E9] px-4 py-2 rounded">
            Get started
          </a>
        </div>

        {/* Company Plan */}
        <div className="flex flex-col p-6 mx-auto max-w-lg text-center bg-gray-800 rounded-lg">
          <h3 className="mb-4 text-2xl font-semibold">Company</h3>
          <p className="font-light sm:text-lg text-gray-400">
            Relevant for multiple users, extended & premium support
          </p>
          <div className="flex justify-center items-baseline my-4">
            <span className="mr-2 text-5xl font-extrabold">$99</span>
            <span className="text-gray-400">/month</span>
          </div>
          <ul role="list" className="mb-8 space-y-4 text-left">
            <li className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0L3.293 11.707a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Individual configuration</span>
            </li>
          </ul>
          <a href="#" className="text-white bg-primary hover:bg-[#1B57E9] px-4 py-2 rounded">
            Get started
          </a>
        </div>

        {/* Enterprise Plan */}
        <div className="flex flex-col p-6 mx-auto max-w-lg text-center bg-gray-800 rounded-lg">
          <h3 className="mb-4 text-2xl font-semibold">Enterprise</h3>
          <p className="font-light sm:text-lg text-gray-400">
            Best for large scale uses and extended redistribution
          </p>
          <div className="flex justify-center items-baseline my-4">
            <span className="mr-2 text-5xl font-extrabold">$149</span>
            <span className="text-gray-400">/month</span>
          </div>
          <ul role="list" className="mb-8 space-y-4 text-left">
            <li className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0L3.293 11.707a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Individual configuration</span>
            </li>
          </ul>
          <a href="#" className="text-white bg-primary hover:bg-[#1B57E9] px-4 py-2 rounded">
            Get started
          </a>
        </div>
      </div>
    </section>
  );
};

export default Payments;
