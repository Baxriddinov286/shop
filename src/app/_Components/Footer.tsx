import Image from "next/image";
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-10 w-[1500px] mx-auto bg-gray-100 text-gray-800 rounded-2xl">
      <div className="mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-6 text-center md:text-left">
          <div>
            <h3 className="font-semibold text-lg">Garden Care</h3>
            <p className="text-sm">
              We are an online plant shop offering a wide range of cheap and
              trendy plants.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Plant Renovation</h3>
            <p className="text-sm">
              We are an online plant shop offering a wide range of cheap and
              trendy plants.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Watering Garden</h3>
            <p className="text-sm">
              We are an online plant shop offering a wide range of cheap and
              trendy plants.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              Would you like to join newsletters?
            </h3>
            <div className="flex mt-2">
              <input
                type="text"
                placeholder="Enter your email address..."
                className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none"
              />
              <button className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="bg-green-100 p-4 mt-6 rounded-lg flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Greenshop" width={40} height={40} />
            <span className="text-lg font-bold text-green-600">GREENSHOP</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-green-600" />
            <span>70 West Buckingham Ave. Farmingdale, NY 11735</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-green-600" />
            <span>contact@greenshop.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-green-600" />
            <span>+88 01911 717 490</span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mt-6 text-sm">
          <div>
            <h4 className="font-semibold">My Account</h4>
            <ul className="space-y-2">
              <li>My Account</li>
              <li>Our stores</li>
              <li>Contact us</li>
              <li>Career</li>
              <li>Specials</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Help & Guide</h4>
            <ul className="space-y-2">
              <li>Help Center</li>
              <li>How to Buy</li>
              <li>Shipping & Delivery</li>
              <li>Product Policy</li>
              <li>How to Return</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Categories</h4>
            <ul className="space-y-2">
              <li>House Plants</li>
              <li>Potter Plants</li>
              <li>Seeds</li>
              <li>Small Plants</li>
              <li>Accessories</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Social Media</h4>
            <div className="flex space-x-3 mt-2">
              <Facebook className="w-6 h-6 text-gray-700 cursor-pointer hover:text-green-600" />
              <Instagram className="w-6 h-6 text-gray-700 cursor-pointer hover:text-green-600" />
              <Twitter className="w-6 h-6 text-gray-700 cursor-pointer hover:text-green-600" />
              <Linkedin className="w-6 h-6 text-gray-700 cursor-pointer hover:text-green-600" />
              <Youtube className="w-6 h-6 text-gray-700 cursor-pointer hover:text-green-600" />
            </div>
            <h4 className="font-semibold mt-4">We accept</h4>
            <div className="flex space-x-3 mt-2">
              <Image src="/paypal.png" alt="PayPal" width={48} height={30} />
              <Image
                src="/mastercard.png"
                alt="MasterCard"
                width={48}
                height={30}
              />
              <Image src="/visa.png" alt="Visa" width={48} height={30} />
              <Image src="/amex.png" alt="Amex" width={48} height={30} />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-600 mt-6">
          © 2021 GreenShop. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
