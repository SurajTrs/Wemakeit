import { ImageResponse } from "next/og";

export const alt = "WeMakeIt | From idea to income";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "radial-gradient(ellipse 80% 60% at 50% 115%, rgba(198,244,50,0.45), #0B0B0C 70%)", padding: 80, color: "#FFFFFF" }}>
        <div style={{ display: "flex", alignItems: "center", fontSize: 40, fontWeight: 700 }}>
          WeMakeIt
          <div style={{ width: 16, height: 16, borderRadius: 16, background: "#C6F432", marginLeft: 6 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>
            Your entire business online. Built, launched and grown by one team.
          </div>
          <div style={{ display: "flex", marginTop: 36 }}>
            <div style={{ background: "#C6F432", padding: "14px 28px", borderRadius: 999, fontSize: 30, fontWeight: 700, color: "#0B0B0C" }}>
              Live in 7 days · Fixed prices
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
