import { serveAPI } from "https://js.sabae.cc/wsutil.js";
import * as sec from "https://code4fukui.github.io/sec.js/sec.js";
import { Day, TimeZone } from "https://js.sabae.cc/DateTime.js";

let day = null;
let prikey = null;
let pubkey = null;

const tobin = (s) => {
  if (s instanceof Uint8Array) {
    return s;
  }
  if (typeof s != "string") {
    s = "" + s;
  }
  return new TextEncoder().encode(s);
};

Deno.mkdir("static", { recursive: true });

const savePubkey = async (day, pubkey) => {
  for (let i = 1;; i++) {
    const fn = "static/" + day.toString() + (i < 2 ? "" : "_" + i) + ".pubkey"
    try {
      await Deno.readFile(fn);
    } catch (e) {
      console.log(e + " " + fn);
      await Deno.writeFile(fn, pubkey);
      break;
    }
  }
};

serveAPI("/api/", async (param, req, path, conninfo) => {
  const today = new Day(TimeZone.JST);
  if (!today.equals(day)) {
    day = today;
    prikey = sec.prikey();
    pubkey = sec.pubkey(prikey);
    await savePubkey(today, pubkey);
  }
  const sig = sec.sign(prikey, tobin(param));
  return sig;
});
