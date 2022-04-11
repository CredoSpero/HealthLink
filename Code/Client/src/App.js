import "./App.css";
import HomePage from "./pages/HomePage";
import QueueNumberChecker from "./pages/QueueNumberChecker";
import QueueNumber from "./pages/QueueNumber";
import PersonalParticulars from "./pages/PersonalParticulars";
import HealthcarePage from "./pages/HealthcarePage";
import SymptomsInput from "./pages/SymptomsInput";
import background from "./images/greek-vase.png";
import SeverityHighPage from "./pages/SeverityHighPage/SeverityHigh";
import SeverityMidPage from "./pages/SeverityMidPage/SeverityMid";
import SeverityLowPage from "./pages/SeverityLowPage/SeverityLow";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <ToastContainer />
      <Router>
        <div
          className="background_img"
          style={{ backgroundImage: `url(${background})` }}
        >
          <Switch>
            <Route path="/" exact component={HomePage} />

            <Route path="/checkqueue" exact component={QueueNumberChecker} />

            <Route
              path="/healthcarefacilities"
              exact
              component={HealthcarePage}
            />

            <Route path="/symptomsinput" exact component={SymptomsInput} />

            <Route path="/QueueInfo" exact component={QueueNumber} />

            <Route
              path="/inputparticulars"
              exact
              component={PersonalParticulars}
            />
            <Route
              path="/severityhighpage"
              exact
              component={SeverityHighPage}
            />
            <Route path="/severitymidpage" exact component={SeverityMidPage} />
            <Route path="/severitylowpage" exact component={SeverityLowPage} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
