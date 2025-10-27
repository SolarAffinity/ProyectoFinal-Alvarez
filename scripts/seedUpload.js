import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const cfg = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

if (!cfg.projectId) {
  console.error("❌ Falta VITE_FIREBASE_PROJECT_ID en .env");
  process.exit(1);
}

const app = initializeApp(cfg);
const db = getFirestore(app);

const seedPath = fs.existsSync("./scripts/seed-products.json")
  ? "./scripts/seed-products.json"
  : "./scripts/seed.json";

if (!fs.existsSync(seedPath)) {
  console.error("❌ No encontré", seedPath);
  process.exit(1);
}

const raw = fs.readFileSync(seedPath, "utf8");
let data = [];
try { data = JSON.parse(raw); } catch (e) {
  console.error("❌ JSON inválido:", e.message); process.exit(1);
}

function clean(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || (typeof v === "number" && !Number.isFinite(v))) out[k] = null;
    else out[k] = v;
  }
  return out;
}

async function run() {
  let i = 0;
  for (const p of data) {
    i++;
    try {
      if (!p.id || typeof p.id !== "string") throw new Error("id faltante o no-string");
      if (p.price != null && !Number.isFinite(Number(p.price))) throw new Error("price no numérico");
      if (p.stock != null && !Number.isFinite(Number(p.stock))) throw new Error("stock no numérico");
      await setDoc(doc(db, "products", p.id), clean(p));
      console.log(`✅ [${i}] ${p.title} (id: ${p.id})`);
    } catch (err) {
      console.error(`❌ [${i}] ${p.title || p.id}: ${err.message}`);
    }
  }
  console.log("🏁 Seed terminado.");
}
run();
