import { animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import SectionTitle from '../sectionTitle';

interface IAnimatedCounter {
  from: number;
  to: number;
  InView: boolean;
}

const AnimatedCounter = ({ from, to, InView }: IAnimatedCounter) => {
  const [count, setCount] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (InView) {
      setIsStarted(true);
    }
  }, [InView]);

  useEffect(() => {
    if (isStarted && count !== to) {
      const controls = animate(from, to, {
        duration: 4,
        onUpdate(value) {
          setCount(value);
        },
      });

      return () => controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to, isStarted]);
  return <SectionTitle title="" type="" spanText={`< ${Math.round(count)}$`} />;
};

export default AnimatedCounter;
