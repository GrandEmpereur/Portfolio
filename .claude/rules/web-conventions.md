---
paths:
  - "apps/web/**/*.{ts,tsx}"
---

# Web App Conventions

- Server Components by default, `"use client"` only for interactivity
- Import UI from `@repo/ui/components/<name>`
- Import cn from `@repo/ui/lib/utils`
- Use `next/image` with sizes and priority for LCP images
- Use `next/link` for navigation
- Use `generateMetadata()` for SEO on every page
- Use `<Suspense>` with fallback for dynamic content
- Forms: Zod validation schemas + controlled inputs
- Toasts: `toast.success()` / `toast.error()` via sonner
- Route groups: `(public)`, `(auth)`, `(dashboard)`
- No `any` type - type everything
- API calls via `lib/api.ts` (handles CSRF + credentials automatically)
- Add shadcn components: `bunx --bun shadcn@latest add <name> --cwd packages/ui`

## useEffect Interdit — Règles obligatoires

**`useEffect` est banni.** Ne jamais appeler `useEffect` directement dans un composant. Utiliser les 5 patterns ci-dessous.

### Règle 1 : Dériver l'état, ne pas le synchroniser

Calculer inline au lieu de `useEffect → setState`. Évite les renders supplémentaires et les boucles infinies.

```typescript
// ❌ INTERDIT
const [filtered, setFiltered] = useState([]);
useEffect(() => {
  setFiltered(items.filter((i) => i.active));
}, [items]);

// ✅ CORRECT
const filtered = items.filter((i) => i.active);
```

### Règle 2 : Data fetching via Server Components ou libs

- **Priorité 1** : Server Components (fetch côté serveur, zero client JS)
- **Priorité 2** : `useQuery` / `useSWR` pour le fetching client-side quand nécessaire
- **Jamais** : `useEffect → fetch → setState`

```typescript
// ❌ INTERDIT — race condition + pas de cache
useEffect(() => {
  fetchProduct(id).then(setProduct);
}, [id]);

// ✅ CORRECT — Server Component
async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id);
  return <ProductView product={product} />;
}

// ✅ CORRECT — Client-side avec lib
const { data: product } = useQuery(['product', id], () => fetchProduct(id));
```

### Règle 3 : Event handlers, pas d'effects

Si l'action répond à un événement utilisateur, la logique va dans le handler.

```typescript
// ❌ INTERDIT — flag → effect → reset
const [liked, setLiked] = useState(false);
useEffect(() => {
  if (liked) { postLike(); setLiked(false); }
}, [liked]);

// ✅ CORRECT
<button onClick={() => postLike()}>Like</button>
```

### Règle 4 : `useMountEffect` pour le sync externe one-time

Seul hook autorisé pour les effets au mount. Défini dans `@repo/ui/hooks/use-mount-effect.ts`.

```typescript
// ❌ INTERDIT — useEffect direct
useEffect(() => { initWidget(); return () => destroyWidget(); }, []);

// ✅ CORRECT — intent explicite
useMountEffect(() => { initWidget(); return () => destroyWidget(); });
```

Cas valides pour `useMountEffect` :
- Intégration DOM (focus, scroll, resize listener)
- Lifecycle de widgets tiers (analytics, chat, maps)
- Souscriptions Browser API (IntersectionObserver, matchMedia)

### Règle 5 : Reset via `key`, pas de choreography de deps

Quand un composant doit "repartir de zéro" lors d'un changement d'ID/prop, utiliser `key` pour forcer le remount.

```typescript
// ❌ INTERDIT
useEffect(() => { loadVideo(videoId); }, [videoId]);

// ✅ CORRECT — key force un remount propre
<VideoPlayer key={videoId} videoId={videoId} />

function VideoPlayer({ videoId }: { videoId: string }) {
  useMountEffect(() => { loadVideo(videoId); });
}
```

### Smell tests — Signaux d'alerte

| Si tu es sur le point de... | Utilise plutôt |
|---|---|
| `useEffect(() => setX(f(y)), [y])` | Dérivation inline : `const x = f(y)` |
| `useEffect(() => fetch(...).then(setState), [id])` | Server Component ou `useQuery` |
| Flag state → effect → reset flag | Event handler direct |
| `useEffect(..., [])` pour init | `useMountEffect()` |
| Effect pour reset state quand un ID change | `<Component key={id} />` |

### Enforcement

- ESLint `no-restricted-syntax` bloque `useEffect` dans les composants
- Seul `useMountEffect` (dans `@repo/ui/hooks/`) peut appeler `useEffect`
- Code review : tout `useEffect` direct = refus automatique du PR
