"use client";

import * as React from "react";
import { CheckCircle2, MessageCircle, Star, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HostTrustCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  role?: string;
  responseTime?: string;
  avatarUrl?: string;
  verified?: boolean;
  rating?: number;
  onChat?: () => void;
  chatIcon?: React.ReactNode;
  className?: string;
}

/**
 * HostTrustCard
 * Trust and safety author/host card displaying verified identity,
 * contextual role, response metrics, and an instant message action.
 */
export function HostTrustCard({
  name = "Kenji Sato",
  role = "Master timber architect",
  responseTime = "Responds in 10m",
  avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
  verified = true,
  rating,
  onChat,
  chatIcon = <MessageCircle className="h-4 w-4 text-[#c0c1ff]" />,
  className,
  ...props
}: HostTrustCardProps) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl bg-[#111622] border border-[#1e2638] p-3.5 text-white font-sans shadow-lg flex items-center justify-between gap-3",
        className
      )}
      {...props}
    >
      {/* Avatar & Host Information */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarUrl}
            alt={name}
            className="h-11 w-11 rounded-full object-cover border-2 border-[#8083ff]/40 shadow-sm"
          />
          {verified && (
            <div className="absolute -bottom-0.5 -right-0.5 bg-[#111622] rounded-full p-0.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#8083ff] fill-[#111622]" />
            </div>
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[#9196ab]">Hosted by</span>
            <span className="text-xs font-semibold text-[#f2f4ff] truncate">{name}</span>
            {verified && (
              <ShieldCheck className="h-3 w-3 text-[#8083ff] shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#9196ab] truncate mt-0.5">
            {role && <span className="truncate">{role}</span>}
            {role && responseTime && <span>•</span>}
            {responseTime && <span className="text-[#c0c1ff] font-medium">{responseTime}</span>}
          </div>
        </div>
      </div>

      {/* Quick Action Button (Chat) */}
      <button
        type="button"
        onClick={onChat}
        className="h-9 w-9 rounded-xl bg-[#182030] hover:bg-[#20293d] border border-[#232c40] flex items-center justify-center shrink-0 text-[#c0c1ff] hover:text-white transition-all active:scale-95 cursor-pointer shadow-sm"
        aria-label={`Chat with ${name}`}
      >
        {chatIcon}
      </button>
    </div>
  );
}

