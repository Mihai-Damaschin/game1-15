import { NotifyProvider } from "@ebs-integrator/react-ebs-ui";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { RouterSwitch } from "./RouterSwitch";

const Router = () => (
  <NotifyProvider>
    <BrowserRouter>
      <RouterSwitch />
    </BrowserRouter>
  </NotifyProvider>
);

export default Router;
