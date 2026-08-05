import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Sem o tipo certo alguns navegadores abrem o .apk como texto
        source: "/velora-sandbox.apk",
        headers: [
          {
            key: "Content-Type",
            value: "application/vnd.android.package-archive",
          },
          {
            key: "Content-Disposition",
            value: 'attachment; filename="velora-sandbox.apk"',
          },
        ],
      },
      {
        // O Android só aceita a verificação do app se vier como JSON
        source: "/.well-known/assetlinks.json",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
};

export default nextConfig;
