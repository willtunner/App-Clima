export function condition(condition) {
  switch (condition) {
    case "storm":
      return (icon = {
        name: "thunderstorm-sharp",
        color: "#727CF5",
      });
      break;
    case "clear_day":
      return (icon = {
        name: "partly-sunny-outline",
        color: "#FFB300",
      });
      break;
    case "rain":
      return (icon = {
        name: "rainy-outline",
        color: "#160D44",
      });
      break;
    case "clear_night":
        return (icon = {
            name: "cloudy-night",
            color: "#191A21",
          });
          break;
    default:
      return (icon = {
        name: "rainy-outline",
        color: "#1ec9ff",
      });
  }
}