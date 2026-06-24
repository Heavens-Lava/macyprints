import { useEffect, useState } from "react";
import { supabase, supabaseEnabled, OWNER_EMAIL } from "../lib/supabase";
import { useAuthUser } from "../lib/auth";
import { useCatalog } from "../lib/catalog";
import { Button } from "../components/Button";
import Filo from "../components/Filo";

export default function Admin() {
  const { user, ready } = useAuthUser();

  if (!supabaseEnabled) {
    return (
      <Shell>
        <p className="font-mono text-sm">Supabase isn't configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.</p>
      </Shell>
    );
  }
  if (!ready) return <Shell><p className="font-mono text-sm opacity-60">Loading…</p></Shell>;
  if (!user) return <Shell><LoginForm /></Shell>;
  if (user.email !== OWNER_EMAIL) {
    return (
      <Shell>
        <p className="font-mono text-sm">
          Signed in as <b>{user.email}</b>, which isn't the shop owner.
        </p>
        <Button variant="ghost" size="sm" className="mt-4" onClick={() => supabase!.auth.signOut()}>Sign out</Button>
      </Shell>
    );
  }
  return <Dashboard email={user.email!} />;
}

/* ----------------------------------------------------------------- layout */
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-[900px] mx-auto px-7 py-16">
      <div className="flex items-center gap-3 mb-8">
        <Filo className="w-12" />
        <div>
          <h1 className="font-display font-bold text-3xl">Shop admin</h1>
          <p className="font-mono text-xs opacity-60">macyprints control room</p>
        </div>
      </div>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ login */
function LoginForm() {
  const [email, setEmail] = useState(OWNER_EMAIL);
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function sendCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const { error } = await supabase!.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
    setBusy(false);
    if (error) setMsg(error.message);
    else {
      setStep("code");
      setMsg("We emailed you a 6-digit code. Enter it below.");
    }
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const { error } = await supabase!.auth.verifyOtp({ email, token: code.trim(), type: "email" });
    setBusy(false);
    if (error) setMsg(error.message);
    // success -> onAuthStateChange flips the view
  }

  return (
    <div className="max-w-[420px] border-[3px] border-ink rounded-[18px] bg-white shadow-hard p-6">
      {step === "email" ? (
        <form onSubmit={sendCode} className="flex flex-col gap-3">
          <label className="font-mono text-xs opacity-70">Owner email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-[3px] border-ink rounded-lg px-3 py-2 font-mono text-sm"
            required
          />
          <Button variant="coral" disabled={busy} className="justify-center">
            {busy ? "Sending…" : "Email me a login code"}
          </Button>
        </form>
      ) : (
        <form onSubmit={verify} className="flex flex-col gap-3">
          <label className="font-mono text-xs opacity-70">6-digit code sent to {email}</label>
          <input
            inputMode="numeric"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border-[3px] border-ink rounded-lg px-3 py-2 font-mono text-lg tracking-[0.3em] text-center"
            placeholder="••••••"
            required
          />
          <Button variant="coral" disabled={busy} className="justify-center">
            {busy ? "Verifying…" : "Log in"}
          </Button>
          <button type="button" onClick={() => setStep("email")} className="font-mono text-xs opacity-60 underline">
            use a different email
          </button>
        </form>
      )}
      {msg && <p className="font-mono text-xs mt-3 text-coral">{msg}</p>}
    </div>
  );
}

/* -------------------------------------------------------------- dashboard */
interface Row {
  id: string;
  slug: string;
  name: string;
  blurb: string;
  price_cents: number;
  badge: string;
  material: string;
  size: string;
  tint: string;
  color_chips: string[];
  image: string;
  stock_qty: number;
  active: boolean;
  sort: number;
}

function blankRow(sort: number): Omit<Row, "id"> {
  return {
    slug: "",
    name: "",
    blurb: "",
    price_cents: 0,
    badge: "",
    material: "PLA",
    size: "",
    tint: "#FFD49A",
    color_chips: ["#FF5436"],
    image: "",
    stock_qty: 1,
    active: true,
    sort,
  };
}

function Dashboard({ email }: { email: string }) {
  const { reload: reloadStorefront } = useCatalog();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  async function load() {
    setLoading(true);
    const { data } = await supabase!.from("products").select("*").order("sort", { ascending: true });
    setRows((data as Row[]) ?? []);
    setLoading(false);
  }
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function afterChange() {
    await load();
    await reloadStorefront();
  }

  return (
    <Shell>
      <div className="flex items-center justify-between mb-5">
        <p className="font-mono text-xs opacity-60">Signed in as {email}</p>
        <Button variant="ghost" size="sm" onClick={() => supabase!.auth.signOut()}>Sign out</Button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-xl">Listings ({rows.length})</h2>
        <Button variant="coral" size="sm" onClick={() => setAdding((v) => !v)}>
          {adding ? "Close" : "+ Add listing"}
        </Button>
      </div>

      {adding && (
        <ProductEditor
          initial={blankRow(rows.length + 1)}
          isNew
          onSaved={() => {
            setAdding(false);
            afterChange();
          }}
        />
      )}

      {loading ? (
        <p className="font-mono text-sm opacity-60">Loading listings…</p>
      ) : (
        <div className="flex flex-col gap-4 mt-4">
          {rows.map((r) => (
            <ProductEditor key={r.id} initial={r} onSaved={afterChange} />
          ))}
        </div>
      )}
    </Shell>
  );
}

