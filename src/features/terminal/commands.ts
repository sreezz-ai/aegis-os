import { SITE } from "@/constants/site";
import { ROUTES } from "@/constants/routes";

export interface TerminalCommandResult {
  lines: string[];
  navigateTo?: string;
  clear?: boolean;
}

const ASCII_LOGO = [
  "    _    _____ ____ ___ ____    ___  ____  ",
  "   / \\  | ____/ ___|_ _/ ___|  / _ \\/ ___| ",
  "  / _ \\ |  _|| |  _ | |\\___ \\ | | | \\___ \\ ",
  " / ___ \\| |__| |_| || | ___) || |_| |___) |",
  "/_/   \\_\\_____\\____|___|____/  \\___/|____/ ",
];

export function runTerminalCommand(rawInput: string): TerminalCommandResult {
  const input = rawInput.trim();
  const [command, ...args] = input.split(/\s+/);

  switch (command?.toLowerCase()) {
    case "":
      return { lines: [] };
    case "help":
      return {
        lines: [
          "Available commands:",
          "  help            show this list",
          "  whoami          who runs this system",
          "  projects        list featured projects",
          "  skills          list skill categories",
          "  resume          open the resume page",
          "  contact         open the contact page",
          "  history         show command history",
          "  clear           clear the terminal",
          "  ascii           print the AEGIS OS logo",
          "  sudo hire sreelesh   ;)",
          "  exit            close the terminal",
        ],
      };
    case "whoami":
      return { lines: [`${SITE.owner} — ${SITE.role}`, SITE.location] };
    case "projects":
      return { lines: ["Opening projects...       "], navigateTo: ROUTES.projects };
    case "skills":
      return { lines: ["Opening skills...         "], navigateTo: ROUTES.skills };
    case "resume":
      return { lines: ["Opening resume...         "], navigateTo: ROUTES.resume };
    case "contact":
      return { lines: ["Opening contact...        "], navigateTo: ROUTES.contact };
    case "ascii":
      return { lines: ASCII_LOGO };
    case "clear":
      return { lines: [], clear: true };
    case "sudo":
      if (args.join(" ").toLowerCase() === "hire sreelesh") {
        return { lines: ["Permission granted.", "Best decision you'll make this quarter."] };
      }
      return { lines: [`sudo: ${args.join(" ")}: command not found`] };
    case "exit":
      return { lines: ["Closing terminal..."] };
    default:
      return { lines: [`command not found: ${command}`, "type 'help' for a list of commands"] };
  }
}
