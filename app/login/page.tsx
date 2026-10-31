import * as React from "react";
import { Metadata } from "next";
import { LoginViewClient } from "./login-view-client";

export const metadata: Metadata = {
  title: "Authentication — Interactive Blueprint & Horizon Login — kilo/ui",
  description:
    "Architectural blueprint login experience featuring an interactive Three.js mechanical isometric illustration with smoothed parallax, raycast hover states, and precision editorial auth forms.",
};

export default function LoginPage() {
  return <LoginViewClient />;
}
