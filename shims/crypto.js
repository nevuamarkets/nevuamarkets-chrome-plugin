/* Browser stub for Node 'crypto' module providing randomInt */
export function randomInt(min, max) {
  const range = max - min;
  return Math.floor(Math.random() * range) + min;
}
export default { randomInt }; 