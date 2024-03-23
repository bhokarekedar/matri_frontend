import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { spin, Flex } from "antd";
import { useSelector } from "react-redux";
import Home from "./pages/Homepage/Homepage";
import Signup from "./pages/Signup/Signup";
import Lottie from "lottie-react";
import loading from "./images/animations/loading.json";
import { Profile } from "./pages/Profile/Profile";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

function App() {
  const isLoading = useSelector((state) => state.config.isLoading);
  return (
    // <spin spinning={isLoading.length > 0}>
    <div className="App">
     <RouterProvider router={router} />
     {!isLoading && 
     <Lottie 
     animationData={loading}
     height={100}  />}
    </div>
    // </spin>
  );
}

export default App;



{/* <Flex className="fullHeightLoading" justify="center" align="center">
<Lottie
  style={{ height: "100px" }}
  animationData={loading}
  loop={true}
/>
</Flex> */}

