import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Users from "./user/pages/Users";
import Places from "./places/pages/Places";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

const App = () => {
  const USERS = [
    {
      id: "u1",
      name: "Shivam",
      image:
        "https://www.mykhel.com/img/2018/10/viratkohli-cropped_enb1383spzof1285xkhtckgld.jpg",
      places: "2",
    },
    {
      id: "u2",
      name: "Virat",
      image:
        "https://www.mykhel.com/img/2018/10/viratkohli-cropped_enb1383spzof1285xkhtckgld.jpg",
      places: "3",
    },
    {
      id: "u3",
      name: "Anushka",
      image:
        "https://www.mykhel.com/img/2018/10/viratkohli-cropped_enb1383spzof1285xkhtckgld.jpg",
      places: "0",
    },
  ];

  return (
    <Router>
      <MainNavigation />
      <main>
        <Route path="/" exact>
          <Users items={USERS} />
        </Route>
        <Route path="/:userId/places" exact>
          <Places />
        </Route>
        <Redirect to="/" />
      </main>
    </Router>
  );
};

export default App;
