import React, { useState } from "react";
import ClosedOrdersList from "./ClosedOrdersList";
import HealthIndicator from "./HealthIndicator";
import { OpenedOrdersList } from "./OpenedOrdersList";
import TokenModal from "./modals/TokenModal";
import HamburgerMenu from "./HamburgerMenu";
import { DelayIndicator } from "./DelayIndicator";
import { APISwitch } from "./APISwitch";

const Dashboard: React.FC = () => {

  return (
    <div className="space-y-6 flex-1 flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="flex text-2xl font-bold items-center gap-5">
          <HamburgerMenu />
          Dashboard de Pedidos
        </h1>
        <div className="text-xl flex items-center gap-10 ">
          <APISwitch />
          <DelayIndicator />
          <HealthIndicator />
        </div>
      </div>

      <div className="flex gap-4 flex-1">
        <OpenedOrdersList />
        <ClosedOrdersList />
      </div>
    </div>
  );
};

export default Dashboard;
