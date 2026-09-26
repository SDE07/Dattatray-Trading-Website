import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Star,
  X,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ThermometerSnowflake,
  PackageCheck,
  Sparkles,
  Flame,
  Layers,
  Utensils,
  Leaf,
  Box,
  Send,
  PhoneCall,
  MessageCircle,
  Clock,
  CheckCircle2,
  Info
} from "lucide-react";

import { ProductCard, CryoOrbitAnimation } from "../components/common";
import { useTheme } from "../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

// Product packaging image assets
import packChickenNuggets from "../assets/pack_chicken_nuggets.jpg";
import packChickenKebab from "../assets/pack_chicken_kebab.jpg";
import packSweetCorn from "../assets/pack_sweet_corn.jpg";
import packMalabarParatha from "../assets/pack_malabar_paratha.jpg";
import packMuttonKeema from "../assets/pack_mutton_keema.jpg";
import packGreenPeas from "../assets/pack_green_peas.jpg";
import packMomosFries from "../assets/pack_momos_fries.jpg";
import packSamosaSpringrolls from "../assets/pack_samosa_springrolls.jpg";
import packMangoPulp from "../assets/pack_mango_pulp.jpg";
import pureVegPlatter from "../assets/pure_veg_snacks.jpg";

// Category definitions matching user specification:
// All | Frozen Vegetables | Frozen Snacks | Potato Products | Dairy & Cheese
const CATEGORIES = [
  {
    id: "all",
    name: "All Products",
    icon: Sparkles,
    badge: "Complete Range",
  },
  {
    id: "frozen-vegetables",
    name: "Frozen Vegetables",
    icon: Leaf,
    badge: "Farm IQF Fresh",
  },
  {
    id: "frozen-snacks",
    name: "Frozen Snacks",
    icon: Flame,
    badge: "Ready-to-Eat / Cook",
  },
  {
    id: "potato-products",
    name: "Potato Products",
    icon: Box,
    badge: "Fries & Tikkis",
  },
  {
    id: "dairy-cheese",
    name: "Dairy & Cheese",
    icon: ShieldCheck,
    badge: "Paneer & Cheese",
  },
];

