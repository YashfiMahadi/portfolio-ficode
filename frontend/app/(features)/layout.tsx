import React from "react";

// Layout global untuk seluruh (features). Saat ini hanya meneruskan children;
// tempatkan wrapper lintas-fitur (mis. navigasi umum) di sini bila diperlukan.
export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
