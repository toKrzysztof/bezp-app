import PrivateRoute from "../helpers/PrivateRoute";
import FanCounterPage from "./FanCounterPage";

const Home = () => {


 return (
  <PrivateRoute>
    <FanCounterPage/>
  </PrivateRoute>
 );
};

export default Home;