// Product master catalogue for Dattatray Trading Company (B2B Export, HoReCa, Wholesale & Retail)
const PRODUCTS_DATA = [
  // ── 01. FROZEN GREEN PEAS ──
  {
    id: "prod-green-peas",
    name: "01. Frozen Green Peas (IQF Grade A)",
    category: "frozen-vegetables",
    isVeg: true,
    image: packGreenPeas,
    pack: "500g / 1kg / 5kg / 10kg Carton",
    rating: 4.9,
    reviews: "24.5k",
    tag: "Farm IQF Sweet",
    description: "Quality frozen green peas suitable for restaurants, hotels, caterers, food-service businesses, retailers and household use. Farm-procured within hours of harvest and flash-frozen at -18°C.",
    specs: {
      temp: "-18°C Cryo-Lock",
      shelfLife: "24 Months",
      cartonQty: "10 x 1kg Bags (10kg Master Carton)",
      cert: "APEDA, FSSAI & ISO Certified",
      applications: "Indian curries, Pulao and biryani, Mixed vegetables, Soups, Snacks, Catering & institutional kitchens",
    },
  },

  // ── 02. FROZEN PANEER ──
  {
    id: "prod-frozen-paneer",
    name: "02. Frozen Malai Paneer Blocks & Cubes",
    category: "dairy-cheese",
    isVeg: true,
    image: pureVegPlatter,
    pack: "200g / 500g / 1kg / 5kg Blocks",
    rating: 4.9,
    reviews: "18.2k",
    tag: "100% Malai Dairy",
    description: "Quality paneer suitable for restaurants, hotels, caterers, cloud kitchens, food-service businesses and retail customers. High protein, soft spongy texture with zero moisture bleeding.",
    specs: {
      temp: "-18°C Cryo-Lock",
      shelfLife: "12 Months",
      cartonQty: "10 x 1kg Blocks (10kg Master Carton)",
      cert: "FSSAI & Dairy Export Certified",
      applications: "Paneer Tikka, Paneer Butter Masala, Kadai Paneer, Palak Paneer, Paneer Curries, Snacks and starters",
    },
  },

  // ── 03. FROZEN FRENCH FRIES ──
  {
    id: "prod-french-fries",
    name: "03. Frozen French Fries (6mm / 9mm / 11mm)",
    category: "potato-products",
    isVeg: true,
    image: packMomosFries,
    pack: "1kg / 2.5kg / 10kg Carton",
    rating: 4.8,
    reviews: "32.1k",
    tag: "Extra Crispy Cut",
    description: "Frozen French fries suitable for restaurants, cafés, QSRs, hotels, cloud kitchens, caterers and retail customers. Made from select high-solid potatoes for golden crispness and heat retention.",
    specs: {
      temp: "-18°C Cryo-Lock",
      shelfLife: "24 Months",
      cartonQty: "4 x 2.5kg Bags (10kg Master Carton)",
      cutType: "6mm Shoestring / 9mm Regular / 11mm Crinkle",
      cert: "Export Quality Approved",
      applications: "French fries, Loaded fries, Burgers, Fast food, Snacks, QSR menu",
    },
  },

  // ── 04. FROZEN NUGGETS ──
  {
    id: "prod-frozen-nuggets",
    name: "04. Frozen Crispy Nuggets (Veg & Poultry Options)",
    category: "frozen-snacks",
    isVeg: true,
    image: packChickenNuggets,
    pack: "450g / 1kg / 5kg Bulk Pack",
    rating: 4.7,
    reviews: "14.6k",
    tag: "Crispy Golden Crumb",
    description: "Convenient frozen nuggets suitable for restaurants, cafés, QSRs, caterers, cloud kitchens and retail. Uniform portion size with crunchy golden breadcrumb coating.",
    specs: {
      temp: "-18°C Cryo-Lock",
      shelfLife: "12 Months",
      cartonQty: "20 x 500g Packs (10kg Master Carton)",
      cert: "FSSAI & APEDA Compliant",
      applications: "Starters, Snacks, Kids' menus, Fast food, Party snacks, Catering",
    },
  },

  // ── 05. FROZEN TIKKI ──
  {
    id: "prod-frozen-tikki",
    name: "05. Frozen Spiced Aloo Tikki & Herb Patties",
    category: "potato-products",
    isVeg: true,
    image: pureVegPlatter,
    pack: "1kg / 2.5kg / 10kg Master Carton",
    rating: 4.8,
    reviews: "19.4k",
    tag: "Authentic Chaat & Burger",
    description: "Frozen tikki products suitable for quick-service restaurants, cafés, caterers, hotels, cloud kitchens and retail customers. Spiced with roasted cumin, green chillies, and fresh herbs.",
    specs: {
      temp: "-18°C Cryo-Lock",
      shelfLife: "18 Months",
      cartonQty: "10 x 1kg Bags (10kg Master Carton)",
      cert: "100% Vegetarian Certified",
      applications: "Aloo Tikki, Burger preparation, Chaat, Snacks, Starters, Catering",
    },
  },

  // ── 06. FROZEN MOMOS ──
  {
    id: "prod-frozen-momos",
    name: "06. Frozen Himalayan Momos (Veg & Paneer)",
    category: "frozen-snacks",
    isVeg: true,
    image: packMomosFries,
    pack: "10 pcs / 20 pcs / 1kg (40-50 pcs)",
    rating: 4.9,
    reviews: "22.8k",
    tag: "Thin Translucent Dough",
    description: "Frozen momos designed for convenient preparation in restaurants, cafés, food outlets, cloud kitchens, caterers and retail. Available in Veg, Paneer, and Cheese corn varieties.",
    specs: {
      temp: "-18°C Cryo-Lock",
      shelfLife: "12 Months",
      cartonQty: "24 Packs / Case (8.4kg Net)",
      cert: "FSSAI Verified",
      applications: "Steamed momos, Fried momos, Kurkure momos, Café menu, QSR, Cloud kitchen, Catering",
    },
  },

  // ── 07. FROZEN BURGER PATTY ──
  {
    id: "prod-burger-patty",
    name: "07. Frozen Veg & Potato Burger Patties",
    category: "potato-products",
    isVeg: true,
    image: pureVegPlatter,
    pack: "1kg (10-12 Patties) / 10kg Carton",
    rating: 4.7,
    reviews: "11.5k",
    tag: "QSR Commercial Yield",
    description: "Frozen burger patties suitable for QSRs, restaurants, cafés, hotels, caterers, cloud kitchens and institutional food-service businesses. Formulated for grill or deep fry without oil breakdown.",
    specs: {
      temp: "-18°C Cryo-Lock",
      shelfLife: "18 Months",
      cartonQty: "10 x 1kg Bags (100 Patties / Case)",
      pattyWeight: "75g / 85g / 100g Uniform",
      cert: "Export Commercial Grade",
      applications: "Veg burgers, Cheese burgers, Café menus, QSR, Catering, Food-service operations",
    },
  },

  // ── 08. FROZEN MIXED VEGETABLES ──
  {
    id: "prod-mixed-veg",
    name: "08. Frozen Diced Mixed Vegetables (4-Way Mix)",
    category: "frozen-vegetables",
    isVeg: true,
    image: packGreenPeas,
    pack: "1kg / 5kg / 10kg Master Carton",
    rating: 4.8,
    reviews: "16.7k",
    tag: "Balanced IQF Ratio",
    description: "A convenient combination of selected vegetables, suitable for restaurants, hotels, caterers, food-service businesses and retail. Uniform diced carrots, sweet corn, green peas, and french beans.",
    specs: {
      temp: "-18°C Cryo-Lock",
      shelfLife: "24 Months",
      cartonQty: "10 x 1kg Pouches (10kg Master Carton)",
      composition: "Green Peas, Diced Carrots, Sweet Corn, French Beans, Cauliflower",
      cert: "APEDA & FSSAI Compliant",
      applications: "Mixed vegetable curry, Pulao, Biryani, Soups, Chinese dishes, Catering, Institutional kitchens",
    },
  },

  // ── 09. FROZEN SWEET CORN ──
  {
    id: "prod-sweet-corn",
    name: "09. Frozen American Sweet Corn Kernels",
    category: "frozen-vegetables",
    isVeg: true,
    image: packSweetCorn,
    pack: "500g / 1kg / 5kg / 10kg Carton",
    rating: 4.9,
    reviews: "28.3k",
    tag: "High Brix Sweetness",
    description: "Frozen sweet corn suitable for food-service businesses, restaurants, hotels, cafés, caterers, retailers and household consumption. Juicy, tender yellow kernels flash-frozen at peak harvest.",
    specs: {
      temp: "-18°C Cryo-Lock",
      shelfLife: "24 Months",
      cartonQty: "10 x 1kg Bags (10kg Master Carton)",
      cert: "Cryo-IQF Certified Grade-A",
      applications: "Sweet corn soup, Pizza, Pasta, Salads, Sandwiches, Chinese dishes, Snacks, Ready meals",
    },
  },

  // ── 10. CHEESE (PROCESSED & MOZZARELLA) ──
  {
    id: "prod-cheese",
    name: "10. Commercial Cheese (Mozzarella, Slices, Cubes & Blocks)",
    category: "dairy-cheese",
    isVeg: true,
    image: pureVegPlatter,
    pack: "200g Slices / 1kg Shredded / 2kg Block / 5kg Block",
    rating: 4.9,
    reviews: "21.6k",
    tag: "Superior Melt & Stretch",
    description: "Quality cheese products suitable for restaurants, hotels, cafés, QSRs, caterers, bakeries, food manufacturers and retail customers. High fat, exceptional stretch, and golden browning.",
    specs: {
      temp: "-18°C Frozen / 4°C Chilled",
      shelfLife: "12 Months",
      cartonQty: "10 x 1kg Diced / 4 x 2.5kg Blocks (10kg Case)",
      varieties: "Processed Cheese, Mozzarella Cheese, Cheese Slices, Cheese Cubes, Grated Cheese, Cheese Blocks",
      cert: "ISO & FSSAI Certified",
      applications: "Pizza, Burgers, Sandwiches, Pasta, Snacks, Starters, Bakery products",
    },
  },

  // ── ADDITIONAL EXTENDED B2B CATALOGUE PRODUCTS ──
  {
    id: "prod-samosa-springrolls",
    name: "11. Frozen Punjabi Samosa & Spring Rolls",
    category: "frozen-snacks",
    isVeg: true,
    image: packSamosaSpringrolls,
    pack: "12 pcs / 24 pcs / 1kg Bulk Pack",
    rating: 4.8,
    reviews: "15.4k",
    tag: "Crispy Party Pack",
    description: "Authentic triangular Punjabi samosas stuffed with spiced potatoes and peas, alongside crispy vegetable spring rolls. Perfect for banquet catering and tea-time snacks.",
    specs: {
      temp: "-18°C Cryo-Lock",
      shelfLife: "18 Months",
      cartonQty: "20 Packs / Case (10kg Net)",
      cert: "100% Vegetarian Certified",
      applications: "Banquets, Buffets, Caterers, Cloud Kitchens, Cafés, Retailers",
    },
  },
  {
    id: "prod-okra-bhindi",
    name: "12. Frozen Okra / Bhindi (Cut & Whole IQF)",
    category: "frozen-vegetables",
    isVeg: true,
    image: packGreenPeas,
    pack: "1kg / 5kg / 10kg Master Carton",
    rating: 4.7,
    reviews: "9.2k",
    tag: "Slime-Free IQF",
    description: "Tender farm-fresh okra / lady finger sorted, washed, cut, and individually quick frozen. Retains natural green hue and zero slime for curries and bhindi masala.",
    specs: {
      temp: "-18°C Cryo-Lock",
      shelfLife: "24 Months",
      cartonQty: "10 x 1kg Bags (10kg Master Carton)",
      cert: "APEDA Export Registered",
      applications: "Bhindi Masala, Sambhar, Stir Fries, Indian Restaurant Curries",
    },
  },
  {
    id: "prod-spinach-palak",
    name: "13. Frozen Spinach / Palak & Methi Leaves / Puree",
    category: "frozen-vegetables",
    isVeg: true,
    image: packGreenPeas,
    pack: "1kg / 5kg Blocks",
    rating: 4.8,
    reviews: "11.8k",
    tag: "Washed & Blanched",
    description: "Cleaned and blanched fresh spinach and fenugreek leaves flash frozen in convenient blocks or IQF chopped format for high-speed commercial kitchen gravy prep.",
    specs: {
      temp: "-18°C Cryo-Lock",
      shelfLife: "24 Months",
      cartonQty: "10 x 1kg Blocks (10kg Case)",
      cert: "FSSAI Compliant",
      applications: "Palak Paneer, Aloo Palak, Methi Matar Malai, Soups, Dal",
    },
  },
  {
    id: "prod-drumstick-guvar",
    name: "14. Frozen Drumstick Cut & Guvar Beans",
    category: "frozen-vegetables",
    isVeg: true,
    image: packGreenPeas,
    pack: "1kg / 5kg / 10kg Carton",
    rating: 4.6,
    reviews: "6.4k",
    tag: "South Indian Special",
    description: "Cleaned, peeled, and precision-cut drumsticks and cluster beans (guvar) preserved at peak nutrition. Essential for commercial sambhar and traditional regional dishes.",
    specs: {
      temp: "-18°C Cryo-Lock",
      shelfLife: "24 Months",
      cartonQty: "10 x 1kg Bags (10kg Carton)",
      cert: "APEDA Approved",
      applications: "Sambhar, Avial, South Indian Catering, Exports to UAE & UK",
    },
  },
  {
    id: "prod-potato-wedges",
    name: "15. Frozen Potato Wedges & Hash Browns",
    category: "potato-products",
    isVeg: true,
    image: packMomosFries,
    pack: "1kg / 2.5kg / 10kg Master Carton",
    rating: 4.8,
    reviews: "14.2k",
    tag: "Seasoned Skin-On",
    description: "Crispy seasoned skin-on potato wedges and golden breakfast hash browns. Excellent crunch, low oil pick-up, and great plate coverage for brunch menus.",
    specs: {
      temp: "-18°C Cryo-Lock",
      shelfLife: "24 Months",
      cartonQty: "4 x 2.5kg Bags (10kg Master Carton)",
      cert: "Export Grade",
      applications: "Breakfast buffets, Pub menus, Loaded sides, QSR",
    },
  },
  {
    id: "prod-malabar-paratha",
    name: "16. Frozen Layered Malabar & Laccha Paratha",
    category: "frozen-snacks",
    isVeg: true,
    image: packMalabarParatha,
    pack: "5 Pcs (400g) / 20 Pcs Master Pack",
    rating: 4.8,
    reviews: "17.9k",
    tag: "Multi-Layered Flaky",
    description: "Traditional handmade flaky flatbreads. Puffs up crispy and golden on commercial tawa in 2 minutes without requiring extra ghee or oil.",
    specs: {
      temp: "-18°C Cryo-Lock",
      shelfLife: "18 Months",
      cartonQty: "24 Packs / Case (9.6kg Net)",
      cert: "100% Pure Vegetarian",
      applications: "Curry accompaniment, Rolls & wraps, Banquet dining, HoReCa",
    },
  },
  {
    id: "prod-mango-pulp",
    name: "17. Ratnagiri Alphonso Mango Pulp (Aamras)",
    category: "frozen-vegetables",
    isVeg: true,
    image: packMangoPulp,
    pack: "1kg Pouch / 3.1kg Foodservice Can",
    rating: 4.9,
    reviews: "20.1k",
    tag: "100% GI Ratnagiri",
    description: "Authentic GI-certified Ratnagiri Alphonso mango puree frozen without thermal degradation. Preserves rich aroma, royal orange-gold color, and thick velvety texture.",
    specs: {
      temp: "-18°C Cryo-Lock",
      shelfLife: "24 Months",
      cartonQty: "12 x 1kg Pouches (12kg Master Carton)",
      cert: "APEDA Export Registered",
      applications: "Aamras, Mango Shakes, Ice creams, Bakeries, Desserts, Exports",
    },
  },
  {
    id: "prod-chicken-kebabs",
    name: "18. Flame Grilled Chicken Seekh Kebabs & Bites",
    category: "frozen-snacks",
    isVeg: false,
    image: packChickenKebab,
    pack: "500g / 1kg / 10kg Master Carton",
    rating: 4.7,
    reviews: "8.9k",
    tag: "Charcoal Infused",
    description: "Juicy minced chicken skewers seasoned with royal spices, fresh mint, and coriander. Pre-cooked and flash-frozen for quick reheating on grills and skewers.",
    specs: {
      temp: "-18°C Cryo-Lock",
      shelfLife: "12 Months",
      cartonQty: "20 x 500g Packs (10kg Carton)",
      cert: "Halal & APEDA Compliant",
      applications: "Tandoori platters, Rolls, Starters, Buffet catering, QSR",
    },
  },
];

export default function ProductsPage() {
  const { isDark } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Support both "cat" and "category" URL params with graceful fallbacks
  const urlCat = searchParams.get("cat") || searchParams.get("category");
  const normalizedInitial =
    urlCat === "fruit-pulps" || urlCat === "frozen-veggies"
      ? "frozen-vegetables"
      : urlCat === "rte-snacks" || urlCat === "veg-snacks" || urlCat === "non-veg-snacks"
      ? "frozen-snacks"
      : CATEGORIES.some((c) => c.id === urlCat)
      ? urlCat
      : "all";

  const [activeCategory, setActiveCategory] = useState(normalizedInitial);
  const [searchQuery, setSearchQuery] = useState("");
  const [dietFilter, setDietFilter] = useState("all"); // "all", "veg", "non-veg"
  const [selectedProduct, setSelectedProduct] = useState(null); // For Enquiry Modal
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Horizontal Scroll Bounds & Button State
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // GSAP Animation & Smooth Scroll Refs
  const heroHeadingRef = useRef(null);
  const gridContainerRef = useRef(null);
  const cardsScrollRef = useRef(null);
  const modalBackdropRef = useRef(null);
  const modalDialogRef = useRef(null);
  const modalImageRef = useRef(null);

  // Seamless Category Selection (resets horizontal catalog slider to start)
  const handleCategorySelect = (e, categoryId) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveCategory(categoryId);
    setSearchParams({ cat: categoryId }, { replace: true });
    if (cardsScrollRef.current) {
      cardsScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  // Filter products by category, search query, and diet
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS_DATA];

    // Filter by category: "all" shows all products; otherwise matches exact category id
    if (activeCategory && activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tag?.toLowerCase().includes(q) ||
          p.pack.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.specs?.applications?.toLowerCase().includes(q) ||
          p.specs?.cert?.toLowerCase().includes(q)
      );
    }

    // Filter by veg / non-veg
    if (dietFilter === "veg") {
      list = list.filter((p) => p.isVeg);
    } else if (dietFilter === "non-veg") {
      list = list.filter((p) => !p.isVeg);
    }

    return list;
  }, [activeCategory, searchQuery, dietFilter]);

  // Check horizontal scroll bounds for Next / Prev button states
  const checkScrollBounds = useCallback(() => {
    const el = cardsScrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  // Update scroll bounds on load, product changes, and window resize
  useEffect(() => {
    const el = cardsScrollRef.current;
    if (!el) return;

    checkScrollBounds();
    el.addEventListener("scroll", checkScrollBounds, { passive: true });
    window.addEventListener("resize", checkScrollBounds);

    return () => {
      el.removeEventListener("scroll", checkScrollBounds);
      window.removeEventListener("resize", checkScrollBounds);
    };
  }, [filteredProducts, checkScrollBounds]);

  // Senior Developer Smooth Horizontal Next & Prev Scroll Handler
  const handleScroll = (direction) => {
    const el = cardsScrollRef.current;
    if (!el) return;
    const scrollAmount = 380; // Smooth card step width
    el.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  // Continuous Mouse Wheel Horizontal Translation
  useEffect(() => {
    const el = cardsScrollRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const { scrollLeft, scrollWidth, clientWidth } = el;
        const atEnd = scrollLeft + clientWidth >= scrollWidth - 5;
        const atStart = scrollLeft <= 5;

        // If not at hard horizontal boundaries, scroll horizontally smoothly
        if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atStart)) {
          e.preventDefault();
          el.scrollLeft += e.deltaY * 1.25;
        }
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [filteredProducts]);

  // GSAP Bounce-In Effect for Hero Heading
  useEffect(() => {
    if (!heroHeadingRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".heading-bounce", {
        y: -100,
        opacity: 0,
        duration: 1.1,
        ease: "bounce.out",
        stagger: 0.15,
      });
    }, heroHeadingRef);

    return () => ctx.revert();
  }, []);

  // Product Card GSAP Horizontal Entrance
  useEffect(() => {
    if (!gridContainerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".grid-item",
        { scale: 0.85, opacity: 0, x: 40 },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform,opacity",
        }
      );
    }, gridContainerRef);

    return () => ctx.revert();
  }, [activeCategory, dietFilter, searchQuery]);

  // GSAP Modal Animation
  useEffect(() => {
    if (selectedProduct && modalDialogRef.current) {
      const ctx = gsap.context(() => {
        if (modalBackdropRef.current) {
          gsap.fromTo(
            modalBackdropRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.25, ease: "power2.out" }
          );
        }

        gsap.fromTo(
          modalDialogRef.current,
          { scale: 0.85, y: 35, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: 0.45, ease: "back.out(1.5)" }
        );

        if (modalImageRef.current) {
          gsap.fromTo(
            modalImageRef.current,
            { scale: 0.75, opacity: 0, rotate: -4 },
            { scale: 1, opacity: 1, rotate: 0, duration: 0.55, delay: 0.08, ease: "back.out(1.8)" }
          );
        }

        gsap.fromTo(
          ".modal-anim-item",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, stagger: 0.06, delay: 0.12, ease: "power3.out" }
        );
      });

      return () => ctx.revert();
    }
  }, [selectedProduct, enquirySubmitted]);

  // Active Category metadata
  const currentCatObj = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];

  return (
    <div className="bg-[#F8FAFC] dark:bg-[#07111E] min-h-screen text-[#0B2546] dark:text-[#F1F5F9] pb-16 transition-colors duration-300 overflow-x-hidden">
      
      {/* ═════════════════════════════════════════════════════════════════
          GRAND HERO BANNER WITH CONDITIONAL THEME ADAPTATION
          - Light Mode: Rich Botanical Green Palette (Emerald / Jade / Mint)
          - Dark Theme: Blueish Palette (Deep Midnight Navy / Cyan / Sky Blue)
      ═════════════════════════════════════════════════════════════════ */}
      <section
        className={`relative w-full pt-28 sm:pt-32 pb-20 sm:pb-28 mb-8 overflow-hidden text-white transition-all duration-500 ${
          isDark
            ? "bg-gradient-to-b from-[#06101E] via-[#09172A] to-[#0B1F38]"
            : "bg-gradient-to-b from-[#021A13] via-[#042A1E] to-[#01140E]"
        }`}
      >
        {/* Ambient Glow Orbs */}
        <div
          className={`absolute top-10 left-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-all duration-500 ${
            isDark ? "bg-[#1E56C8]/25" : "bg-emerald-600/20"
          }`}
        />
        <div
          className={`absolute top-20 right-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-all duration-500 ${
            isDark ? "bg-[#38BDF8]/20" : "bg-emerald-400/15"
          }`}
        />
        <div
          className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-64 rounded-full blur-[160px] pointer-events-none transition-all duration-500 ${
            isDark ? "bg-[#0284C7]/15" : "bg-teal-600/15"
          }`}
        />

        <div className="relative w-full max-w-[94%] xl:max-w-[1440px] 2xl:max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
            
            {/* LEFT SIDE: Heading & Badges */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-4" ref={heroHeadingRef}>
              
              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full backdrop-blur-md text-[10px] sm:text-xs font-black uppercase tracking-[0.12em] sm:tracking-[0.2em] shadow-sm transition-all duration-500 ${
                  isDark
                    ? "bg-sky-950/70 border border-sky-500/35 text-[#38BDF8]"
                    : "bg-emerald-950/60 border border-emerald-500/30 text-emerald-300"
                }`}
              >
                <Sparkles className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${isDark ? "text-[#38BDF8]" : "text-emerald-400"}`} />
                <span className="leading-tight">CERTIFIED CRYO-CHAIN • EXPORT &amp; WHOLESALE GRADE</span>
              </div>

              {/* Main Heading with GSAP Bounce */}
              <div className="py-1 space-y-2">
                <h1 className="font-sans tracking-tight leading-[1.08]">
                  <span
                    className={`heading-bounce block text-2xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-transparent bg-clip-text select-none transition-all duration-500 ${
                      isDark
                        ? "bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#93C5FD] drop-shadow-[0_4px_30px_rgba(56,189,248,0.35)]"
                        : "bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200 drop-shadow-[0_4px_30px_rgba(16,185,129,0.35)]"
                    }`}
                  >
                    EXPLORE DATTATRAY
                  </span>
                  <span className="heading-bounce block text-xl sm:text-2xl md:text-4xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)] select-none mt-1">
                    FROZEN PRODUCT CATALOGUE
                  </span>
                </h1>

                <div className="heading-bounce flex items-center gap-2 pt-1">
                  <div
                    className={`h-[2px] w-8 rounded-full transition-all duration-500 ${
                      isDark ? "bg-[#38BDF8]" : "bg-emerald-400"
                    }`}
                  />
                  <span
                    className={`text-[9px] sm:text-xs md:text-sm font-black uppercase tracking-[0.1em] sm:tracking-[0.25em] transition-all duration-500 ${
                      isDark ? "text-[#38BDF8]" : "text-emerald-400"
                    }`}
                  >
                    FROZEN VEGETABLES • RTE SNACKS • DAIRY &amp; CHEESE • POTATO PRODUCTS
                  </span>
                </div>
              </div>

              <p
                className={`text-sm sm:text-base leading-relaxed max-w-2xl transition-colors duration-500 ${
                  isDark ? "text-slate-300" : "text-emerald-100/80"
                }`}
              >
                Dattatray Trading Company supplies quality frozen vegetables, ready-to-eat snacks, potato products, and dairy cheese to hotels, restaurants, cafés, caterers, cloud kitchens, distributors, retailers, and international merchant export buyers.
              </p>

              {/* Trust Badges Bar */}
              <div className="heading-bounce pt-1 flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-bold text-slate-300">
                <div className="flex items-center gap-1 sm:gap-1.5 bg-white/5 border border-white/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>APEDA &amp; FSSAI Compliant</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 bg-white/5 border border-white/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  <ThermometerSnowflake className="w-3.5 h-3.5 text-[#8CC9D9]" />
                  <span>-18°C GPS Monitored Cold Chain</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 bg-white/5 border border-white/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  <Box className="w-3.5 h-3.5 text-amber-300" />
                  <span>Custom Master Cartons &amp; Reefer FCL</span>
                </div>
              </div>

            </div>

            {/* Right Side: 3 Concentric Cryo Orbits */}
            <div className="lg:col-span-5 xl:col-span-5 shrink-0 flex items-center justify-center self-center py-4">
              <CryoOrbitAnimation />
            </div>

          </div>
        </div>

        {/* Smooth Slanted Bottom Wave Transition */}
        <div className="absolute -bottom-[2px] left-0 right-0 overflow-hidden leading-none pointer-events-none z-10">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-10 sm:h-14 lg:h-16 fill-[#F8FAFC] dark:fill-[#07111E] transition-colors duration-300 translate-y-[1px]"
          >
            <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,125 L0,125 Z"></path>
          </svg>
        </div>
      </section>

      <div className="max-w-[96%] 2xl:max-w-[1660px] mx-auto px-4 sm:px-6">

        {/* ═════════════════════════════════════════════════════════════════
            MATCHED-HEIGHT CATALOG WORKSTATION (Left Sidebar & Right Fluid Horizontal Showcase)
        ═════════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 xl:gap-8 items-stretch lg:h-[750px] xl:h-[780px] 2xl:h-[820px]">
          
          {/* ═════════════════════════════════════════════════════════════════
              LEFT SIDEBAR: CATEGORY NAVIGATION (All | Frozen Vegetables | Frozen Snacks | Potato Products | Dairy & Cheese)
          ═════════════════════════════════════════════════════════════════ */}
          <aside className="w-full lg:w-72 xl:w-80 shrink-0 lg:h-full hidden lg:flex flex-col justify-between">
            
            {/* Desktop Vertical Category List Panel */}
            <div className="bg-white dark:bg-[#0B1B2F] rounded-3xl border border-slate-200/90 dark:border-white/10 p-3 sm:p-4 shadow-sm h-full flex flex-col justify-between overflow-hidden">
              
              <div className="flex-1 min-h-0 flex flex-col">
                <div className="shrink-0 px-3 py-2 text-[11px] font-black uppercase tracking-wider text-[#3B1F3A] dark:text-[#8CC9D9] flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-2.5 mb-2">
                  <span>Product Categories</span>
                  <span className="text-[10px] font-bold text-slate-400">
                    {CATEGORIES.length} Categories
                  </span>
                </div>

                <div data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto pr-1 scrollbar-thin space-y-1.5">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = activeCategory === cat.id;
                    const itemCount =
                      cat.id === "all"
                        ? PRODUCTS_DATA.length
                        : PRODUCTS_DATA.filter((p) => p.category === cat.id).length;

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={(e) => handleCategorySelect(e, cat.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-left transition-all duration-200 relative group cursor-pointer ${
                          isActive
                            ? "bg-gradient-to-r from-[#3B1F3A] to-[#4F204C] text-white font-black shadow-md shadow-[#3B1F3A]/25"
                            : "hover:bg-slate-100/80 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 font-bold"
                        }`}
                      >
                        {/* Left Active Glow Indicator */}
                        {isActive && (
                          <motion.span
                            layoutId="activeCategoryIndicator"
                            className="absolute left-1 top-2.5 bottom-2.5 w-1.5 rounded-full bg-[#8CC9D9]"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}

                        <div className="flex items-center gap-3 pl-1">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                              isActive
                                ? "bg-white/20 text-[#8CC9D9]"
                                : "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs sm:text-[13px] leading-tight block">
                              {cat.name}
                            </span>
                            <span
                              className={`text-[9.5px] block font-medium ${
                                isActive ? "text-slate-300" : "text-slate-400"
                              }`}
                            >
                              {cat.badge}
                            </span>
                          </div>
                        </div>

                        {/* Item Count Badge */}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-slate-100 dark:bg-white/5 text-slate-400"
                          }`}
                        >
                          {itemCount}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* B2B Export Direct Support Card in Fresh Emerald Green Palette */}
              <div className="shrink-0 mt-3 p-3.5 rounded-2xl bg-gradient-to-br from-[#064E3B] via-[#043E33] to-[#02231C] text-white border border-emerald-500/35 space-y-2 shadow-lg shadow-emerald-950/20">
                <div className="flex items-center gap-1.5 text-[11px] font-black text-emerald-300 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>HoReCa &amp; Export Desk</span>
                </div>
                <p className="text-[11.5px] leading-snug text-emerald-100/90">
                  Full reefer containers, wholesale supply, or custom packaging inquiries:
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-amber-300 hover:text-white transition-colors pt-0.5"
                >
                  <span>Request Commercial Quote</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </aside>

          {/* Mobile Horizontal Scrolling Category Pill Bar — rendered outside aside so it's visible on mobile */}
          <div data-lenis-prevent className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full mt-0">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={(e) => handleCategorySelect(e, cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold shrink-0 transition-all ${
                    isActive
                      ? "bg-[#3B1F3A] text-white shadow-md scale-102"
                      : "bg-white dark:bg-[#0B1B2F] border border-slate-200/90 dark:border-white/10 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* ═════════════════════════════════════════════════════════════════
              RIGHT MAIN AREA: HORIZONTAL CONTINUOUS SHOWCASE WITH NEXT & PREV BUTTONS
          ═════════════════════════════════════════════════════════════════ */}
          <main className="flex-1 w-full h-[520px] sm:h-[580px] lg:h-full flex flex-col min-h-0 bg-white/40 dark:bg-[#0B1B2F]/40 backdrop-blur-xs rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/10 p-3 sm:p-4 md:p-6 overflow-hidden relative">
            
            {/* Top Toolbar: Category Title, Search Bar, Diet Filters & Next/Prev Controls */}
            <div className="shrink-0 pb-3 sm:pb-4 mb-2 sm:mb-3 border-b border-slate-200/80 dark:border-white/10 flex flex-col gap-3 sm:gap-4">
              
              {/* Category Title & Count */}
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#0B2546] dark:text-white tracking-tight flex items-center gap-2">
                  <span>{currentCatObj.name}</span>
                  <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 rounded-full bg-[#3B1F3A]/10 dark:bg-white/10 text-[#3B1F3A] dark:text-[#8CC9D9]">
                    {filteredProducts.length} Items
                  </span>
                </h2>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 hidden sm:block">
                  Swipe or use arrows to browse • Click Next/Prev to navigate
                </p>
              </div>

              {/* Integrated Search, Diet Filters & Next/Prev Navigation Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
                
                {/* Search Input */}
                <div className="relative w-full sm:w-48 md:w-56 lg:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search green peas, fries..."
                    className="w-full pl-9 pr-8 py-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-[#0B2546] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B1F3A]/30 transition-all shadow-xs"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Diet Filters */}
                <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200/80 dark:border-white/10 text-xs font-bold">
                  <button
                    onClick={() => setDietFilter("all")}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      dietFilter === "all"
                        ? "bg-[#3B1F3A] text-white shadow-xs font-black"
                        : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setDietFilter("veg")}
                    className={`px-3 py-1 rounded-lg flex items-center gap-1 transition-all ${
                      dietFilter === "veg"
                        ? "bg-emerald-600 text-white shadow-xs font-black"
                        : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-300" />
                    Veg
                  </button>
                  <button
                    onClick={() => setDietFilter("non-veg")}
                    className={`px-3 py-1 rounded-lg flex items-center gap-1 transition-all ${
                      dietFilter === "non-veg"
                        ? "bg-rose-600 text-white shadow-xs font-black"
                        : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-300" />
                    Non-Veg
                  </button>
                </div>

                {/* Next & Previous Arrow Navigation Controls */}
                <div className="flex items-center gap-1.5 pl-1 sm:border-l border-slate-200 dark:border-white/10">
                  <button
                    onClick={() => handleScroll("prev")}
                    disabled={!canScrollLeft}
                    title="Previous Products (Scroll Left)"
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                      canScrollLeft
                        ? "bg-white dark:bg-[#0B1B2F] border-slate-300 dark:border-white/20 text-[#3B1F3A] dark:text-[#8CC9D9] hover:bg-[#3B1F3A] hover:text-white hover:border-[#3B1F3A] shadow-xs active:scale-95"
                        : "bg-slate-100/70 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-300 dark:text-slate-600 cursor-not-allowed opacity-50"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => handleScroll("next")}
                    disabled={!canScrollRight}
                    title="Next Products (Scroll Right)"
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                      canScrollRight
                        ? "bg-white dark:bg-[#0B1B2F] border-slate-300 dark:border-white/20 text-[#3B1F3A] dark:text-[#8CC9D9] hover:bg-[#3B1F3A] hover:text-white hover:border-[#3B1F3A] shadow-xs active:scale-95"
                        : "bg-slate-100/70 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-300 dark:text-slate-600 cursor-not-allowed opacity-50"
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

              </div>

            </div>

            {/* Horizontal Continuous Cards Carousel Area */}
            <div className="relative flex-1 min-h-0 flex flex-col justify-center">
              
              {/* Floating Side Left Button */}
              {canScrollLeft && (
                <button
                  onClick={() => handleScroll("prev")}
                  className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 dark:bg-[#0B1B2F]/95 backdrop-blur-md border border-slate-200 dark:border-white/20 text-[#3B1F3A] dark:text-[#8CC9D9] shadow-2xl hover:scale-110 items-center justify-center transition-all cursor-pointer group"
                  title="Previous Products"
                >
                  <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                </button>
              )}

              {/* Floating Side Right Button */}
              {canScrollRight && (
                <button
                  onClick={() => handleScroll("next")}
                  className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 dark:bg-[#0B1B2F]/95 backdrop-blur-md border border-slate-200 dark:border-white/20 text-[#3B1F3A] dark:text-[#8CC9D9] shadow-2xl hover:scale-110 items-center justify-center transition-all cursor-pointer group"
                  title="Next Products"
                >
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}

              {filteredProducts.length === 0 ? (
                <div className="p-12 text-center bg-white dark:bg-[#0B1B2F] rounded-3xl border border-slate-200 dark:border-white/10 space-y-3 my-auto">
                  <PackageCheck className="w-12 h-12 text-slate-300 mx-auto" />
                  <h3 className="text-base font-black text-slate-700 dark:text-slate-200">
                    No products found in this category
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try adjusting your search criteria or switch category/diet filters to view more products.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setDietFilter("all");
                      setActiveCategory("all");
                    }}
                    className="px-4 py-2 rounded-xl bg-[#3B1F3A] text-white text-xs font-bold hover:bg-[#4F204C] transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                /* Continuous Horizontal Scroll Container */
                <div
                  ref={cardsScrollRef}
                  className="flex-1 overflow-x-auto overflow-y-hidden flex items-stretch gap-3 sm:gap-5 md:gap-6 pb-3 sm:pb-4 pt-1 px-1 scroll-smooth snap-x snap-mandatory scrollbar-none sm:scrollbar-thin scrollbar-thumb-[#8CC9D9]/60 dark:scrollbar-thumb-sky-400/40 hover:scrollbar-thumb-[#8CC9D9] dark:hover:scrollbar-thumb-sky-400 scrollbar-track-transparent rounded-xl sm:rounded-2xl [overscroll-behavior-x:contain] touch-scroll-x"
                >
                  <div ref={gridContainerRef} className="flex items-stretch gap-3 sm:gap-5 md:gap-6 shrink-0 h-full">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="grid-item w-[260px] sm:w-[300px] md:w-[340px] lg:w-[360px] shrink-0 snap-start h-full flex flex-col"
                      >
                        <ProductCard
                          product={product}
                          onEnquiry={setSelectedProduct}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </main>

        </div>

        {/* ═════════════════════════════════════════════════════════════════
            CONTINUOUS REEFER LOGISTICS GUARANTEE (Dedicated Full-Width Banner)
        ═════════════════════════════════════════════════════════════════ */}
        <div className="mt-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-[#1B0F1C] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl border border-emerald-500/20">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-white/15 text-[#8CC9D9] shadow-inner">
              <ThermometerSnowflake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-black">
                Continuous -18°C Reefer Logistics Guarantee
              </h4>
              <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                Temperature-logged dispatch with APEDA, FSSAI, and ISO 22000 certificates for global exports and HoReCa chains.
              </p>
            </div>
          </div>

          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl bg-white text-[#1B0F1C] font-black text-xs sm:text-sm shadow-lg hover:scale-105 transition-all whitespace-nowrap"
          >
            Direct Inquiry Desk
          </Link>
        </div>

      </div>

      {/* ═════════════════════════════════════════════════════════════════
          ENQUIRY SPECIFICATION MODAL (Logo Violet Brand Palette & GSAP Entrance)
      ═════════════════════════════════════════════════════════════════ */}
      {selectedProduct && (
        <div
          ref={modalBackdropRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === modalBackdropRef.current) {
              setSelectedProduct(null);
              setEnquirySubmitted(false);
            }
          }}
        >
          <div
            ref={modalDialogRef}
            className="relative w-full max-w-4xl bg-white dark:bg-[#0B1B2F] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl p-6 sm:p-8 lg:p-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedProduct(null);
                setEnquirySubmitted(false);
              }}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-white flex items-center justify-center transition-colors z-20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {enquirySubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0B2546] dark:text-white">
                  Enquiry Received Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  Our commercial trade team will review your specifications for <strong>{selectedProduct.name}</strong> and contact you with custom FCL / LCL quotation details.
                </p>
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    setEnquirySubmitted(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#3B1F3A] to-[#552052] text-white font-bold text-xs cursor-pointer shadow-lg hover:shadow-xl transition-all"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                {/* Left Side Packaging Image Box */}
                <div className="p-6 sm:p-8 bg-gradient-to-b from-slate-50 via-slate-50/70 to-slate-100/90 dark:from-[#071322] dark:to-[#0A1A2E] rounded-3xl flex items-center justify-center min-h-[300px] sm:min-h-[360px] md:min-h-[400px] border border-slate-100 dark:border-white/5 relative overflow-hidden shadow-inner group">
                  <img
                    ref={modalImageRef}
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full max-h-[320px] sm:max-h-[360px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle Cold-Chain Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-3 py-1 rounded-lg text-xs font-black flex items-center gap-1.5 border border-emerald-400/40 shadow-md">
                    <ThermometerSnowflake className="w-3.5 h-3.5 text-emerald-200" />
                    <span>{selectedProduct.specs.temp || "-18°C Cryo-Lock"}</span>
                  </div>
                </div>

                {/* Right Side Product Specifications & Details */}
                <div className="space-y-4">
                  <div className="modal-anim-item flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-xs border flex items-center justify-center ${
                        selectedProduct.isVeg
                          ? "border-emerald-600 bg-white"
                          : "border-red-700 bg-white"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          selectedProduct.isVeg ? "bg-emerald-600" : "bg-red-700"
                        }`}
                      />
                    </div>
                    <span className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                      {selectedProduct.pack}
                    </span>
                    {selectedProduct.specs.cert && (
                      <span className="text-[10px] font-bold text-[#3B1F3A] dark:text-[#8CC9D9] bg-[#3B1F3A]/10 dark:bg-white/10 px-2 py-0.5 rounded-full border border-[#3B1F3A]/20">
                        {selectedProduct.specs.cert}
                      </span>
                    )}
                  </div>

                  <h2 className="modal-anim-item text-xl sm:text-2xl font-black text-[#0B2546] dark:text-white leading-snug">
                    {selectedProduct.name}
                  </h2>

                  <p className="modal-anim-item text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {selectedProduct.description}
                  </p>

                  {/* Applications & Foodservice details */}
                  {selectedProduct.specs.applications && (
                    <div className="modal-anim-item p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-xs">
                      <span className="font-bold text-[#3B1F3A] dark:text-[#8CC9D9] block uppercase tracking-wider text-[10px] mb-1">
                        Culinary &amp; Foodservice Applications:
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 leading-normal">
                        {selectedProduct.specs.applications}
                      </span>
                    </div>
                  )}

                  {/* Technical Specs Grid */}
                  <div className="modal-anim-item grid grid-cols-3 gap-2.5 pt-2 border-t border-slate-100 dark:border-white/10 text-center">
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">TEMP</span>
                      <span className="text-xs font-black text-[#3B1F3A] dark:text-[#8CC9D9]">
                        {selectedProduct.specs.temp}
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">SHELF LIFE</span>
                      <span className="text-xs font-black text-[#0B2546] dark:text-white">
                        {selectedProduct.specs.shelfLife}
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">CASE PACK</span>
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                        {selectedProduct.specs.cartonQty?.split(" ")[0] || "Standard"}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons in Signature Cyan / Cold-Chain Branding */}
                  <div className="modal-anim-item pt-4 flex flex-col sm:flex-row items-center gap-2.5 border-t border-slate-100 dark:border-white/10">
                    <button
                      onClick={() => setEnquirySubmitted(true)}
                      className="w-full sm:flex-1 py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#8CC9D9] via-[#68ADC0] to-[#559CAA] hover:from-[#78BCD0] hover:to-[#458C9B] text-[#123741] font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-[#3B1F3A]" />
                      <span>Submit Product Enquiry</span>
                    </button>

                    <Link
                      to="/contact"
                      className="w-full sm:w-auto py-3 px-5 rounded-xl border border-slate-200 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white font-bold text-xs transition-colors text-center"
                    >
                      Contact Sales
                    </Link>
                  </div>

                </div>

              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
