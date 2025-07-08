import React from "react";
import SupplierList from "../component/Supplier/Supplier_Table";
import { supplierData } from "../component/Supplier/Supplier-data";

export default function Supplier() {
  return (
    <div>
      <SupplierList suppliers={supplierData} />
    </div>
  );
}
