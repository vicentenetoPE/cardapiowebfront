import React, { useState } from "react";
import ClosedOrdersList from "./ClosedOrdersList";
import HealthIndicator from "./HealthIndicator";
import { OpenedOrdersList } from "./OpenedOrdersList";
import TokenModal from "./modals/TokenModal";
import HamburgerMenu from "./HamburgerMenu";
import { DelayIndicator } from "./DelayIndicator";
import { APISwitch } from "./APISwitch";
import { SelectCompany } from "./SelectCompany";

const Dashboard: React.FC = () => {

  return (
    <div className="space-y-6 flex-1 flex flex-col">
      <div className="flex md:items-center justify-between flex-col md:flex-row gap-4">
        <h1 className="flex !text-xl md:!text-3xl font-bold items-center gap-5">
          <HamburgerMenu />
          Dashboard de Pedidos
        </h1>
        <div className="md:text-xl flex items-center gap-4 md:gap-10 ">
          <SelectCompany />
          <APISwitch />
          <DelayIndicator />
          <HealthIndicator />
        </div>
      </div>

      <div className="flex gap-4 flex-1 flex-col md:flex-row">
        <OpenedOrdersList />
        <ClosedOrdersList />
      </div>
    </div>
  );
};

export default Dashboard;
