export const CommentsSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="animate-pulse bg-white rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-slate-200 rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-slate-200 rounded w-1/4 mb-2" />
            <div className="h-3 bg-slate-200 rounded w-1/6" />
          </div>
        </div>
        <div className="h-4 bg-slate-200 rounded w-full mb-2" />
        <div className="h-4 bg-slate-200 rounded w-3/4" />
      </div>
    ))}
  </div>
);
