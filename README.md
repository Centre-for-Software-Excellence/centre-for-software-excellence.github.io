<h1 align="center">Centre for Software Excellence</h1>

Docs and website for [Centre of Software Excellence (CSE) lab](https://centre-for-software-excellence.github.io/)

## Content

- Blog posting
- Lab publications

## Project Structure

```
├── public
│   ├── data            # generated article related data and mannually defined external blog posts
│   ├── imgs            # images used in the blog posts
│   ├── logos           # logos used in the website
│   └── search          # search index and records for articles
├── docs                # docs for repository
├── src
│   ├── app             # layout and pages for index page and docs pages
│   ├── components
│   ├── config          # website configuration (UI, search)
│   ├── docs            # docs for website
│   ├── hooks
│   ├── lib
│   ├── scripts         # general website scripts
│   ├── main.tsx
│   ├── stores
│   ├── styles
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Getting Started

1. Clone the repository:

```bash
git clone git@github.com:Centre-for-Software-Excellence/centre-for-software-excellence.github.io.git
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server to see the website locally:

```bash
npm run dev
```

visit [http://localhost:5173](http://localhost:5173) in your browser.
