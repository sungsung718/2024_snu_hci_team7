declare module "path";

declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "use-react-screenshot" {
  type UseScreenshot = (options: {
    type: "image/jpeg" | "image/png";
    quality: number;
  }) => [string | null, (ref: HTMLDivElement) => void];
  declare const useScreenshot: UseScreenshot;
  declare const createFileName: (extension: string, name: string) => string;
  export { useScreenshot, createFileName };
}
