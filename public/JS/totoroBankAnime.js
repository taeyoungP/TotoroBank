// Animate the title
anime({
  targets: "#TotoroBank",
  translateY: [-100, 0],
  opacity: [0, 1],
  duration: 1000,
  easing: "easeOutExpo",
});

// Animate the icon
anime({
  targets: "#totoro-icon",
  scale: [0, 1],
  opacity: [0, 1],
  duration: 1000,
  delay: 500,
  easing: "easeOutExpo",
});
