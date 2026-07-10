export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center relative z-10">
      <div className="text-center">
        <div className="spinner spinner-lg mx-auto mb-4" />
        <p className="text-[13px] text-[var(--text-faint)] font-mono">Loading…</p>
      </div>
    </div>
  );
}
