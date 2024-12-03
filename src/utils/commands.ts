import packageJson from '../../package.json';
import themes from '../../themes.json';
import { history } from '../stores/history';
import { theme } from '../stores/theme';

const hostname = window.location.hostname;

export const commands: Record<string, (args: string[]) => Promise<string> | string> = {
  about : () => `
+------------------------------------------------------+
|                   Sandro Barilla                     |
|------------------------------------------------------|
| 📕  23-year-old Multimedia student                   |
| 🌍  From Hasselt, studying at Erasmushogeschool      |
|      Brussel                                         |
| 🎓  Graduated in Applied Computer Science at        |
|      Hogeschool PXL Hasselt in 2022                  |
| 💻  Passionate about:                                |
|       • Cloud                                        |
|       • Automation                                   |
|       • Kubernetes                                   |
|       • IT as a whole                                |
+------------------------------------------------------+
`, 
  banner: () => `
███████╗ █████╗ ███╗   ██╗██████╗ ██████╗  ██████╗ 
██╔════╝██╔══██╗████╗  ██║██╔══██╗██╔══██╗██╔═══██╗
███████╗███████║██╔██╗ ██║██║  ██║██████╔╝██║   ██║
╚════██║██╔══██║██║╚██╗██║██║  ██║██╔══██╗██║   ██║
███████║██║  ██║██║ ╚████║██████╔╝██║  ██║╚██████╔╝
╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝ ╚═════╝  v1.0

Type 'help' to see list of available commands.
`,
  clear: () => {
    history.set([]);
    return '';
  },
  curl: async (args: string[]) => {
    if (args.length === 0) {
      return 'curl: no URL provided';
    }
    const url = args[0];
    try {
      const response = await fetch(url);
      const data = await response.text();
      return data;
    } catch (error) {
      return `curl: could not fetch URL ${url}. Details: ${error}`;
    }
  },
  date: () => new Date().toLocaleString(),
  echo: (args: string[]) => args.join(' '),
  emacs: () => `why use emacs? try 'vim'`, 
  email: () => {
    setTimeout(() => {
      window.open("mailto:sandrobarilla2001@gmail.com", '_blank');
    }, 500);
    return "Opening mailto:sandrobarilla2001@gmail.com ..";
  },
  exit: () => {
    return 'Please close the tab to exit.';
  },
  git: () => {
    setTimeout(() => {
      window.open("https://github.com/SandroBarillaPXL", '_blank');
    }, 500);
    return 'Opening repository...';
  },
  help: () => 'Available commands:\n' + Object.keys(commands).join('\n') + '\n\n[tab]\ttrigger completion. \n[ctrl+l]\tclear terminal.\n[ctrl+c]\tcancel command.',
  hostname: () => hostname,
  linkedin: () => {
    setTimeout(() => {    
      window.open("https://www.linkedin.com/in/sandrobarilla/", '_blank');
    }, 500);
    return 'Opening LinkedIn profile...';
  },
  projects: () => {
    return `Projects:
  - DevOps:     https://github.com/SandroBarillaPXL/expertlab-sprint1-devops
  - Scraper:    https://github.com/SandroBarillaPXL/expertlab-sprint2-scraping
  - Jukebox:    https://github.com/SandroBarillaPXL/expertlab-sprint3-jukebox
  - Kubernetes: https://github.com/SandroBarillaPXL/expertlab-sprint4-kubernetes`;
  },
  repo : () => {
    setTimeout(() => {
      window.open("https://github.com/m4tt72/terminal", '_blank');
    }, 500);
    return 'Opening repository...';
  },
  sudo: (args: string[]) => {
    setTimeout(() => {
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    }, 1500);
    return `Permission denied: unable to run the command '${args[0]}' as root.`;
  },
  theme: (args: string[]) => {
    const usage = `Usage: theme [args].
    [args]:
      ls: list all available themes
      set: set theme to [theme]

    [Examples]:
      theme ls
      theme set gruvboxdark
    `;
    if (args.length === 0) {
      return usage;
    }
    switch (args[0]) {
      case 'ls': {
        let result = themes.map((t) => t.name.toLowerCase()).join(', ');
        result += `You can preview all these themes here: ${packageJson.repository.url}/tree/master/docs/themes`;     
        return result;
      }
      case 'set': {
        if (args.length !== 2) {
          return usage;
        }
        const selectedTheme = args[1];
        const t = themes.find((t) => t.name.toLowerCase() === selectedTheme);
        if (!t) {
          return `Theme '${selectedTheme}' not found. Try 'theme ls' to see all available themes.`;
        }
        theme.set(t);
        return `Theme set to ${selectedTheme}`;
      }
      default: {
        return usage;
      }
    }
  },
  vi: () => `why use vi? try 'emacs'`,
  vim: () => `why use vim? try 'emacs'`,
  whoami: () => 'guest',
  weather: async (args: string[]) => {
    const city = args.join('+');
    if (!city) {
      return 'Usage: weather [city]. Example: weather Hasselt';
    }
    const weather = await fetch(`https://wttr.in/${city}?ATm`);
    return weather.text();
  },
};
