import React, { useState } from "react";
import {
  ChevronRight,
  Eye,
  ArrowLeft,
  Thermometer,
  Clock,
  CheckCircle,
  AlertTriangle,
  Settings,
} from "lucide-react";

const GlassProductionDashboard = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedGlass, setSelectedGlass] = useState(null);

  // Glass production data
  const glassProductionData = [
    {
      id: "GLASS-001",
      glassType: "Tempered Door Glass",
      dimensions: "2000x800x12mm",
      quantity: 50,
      customerOrder: "ORD-2024-001",
      batchNumber: "BATCH-TD-001",
      currentStage: "Tempering",
      priority: "High",
      deadline: "2025-08-05",
      startDate: "2025-07-25",
    },
    {
      id: "GLASS-002",
      glassType: "Laminated Windshield",
      dimensions: "1420x950x6.38mm",
      quantity: 75,
      customerOrder: "ORD-2024-002",
      batchNumber: "BATCH-WS-002",
      currentStage: "Cutting",
      priority: "High",
      deadline: "2025-08-10",
      startDate: "2025-07-28",
    },
    {
      id: "GLASS-003",
      glassType: "Insulated Door Glass",
      dimensions: "1800x600x24mm",
      quantity: 30,
      customerOrder: "ORD-2024-003",
      batchNumber: "BATCH-ID-003",
      currentStage: "Quality Check",
      priority: "Medium",
      deadline: "2025-08-02",
      startDate: "2025-07-20",
    },
    {
      id: "GLASS-004",
      glassType: "Curved Windshield",
      dimensions: "1380x920x5mm",
      quantity: 40,
      customerOrder: "ORD-2024-004",
      batchNumber: "BATCH-CW-004",
      currentStage: "Bending",
      priority: "High",
      deadline: "2025-08-12",
      startDate: "2025-07-29",
    },
    {
      id: "GLASS-005",
      glassType: "Tinted Door Glass",
      dimensions: "1900x750x10mm",
      quantity: 25,
      customerOrder: "ORD-2024-005",
      batchNumber: "BATCH-TG-005",
      currentStage: "Completed",
      priority: "Low",
      deadline: "2025-07-30",
      startDate: "2025-07-15",
    },
  ];

  // Detailed production status data
  const getDetailedStatus = (glassId) => {
    const statusData = {
      "GLASS-001": {
        productionStages: [
          {
            stage: "Raw Material Inspection",
            status: "completed",
            timestamp: "2025-07-25 08:00",
            details:
              "Float glass sheets inspected and approved. Thickness: 12mm, Quality: Grade A",
            operator: "John Smith",
            duration: "30 min",
          },
          {
            stage: "Cutting",
            status: "completed",
            timestamp: "2025-07-25 09:15",
            details:
              "Glass cut to dimensions 2000x800mm. 50 pieces completed with 2mm tolerance",
            operator: "Maria Garcia",
            duration: "4 hours",
          },
          {
            stage: "Edge Processing",
            status: "completed",
            timestamp: "2025-07-26 10:30",
            details:
              "Polished edges, beveled corners. All pieces passed edge strength test",
            operator: "David Wilson",
            duration: "6 hours",
          },
          {
            stage: "Tempering",
            status: "in-progress",
            timestamp: "2025-07-29 14:00",
            details:
              "Heating at 620°C, currently in cooling phase. 35/50 pieces completed",
            operator: "Sarah Johnson",
            duration: "2 days (ongoing)",
            currentTemp: "620°C",
            progress: 70,
          },
          {
            stage: "Quality Inspection",
            status: "pending",
            timestamp: "",
            details: "Stress testing and dimensional verification pending",
            operator: "TBD",
            duration: "4 hours (est.)",
          },
          {
            stage: "Packaging",
            status: "pending",
            timestamp: "",
            details: "Protective wrapping and crating for shipment",
            operator: "TBD",
            duration: "2 hours (est.)",
          },
        ],
        qualityMetrics: {
          thickness: "12.0mm ±0.1",
          strength: "120 MPa",
          transparency: "91%",
          defectRate: "2%",
        },
        equipment: {
          temperingFurnace: "Furnace-A2",
          cuttingTable: "CT-001",
          edgeGrinder: "EG-003",
        },
        alerts: [
          {
            type: "warning",
            message:
              "Tempering furnace temperature slightly below optimal - monitoring closely",
          },
          {
            type: "info",
            message:
              "Production on schedule despite minor temperature variance",
          },
        ],
      },
      "GLASS-002": {
        productionStages: [
          {
            stage: "Raw Material Inspection",
            status: "completed",
            timestamp: "2025-07-28 07:30",
            details:
              "PVB interlayer and glass sheets inspected. Quality approved for automotive grade",
            operator: "Michael Brown",
            duration: "45 min",
          },
          {
            stage: "Cutting",
            status: "in-progress",
            timestamp: "2025-07-29 08:00",
            details:
              "Cutting windshield blanks to 1420x950mm. 45/75 pieces completed",
            operator: "Lisa Chen",
            duration: "1.5 days (ongoing)",
            progress: 60,
          },
          {
            stage: "Bending",
            status: "pending",
            timestamp: "",
            details: "Shaping to automotive curvature specifications",
            operator: "TBD",
            duration: "8 hours (est.)",
          },
          {
            stage: "Laminating",
            status: "pending",
            timestamp: "",
            details: "PVB interlayer bonding at 140°C under pressure",
            operator: "TBD",
            duration: "6 hours (est.)",
          },
          {
            stage: "Quality Inspection",
            status: "pending",
            timestamp: "",
            details: "Optical clarity and adhesion testing",
            operator: "TBD",
            duration: "3 hours (est.)",
          },
        ],
        qualityMetrics: {
          thickness: "6.38mm ±0.05",
          curvature: "R1800mm",
          opticalDistortion: "<0.5%",
          adhesion: "Grade A",
        },
        equipment: {
          cuttingTable: "CT-002",
          bendingMold: "BM-WS-001",
          autoclave: "AC-001",
        },
        alerts: [
          { type: "info", message: "Cutting proceeding as scheduled" },
          { type: "info", message: "All quality checks passed so far" },
        ],
      },
    };
    return statusData[glassId] || null;
  };

  const getStageColor = (stage) => {
    const stageColors = {
      Cutting: "bg-blue-100 text-blue-800",
      Tempering: "bg-orange-100 text-orange-800",
      Bending: "bg-purple-100 text-purple-800",
      Laminating: "bg-indigo-100 text-indigo-800",
      "Quality Check": "bg-yellow-100 text-yellow-800",
      Completed: "bg-green-100 text-green-800",
      "Edge Processing": "bg-cyan-100 text-cyan-800",
      Packaging: "bg-gray-100 text-gray-800",
    };
    return stageColors[stage] || "bg-gray-100 text-gray-800";
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-600";
      case "Medium":
        return "text-yellow-600";
      case "Low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getStageIcon = (stage) => {
    const icons = {
      Cutting: <Settings className="w-4 h-4" />,
      Tempering: <Thermometer className="w-4 h-4" />,
      Bending: <Settings className="w-4 h-4" />,
      "Quality Check": <CheckCircle className="w-4 h-4" />,
      Completed: <CheckCircle className="w-4 h-4" />,
    };
    return icons[stage] || <Clock className="w-4 h-4" />;
  };

  const handleGlassClick = (glass) => {
    setSelectedGlass(glass);
    setCurrentView("detailed-status");
  };

  const DetailedStatusView = ({ glass }) => {
    const statusData = getDetailedStatus(glass.id);

    if (!statusData) return <div>No detailed status available</div>;

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => setCurrentView("dashboard")}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Production Dashboard
            </button>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {glass.glassType}
                  </h1>
                  <p className="text-gray-600">
                    Batch: {glass.batchNumber} | Dimensions: {glass.dimensions}{" "}
                    | Quantity: {glass.quantity} pieces
                  </p>
                  <p className="text-sm text-gray-500">
                    Order: {glass.customerOrder}
                  </p>
                </div>
                <div className="text-right">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStageColor(
                      glass.currentStage
                    )}`}
                  >
                    {getStageIcon(glass.currentStage)}
                    <span className="ml-1">{glass.currentStage}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Due: {glass.deadline}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts */}
          {statusData.alerts && statusData.alerts.length > 0 && (
            <div className="mb-6 space-y-2">
              {statusData.alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    alert.type === "warning"
                      ? "bg-yellow-50 border-l-4 border-yellow-400"
                      : "bg-blue-50 border-l-4 border-blue-400"
                  }`}
                >
                  <div className="flex">
                    {alert.type === "warning" ? (
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-blue-400 mr-2" />
                    )}
                    <p className="text-sm text-gray-700">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Production Timeline */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Production Status & Timeline
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {statusData.productionStages.map((stage, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                            stage.status === "completed"
                              ? "bg-green-500 text-white"
                              : stage.status === "in-progress"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-300 text-gray-600"
                          }`}
                        >
                          {stage.status === "completed" ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : stage.status === "in-progress" ? (
                            <Clock className="w-4 h-4" />
                          ) : (
                            <Settings className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3
                              className={`font-medium ${
                                stage.status === "completed"
                                  ? "text-gray-900"
                                  : stage.status === "in-progress"
                                  ? "text-blue-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {stage.stage}
                            </h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              {stage.duration}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {stage.details}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Operator: {stage.operator}</span>
                            {stage.timestamp && <span>{stage.timestamp}</span>}
                          </div>
                          {stage.progress && (
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                <span>Progress</span>
                                <span>{stage.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${stage.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                          {stage.currentTemp && (
                            <div className="mt-2 flex items-center text-sm text-orange-600">
                              <Thermometer className="w-4 h-4 mr-1" />
                              Current Temperature: {stage.currentTemp}
                            </div>
                          )}
                        </div>
                      </div>
                      {index < statusData.productionStages.length - 1 && (
                        <div className="ml-4 w-0.5 h-6 bg-gray-200 mt-2"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quality Metrics & Equipment */}
            <div className="space-y-6">
              {/* Quality Metrics */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Quality Metrics
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {Object.entries(statusData.qualityMetrics).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm font-medium text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, " $1")}:
                          </span>
                          <span className="text-sm text-gray-900">{value}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Equipment Status */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Equipment in Use
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {Object.entries(statusData.equipment).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm font-medium text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, " $1")}:
                          </span>
                          <span className="text-sm text-gray-900 font-mono">
                            {value}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (currentView === "detailed-status" && selectedGlass) {
    return <DetailedStatusView glass={selectedGlass} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Glass Production Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor glass door and windshield production status
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Settings className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  In Production
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    glassProductionData.filter(
                      (item) => item.currentStage !== "Completed"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Settings className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Cutting</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    glassProductionData.filter(
                      (item) => item.currentStage === "Cutting"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Thermometer className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Tempering</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    glassProductionData.filter(
                      (item) => item.currentStage === "Tempering"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Quality Check
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    glassProductionData.filter(
                      (item) => item.currentStage === "Quality Check"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    glassProductionData.filter(
                      (item) => item.currentStage === "Completed"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Glass Production List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Glass Production Status
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Click on any glass item to view detailed production status and
              updates
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Glass Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dimensions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Stage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {glassProductionData.map((glass) => (
                  <tr
                    key={glass.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleGlassClick(glass)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStageIcon(glass.currentStage)}
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {glass.glassType}
                          </div>
                          <div className="text-sm text-gray-500">
                            Batch: {glass.batchNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {glass.dimensions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {glass.quantity} pieces
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(
                          glass.currentStage
                        )}`}
                      >
                        {glass.currentStage}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-sm font-medium ${getPriorityColor(
                          glass.priority
                        )}`}
                      >
                        {glass.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {glass.deadline}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        View Status
                        <ChevronRight className="w-4 h-4 ml-1" />
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
  );
};

export default GlassProductionDashboard;