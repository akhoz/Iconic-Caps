// scripts/generate-cert.mjs
import selfsigned from "selfsigned";
import fs from "fs";

const attrs = [{ name: "commonName", value: "localhost" }];
const opts = {
  keySize: 2048,
  days: 365,
  algorithm: "sha256",
  extensions: [
    { name: "basicConstraints", cA: true },
    {
      name: "subjectAltName",
      altNames: [
        { type: 2, value: "localhost" },   // DNS
        { type: 7, ip: "127.0.0.1" },      // IPv4
        { type: 7, ip: "::1" }             // IPv6
      ],
    },
  ],
};

const pems = selfsigned.generate(attrs, opts);
// pems.private, pems.cert son PEM válidos:
fs.writeFileSync("key.pem", pems.private, { encoding: "utf8", flag: "w" });
fs.writeFileSync("cert.pem", pems.cert, { encoding: "utf8", flag: "w" });

console.log("✅ Generados key.pem y cert.pem (autofirmados, solo para desarrollo).");
