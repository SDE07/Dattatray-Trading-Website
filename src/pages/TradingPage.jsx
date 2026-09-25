import React from "react";
import { useSearchParams } from "react-router-dom";
import UnderDevelopment from "../common/UnderDevelopment";
import { Building, Truck, ShieldCheck, Handshake } from "lucide-react";

export default function TradingPage() {
  const [searchParams] = useSearchParams();
  const segmentParam = searchParams.get("segment");

  let pageTitle = "B2B Trading & Procurement Divisions";
  let pageDesc = "Our trading infrastructure bridges farmers, APMC market yards, domestic manufacturing mills, and international commodity buyers.";

  if (segmentParam === "mandi") {
    pageTitle = "APMC Mandi Wholesale Trading Division";
    pageDesc = "Licensed procurement operations across premier agricultural mandis in Maharashtra, enabling direct auction bidding and aggregate volume purchasing.";
  } else if (segmentParam === "institutional") {
    pageTitle = "Domestic Institutional & Mill Supply Division";
    pageDesc = "Contracted long-term volume supply agreements with flour mills, animal feed manufacturers, oil crushing plants, and FMCG brands.";
  } else if (segmentParam === "export") {
    pageTitle = "Commodity Export & International Shipping";
    pageDesc = "APEDA-certified export handling, container stuffing, phytosanitary clearance, and port delivery to JNPT and Mumbai ports.";
  } else if (segmentParam === "contract") {
    pageTitle = "Contract Farming & Pre-Harvest Sourcing";
    pageDesc = "Collaborative farming agreements providing quality non-GMO seeds, agronomic advice, and guaranteed buyback terms.";
  }

  return (
    <UnderDevelopment
      title={pageTitle}
      subtitle="B2B Wholesale & Commercial Supply"
      category="Trading Divisions"
      progress={82}
      estimatedCompletion="November 2026"
      description={pageDesc}
      highlights={[
        {
          icon: Building,
          title: "Licensed Mandi Operations",
          desc: "APMC licensed commission operations guaranteeing legally compliant trade and documented settlements.",
        },
        {
          icon: Handshake,
          title: "Hedging & Price Risk Terms",
          desc: "Flexible forward contracts and spot purchase models tailored to seasonal price variations.",
        },
        {
          icon: Truck,
          title: "Full-Truckload (FTL) Dispatches",
          desc: "Daily FTL dispatches with GPS tracking, transit insurance, and tamper-evident container seals.",
        },
        {
          icon: ShieldCheck,
          title: "Commercial Credit & Escrow",
          desc: "Transparent financial clearing and structured trade terms for accredited institutional corporate partners.",
        },
      ]}
    />
  );
}
