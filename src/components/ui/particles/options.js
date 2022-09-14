import theme from "../../../helpers/theme";

export const particleConfig = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 1000,
      },
    },
    color: {
      value: theme.palette.primary.main,
    },

    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 5,
      random: true,
      anim: {
        enable: false,
        speed: 80,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 400,
      color: "rgba(0,255,255,0.05)",
      opacity: 0.1,
      width: 2,
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 50,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 800,
        size: 20,
        duration: 2,
        opacity: 0.8,
        speed: 10,
      },
      repulse: {
        distance: 200,
        duration: 0.1,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
  fullScreen: { enable: false },
};
