import { interpolateRgb } from 'd3-interpolate';

export function speak(text: string, rate: number = 1.3, lang: string = 'pt-BR') {
  if (!text) return;
  const synth = window.speechSynthesis;
  if (!synth) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;
  synth.speak(utterance);
}

export function getProgressColor(percentage: number): string {
  const startColor = 'rgb(0, 155, 222)';
  const endColor = 'rgb(255, 0, 0)';

  if (percentage < 0) percentage = 0;
  if (percentage > 100) percentage = 100;

  const progressRatio = 1 - percentage / 100;

  const colorInterpolator = interpolateRgb(startColor, endColor);

  return colorInterpolator(progressRatio); 
}