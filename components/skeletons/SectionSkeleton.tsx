export const SectionSkeleton = () => (
  <section className="py-16 md:py-24">
    <div className="container-custom px-4">
      <div className="animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/3 mx-auto mb-4" />
        <div className="h-12 bg-slate-200 rounded w-1/2 mx-auto mb-20" />
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 bg-slate-200 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  </section>
);
