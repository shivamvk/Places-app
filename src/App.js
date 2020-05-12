import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Users from "./user/pages/Users";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

const App = () => {
  const USERS = [
    {
      id: "1",
      name: "Shivam",
      image:
        "https://www.mykhel.com/img/2018/10/viratkohli-cropped_enb1383spzof1285xkhtckgld.jpg",
      places: "2",
    },
    {
      id: "2",
      name: "Virat",
      image:
        "https://www.mykhel.com/img/2018/10/viratkohli-cropped_enb1383spzof1285xkhtckgld.jpg",
      places: "3",
    },
  ];

  return (
    <Router>
      <MainNavigation />
      <main>
        <Route path="/" exact>
          <Users items={USERS} />
        </Route>
        <Redirect to="/" />
      </main>
    </Router>
  );
};

export default App;
