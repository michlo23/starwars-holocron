---
app: hezivio-starwars-holocron
app_id: starwars-holocron
domain: Star Wars baza wiedzy / holocron (demo/prototyp)
stack: Next.js 14 · TypeScript · PostgreSQL · TailwindCSS
auth: Authentik OIDC (wzorzec hezivio-auth)
design: hezivio-tokens.css · hezivio-nav.js (palety: teal + summer)
deploy: Coolify · branch=main
health: standard Next.js
node: node:22.22.1-slim
---

# Star Wars Holocron

## Odpowiedzialności biznesowe

1. **Baza wiedzy Star Wars** — encyklopedia postaci, planet, statków.
2. **Demo apka** — prototyp wykorzystujący szablon Hezivio.

## API endpoints

| Endpoint | Metoda | Auth | Odpowiedzialność |
|----------|--------|------|-----------------|
| `/api/health` | GET | ❌ | Healthcheck |
| `/api/auth/*` | GET/POST | ❌/✅ | OIDC auth flow |

## Env vars

| Zmienna | Semantyka | Secret |
|---------|-----------|--------|
| `DATABASE_URL` | PostgreSQL connection string | tak |
| `OIDC_ISSUER` | Authentik OIDC issuer | nie |
| `OIDC_CLIENT_ID` | OIDC client ID | nie |
| `OIDC_CLIENT_SECRET` | OIDC secret | tak |

## Wzorce

- **OIDC+PKCE** — `src/lib/oidc.ts` (wzorzec nexus/sentinel/media)
- **Design bridge** — `var(--hz-*)` na Tailwind `@theme`
- **Top nav** — `hezivio-nav.js` + `hezivio-tokens.css`

## Zależności Hezivio

| Zależność | Wymagana | Opis |
|-----------|----------|------|
| `auth.hezivio.com` | ✅ | Authentik OIDC |
| `assets.hezivio.com` | ✅ | Design system |

## Gotchy

- **Demo/prototyp** — nieprodukcyjna apka demonstracyjna
