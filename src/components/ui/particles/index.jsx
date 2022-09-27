import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import { particleConfig } from "./options";

const CustomParticles = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particleConfig}
      style={{
        position: "absolute",
        height: "40vh",
      }}
    />
  );
};

export default CustomParticles;
