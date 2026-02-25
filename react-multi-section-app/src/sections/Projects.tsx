import React from 'react';

type Project = {
  name: string;
  description: string;
  codeUrl: string;
  demoUrl: string;
};

const projects: Project[] = [
  { name: 'Last-Maisiri', description: 'this is my project', codeUrl: 'https://github.com/LastMaisiri/second-bio', demoUrl: 'http://lastmaisiri.sigmasystems.co.zw/projects/responsive-website/' },
  { name: 'my mentor', description: 'mentor project', codeUrl: 'https://github.com/LastMaisiri/Last-Maisiri', demoUrl: 'http://lastmaisiri.sigmasystems.co.zw/projects/mentor/' },
  { name: 'my-bio', description: 'my bio', codeUrl: 'https://github.com/LastMaisiri/my-bio', demoUrl: 'http://lastmaisiri.sigmasystems.co.zw/projects/my-bio/' },
  { name: 'box', description: 'box', codeUrl: 'https://github.com/LastMaisiri/box', demoUrl: 'http://lastmaisiri.sigmasystems.co.zw/projects/box/' },
  { name: 'mixins', description: 'my mixins', codeUrl: 'https://github.com/LastMaisiri/mixins', demoUrl: 'http://lastmaisiri.sigmasystems.co.zw/projects/mixins-practice/' },
  { name: 'bootstrap-and-sass', description: 'SASS + Bootstrap site', codeUrl: 'https://github.com/LastMaisiri/bootstrap-and-sass', demoUrl: 'http://lastmaisiri.sigmasystems.co.zw/projects/sass-bootstrap/' },
  { name: 'age-check', description: 'my age check', codeUrl: 'https://github.com/LastMaisiri/age-check', demoUrl: 'http://lastmaisiri.sigmasystems.co.zw/projects/age-checker/' },
  { name: 'tip-calculator', description: 'tip calculator', codeUrl: 'https://github.com/LastMaisiri/tip-calculator', demoUrl: 'http://lastmaisiri.sigmasystems.co.zw/projects/tip-calculator/' },
  { name: 'loops', description: 'loops', codeUrl: 'https://github.com/LastMaisiri/loops', demoUrl: 'http://lastmaisiri.sigmasystems.co.zw/projects/array/' },
  { name: 'ludo-game', description: 'my ludo game', codeUrl: 'https://github.com/LastMaisiri/ludo-game', demoUrl: 'http://lastmaisiri.sigmasystems.co.zw/projects/ludo-game/' },
  { name: 'Mark-Down Studio', description: 'Markdown editor app', codeUrl: 'https://github.com/LastMaisiri/mark-down', demoUrl: 'https://meek-malabi-2b1f6e.netlify.app/' },
  { name: 'react-ludo-game', description: 'my react-ludo-game', codeUrl: 'https://github.com/LastMaisiri/ludo-react', demoUrl: 'https://velvety-gelato-43cfd4.netlify.app/' },
  { name: 'React-Bio', description: 'React-based bio project', codeUrl: 'https://github.com/LastMaisiri/first-react-app', demoUrl: 'https://lucky-tulumba-ac4075.netlify.app/' },
  { name: 'Git-Hub Finder', description: 'GitHub profile finder app', codeUrl: 'https://github.com/LastMaisiri/github-search', demoUrl: 'https://musical-frangollo-379e2b.netlify.app/' },
  { name: 'Ludo-game', description: 'Online Ludo game', codeUrl: 'https://github.com/LastMaisiri/ludo-game', demoUrl: 'https://velvety-gelato-43cfd4.netlify.app/' },
  { name: 'E-Commerce Project', description: 'Modern e-commerce web app', codeUrl: 'https://github.com/LastMaisiri/e-commerce', demoUrl: 'https://voluble-mermaid-b44a34.netlify.app/' }
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="section-title text-5xl font-bold mb-12">My Projects</h2>
        <div className="overflow-x-auto rounded-3xl border border-cyan-400/20">
          <table className="fancy-table w-full">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Description</th>
                <th className="text-center">View Code</th>
                <th className="text-center">Live Demo</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.name}>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td className="text-center"><a href={p.codeUrl} target="_blank" rel="noreferrer noopener" className="repo-link">View Code →</a></td>
                  <td className="text-center"><a href={p.demoUrl} target="_blank" rel="noreferrer noopener" className="repo-link">Live Demo →</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Projects;
