import React, { useState, useEffect, useRef } from 'react';
import * as Chart from 'chart.js';

// Register ALL Chart.js components at once
Chart.Chart.register(...Chart.registerables);

const SupplyChainDashboard = () => {
  const chartRefs = useRef({});

  // Sample procurement data
  const procurementData = {
    suppliers: [
      { id: 1, name: 'TechCorp Ltd', quotationCost: 45000, deliveryTime: 15, rating: 4.2, status: 'active' },
      { id: 2, name: 'GlobalSupply Inc', quotationCost: 52000, deliveryTime: 12, rating: 4.5, status: 'active' },
      { id: 3, name: 'QuickParts Co', quotationCost: 38000, deliveryTime: 20, rating: 3.8, status: 'pending' },
      { id: 4, name: 'ReliableGoods', quotationCost: 48000, deliveryTime: 14, rating: 4.1, status: 'active' },
      { id: 5, name: 'EcoSupplier', quotationCost: 55000, deliveryTime: 18, rating: 4.3, status: 'rejected' }
    ],
    monthlyOrders: [
      { month: 'Jan', orders: 120, cost: 240000, delivered: 115 },
      { month: 'Feb', orders: 135, cost: 270000, delivered: 130 },
      { month: 'Mar', orders: 110, cost: 220000, delivered: 105 },
      { month: 'Apr', orders: 145, cost: 290000, delivered: 140 },
      { month: 'May', orders: 160, cost: 320000, delivered: 155 },
      { month: 'Jun', orders: 175, cost: 350000, delivered: 170 }
    ],
    categoryBreakdown: [
      { category: 'Electronics', value: 35, cost: 180000 },
      { category: 'Raw Materials', value: 25, cost: 120000 },
      { category: 'Packaging', value: 20, cost: 80000 },
      { category: 'Tools', value: 15, cost: 60000 },
      { category: 'Others', value: 5, cost: 20000 }
    ],
    deliveryPerformance: [
      { supplier: 'TechCorp', onTime: 85, late: 15 },
      { supplier: 'GlobalSupply', onTime: 92, late: 8 },
      { supplier: 'QuickParts', onTime: 78, late: 22 },
      { supplier: 'ReliableGoods', onTime: 88, late: 12 }
    ]
  };

  // Chart configurations
  const createChart = (canvasId, config) => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Destroy existing chart if it exists
    if (chartRefs.current[canvasId]) {
      chartRefs.current[canvasId].destroy();
      chartRefs.current[canvasId] = null;
    }
    
    try {
      chartRefs.current[canvasId] = new Chart.Chart(ctx, config);
    } catch (error) {
      console.error(`Error creating chart ${canvasId}:`, error);
    }
  };

  useEffect(() => {
    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      // Supplier Cost Comparison Chart
      createChart('supplierCostChart', {
        type: 'bar',
        data: {
          labels: procurementData.suppliers.map(s => s.name),
          datasets: [{
            label: 'Quotation Cost ($)',
            data: procurementData.suppliers.map(s => s.quotationCost),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF'
            ],
            borderColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return '$' + value.toLocaleString();
                }
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Supplier Quotation Costs'
            }
          }
        }
      });

      // Monthly Orders Trend Chart
      createChart('monthlyOrdersChart', {
        type: 'line',
        data: {
          labels: procurementData.monthlyOrders.map(m => m.month),
          datasets: [
            {
              label: 'Orders Placed',
              data: procurementData.monthlyOrders.map(m => m.orders),
              borderColor: '#36A2EB',
              backgroundColor: 'rgba(54, 162, 235, 0.1)',
              tension: 0.4,
              fill: true
            },
            {
              label: 'Orders Delivered',
              data: procurementData.monthlyOrders.map(m => m.delivered),
              borderColor: '#4BC0C0',
              backgroundColor: 'rgba(75, 192, 192, 0.1)',
              tension: 0.4,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Monthly Order Trends'
            }
          }
        }
      });

      // Category Breakdown Pie Chart
      createChart('categoryChart', {
        type: 'doughnut',
        data: {
          labels: procurementData.categoryBreakdown.map(c => c.category),
          datasets: [{
            data: procurementData.categoryBreakdown.map(c => c.value),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Procurement by Category (%)'
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      });

      // Delivery Performance Chart
      createChart('deliveryChart', {
        type: 'bar',
        data: {
          labels: procurementData.deliveryPerformance.map(d => d.supplier),
          datasets: [
            {
              label: 'On Time (%)',
              data: procurementData.deliveryPerformance.map(d => d.onTime),
              backgroundColor: '#4BC0C0'
            },
            {
              label: 'Late (%)',
              data: procurementData.deliveryPerformance.map(d => d.late),
              backgroundColor: '#FF6384'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: true
            },
            y: {
              stacked: true,
              max: 100
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Supplier Delivery Performance'
            }
          }
        }
      });
    }, 200);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      Object.values(chartRefs.current).forEach(chart => {
        if (chart) {
          chart.destroy();
        }
      });
      chartRefs.current = {};
    };
  }, []);

  // Calculate KPIs
  const totalSuppliers = procurementData.suppliers.length;
  const activeSuppliers = procurementData.suppliers.filter(s => s.status === 'active').length;
  const avgQuotationCost = procurementData.suppliers.reduce((sum, s) => sum + s.quotationCost, 0) / totalSuppliers;
  const totalOrdersThisMonth = procurementData.monthlyOrders[procurementData.monthlyOrders.length - 1].orders;
  const totalCostThisMonth = procurementData.monthlyOrders[procurementData.monthlyOrders.length - 1].cost;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Chain Analysis</h1>
          <p className="text-gray-600">Monitor supplier performance, costs, and delivery metrics</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Suppliers</h3>
            <p className="text-3xl font-bold text-blue-600">{totalSuppliers}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Active Suppliers</h3>
            <p className="text-3xl font-bold text-green-600">{activeSuppliers}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Avg Quotation</h3>
            <p className="text-3xl font-bold text-purple-600">${Math.round(avgQuotationCost).toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Monthly Orders</h3>
            <p className="text-3xl font-bold text-orange-600">{totalOrdersThisMonth}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Monthly Cost</h3>
            <p className="text-3xl font-bold text-red-600">${totalCostThisMonth.toLocaleString()}</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Supplier Cost Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="h-80">
              <canvas id="supplierCostChart"></canvas>
            </div>
          </div>

          {/* Monthly Orders Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="h-80">
              <canvas id="monthlyOrdersChart"></canvas>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="h-80">
              <canvas id="categoryChart"></canvas>
            </div>
          </div>

          {/* Delivery Performance */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="h-80">
              <canvas id="deliveryChart"></canvas>
            </div>
          </div>
        </div>

        {/* Supplier Details Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Supplier Details</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quotation Cost</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {procurementData.suppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{supplier.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${supplier.quotationCost.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.deliveryTime} days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        {supplier.rating}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        supplier.status === 'active' ? 'bg-green-100 text-green-800' :
                        supplier.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {supplier.status}
                      </span>
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

export default SupplyChainDashboard;