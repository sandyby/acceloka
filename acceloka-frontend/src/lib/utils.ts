export function fetchDataSimulated(duration: number = 2000) {
  return new Promise((resolve) => {
    console.log("simulation: fetching data...");
    setTimeout(() => {
      resolve({ message: "simulation: data fetched successfully!" });
    }, duration);
  });
}
