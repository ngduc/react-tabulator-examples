import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// "Home" is the main Component:
import Home from "./components/Home";

import More from "./components/More";

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/more">More</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/more" component={More} />
    </div>
  </Router>
);

render(<BasicExample />, document.getElementById("root"));
