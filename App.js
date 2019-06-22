import { createStackNavigator } from "react-navigation";
import Main from "./components/Main"
import Authorization from "./components/Authorization"
import Register from "./components/Register"
import Stations from "./components/Stations"
import Map from "./components/Map"

const App = createStackNavigator({
  s1: { screen: Main },
  s2: { screen: Authorization },
  s3: { screen: Register },
  s4: { screen: Stations },
  s5: { screen: Map }
});

export default App;