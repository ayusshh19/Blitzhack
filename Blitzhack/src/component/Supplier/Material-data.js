export const requests = [
  {
    id: 1,
    customer: "XYZ Manufacturing",
    material: "Tekbond Silicone GP - 260ML",
    quantity: 1000,
    location: "Chennai",
    rawMaterials: [
      {
        name: "Silicon Oil",
        requiredQty: "500 kg",
        quotations: [
          {
            supplierName: "ABC Chemicals",
            esgScore: 55,
            price: 45000,
            currency: "INR",
            note: "Delivery in 7 days",
          },
          {
            supplierName: "GreenChem Ltd",
            esgScore: 82,
            price: 48000,
            currency: "INR",
            note: "Ready to dispatch",
          },
        ],
      },
      {
        name: "Catalyst Resin",
        requiredQty: "250 kg",
        quotations: [
          {
            supplierName: "Catalyte Co.",
            esgScore: 78,
            price: 28000,
            currency: "INR",
            note: "Dispatch in 3 days",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    customer: "Secure Adhesives",
    material: "Foam Adhesive FX-5",
    quantity: 500,
    location: "Hyderabad",
    rawMaterials: [
      {
        name: "Polymer Base",
        requiredQty: "150 kg",
        quotations: [
          {
            supplierName: "PolymerMart",
            esgScore: 82,
            price: 21000,
            currency: "INR",
            note: "Stock available",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    customer: "Omkar AutoParts",
    material: "Sealant Grey - 200ml",
    quantity: 1200,
    location: "Ahmedabad",
    rawMaterials: [
      {
        name: "Rubber Compound",
        requiredQty: "300 kg",
        quotations: [
          {
            supplierName: "RubberPro",
            esgScore: 59,
            price: 22000,
            currency: "INR",
            note: "Delivery in 10 days",
          },
          {
            supplierName: "EcoRub Co.",
            esgScore: 81,
            price: 24000,
            currency: "INR",
            note: "Available immediately",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    customer: "TruFit Builders",
    material: "Weatherproof Coating",
    quantity: 600,
    location: "Bangalore",
    rawMaterials: [
      {
        name: "Hydrophobic Paste",
        requiredQty: "200 kg",
        quotations: [
          {
            supplierName: "NanoChem India",
            esgScore: 66,
            price: 41000,
            currency: "INR",
            note: "Delivery in 6 days",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    customer: "ABC Paints Ltd",
    material: "Resin Binder XZ-10",
    quantity: 750,
    location: "Delhi",
    rawMaterials: [
      {
        name: "Acrylic Base",
        requiredQty: "400 kg",
        quotations: [
          {
            supplierName: "UltraBase Chemicals",
            esgScore: 88,
            price: 39000,
            currency: "INR",
            note: "Delivered in 4 days",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    customer: "Modern Interiors",
    material: "Wood Adhesive ClearBond",
    quantity: 900,
    location: "Pune",
    rawMaterials: [
      {
        name: "PVA Emulsion",
        requiredQty: "300 kg",
        quotations: [
          {
            supplierName: "StickWell Pvt Ltd",
            esgScore: 63,
            price: 31000,
            currency: "INR",
            note: "Lead time 5 days",
          },
        ],
      },
    ],
  },
  {
    id: 7,
    customer: "EcoBuild Solutions",
    material: "EcoShield Primer",
    quantity: 1200,
    location: "Kolkata",
    rawMaterials: [
      {
        name: "Water-Based Binder",
        requiredQty: "350 kg",
        quotations: [
          {
            supplierName: "GreenBinder Ltd",
            esgScore: 91,
            price: 36500,
            currency: "INR",
            note: "Ships next day",
          },
          {
            supplierName: "EcoResins",
            esgScore: 70,
            price: 35500,
            currency: "INR",
            note: "Ships in 3 days",
          },
        ],
      },
    ],
  },
  {
    id: 8,
    customer: "Neo Adhesives",
    material: "QuickFix Epoxy",
    quantity: 400,
    location: "Nagpur",
    rawMaterials: [
      {
        name: "Epoxy Base",
        requiredQty: "180 kg",
        quotations: [],
      },
      {
        name: "Hardener X1",
        requiredQty: "100 kg",
        quotations: [
          {
            supplierName: "FixAll Chemicals",
            esgScore: 79,
            price: 26000,
            currency: "INR",
            note: "Custom blend available",
          },
        ],
      },
    ],
  },
  {
    id: 9,
    customer: "Laxmi Construction",
    material: "Concrete Bonding Agent",
    quantity: 1100,
    location: "Jaipur",
    rawMaterials: [
      {
        name: "Latex Polymer",
        requiredQty: "320 kg",
        quotations: [
          {
            supplierName: "BuildChem Co.",
            esgScore: 58,
            price: 33000,
            currency: "INR",
            note: "Lead time 6 days",
          },
        ],
      },
    ],
  },
  {
    id: 10,
    customer: "Shree Coatings",
    material: "NanoFinish - 100ml",
    quantity: 2000,
    location: "Mumbai",
    rawMaterials: [
      {
        name: "Nano Additive",
        requiredQty: "250 kg",
        quotations: [
          {
            supplierName: "NanoPlus Tech",
            esgScore: 85,
            price: 47000,
            currency: "INR",
            note: "Immediate availability",
          },
          {
            supplierName: "SmartMolex",
            esgScore: 61,
            price: 45500,
            currency: "INR",
            note: "Ships in 2 days",
          },
        ],
      },
    ],
  },
];
