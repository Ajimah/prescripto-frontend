//import React from 'react'

import { assets } from "../assets/assets"

const Footer = () => {
  return (
    <div className="md:mx-10" >
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            {/* left section */}

            <div>
                <img className="mb-5 w-40" src={assets.logo} alt="" />
                <p className="w-full md:w-2/3 text-gray-600 leading-6">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti nam minima provident explicabo. Fuga dolorum minima dolorem assumenda illum quiaFuga dolorum minima dolorem assumenda illum quia!</p>
            </div>
            {/* center section */}
            <div>
                <p className="text-xl font-medium mb-5">COMPANY</p>
                <ul className="flex flex-col gap-2 text-gray-600">
                  <li>Home</li>
                  <li>About Us</li>
                  <li>Privacy Policy</li>
                  <li>Contact Us</li>
                </ul>
            </div>

            {/* rigth section */}

            <div>
                <p className="text-xl font-medium mb-5" >GET IN TOUCH</p>
                <ul className="flex flex-col gap-2 text-gray-600">
                  <li>+2347044136556</li>
                  <li>KenechukwuAjimah@gmail.com</li>
                </ul>
            </div>
        </div>

        {/* copyright text */}

        <div>
          <hr />
          <p className="py-5 text-sm text-center">Copyright 2024@ prescripto - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer