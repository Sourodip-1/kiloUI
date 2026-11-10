"use client";

import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "motion/react";
import {
  Sparkles,
  Flame,
  TreePine,
  Compass,
  MapPin,
  Star,
  Heart,
  ArrowRight,
  SlidersHorizontal,
  Search,
  Bell,
  Users,
  Bed,
  Bath,
  Wifi,
  Coffee,
  CheckCircle,
  MessageCircle,
  Calendar,
  Share2,
  Bookmark,
  Layers,
  ShieldCheck,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface SanctuaryCardData {
  id: string;
  title: string;
  tagline: string;
  category: string;
  badge: string;
  location: string;
  rating: number;
  pricePerNight: number;
  imageUrl: string;
  imageAlt: string;
  specs: {
    maxGuests: number;
    kingSuites: number;
    hotSprings: number;
  };
  amenities: string[];
  host: {
    name: string;
    role: string;
    responseTime: string;
    avatarUrl: string;
  };
}

export const NOCTURNE_SANCTUARIES: SanctuaryCardData[] = [
  {
    id: "aura-bamboo",
    title: "Aura Bamboo Villa",
    tagline: "Private onsen bath, cedar pavilion & meditative rock garden",
    category: "ARCHITECTURAL RETREAT",
    badge: "Premier Host",
    location: "Kyoto, Japan",
    rating: 4.96,
    pricePerNight: 420,
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Architectural masterwork villa in Kyoto surrounded by illuminated bamboo groves at dusk",
    specs: {
      maxGuests: 4,
      kingSuites: 2,
      hotSprings: 1,
    },
    amenities: ["High-Speed Starlink", "Matcha Ritual Bar", "Zen Garden Yoga"],
    host: {
      name: "Kenji Sato",
      role: "Master timber architect",
      responseTime: "Responds in 10m",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    },
  },
  {
    id: "nordic-fjord",
    title: "Nordic Fjord Haven",
    tagline: "Modern Scandinavian glass cabin nestled along mirror-calm twilight waters",
    category: "NORDIC ESCAPE",
    badge: "Rare Find",
    location: "Vestland, Norway",
    rating: 4.88,
    pricePerNight: 380,
    imageUrl:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Modern Scandinavian glass cabin alongside a misty fjord at twilight",
    specs: {
      maxGuests: 2,
      kingSuites: 1,
      hotSprings: 1,
    },
    amenities: ["Thermal Glacier Sauna", "Aurora Observation Deck", "Wood Hearth"],
    host: {
      name: "Astrid Lind",
      role: "Fjord naturalist & guide",
      responseTime: "Responds in 15m",
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
    },
  },
  {
    id: "amalfi-cliff",
    title: "Amalfi Cliff Sanctuary",
    tagline: "Infinity pool reflecting purple sunset over Mediterranean stone arches",
    category: "COASTAL CLIFFS",
    badge: "Top 1% Global",
    location: "Positano, Italy",
    rating: 4.92,
    pricePerNight: 610,
    imageUrl:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Dramatically positioned minimalist luxury villa on the cliffs of Amalfi Coast",
    specs: {
      maxGuests: 6,
      kingSuites: 3,
      hotSprings: 2,
    },
    amenities: ["Clifftop Infinity Pool", "Private Wine Cellar", "Helipad Access"],
    host: {
      name: "Matteo Rossi",
      role: "Heritage stone conservator",
      responseTime: "Responds in 5m",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    },
  },
  {
    id: "matterhorn-glass",
    title: "Matterhorn Glass Chalet",
    tagline: "High-elevation cantilevers with panoramic thermal glass and private spa",
    category: "ALPINE SUMMIT",
    badge: "Architect's Choice",
    location: "Zermatt, Switzerland",
    rating: 4.98,
    pricePerNight: 750,
    imageUrl:
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Glass alpine chalet facing snowy peaks with warm ambient lighting",
    specs: {
      maxGuests: 8,
      kingSuites: 4,
      hotSprings: 2,
    },
    amenities: ["Heated Ski Concierge", "Alpine Hydrotherapy", "Private Chef"],
    host: {
      name: "Marc Vaud",
      role: "High-altitude architect",
      responseTime: "Responds in 20m",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    },
  },
];

export type DepthCarouselSize = "sm" | "default" | "lg";

export interface Depth3dCarouselProps {
  items?: SanctuaryCardData[];
  activeIndex?: number;
  size?: DepthCarouselSize;
  onChange?: (index: number) => void;
  onReserve?: (item: SanctuaryCardData) => void;
  onBookmark?: (item: SanctuaryCardData, isBookmarked: boolean) => void;
  className?: string;
}

/**
 * Depth3dCarousel
 * 3D Depth Card Carousel featuring perspective tilt, peeking cards,
 * specular glass gradient scrims, touch swipe physics, and animated indicator pills.
 */
export function Depth3dCarousel({
  items = NOCTURNE_SANCTUARIES,
  activeIndex: controlledIndex,
  size = "default",
  onChange,
  onReserve,
  onBookmark,
  className,
}: Depth3dCarouselProps) {
  const [internalIndex, setInternalIndex] = React.useState(0);
  const activeIdx = controlledIndex !== undefined ? controlledIndex : internalIndex;
  const [bookmarkedIds, setBookmarkedIds] = React.useState<Record<string, boolean>>({});

  const handleIndexChange = (newIdx: number) => {
    const wrapped = (newIdx + items.length) % items.length;
    setInternalIndex(wrapped);
    onChange?.(wrapped);
  };

  const toggleBookmark = (item: SanctuaryCardData, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !bookmarkedIds[item.id];
    setBookmarkedIds((prev) => ({ ...prev, [item.id]: next }));
    onBookmark?.(item, next);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 40;
    if (info.offset.x < -threshold) {
      handleIndexChange(activeIdx + 1);
    } else if (info.offset.x > threshold) {
      handleIndexChange(activeIdx - 1);
    }
  };

  const sizeConfig = {
    sm: {
      cardWidth: 205,
      cardHeight: 295,
      sideOffset: 135,
      cardRadius: "rounded-2xl",
      stageMinH: "min-h-[320px]",
      titleText: "text-sm font-bold",
      taglineText: "text-[9px]",
      bottomPad: "p-3 pt-4",
      priceText: "text-xs",
      btnPad: "px-2.5 py-1 text-[10px]",
      badgePad: "px-2 py-0.5 text-[9px]",
      heartBtn: "w-6 h-6 top-10 right-2.5",
    },
    default: {
      cardWidth: 235,
      cardHeight: 340,
      sideOffset: 155,
      cardRadius: "rounded-2xl",
      stageMinH: "min-h-[365px]",
      titleText: "text-base font-bold",
      taglineText: "text-[11px]",
      bottomPad: "p-3.5 pt-5",
      priceText: "text-sm",
      btnPad: "px-3 py-1.5 text-xs",
      badgePad: "px-2 py-1 text-[10px]",
      heartBtn: "w-7 h-7 top-12 right-3",
    },
    lg: {
      cardWidth: 280,
      cardHeight: 415,
      sideOffset: 195,
      cardRadius: "rounded-3xl",
      stageMinH: "min-h-[440px]",
      titleText: "text-xl font-bold",
      taglineText: "text-xs",
      bottomPad: "p-5 pt-8",
      priceText: "text-lg",
      btnPad: "px-4 py-2 text-xs",
      badgePad: "px-3 py-1.5 text-xs",
      heartBtn: "w-9 h-9 top-15 right-4",
    },
  }[size];

  return (
    <div className={cn("relative w-full flex flex-col items-center select-none overflow-visible bg-transparent py-2", className)}>
      {/* 3D Perspective Stage */}
      <div
        className={cn("relative z-10 flex items-center justify-center w-full overflow-visible", sizeConfig.stageMinH)}
        style={{ perspective: 1200 }}
      >
        {items.map((item, index) => {
          let offset = index - activeIdx;
          if (offset > items.length / 2) offset -= items.length;
          if (offset < -items.length / 2) offset += items.length;

          const isCenter = offset === 0;
          const isLeft = offset === -1;
          const isRight = offset === 1;
          const isVisible = isCenter || isLeft || isRight;

          const targetX = isCenter
            ? 0
            : isLeft
            ? -sizeConfig.sideOffset
            : isRight
            ? sizeConfig.sideOffset
            : offset < 0
            ? -sizeConfig.sideOffset * 1.8
            : sizeConfig.sideOffset * 1.8;

          const targetRotateY = isCenter ? 0 : isLeft ? -7 : isRight ? 7 : 0;
          const targetScale = isCenter ? 1 : isVisible ? 0.9 : 0.75;
          const targetOpacity = isCenter ? 1 : isVisible ? 0.75 : 0;
          const targetZIndex = isCenter ? 30 : isVisible ? 15 : 0;

          return (
            <motion.div
              key={item.id}
              initial={false}
              animate={{
                x: targetX,
                scale: targetScale,
                rotateY: targetRotateY,
                opacity: targetOpacity,
                zIndex: targetZIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 28,
                mass: 0.8,
              }}
              drag={isCenter ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={handleDragEnd}
              onClick={() => {
                if (!isCenter) handleIndexChange(index);
              }}
              style={{
                width: sizeConfig.cardWidth,
                height: sizeConfig.cardHeight,
                transformStyle: "preserve-3d",
              }}
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform select-none overflow-hidden bg-[#141824] border border-white/10 shadow-2xl",
                sizeConfig.cardRadius,
                isCenter
                  ? "cursor-grab active:cursor-grabbing pointer-events-auto"
                  : isVisible
                  ? "cursor-pointer pointer-events-auto hover:opacity-95"
                  : "pointer-events-none"
              )}
            >
              {/* Background Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
                alt={item.imageAlt}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out"
                draggable={false}
              />

              {/* Double Specular Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e16] via-[#0a0e16]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e16]/60 via-transparent to-transparent" />

              {/* Top Badges Row */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
                <div className={cn("flex items-center gap-1 rounded-full bg-[#0a0e16]/80 backdrop-blur-xl border border-white/10 shadow-sm", sizeConfig.badgePad)}>
                  <MapPin className="h-3 w-3 text-[#4cd7f6]" />
                  <span className="font-sans text-white font-semibold tracking-wide truncate max-w-[110px]">
                    {item.location}
                  </span>
                </div>

                <div className={cn("flex items-center gap-1 rounded-full bg-[#0a0e16]/80 backdrop-blur-xl border border-white/10 shadow-sm", sizeConfig.badgePad)}>
                  <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                  <span className="font-mono text-white font-bold">{item.rating}</span>
                </div>
              </div>

              {/* Bookmark Heart Button (only on active center card) */}
              {isCenter && (
                <button
                  type="button"
                  onClick={(e) => toggleBookmark(item, e)}
                  className={cn(
                    "absolute rounded-full bg-[#1c2028]/80 backdrop-blur-md flex items-center justify-center text-white hover:text-rose-400 active:scale-90 transition-all shadow-md z-10 border border-white/10 cursor-pointer",
                    sizeConfig.heartBtn
                  )}
                  title="Save Sanctuary"
                  aria-label="Save Sanctuary"
                >
                  <Heart
                    className={cn(
                      "h-3.5 w-3.5 transition-colors",
                      bookmarkedIds[item.id] ? "text-rose-500 fill-rose-500" : "text-white"
                    )}
                  />
                </button>
              )}

              {/* Bottom Content Scrim Shield */}
              <div className={cn("absolute bottom-0 inset-x-0 flex flex-col gap-1.5 z-10 bg-gradient-to-t from-[#0a0e16] via-[#0a0e16]/95 to-transparent", sizeConfig.bottomPad)}>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono tracking-wider uppercase text-pink-400 font-semibold">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-[#4cd7f6] text-[10px] font-sans font-medium">
                    <ShieldCheck className="h-3 w-3" />
                    <span>{item.badge}</span>
                  </div>
                </div>

                <div>
                  <h3 className={cn("text-white tracking-tight leading-tight", sizeConfig.titleText)}>
                    {item.title}
                  </h3>
                  <p className={cn("text-neutral-300 line-clamp-1 mt-0.5 leading-relaxed", sizeConfig.taglineText)}>
                    {item.tagline}
                  </p>
                </div>

                {isCenter ? (
                  <div className="flex items-center justify-between pt-1.5 border-t border-white/10 mt-0.5">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-neutral-400">Experience from</span>
                      <div className="flex items-baseline gap-1">
                        <span className={cn("font-bold text-white font-sans", sizeConfig.priceText)}>
                          ${item.pricePerNight}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-sans">/ night</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onReserve?.(item);
                      }}
                      className={cn(
                        "rounded-full bg-[#c0c1ff] text-[#1000a9] font-sans font-semibold flex items-center gap-1 shadow-lg active:scale-95 transition-transform hover:brightness-105 cursor-pointer",
                        sizeConfig.btnPad
                      )}
                    >
                      <span>Reserve</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-1 border-t border-white/10 mt-0.5">
                    <span className="text-[11px] font-mono text-neutral-300 font-semibold">
                      ${item.pricePerNight} / night
                    </span>
                    <span className="text-[10px] font-sans text-[#8083ff] font-medium">
                      Tap to select
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Carousel Pagination Pill Indicators ── */}
      <div className="flex items-center justify-center gap-2 mt-3 select-none">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleIndexChange(i)}
            aria-label={`Slide ${i + 1}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300 cursor-pointer",
              activeIdx === i
                ? "w-6 bg-[#8083ff] shadow-[0_0_8px_rgba(128,131,255,0.6)]"
                : "w-2 bg-neutral-700 hover:bg-neutral-500"
            )}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * CuratedFilterBar
 * Scrollable filter chips bar with active sparkle escape
 */
export function CuratedFilterBar({
  activeFilter = "all",
  onFilterChange,
}: {
  activeFilter?: string;
  onFilterChange?: (filterId: string) => void;
}) {
  const filters = [
    { id: "all", label: "All Escapes", icon: <Sparkles className="h-3.5 w-3.5" /> },
    { id: "trending", label: "Trending", icon: <Flame className="h-3.5 w-3.5" /> },
    { id: "offgrid", label: "Off-Grid", icon: <TreePine className="h-3.5 w-3.5" /> },
    { id: "within3h", label: "Within 3h", icon: <Compass className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="flex items-center gap-2 px-4 overflow-x-auto no-scrollbar py-1 select-none">
      {filters.map((f) => {
        const isActive = activeFilter === f.id;
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => onFilterChange?.(f.id)}
            className={cn(
              "shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full font-sans text-xs font-semibold transition-all active:scale-95 cursor-pointer shadow-xs",
              isActive
                ? "bg-[#8083ff] text-[#1000a9] shadow-md font-bold"
                : "bg-[#262a33] text-neutral-300 hover:text-white"
            )}
          >
            {f.icon}
            <span>{f.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * VillaSpecsCard
 * 3-column specs grid and amenity tag cloud
 */
export function VillaSpecsCard({ item }: { item: SanctuaryCardData }) {
  return (
    <div className="p-4 rounded-2xl bg-[#181c24] border border-white/5 shadow-sm flex flex-col gap-3 font-sans select-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-[#c0c1ff] fill-[#c0c1ff]" />
          <h4 className="text-sm font-semibold text-white tracking-tight">Villa Specs</h4>
        </div>
        <span className="text-[11px] font-mono text-pink-400 font-medium">Instant Confirmation</span>
      </div>

      {/* 3-Column Key Metrics Grid */}
      <div className="grid grid-cols-3 gap-2 py-0.5">
        <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1c2028] text-center border border-white/5">
          <Users className="h-4 w-4 text-[#4cd7f6] mb-1" />
          <span className="text-base font-bold text-white font-sans">{item.specs.maxGuests}</span>
          <span className="text-[10px] font-mono text-neutral-400">Max Guests</span>
        </div>

        <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1c2028] text-center border border-white/5">
          <Bed className="h-4 w-4 text-[#c0c1ff] mb-1" />
          <span className="text-base font-bold text-white font-sans">{item.specs.kingSuites}</span>
          <span className="text-[10px] font-mono text-neutral-400">King Suites</span>
        </div>

        <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1c2028] text-center border border-white/5">
          <Bath className="h-4 w-4 text-pink-400 mb-1" />
          <span className="text-base font-bold text-white font-sans">{item.specs.hotSprings}</span>
          <span className="text-[10px] font-mono text-neutral-400">Hot Spring</span>
        </div>
      </div>

      {/* Amenity Tag Cloud */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        {item.amenities.map((amenity, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#262a33] text-neutral-200 text-xs font-sans border border-white/5"
          >
            {idx === 0 && <Wifi className="h-3 w-3 text-[#4cd7f6]" />}
            {idx === 1 && <Coffee className="h-3 w-3 text-[#c0c1ff]" />}
            {idx === 2 && <Sparkles className="h-3 w-3 text-pink-400" />}
            <span>{amenity}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * HostTrustCard
 * Verified host badge, role, and direct chat action
 */
export function HostTrustCard({
  item,
  onChat,
}: {
  item: SanctuaryCardData;
  onChat?: () => void;
}) {
  return (
    <div className="p-4 rounded-2xl bg-[#181c24] border border-white/5 flex items-center justify-between font-sans select-none shadow-sm">
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative w-11 h-11 rounded-full overflow-hidden bg-neutral-800 shrink-0 border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.host.avatarUrl}
            alt={item.host.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold text-white truncate">{item.host.name}</span>
            <CheckCircle className="h-3.5 w-3.5 text-[#c0c1ff] fill-[#c0c1ff] shrink-0" />
          </div>
          <span className="text-xs text-neutral-400 truncate">
            {item.host.role} • {item.host.responseTime}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onChat}
        className="w-9 h-9 rounded-full bg-[#262a33] hover:bg-[#31353e] flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer shrink-0 border border-white/5 active:scale-90"
        title="Chat with Host"
        aria-label="Chat with Host"
      >
        <MessageCircle className="h-4 w-4" />
      </button>
    </div>
  );
}

/**
 * BookingActionBar
 * Primary action button & circular share button
 */
export function BookingActionBar({
  onCheckAvailability,
  onShare,
}: {
  onCheckAvailability?: () => void;
  onShare?: () => void;
}) {
  return (
    <div className="flex items-center gap-3 pt-1 select-none">
      <button
        type="button"
        onClick={onCheckAvailability}
        className="flex-1 py-3 px-5 rounded-full bg-[#8083ff] text-[#1000a9] font-sans text-sm font-semibold flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all hover:brightness-105 cursor-pointer"
      >
        <Calendar className="h-4 w-4" />
        <span>Check Availability</span>
      </button>

      <button
        type="button"
        onClick={onShare}
        aria-label="Share Destination"
        className="w-11 h-11 rounded-full bg-[#262a33] hover:bg-[#31353e] border border-white/5 flex items-center justify-center text-white active:scale-95 transition-transform shrink-0 cursor-pointer"
      >
        <Share2 className="h-4 w-4" />
      </button>
    </div>
  );
}

/**
 * NocturneSanctuaryScreen
 * Complete Mobile Screen matching the Stitch Mobile Project & User Reference Screenshot.
 */
export function NocturneSanctuaryScreen({
  className,
  onToast,
}: {
  className?: string;
  onToast?: (msg: string) => void;
}) {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [activeFilter, setActiveFilter] = React.useState("all");
  const currentItem = NOCTURNE_SANCTUARIES[activeIdx];

  const handleToast = (msg: string) => {
    if (onToast) onToast(msg);
  };

  return (
    <div className={cn("relative w-full max-w-[390px] mx-auto bg-[#0f131c] text-[#dfe2ee] font-sans flex flex-col min-h-[780px] shadow-2xl rounded-[38px] border border-white/10 overflow-hidden select-none", className)}>
      {/* 1. Header Bar */}
      <header className="sticky top-0 w-full z-40 bg-[#0f131c]/80 backdrop-blur-xl border-b border-white/5 px-4 h-14 flex items-center justify-between">
        <h1 className="text-base font-bold text-white tracking-tight">Cards</h1>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleToast("Search triggered")}
            className="w-9 h-9 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => handleToast("Notifications opened")}
            className="w-9 h-9 flex items-center justify-center text-neutral-400 hover:text-white transition-colors relative cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          </button>

          <div className="w-7 h-7 rounded-full bg-[#c0c1ff] text-[#1000a9] flex items-center justify-center font-bold text-xs ml-1">
            <User className="h-4 w-4" />
          </div>
        </div>
      </header>

      {/* 2. Scrollable Body Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-20 space-y-4 pt-3">
        {/* Curated Collection Header & Filter Pills */}
        <div className="px-4 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-pink-400 font-semibold">
                Curated Collection
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleToast("Filters sheet opened")}
              className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white font-mono cursor-pointer"
            >
              <SlidersHorizontal className="h-3 w-3" />
              <span>Filter (3)</span>
            </button>
          </div>

          <div className="flex items-baseline justify-between pt-0.5">
            <h2 className="text-xl font-bold text-white tracking-tight">Nocturne Sanctuaries</h2>
            <span className="text-xs font-mono text-[#c0c1ff]">14 available</span>
          </div>
        </div>

        {/* Filter Pills Bar */}
        <CuratedFilterBar
          activeFilter={activeFilter}
          onFilterChange={(f) => {
            setActiveFilter(f);
            handleToast(`Filter set to: ${f}`);
          }}
        />

        {/* 3D Depth Card Carousel */}
        <Depth3dCarousel
          items={NOCTURNE_SANCTUARIES}
          activeIndex={activeIdx}
          onChange={setActiveIdx}
          onReserve={(it) => handleToast(`Reserving ${it.title}`)}
          onBookmark={(it, saved) => handleToast(saved ? `Saved ${it.title}` : `Removed ${it.title}`)}
        />

        {/* Villa Specs Card */}
        <div className="px-4">
          <VillaSpecsCard item={currentItem} />
        </div>

        {/* Host Trust Card */}
        <div className="px-4">
          <HostTrustCard item={currentItem} onChat={() => handleToast(`Chat with ${currentItem.host.name}`)} />
        </div>

        {/* Booking CTA Bar */}
        <div className="px-4">
          <BookingActionBar
            onCheckAvailability={() => handleToast(`Checking dates for ${currentItem.title}`)}
            onShare={() => handleToast("Share link copied to clipboard")}
          />
        </div>
      </div>

      {/* 3. Bottom Navigation Bar */}
      <nav className="absolute bottom-0 inset-x-0 h-16 bg-[#0f131c]/90 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-2 z-40">
        {[
          { id: "explore", label: "Explore", icon: Compass },
          { id: "cards", label: "Cards", icon: Layers, active: true },
          { id: "saved", label: "Saved", icon: Bookmark },
          { id: "profile", label: "Profile", icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleToast(`Navigated to ${tab.label}`)}
              className={cn(
                "flex flex-col items-center justify-center min-w-[54px] py-1 transition-colors cursor-pointer",
                tab.active ? "text-[#c0c1ff] font-semibold" : "text-neutral-400 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5 mb-0.5" />
              <span className="text-[10px] font-sans">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