/* ----------------------------------------------------------- product form */
function ProductEditor({
  initial,
  isNew = false,
  onSaved,
}: {
  initial: Partial<Row> & Omit<Row, "id">;
  isNew?: boolean;
  onSaved: () => void;
}) {
  const [f, setF] = useState({ ...initial, priceDollars: (initial.price_cents / 100).toFixed(2) });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const id = (initial as Row).id;

  function set<K extends keyof typeof f>(k: K, v: (typeof f)[K]) {
    setF((prev) => ({ ...prev, [k]: v }));
  }

  function slugify(s: string) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  async function save() {
    setBusy(true);
    setMsg(null);
    const slug = f.slug || slugify(f.name);
    const payload = {
      slug,
      name: f.name,
      blurb: f.blurb,
      price_cents: Math.round(parseFloat(f.priceDollars || "0") * 100),
      badge: f.badge,
      material: f.material,
      size: f.size,
      tint: f.tint,
      color_chips: f.color_chips,
      image: f.image,
      stock_qty: Number(f.stock_qty),
      active: f.active,
      sort: Number(f.sort),
    };
    const res = isNew
      ? await supabase!.from("products").insert(payload)
      : await supabase!.from("products").update(payload).eq("id", id);
    setBusy(false);
    if (res.error) setMsg(res.error.message);
    else onSaved();
  }

  async function del() {
    if (!confirm(`Delete "${f.name}"? This can't be undone.`)) return;
    setBusy(true);
    const { error } = await supabase!.from("products").delete().eq("id", id);
    setBusy(false);
    if (error) setMsg(error.message);
    else onSaved();
  }

  async function uploadImage(file: File) {
    setBusy(true);
    setMsg(null);
    const slug = f.slug || slugify(f.name) || "misc";
    const path = `${slug}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
    const up = await supabase!.storage.from("macyprints-products").upload(path, file, { upsert: true });
    if (up.error) {
      setBusy(false);
      setMsg(up.error.message);
      return;
    }
    const { data } = supabase!.storage.from("macyprints-products").getPublicUrl(path);
    set("image", data.publicUrl);
    setBusy(false);
  }

  return (
    <div className="border-[3px] border-ink rounded-[18px] bg-white shadow-hard p-5">
      <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-4">
        {/* image */}
        <div className="flex flex-col gap-2">
          <div
            className="aspect-square rounded-lg border-[3px] border-ink overflow-hidden flex items-center justify-center font-mono text-[0.6rem] text-center"
            style={f.image ? undefined : { background: f.tint }}
          >
            {f.image ? <img src={f.image} alt="" className="w-full h-full object-cover" /> : "no photo"}
          </div>
          <label className="font-mono text-[0.65rem] underline cursor-pointer text-center">
            upload photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])}
            />
          </label>
        </div>

        {/* fields */}
        <div className="grid grid-cols-2 gap-2">
          <Field label="Name" className="col-span-2">
            <input className={inp} value={f.name} onChange={(e) => set("name", e.target.value)} />
          </Field>
          <Field label="Blurb" className="col-span-2">
            <input className={inp} value={f.blurb} onChange={(e) => set("blurb", e.target.value)} />
          </Field>
          <Field label="Price ($)">
            <input className={inp} value={f.priceDollars} onChange={(e) => set("priceDollars", e.target.value)} />
          </Field>
          <Field label="Stock qty">
            <input type="number" className={inp} value={f.stock_qty} onChange={(e) => set("stock_qty", Number(e.target.value))} />
          </Field>
          <Field label="Material"><input className={inp} value={f.material} onChange={(e) => set("material", e.target.value)} /></Field>
          <Field label="Size"><input className={inp} value={f.size} onChange={(e) => set("size", e.target.value)} /></Field>
          <Field label="Badge"><input className={inp} value={f.badge} onChange={(e) => set("badge", e.target.value)} /></Field>
          <Field label="Sort"><input type="number" className={inp} value={f.sort} onChange={(e) => set("sort", Number(e.target.value))} /></Field>
          <Field label="Tint (hex)"><input className={inp} value={f.tint} onChange={(e) => set("tint", e.target.value)} /></Field>
          <Field label="Colors (comma hex)">
            <input
              className={inp}
              value={f.color_chips.join(", ")}
              onChange={(e) => set("color_chips", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
            />
          </Field>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
        <label className="font-mono text-xs flex items-center gap-2">
          <input type="checkbox" checked={f.active} onChange={(e) => set("active", e.target.checked)} />
          active (visible in shop)
        </label>
        <div className="flex items-center gap-2">
          {msg && <span className="font-mono text-[0.7rem] text-coral">{msg}</span>}
          {!isNew && (
            <Button variant="ghost" size="sm" onClick={del} disabled={busy}>Delete</Button>
          )}
          <Button variant="coral" size="sm" onClick={save} disabled={busy || !f.name}>
            {busy ? "Saving…" : isNew ? "Create listing" : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

const inp = "w-full border-2 border-ink rounded-md px-2 py-1.5 font-mono text-[0.8rem]";

function Field({ label, className = "", children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="font-mono text-[0.62rem] uppercase tracking-wide opacity-60">{label}</span>
      {children}
    </label>
  );
}
