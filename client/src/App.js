import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Routers
import PrivateRoute from "./routes/PrivateRoute";

//Pages
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { PrivatePage } from "./pages/PrivatePage";

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={PrivatePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
