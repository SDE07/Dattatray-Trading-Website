import React from "react";
import { useSearchParams } from "react-router-dom";
import UnderDevelopment from "../common/UnderDevelopment";
import { Wheat, Scale, Layers, Sparkles } from "lucide-react";

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  let pageTitle = "Agricultural Commodities & Product Catalog";
  let pageDesc = "Explore our extensive bulk trading catalog encompassing premium food grains, pulses, oilseeds, farm-fresh Nashik onions, and whole spices.";

  if (categoryParam === "grains") {
    pageTitle = "Grains & Cereals Division (Wheat, Rice, Maize)";
    pageDesc = "Premium Sharbati & Lokwan wheat, basmati & non-basmati rice varieties, yellow feed maize, and millets.";
  } else if (categoryParam === "pulses") {
    pageTitle = "Pulses & Oilseeds Division (Soybean, Chana, Toor)";
    pageDesc = "High-protein soybeans, bold Desi and Kabuli chickpeas, unpolished Toor Dal, and mustard seeds.";
  } else if (categoryParam === "produce") {
    pageTitle = "Farm-Fresh Produce & Nashik Onion Division";
    pageDesc = "Direct farm-procured Maharashtra red onions, summer Garva onions, garlic bulbs, and select storage vegetables.";
  } else if (categoryParam === "spices") {
    pageTitle = "Spices & Commercial Crops Division";
    pageDesc = "High-curcumin Rajapuri & Salem turmeric fingers, Teja & Guntur dried red chillies, and coriander seeds.";
  }

  return (
    <UnderDevelopment
      title={pageTitle}
      subtitle="Certified Agricultural Grade Commodities"
      category="Commodities & Products"
      progress={85}
      estimatedCompletion="October 2026"
      description={pageDesc}
      highlights={[
        {
          icon: Wheat,
          title: "Specification Sheets",
          desc: "Full moisture, purity, foreign matter, and broken grain tolerance metrics available for every lot.",
        },
        {
          icon: Scale,
          title: "Multi-Ton Packaging Options",
          desc: "25kg, 50kg PP bags, customized jute bags, and bulk jumbo bags tailored for export & institutional clients.",
        },
        {
          icon: Layers,
          title: "Batch Lab Reports",
          desc: "Pre-shipment inspection certificates from accredited testing laboratories included with each consignment.",
        },
        {
          icon: Sparkles,
          title: "Customized Sorting & Grading",
          desc: "Sortex cleaned, machine cleaned, and uncleaned raw commercial grades available based on buyer specs.",
        },
      ]}
    />
  );
}
