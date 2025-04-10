import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import InternationalLiveMatch from "./component/InternationalLiveMatch";
import LocalLiveScore from "./component/LocalLiveScore.jsx";
import MainContainer from "./component/MainContainer.jsx";
import Details from "./component/Details.jsx";
import Openers from "./component/Openers.jsx";
import Contact from "./component/Contact.jsx";
import Toss from "./component/Toss.jsx";
import BookVenue from "./Venue/BookVenue.jsx";
import Play from "./component/Play.jsx";
import Signin from "./component/Signin.jsx";
import Signup from "./component/Signup.jsx";
import Home from "./component/Home1.jsx";
import AddVenue from "./Venue/AddVenue.jsx";
import ErrorBoundary from "./component/ErrorBoundary.jsx";
import RemoveVenue from "./Venue/RemoveVenue.jsx";
import UserInput from "./component/UserInput.jsx";
import CalculateScore from "./component/calculateScore.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
// import store from "./app/store";
import Matches from "./component/Matches/Matches.jsx";
import MatchDetails from "./component/matchDetails/MatchDetails";
import Schedule from './component/Schedule/Schedule'
import NewsDetail from "./component/NewsDetail/NewsDetail.jsx";
import News from "./component/News/News";
import Teams from "./component/Teams/Teams.jsx";
import Series from "./component/Series/Series.jsx";
import BatsmenRankings from "./component/BatsmenRanking/BatsmenRanking.jsx";
import PhotoGallery from "./component/Photos/PhotoGallery.jsx";
import Product from "./Products/Product.jsx";
import Logout from "./component/Logout.jsx";
import AddProduct from "./Products/AddProduct.jsx";
import ForgotPassword from "./component/ForgotPassword.jsx";
import ForgotPassword2 from "./component/ForgotPassword2.jsx";
import Booking from "./Venue/Booking.jsx";
import UserDetails from "./Venue/UserDetails.jsx";
import PremiumPayment from "./Venue/PremiumPayment.jsx";
import MerchantDetails from "./Venue/MerchantDetails.jsx";
import Cart from "./Products/Cart.jsx";
import OrderDetails from "./Products/OrderDetails.jsx";
import OrderData from "./Products/OrderData.jsx";
import EditProfile from "./Venue/EditProfile.jsx";
import UpdateProduct from "./Products/UpdateProduct.jsx";
import RemoveProducts from "./Products/RemoveProducts.jsx";
import BecomeMerchant from "./component/BecomeMerchant.jsx";
import MerchantRequestList from "./component/MerchantRequestList.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/international",
        element: <InternationalLiveMatch />,
      },
      {
        path: "/locallivescore",
        element: <LocalLiveScore />,
      },
      {
        path: "/details",
        element: <Details />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/MainContainer",
        element: <MainContainer />,
      },
      {
        path: "/openers",
        element: <Openers />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/toss",
        element: <Toss />,
      },
      {
        path: "/play",
        element: <Play />,
      },
      {
        path: "/venue", // Add the new route
        element: <AddVenue />,
      },
      {
        path: "/venueshow", // Add the new route
        element: <BookVenue />,
      },
      {
        path: "/remove-venue",
        element: <RemoveVenue />,
      },
      {
        path: "/signin", // Add the new route
        element: <Signin />,
      },
      {
        path: "/signup", // Add the new route
        element: <Signup />,
      },
      {
        path: "/add-venue", // Add the new route
        element: <AddVenue/>,
      },
      { 
        path: "*", 
        element: <ErrorBoundary /> 
      },
      { 
        path: "/matches", 
        element: <Matches /> 
      },
      {
        path: "/match/:matchId",
        element: <MatchDetails />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
      {
        path: "/news/:id",
        element: <NewsDetail />,
      },
      {
        path: "/news",
        element: <News/>,
      },
      {
        path: "/teams",
        element: <Teams />,
      },
      {
        path: "/series",
        element: <Series />,
      },
      {
        path: "/ranking",
        element: <BatsmenRankings />,
      },
      {
        path: "/photo",
        element: <PhotoGallery />,
      },
      {
        path: "/products",
        element: <Product/>
      },
      {
        path: "/logout",
        element: <Logout/>
      },
      {
        path: "/addProduct",
        element: <AddProduct/>
      },{
        path: "/forgotPassword",
        element: <ForgotPassword2/>
      },{
        path: "/bookingData",
        element: <Booking/>
      },{
        path: "/userDetails",
        element: <UserDetails/>
      },{
        path: "/merchantDetails",
        element: <MerchantDetails/>
      }
      ,{
        path: "/merchant",
        element: <PremiumPayment/>
      },{
        path: "/cart",
        element: <Cart/>
      },{
        path: "/order-details",
        element: <OrderDetails/>
      },{
        path: "/orderData",
        element: <OrderData/>
      },{
        path: "/edit",
        element: <EditProfile/>
      },{
        path: "/updateProduct",
        element: <UpdateProduct/>
      },{
        path: "/removeProduct",
        element: <RemoveProducts/>
      },{
        path: "/becomeMerchant",
        element: <BecomeMerchant/>
      },{
        path: "/merchantRequests",
        element: <MerchantRequestList/>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </StrictMode>
)
