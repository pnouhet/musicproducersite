// Déclarations de modules pour les imports de fichiers de style à effet de bord
declare module "*.css";
declare module "shader-art";
declare module "@shader-art/plugin-uniform";

// Librairies dont les types ne sont pas résolus via leur champ "exports"
declare module "shader-art";
declare module "@shader-art/plugin-uniform";

// Élément custom <shader-art> utilisé dans LiquidBackground
declare namespace React.JSX {
  interface IntrinsicElements {
    "shader-art": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      autoplay?: boolean;
    };
  }
}
