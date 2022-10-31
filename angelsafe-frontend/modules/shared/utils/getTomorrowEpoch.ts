export function getTomorrowEpoch() {
  const today = new Date();
  const reset = today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(reset);
  const epoch = tomorrow.setDate(tomorrow.getDate() + 1);

  return epoch;
}
