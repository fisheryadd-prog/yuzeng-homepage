import {
  ExternalLink,
  ChevronRight,
  Sparkles,
  MessageSquare,
  Brain,
  Globe,
} from 'lucide-react';
import { PROJECTS } from '@/constants/projects';
import { SectionHeader } from '@/components/shared/SectionHeader';

const iconMap = {
  MessageSquare,
  Brain,
  Globe,
} as const;

const Projects = () => {

  return (
    <section id="projects" className="py-16 md:py-24 bg-gradient-to-b from-white via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 right-0 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl" />

      <div className="container-custom relative z-10 px-4">
        {/* Section Header */}
        <SectionHeader
          icon={<Sparkles className="w-5 h-5 text-blue-600" />}
          badge="AI驱动的创新"
          title="我的AI项目"
          description="依托AI技术，打造多个创新应用，将人工智能融入教育、企业服务和个人品牌等领域，提供更智能、更高效的解决方案"
        />

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {PROJECTS.map((project, index) => {
            const IconComponent = iconMap[project.icon as keyof typeof iconMap];
            return (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-2xl md:rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:border-blue-200 block cursor-pointer"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}>
              </div>

              {/* Status Badge */}
              <div className="absolute top-6 right-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  {project.status}
                </span>
              </div>

              {/* Icon */}
              <div className={`mb-6 w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                {IconComponent && <IconComponent className="w-12 h-12" />}
              </div>

              {/* Content */}
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {project.title}
              </h3>

              <p className="text-slate-600 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link Indicator */}
              <div className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700">
                <span>访问项目</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-full border border-purple-300/50 hover:border-purple-400 transition-all duration-300">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700">
              更多项目持续开发中，敬请期待...
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
