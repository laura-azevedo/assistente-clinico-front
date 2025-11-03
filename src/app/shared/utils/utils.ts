export function speak(text: string, rate: number = 1.3, lang: string = 'pt-BR') {
  if (!text) return;
  const synth = window.speechSynthesis;
  if (!synth) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;
  synth.speak(utterance);
}
