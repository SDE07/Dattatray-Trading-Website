import React from "react";
import UnderDevelopment from "../common/UnderDevelopment";
import { Warehouse, ThermometerSnowflake, Cog, ShieldAlert } from "lucide-react";

export default function InfrastructurePage() {
  return (
    <UnderDevelopment
      title="Infrastructure, Storage & Warehousing"
      subtitle="Modern Agro Storage, Cleaning Facilities & Cold Storage"
      category="Infrastructure"
      progress={78}
      estimatedCompletion="November 2026"
      description="Our modern facilities in Maharashtra include aerated bulk grain warehouses, multi-chamber cold storage for perishables like onions, and high-throughput optical cleaning and sorting lines."
      highlights={[
        {
          icon: Warehouse,
          title: "50,000+ MT Storage Capacity",
          desc: "Weather-proof, rodent-free scientific warehouses equipped with automated humidity monitoring.",
        },
        {
          icon: ThermometerSnowflake,
          title: "Temperature-Controlled Onion Storage",
          desc: "Specialized cold rooms and ventilated storage structures preventing premature sprouting and rotting.",
        },
        {
          icon: Cog,
          title: "Sortex & Grading Machinery",
          desc: "Multi-channel optical color sorters, gravity separators, and de-stoners ensuring 99.5% purity.",
        },
        {
          icon: ShieldAlert,
          title: "Certified Electronic Weighbridges",
          desc: "Government-calibrated 100-ton electronic weighbridges with tamper-proof computerized slips.",
        },
      ]}
    />
  );
}
