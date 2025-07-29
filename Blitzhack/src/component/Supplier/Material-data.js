export const requests = [
  {
    id: 1,
    customer: "Saint-Gobain",
    material: "Float Glass",
    quantity: 1500,
    location: "Chennai Plant",
    batch: "SG-1234578",
    rawMaterials: [
      {
        name: "Silica Sand",
        requiredQty: 1000,
        origin: "Rajasthan, India",
        certifications: ["ISO 14001", "EcoCert"],
        complianceStatus: "Fully Compliant",
        batch: "AX-1234578",
        blockchainHash:
          "f1c291fdd83a11733472bce89480a1b56e3cbbb5ee8c1684cb6c2376beaa7c5d",
        supplierHistory: [
          {
            name: "Desert Minerals Pvt Ltd",
            esgScore: 82,
            note: "Water-conserving extraction process",
            certificateId: "CERT-IND-ISO14001-DM01",
            blockchainHash:
              "7f1e4b9015b6c41f4b3a251b90e62f06c41f183bfa93df6c6c69c5ae56a62dc4",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    customer: "Saint-Gobain",
    material: "Gypsum Board",
    quantity: 2000,
    location: "Rajasthan Plant",
    batch: "SG-1234578",
    rawMaterials: [
      {
        name: "Natural Gypsum",
        requiredQty: 1800,
        origin: "Iran",
        certifications: ["REACH", "ISO 14044"],
        complianceStatus: "Verified",
        blockchainHash:
          "bfa287c9d994ecb6e3823a51923a7eddb176e9b84204c9292b187e53ddbd88ff",
        supplierHistory: [
          {
            name: "Gypsum Gulf Ltd",
            esgScore: 79,
            note: "Low emissions & traceable transport",
            certificateId: "CERT-ME-REACH-GG01",
            blockchainHash:
              "e233b38ecdb4a163cb6c06db55bd56f3fa45a7680423c75ed1e1624b1e86a3de",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    customer: "Saint-Gobain",
    material: "Glass Wool Insulation",
    quantity: 900,
    location: "Roorkee Plant",
    rawMaterials: [
      {
        name: "Recycled Glass Cullet",
        requiredQty: 700,
        origin: "India (urban recovery)",
        certifications: ["LEED", "ISO 50001"],
        complianceStatus: "Green Certified",
        blockchainHash:
          "f3348cd9e1d0f1bbdc7d1518cb3d1df8f4c6a99b3b9c2df4fe7d03b1a9b22aab",
        supplierHistory: [
          {
            name: "UrbanGlass Recycle",
            esgScore: 88,
            note: "Diverted from landfill, ESG-verified",
            certificateId: "CERT-IN-LEED-UG01",
            blockchainHash:
              "be39485eac45dc0b823181bd167c13b859b7fc905aa232fcdb824eb4a25eb729",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    customer: "Saint-Gobain",
    material: "Cementitious Mortar",
    quantity: 1100,
    location: "Tamil Nadu Plant",
    rawMaterials: [
      {
        name: "Fly Ash",
        requiredQty: 500,
        origin: "NTPC Thermal Plants",
        certifications: ["BIS", "REACH"],
        complianceStatus: "Certified",
        blockchainHash:
          "d299b2c5d30fc5a301b23351ec58efbfc69a1ce0e26a5b94cce986e560c0e91b",
        supplierHistory: [
          {
            name: "NTPC Flyash Services",
            esgScore: 80,
            note: "Waste reuse program contributor",
            certificateId: "CERT-IN-BIS-NTPC01",
            blockchainHash:
              "7bb6f32e9ad2231ab11c58b4b101c0a2e4b3f651e4f44c322b11e5c891bc6db2",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    customer: "Saint-Gobain",
    material: "Ceramic Tiles",
    quantity: 3500,
    location: "Andhra Pradesh Facility",
    rawMaterials: [
      {
        name: "Kaolin Clay",
        requiredQty: 2000,
        origin: "Jharkhand, India",
        certifications: ["ISO 14001", "EcoLabel"],
        complianceStatus: "Pending Audit",
        blockchainHash:
          "c2a95c0247b09a65eabebacc80a53e469f6ac9a4d05e802d20cd68bc91f79e14",
        supplierHistory: [
          {
            name: "Mitti Minerals Ltd",
            esgScore: 68,
            note: "Awaiting 2025 environmental audit",
            certificateId: "CERT-IN-ISO14001-MM01",
            blockchainHash:
              "0a9bfc0d325ae6eab07e36ef885b3d0cf09b79f72f20a964bb44b154bf93372e",
          },
        ],
      },
    ],
  },
];
