interface Window {
  VANTA: {
    NET: (config: any) => any;
  }
}

declare module 'vanta/dist/vanta.waves.min' {
  interface VantaWavesConfig {
    el: HTMLElement;
    mouseControls: boolean;
    touchControls: boolean;
    gyroControls: boolean;
    minHeight: number;
    minWidth: number;
    scale: number;
    scaleMobile: number;
    color: string;
    backgroundColor: string;
  }

  function WAVES(config: VantaWavesConfig): void;
  export default WAVES;
}