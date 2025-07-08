import React from "react";
import StatsOverview from "../component/Analytics/Stats";
import AnalysisOverview from "../component/Analytics/GridTables";
import GraphSection from "../component/Analytics/Graph";

export default function SupplierAnalyticsDashboard() {
  return (
    <>
      {/* <StatsOverview /> */}
      <GraphSection />
      <AnalysisOverview />
    </>
  );
}
