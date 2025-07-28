import React, { useState, useEffect, useRef } from "react";
import * as Chart from "chart.js";
import {
  IconPackage,
  IconTruckDelivery,
  IconCheck,
  IconAlertCircle,
  IconClock,
  IconChartLine,
  IconBox,
  IconLeaf,
  IconShieldCheck,
  IconSearch,
  IconInfoCircle,
  IconListDetails,
  IconProgress,
  IconDatabase,
  IconGauge,
  IconCertificate,
  IconArrowRight,
} from "@tabler/icons-react";

// Register Chart.js components
Chart.Chart.register(...Chart.registerables);

const ProductionPlannerDashboard = () => {
  const chartRefs = useRef({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [traceabilityData, setTraceabilityData] = useState(null);

  // Sample data
  const productionData = {
    currentStatus: {
      totalOrders: 42,
      inProduction: 18,
      readyForShipment: 12,
      delayed: 5,
      completed: 7,
    },
    productionTrend: [
      { week: "W1", planned: 120, actual: 115 },
      { week: "W2", planned: 125, actual: 122 },
      { week: "W3", planned: 130, actual: 118 },
      { week: "W4", planned: 135, actual: 140 },
      { week: "W5", planned: 140, actual: 135 },
    ],
    materialAvailability: [
      {
        material: "Silica Sand",
        required: 5000,
        available: 4800,
        source: "Ethical Mines Co.",
        status: "warning",
      },
      {
        material: "Soda Ash",
        required: 2000,
        available: 2100,
        source: "GreenChem Inc.",
        status: "success",
      },
      {
        material: "Limestone",
        required: 3000,
        available: 2500,
        source: "Sustainable Quarries",
        status: "warning",
      },
      {
        material: "Recycled Glass",
        required: 1500,
        available: 1800,
        source: "EcoCycle Partners",
        status: "success",
      },
    ],
    sustainabilityMetrics: {
      carbonFootprint: 1250,
      waterUsage: 4200,
      recycledContent: 35,
      ethicalSourcingScore: 88,
    },
    products: [
      {
        id: "PRD-2023-0456",
        name: "Energy-Efficient Glass Panel",
        batch: "BATCH-EFG-789",
        status: "in_production",
        progress: 65,
        materials: [
          {
            id: "MAT-001",
            name: "Silica Sand",
            origin: "Norway",
            certification: "FSC Certified",
          },
          {
            id: "MAT-002",
            name: "Soda Ash",
            origin: "USA",
            certification: "ISO 14001",
          },
          {
            id: "MAT-003",
            name: "Recycled Glass",
            origin: "Local",
            certification: "GRS Certified",
          },
        ],
        productionStages: [
          {
            stage: "Material Prep",
            status: "completed",
            timestamp: "2023-11-15T08:30:00",
          },
          {
            stage: "Melting",
            status: "completed",
            timestamp: "2023-11-16T14:15:00",
          },
          {
            stage: "Forming",
            status: "in_progress",
            timestamp: "2023-11-17T09:00:00",
          },
          { stage: "Annealing", status: "pending", timestamp: null },
          { stage: "Inspection", status: "pending", timestamp: null },
        ],
        ethicalScore: 92,
        carbonFootprint: 245,
      },
    ],
  };

  // Chart configurations
  useEffect(() => {
    const initCharts = () => {
      // Production Trend Chart
      createChart("productionTrendChart", {
        type: "line",
        data: {
          labels: productionData.productionTrend.map((p) => p.week),
          datasets: [
            {
              label: "Planned",
              data: productionData.productionTrend.map((p) => p.planned),
              borderColor: "#206bc4",
              backgroundColor: "rgba(32, 107, 196, 0.05)",
              borderWidth: 2,
              tension: 0.3,
              borderDash: [5, 5],
            },
            {
              label: "Actual",
              data: productionData.productionTrend.map((p) => p.actual),
              borderColor: "#2fb344",
              backgroundColor: "rgba(47, 179, 68, 0.1)",
              borderWidth: 2,
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: (context) =>
                  `${context.dataset.label}: ${context.raw} units`,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false,
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        },
      });

      // Material Availability Chart
      createChart("materialChart", {
        type: "bar",
        data: {
          labels: productionData.materialAvailability.map((m) => m.material),
          datasets: [
            {
              label: "Required",
              data: productionData.materialAvailability.map((m) => m.required),
              backgroundColor: "#e9ecef",
              borderColor: "#e9ecef",
              borderWidth: 1,
            },
            {
              label: "Available",
              data: productionData.materialAvailability.map((m) => m.available),
              backgroundColor: (context) => {
                const index = context.dataIndex;
                return productionData.materialAvailability[index].status ===
                  "success"
                  ? "#2fb344"
                  : "#f59f00";
              },
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false,
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        },
      });

      // Sustainability Gauge
      createChart("sustainabilityGauge", {
        type: "doughnut",
        data: {
          labels: ["Carbon", "Water", "Recycled", "Ethical"],
          datasets: [
            {
              data: [
                productionData.sustainabilityMetrics.carbonFootprint,
                productionData.sustainabilityMetrics.waterUsage,
                productionData.sustainabilityMetrics.recycledContent,
                productionData.sustainabilityMetrics.ethicalSourcingScore,
              ],
              backgroundColor: ["#d63939", "#206bc4", "#2fb344", "#9451e6"],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "70%",
          plugins: {
            legend: {
              position: "bottom",
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  let label = context.label || "";
                  if (label) label += ": ";
                  if (context.label === "Carbon")
                    label += context.raw + " kg CO₂";
                  else if (context.label === "Water")
                    label += context.raw + " L";
                  else label += context.raw + "%";
                  return label;
                },
              },
            },
          },
        },
      });
    };

    const timer = setTimeout(initCharts, 100);
    return () => clearTimeout(timer);
  }, []);

  const createChart = (canvasId, config) => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (chartRefs.current[canvasId]) chartRefs.current[canvasId].destroy();

    chartRefs.current[canvasId] = new Chart.Chart(ctx, config);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4 md:gap-6">
        {/* Header */}
        <div className="col-span-12">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
              <IconGauge className="text-blue-600 mr-3" size={28} />
              Production Planner Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor production with end-to-end traceability
            </p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {[
            {
              title: "Total Orders",
              value: productionData.currentStatus.totalOrders,
              icon: <IconPackage size={24} className="text-blue-600" />,
              bg: "bg-blue-50",
            },
            {
              title: "In Production",
              value: productionData.currentStatus.inProduction,
              icon: <IconProgress size={24} className="text-yellow-600" />,
              bg: "bg-yellow-50",
            },
            {
              title: "Ready to Ship",
              value: productionData.currentStatus.readyForShipment,
              icon: <IconTruckDelivery size={24} className="text-green-600" />,
              bg: "bg-green-50",
            },
            {
              title: "Delayed",
              value: productionData.currentStatus.delayed,
              icon: <IconAlertCircle size={24} className="text-red-600" />,
              bg: "bg-red-50",
            },
            {
              title: "Completed",
              value: productionData.currentStatus.completed,
              icon: <IconCheck size={24} className="text-purple-600" />,
              bg: "bg-purple-50",
            },
          ].map((card, index) => (
            <div key={index} className={`rounded-xl shadow-sm p-5 ${card.bg}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {card.value}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-white shadow-xs">
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 gap-4 md:gap-6">
          {/* Production Trend */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <IconChartLine className="text-blue-600 mr-2" size={20} />
                Production Trend
              </h2>
              <div className="flex space-x-2">
                <button className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                  Weekly
                </button>
                <button className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  Monthly
                </button>
              </div>
            </div>
            <div className="h-80">
              <canvas id="productionTrendChart"></canvas>
            </div>
          </div>

          {/* Material Availability */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-5">
              <IconDatabase className="text-blue-600 mr-2" size={20} />
              Material Availability
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-64">
                <canvas id="materialChart"></canvas>
              </div>
              <div>
                <div className="space-y-4">
                  {productionData.materialAvailability.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.material}
                        </p>
                        <p className="text-sm text-gray-500">{item.source}</p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.status === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.available >= item.required
                          ? "Sufficient"
                          : "Low Stock"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 grid grid-cols-1 gap-4 md:gap-6">
          {/* Sustainability */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-5">
              <IconLeaf className="text-green-600 mr-2" size={20} />
              Sustainability Metrics
            </h2>
            <div className="h-64">
              <canvas id="sustainabilityGauge"></canvas>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {[
                {
                  label: "Carbon Footprint",
                  value: "1,250 kg CO₂",
                  icon: <IconLeaf size={16} className="text-red-500" />,
                },
                {
                  label: "Water Usage",
                  value: "4,200 L",
                  icon: <IconLeaf size={16} className="text-blue-500" />,
                },
                {
                  label: "Recycled Content",
                  value: "35%",
                  icon: <IconLeaf size={16} className="text-green-500" />,
                },
                {
                  label: "Ethical Score",
                  value: "88/100",
                  icon: (
                    <IconCertificate size={16} className="text-purple-500" />
                  ),
                },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="p-1 rounded-md bg-white shadow-xs">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{item.label}</p>
                      <p className="font-medium text-gray-900">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traceability */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-5">
              <IconShieldCheck className="text-blue-600 mr-2" size={20} />
              Product Traceability
            </h2>
            <div className="relative mb-4">
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="">Select a product</option>
                {productionData.products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} ({product.id})
                  </option>
                ))}
              </select>
              <IconSearch
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>

            {selectedProduct && (
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-900">
                    {productionData.products[0].name}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    In Production
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {productionData.products[0].productionStages.map(
                    (stage, index) => (
                      <div key={index} className="flex items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                            stage.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : stage.status === "in_progress"
                              ? "bg-blue-100 text-blue-600 animate-pulse"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {stage.status === "completed" ? (
                            <IconCheck size={14} />
                          ) : stage.status === "in_progress" ? (
                            <IconProgress size={14} />
                          ) : (
                            <IconClock size={14} />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {stage.stage}
                          </p>
                          {stage.timestamp && (
                            <p className="text-xs text-gray-500">
                              {new Date(stage.timestamp).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>

                <button className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  <IconShieldCheck className="mr-2" size={16} />
                  Verify on Blockchain
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Production Orders */}
        <div className="col-span-12">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-5">
              <IconListDetails className="text-blue-600 mr-2" size={20} />
              Current Production Orders
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Batch
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ethical Score
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {productionData.products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.id}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {product.batch}
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          In Production
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                            <div
                              className="bg-blue-600 h-1.5 rounded-full"
                              style={{ width: `${product.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-700">
                            {product.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                            <div
                              className="bg-green-600 h-1.5 rounded-full"
                              style={{ width: `${product.ethicalScore}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-700">
                            {product.ethicalScore}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button className="text-blue-600 hover:text-blue-900 flex items-center text-sm">
                          Details <IconArrowRight className="ml-1" size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionPlannerDashboard;
