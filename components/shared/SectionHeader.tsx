interface SectionHeaderProps {
  icon: React.ReactNode;
  badge: string;
  title: string;
  description?: string;
}

export const SectionHeader = ({ icon, badge, title, description }: SectionHeaderProps) => (
  <div className="text-center mb-12 md:mb-20">
    <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-3 md:px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full">
      {icon}
      <span className="text-sm font-semibold text-blue-700">{badge}</span>
    </div>
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
      <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </span>
    </h2>
    {description && (
      <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
        {description}
      </p>
    )}
  </div>
);
