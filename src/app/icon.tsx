import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fff8e8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "3px solid #1a120c",
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 999,
            background: "#ff2d6a",
            border: "2px solid #1a120c",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
