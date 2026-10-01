# Chakra.io

Static corporate website and digital ecosystem framework for Chakra.io. The site is built for GitHub Pages and keeps stable routes for the Chakra company site, ROSA, ROSA Systems Information Readiness, ROSA Runtime, the ROSA MVP, and HCI.

## Local preview

From the repository root, run a static server such as `python3 -m http.server 8000` and open `http://localhost:8000/Chakra.io/`. The `/Chakra.io/` prefix mirrors the GitHub Pages project site URL. For a custom domain or a user site at the root, update the `/Chakra.io/` asset and navigation paths.

## GitHub Pages

The included Actions workflow deploys the repository root after each push to `main`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. GitHub Pages will publish at `https://rishabmohandoss.github.io/Chakra.io/` once that workflow completes.

The ROSA and HCI route pages are framework placeholders that establish the permanent URLs and separate visual environments described in the project handoff. The full ROSA interactive experience and MVP can be developed into these routes later.
