import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { createCheckOut } from "../store/Checkout/checkoutSlice";
import PaypalButton from "../components/Cart/PaypalButton";
import {
  FaLock,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaCreditCard,
} from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { getCart } from "../store/cart/cartSlice";
import PaypalButtonWrapper from "../components/Cart/PaypalButton";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const API = import.meta.env.VITE_API_URL;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    cart,
    loading,
    error: cartError,
  } = useSelector((state) => state.cart);

  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.auth);
  const userData = user?.user || null;
  const cartData = cart?.cart || null;
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    phone: userData?.phone || "",
  });

  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    if (userLoading || loading) return;

    if (!user?.user) {
      navigate("/login");
    } else if (
      !cartData ||
      !cartData.products ||
      cartData.products.length === 0
    ) {
      navigate("/");
    }
  }, [user, userData, cartData, userLoading, loading, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (cartData && cartData.products && cartData.products.length > 0) {
      const res = await dispatch(
        createCheckOut({
          checkoutItems: cartData.products,
          shippingAddress: shippingAddress,
          paymentMethod,
          totalPrice: cartData.totalPrice.toFixed(2),
        })
      );
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
        setActiveStep(2);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const res = await axios.put(
        `${API}/api/checkout/pay/${checkoutId}`,
        {
          paymentStatus: "paid",
          paymentDetails: details,
          paymentMethod: paymentMethod,  
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setActiveStep(3);
      
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${API}/api/checkout/finalize/${checkoutId}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate("/my-orders");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading || userLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (cartError) {
    return (
      <div className="text-red-500 text-center py-10">
        {"An Cart error occurred"}
      </div>
    );
  }

  if (userError) {
    return (
      <div className="text-red-500 text-center py-10">
        {"An User error occurred"}
      </div>
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD",
        components: "buttons",
      }}
    >
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`flex items-center ${
                  activeStep >= 1 ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <div
                  className={`rounded-full h-8 w-8 flex items-center justify-center mr-2 ${
                    activeStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                >
                  1
                </div>
                <span>Shipping</span>
              </div>
              <div className="flex-1 h-1 mx-2 bg-gray-200"></div>
              <div
                className={`flex items-center ${
                  activeStep >= 2 ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <div
                  className={`rounded-full h-8 w-8 flex items-center justify-center mr-2 ${
                    activeStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                >
                  2
                </div>
                <span>Payment</span>
              </div>
              <div className="flex-1 h-1 mx-2 bg-gray-200"></div>
              <div
                className={`flex items-center ${
                  activeStep >= 3 ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <div
                  className={`rounded-full h-8 w-8 flex items-center justify-center mr-2 ${
                    activeStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                >
                  3
                </div>
                <span>Review</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Form */}
            <div className="md:w-2/3">
              {activeStep === 1 && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-6">
                    <FaMapMarkerAlt className="text-blue-500 mr-2" />
                    <h2 className="text-xl font-semibold">
                      Shipping Information
                    </h2>
                  </div>

                  <form onSubmit={handleCreateCheckout}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {/* First Name */}
                      <div className="col-span-1">
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={shippingAddress.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Last Name */}
                      <div className="col-span-1">
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={shippingAddress.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Address */}
                      <div className="col-span-2">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Street Address *
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={shippingAddress.address}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="House number and street name"
                        />
                      </div>

                      {/* City */}
                      <div className="col-span-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={shippingAddress.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Country */}
                      <div className="col-span-1">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Country *
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={shippingAddress.country}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Country</option>
                          <option value="AF">Afghanistan</option>
                          <option value="AL">Albania</option>
                          <option value="DZ">Algeria</option>
                          <option value="AS">American Samoa</option>
                          <option value="AD">Andorra</option>
                          <option value="AO">Angola</option>
                          <option value="AI">Anguilla</option>
                          <option value="AQ">Antarctica</option>
                          <option value="AG">Antigua and Barbuda</option>
                          <option value="AR">Argentina</option>
                          <option value="AM">Armenia</option>
                          <option value="AW">Aruba</option>
                          <option value="AU">Australia</option>
                          <option value="AT">Austria</option>
                          <option value="AZ">Azerbaijan</option>
                          <option value="BS">Bahamas</option>
                          <option value="BH">Bahrain</option>
                          <option value="BD">Bangladesh</option>
                          <option value="BB">Barbados</option>
                          <option value="BY">Belarus</option>
                          <option value="BE">Belgium</option>
                          <option value="BZ">Belize</option>
                          <option value="BJ">Benin</option>
                          <option value="BM">Bermuda</option>
                          <option value="BT">Bhutan</option>
                          <option value="BO">Bolivia</option>
                          <option value="BA">Bosnia and Herzegovina</option>
                          <option value="BW">Botswana</option>
                          <option value="BV">Bouvet Island</option>
                          <option value="BR">Brazil</option>
                          <option value="IO">
                            British Indian Ocean Territory
                          </option>
                          <option value="BN">Brunei Darussalam</option>
                          <option value="BG">Bulgaria</option>
                          <option value="BF">Burkina Faso</option>
                          <option value="BI">Burundi</option>
                          <option value="KH">Cambodia</option>
                          <option value="CM">Cameroon</option>
                          <option value="CA">Canada</option>
                          <option value="CV">Cape Verde</option>
                          <option value="KY">Cayman Islands</option>
                          <option value="CF">Central African Republic</option>
                          <option value="TD">Chad</option>
                          <option value="CL">Chile</option>
                          <option value="CN">China</option>
                          <option value="CX">Christmas Island</option>
                          <option value="CC">Cocos (Keeling) Islands</option>
                          <option value="CO">Colombia</option>
                          <option value="KM">Comoros</option>
                          <option value="CG">Congo</option>
                          <option value="CD">
                            Congo, the Democratic Republic of the
                          </option>
                          <option value="CK">Cook Islands</option>
                          <option value="CR">Costa Rica</option>
                          <option value="CI">Côte d'Ivoire</option>
                          <option value="HR">Croatia</option>
                          <option value="CU">Cuba</option>
                          <option value="CY">Cyprus</option>
                          <option value="CZ">Czech Republic</option>
                          <option value="DK">Denmark</option>
                          <option value="DJ">Djibouti</option>
                          <option value="DM">Dominica</option>
                          <option value="DO">Dominican Republic</option>
                          <option value="EC">Ecuador</option>
                          <option value="EG">Egypt</option>
                          <option value="SV">El Salvador</option>
                          <option value="GQ">Equatorial Guinea</option>
                          <option value="ER">Eritrea</option>
                          <option value="EE">Estonia</option>
                          <option value="ET">Ethiopia</option>
                          <option value="FK">
                            Falkland Islands (Malvinas)
                          </option>
                          <option value="FO">Faroe Islands</option>
                          <option value="FJ">Fiji</option>
                          <option value="FI">Finland</option>
                          <option value="FR">France</option>
                          <option value="GF">French Guiana</option>
                          <option value="PF">French Polynesia</option>
                          <option value="TF">
                            French Southern Territories
                          </option>
                          <option value="GA">Gabon</option>
                          <option value="GM">Gambia</option>
                          <option value="GE">Georgia</option>
                          <option value="DE">Germany</option>
                          <option value="GH">Ghana</option>
                          <option value="GI">Gibraltar</option>
                          <option value="GR">Greece</option>
                          <option value="GL">Greenland</option>
                          <option value="GD">Grenada</option>
                          <option value="GP">Guadeloupe</option>
                          <option value="GU">Guam</option>
                          <option value="GT">Guatemala</option>
                          <option value="GN">Guinea</option>
                          <option value="GW">Guinea-Bissau</option>
                          <option value="GY">Guyana</option>
                          <option value="HT">Haiti</option>
                          <option value="HM">
                            Heard Island and McDonald Islands
                          </option>
                          <option value="VA">
                            Holy See (Vatican City State)
                          </option>
                          <option value="HN">Honduras</option>
                          <option value="HK">Hong Kong</option>
                          <option value="HU">Hungary</option>
                          <option value="IS">Iceland</option>
                          <option value="IN">India</option>
                          <option value="ID">Indonesia</option>
                          <option value="IR">Iran, Islamic Republic of</option>
                          <option value="IQ">Iraq</option>
                          <option value="IE">Ireland</option>
                          <option value="IL">Israel</option>
                          <option value="IT">Italy</option>
                          <option value="JM">Jamaica</option>
                          <option value="JP">Japan</option>
                          <option value="JO">Jordan</option>
                          <option value="KZ">Kazakhstan</option>
                          <option value="KE">Kenya</option>
                          <option value="KI">Kiribati</option>
                          <option value="KP">
                            Korea, Democratic People's Republic of
                          </option>
                          <option value="KR">Korea, Republic of</option>
                          <option value="KW">Kuwait</option>
                          <option value="KG">Kyrgyzstan</option>
                          <option value="LA">
                            Lao People's Democratic Republic
                          </option>
                          <option value="LV">Latvia</option>
                          <option value="LB">Lebanon</option>
                          <option value="LS">Lesotho</option>
                          <option value="LR">Liberia</option>
                          <option value="LY">Libyan Arab Jamahiriya</option>
                          <option value="LI">Liechtenstein</option>
                          <option value="LT">Lithuania</option>
                          <option value="LU">Luxembourg</option>
                          <option value="MO">Macao</option>
                          <option value="MK">
                            Macedonia, the Former Yugoslav Republic of
                          </option>
                          <option value="MG">Madagascar</option>
                          <option value="MW">Malawi</option>
                          <option value="MY">Malaysia</option>
                          <option value="MV">Maldives</option>
                          <option value="ML">Mali</option>
                          <option value="MT">Malta</option>
                          <option value="MH">Marshall Islands</option>
                          <option value="MQ">Martinique</option>
                          <option value="MR">Mauritania</option>
                          <option value="MU">Mauritius</option>
                          <option value="YT">Mayotte</option>
                          <option value="MX">Mexico</option>
                          <option value="FM">
                            Micronesia, Federated States of
                          </option>
                          <option value="MD">Moldova, Republic of</option>
                          <option value="MC">Monaco</option>
                          <option value="MN">Mongolia</option>
                          <option value="MS">Montserrat</option>
                          <option value="MA">Morocco</option>
                          <option value="MZ">Mozambique</option>
                          <option value="MM">Myanmar</option>
                          <option value="NA">Namibia</option>
                          <option value="NR">Nauru</option>
                          <option value="NP">Nepal</option>
                          <option value="NL">Netherlands</option>
                          <option value="AN">Netherlands Antilles</option>
                          <option value="NC">New Caledonia</option>
                          <option value="NZ">New Zealand</option>
                          <option value="NI">Nicaragua</option>
                          <option value="NE">Niger</option>
                          <option value="NG">Nigeria</option>
                          <option value="NU">Niue</option>
                          <option value="NF">Norfolk Island</option>
                          <option value="MP">Northern Mariana Islands</option>
                          <option value="NO">Norway</option>
                          <option value="OM">Oman</option>
                          <option value="PK">Pakistan</option>
                          <option value="PW">Palau</option>
                          <option value="PS">
                            Palestinian Territory, Occupied
                          </option>
                          <option value="PA">Panama</option>
                          <option value="PG">Papua New Guinea</option>
                          <option value="PY">Paraguay</option>
                          <option value="PE">Peru</option>
                          <option value="PH">Philippines</option>
                          <option value="PN">Pitcairn</option>
                          <option value="PL">Poland</option>
                          <option value="PT">Portugal</option>
                          <option value="PR">Puerto Rico</option>
                          <option value="QA">Qatar</option>
                          <option value="RE">Réunion</option>
                          <option value="RO">Romania</option>
                          <option value="RU">Russian Federation</option>
                          <option value="RW">Rwanda</option>
                          <option value="SH">Saint Helena</option>
                          <option value="KN">Saint Kitts and Nevis</option>
                          <option value="LC">Saint Lucia</option>
                          <option value="PM">Saint Pierre and Miquelon</option>
                          <option value="VC">
                            Saint Vincent and the Grenadines
                          </option>
                          <option value="WS">Samoa</option>
                          <option value="SM">San Marino</option>
                          <option value="ST">Sao Tome and Principe</option>
                          <option value="SA">Saudi Arabia</option>
                          <option value="SN">Senegal</option>
                          <option value="CS">Serbia and Montenegro</option>
                          <option value="SC">Seychelles</option>
                          <option value="SL">Sierra Leone</option>
                          <option value="SG">Singapore</option>
                          <option value="SK">Slovakia</option>
                          <option value="SI">Slovenia</option>
                          <option value="SB">Solomon Islands</option>
                          <option value="SO">Somalia</option>
                          <option value="ZA">South Africa</option>
                          <option value="GS">
                            South Georgia and the South Sandwich Islands
                          </option>
                          <option value="ES">Spain</option>
                          <option value="LK">Sri Lanka</option>
                          <option value="SD">Sudan</option>
                          <option value="SR">Suriname</option>
                          <option value="SJ">Svalbard and Jan Mayen</option>
                          <option value="SZ">Swaziland</option>
                          <option value="SE">Sweden</option>
                          <option value="CH">Switzerland</option>
                          <option value="SY">Syrian Arab Republic</option>
                          <option value="TW">Taiwan, Province of China</option>
                          <option value="TJ">Tajikistan</option>
                          <option value="TZ">
                            Tanzania, United Republic of
                          </option>
                          <option value="TH">Thailand</option>
                          <option value="TL">Timor-Leste</option>
                          <option value="TG">Togo</option>
                          <option value="TK">Tokelau</option>
                          <option value="TO">Tonga</option>
                          <option value="TT">Trinidad and Tobago</option>
                          <option value="TN">Tunisia</option>
                          <option value="TR">Turkey</option>
                          <option value="TM">Turkmenistan</option>
                          <option value="TC">Turks and Caicos Islands</option>
                          <option value="TV">Tuvalu</option>
                          <option value="UG">Uganda</option>
                          <option value="UA">Ukraine</option>
                          <option value="AE">United Arab Emirates</option>
                          <option value="GB">United Kingdom</option>
                          <option value="US">United States</option>
                          <option value="UM">
                            United States Minor Outlying Islands
                          </option>
                          <option value="UY">Uruguay</option>
                          <option value="UZ">Uzbekistan</option>
                          <option value="VU">Vanuatu</option>
                          <option value="VE">Venezuela</option>
                          <option value="VN">Viet Nam</option>
                          <option value="VG">Virgin Islands, British</option>
                          <option value="VI">Virgin Islands, U.S.</option>
                          <option value="WF">Wallis and Futuna</option>
                          <option value="EH">Western Sahara</option>
                          <option value="YE">Yemen</option>
                          <option value="ZM">Zambia</option>
                          <option value="ZW">Zimbabwe</option>
                        </select>
                      </div>

                      {/* Postal Code */}
                      <div className="col-span-1">
                        <label
                          htmlFor="postalCode"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          ZIP/Postal Code *
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={shippingAddress.postalCode}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Phone */}
                      <div className="col-span-1">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={shippingAddress.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    {/* Shipping Method */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        Shipping Method
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            id="standard-shipping"
                            name="shipping-method"
                            type="radio"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            defaultChecked
                          />
                          <label
                            htmlFor="standard-shipping"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            <span className="flex items-center">
                              <span>Standard Shipping</span>
                              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                FREE
                              </span>
                            </span>
                            <span className="block text-xs text-gray-500">
                              3-5 business days
                            </span>
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="express-shipping"
                            name="shipping-method"
                            type="radio"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <label
                            htmlFor="express-shipping"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            <span className="flex items-center">
                              <span>Express Shipping</span>
                              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                $9.99
                              </span>
                            </span>
                            <span className="block text-xs text-gray-500">
                              1-2 business days
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 mb-6">
                      <FaLock className="mr-2 text-blue-500" />
                      <span>
                        Your personal data will be used to process your order
                        and support your experience throughout this website.
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium flex items-center justify-center"
                    >
                      <FaShoppingBag className="mr-2" />
                      Continue to Payment
                    </button>
                  </form>
                </div>
              )}

              {activeStep === 2 && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-6">
                    <MdPayment className="text-blue-500 mr-2 text-xl" />
                    <h2 className="text-xl font-semibold">Payment Method</h2>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        id="credit_card"
                        name="paymentMethod"
                        value="credit_card"
                        checked={paymentMethod === "credit_card"}
                        onChange={() => setPaymentMethod("credit_card")}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label
                        htmlFor="credit_card"
                        className="ml-2 block text-sm font-medium text-gray-700"
                      >
                        Credit Card
                      </label>
                    </div>

                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        id="paypal"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={() => setPaymentMethod("paypal")}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label
                        htmlFor="paypal"
                        className="ml-2 block text-sm font-medium text-gray-700"
                      >
                        PayPal
                      </label>
                    </div>
                  </div>

                  {paymentMethod === "paypal" && (
                    <div className="mb-6">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <PaypalButtonWrapper
                          amount={cartData.totalPrice}
                          onSuccess={handlePaymentSuccess}
                          onError={(err) => console.error("PayPal Error:", err)}
                          className="w-full"
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        You'll be redirected to PayPal to complete your purchase
                        securely
                      </p>
                    </div>
                  )}

                  {paymentMethod === "credit_card" && (
                    <div className="bg-gray-50 p-4 rounded-md mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="col-span-2">
                          <label
                            htmlFor="cardNumber"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Card Number *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                            <div className="absolute right-3 top-2.5">
                              <FaCreditCard className="text-gray-400" />
                            </div>
                          </div>
                        </div>

                        <div className="col-span-1">
                          <label
                            htmlFor="expiryDate"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>

                        <div className="col-span-1">
                          <label
                            htmlFor="cvv"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            CVV *
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>

                        <div className="col-span-2">
                          <label
                            htmlFor="cardName"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Name on Card *
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            placeholder="John Doe"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <button
                      onClick={() => setActiveStep(1)}
                      className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200 font-medium"
                    >
                      Back
                    </button>
                    {paymentMethod === "credit_card" && (
                      <button
                        onClick={() => setActiveStep(3)}
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
                      >
                        Review Order
                      </button>
                    )}
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-6">
                    <FaShoppingBag className="text-blue-500 mr-2" />
                    <h2 className="text-xl font-semibold">Review Your Order</h2>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Shipping Information
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="font-medium">
                        {shippingAddress.firstName} {shippingAddress.lastName}
                      </p>
                      <p>{shippingAddress.address}</p>
                      <p>
                        {shippingAddress.city}, {shippingAddress.postalCode}
                      </p>
                      <p>{shippingAddress.country}</p>
                      <p className="mt-2">Phone: {shippingAddress.phone}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Payment Method
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="font-medium">
                        {paymentMethod === "credit_card"
                          ? "Credit Card"
                          : "PayPal"}
                      </p>
                      {paymentMethod === "credit_card" && (
                        <p className="text-sm text-gray-600">
                          Payment will be processed upon order confirmation
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setActiveStep(2)}
                      className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200 font-medium"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => handleFinalizeCheckout(checkoutId)}
                      className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Order Summary */}
            <div className="md:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {cartData.products.map((item) => (
                    <div
                      key={item.productId}
                      className="flex justify-between items-center border-b pb-4"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.images}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md mr-3"
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Size: {item.size}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${cartData.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-bold text-lg">
                    <span>Total</span>
                    <span>${cartData.totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {activeStep === 1 && (
                  <button
                    onClick={handleCreateCheckout}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
                  >
                    Continue to Payment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default CheckoutPage;
