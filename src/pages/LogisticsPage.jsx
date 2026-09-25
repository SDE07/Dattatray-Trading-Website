import React from "react";
import UnderDevelopment from "../common/UnderDevelopment";
import { Truck, Train, Ship, Navigation } from "lucide-react";

export default function LogisticsPage() {
  return (
    <UnderDevelopment
      title="Multimodal Logistics & Supply Chain"
      subtitle="Road, Rail Rake & Marine Freight Solutions"
      category="Supply Chain"
      progress={80}
      estimatedCompletion="December 2026"
      description="Reliable logistics are crucial in commodity trading. Dattatray Traders coordinates round-the-clock road freight, railway rake allocations for bulk grain transport, and containerized port deliveries."
      highlights={[
        {
          icon: Truck,
          title: "Dedicated Fleet Logistics",
          desc: "Contracted network of 150+ heavy commercial vehicles providing seamless doorstep delivery across India.",
        },
        {
          icon: Train,
          title: "Full Railway Rake Handling",
          desc: "Capacity to load and coordinate 2,500+ MT full freight rakes directly from key railway siding stations.",
        },
        {
          icon: Ship,
          title: "Port Drayage & Customs JNPT",
          desc: "End-to-end container transport to Jawaharlal Nehru Port Trust (JNPT) and Mumbai Port for overseas shipping.",
        },
        {
          icon: Navigation,
          title: "Real-Time Shipment Tracking",
          desc: "Live GPS updates, driver verification, and electronic e-way bill generation for complete peace of mind.",
        },
      ]}
    />
  );
}
