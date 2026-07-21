# taksokrat.ru

Static Cloudflare Pages site for making links bigger on the frontend.

## How it works

- The published site is plain static assets in `public/`.
- The form accepts only `http://` and `https://` URLs.
- A valid URL is normalized with the browser `URL` API, encoded as UTF-8 base64url without padding, and shown as:

```text
https://taksokrat.ru/?l=<base64url-encoded-url>
```

- Opening a generated link decodes `l` in the browser, validates the decoded URL again, and redirects with `window.location.replace`.
- Invalid `l` payloads and recursive `taksokrat.ru` targets redirect to `https://llm7.io/?r=1`.
- There is no server API, worker, database, or build step.

## Cloudflare Pages

This repo is configured for Wrangler direct upload to Cloudflare Pages.

There are no npm dependencies required for local development. Wrangler is run through `npx` and pinned to `3.91.0`.

Local development with Wrangler:

```sh
npm run dev
```

Then open:

```text
http://127.0.0.1:4177
```

Deploy to the Pages project named `taksokrat-ru`:

```sh
npm run deploy
```

If the Pages project does not exist yet, create it first:

```sh
npm run project:create
```

The Wrangler config uses this output directory:

```text
public
```
