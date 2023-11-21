import { fetchCBOR } from "https://js.sabae.cc/fetchCBOR.js";

import { fetchBin } from "https://js.sabae.cc/fetchBin.js";
import { Day, TimeZone } from "https://js.sabae.cc/DateTime.js";
import * as sec from "https://code4fukui.github.io/sec.js/sec.js";

const url = "http://localhost:8000/api/";
const data = new Uint8Array([1, 2, 3]);
const sign = await fetchCBOR(url, data);
console.log("sign", sign);

const day = new Day(TimeZone.JST).toString();
const url2 = "http://localhost:8000/" + day + ".pubkey";
const pubkey = await fetchBin(url2);
const verify = sec.verify(sign, pubkey, data);
console.log("verify", verify);
