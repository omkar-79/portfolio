interface VantaNetInstance {
  destroy: () => void;
}

interface VantaNetConfig {
  el: HTMLElement | null;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
  minHeight?: number;
  minWidth?: number;
  scale?: number;
  scaleMobile?: number;
  color?: number;
  backgroundColor?: number;
  points?: number;
  maxDistance?: number;
  spacing?: number;
}

interface Window {
  VANTA: {
    NET: (config: VantaNetConfig) => VantaNetInstance;
  };
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