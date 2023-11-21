# trustday

- trusted day stamp service with [sec.js](https://github.com/code4fukui/sec.js/)

## Usage

```js
import { fetchCBOR } from "https://js.sabae.cc/fetchCBOR.js";

const url = "http://localhost:8000/api/";
const data = new Uint8Array([1, 2, 3]);
const res = await fetchCBOR(url, data);
console.log(res);
```
