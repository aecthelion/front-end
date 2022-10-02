import { motion } from 'framer-motion';

interface IFadeIn {
  children: JSX.Element | JSX.Element[];
  type: string;
}

const FadeIn = ({ children, type }: IFadeIn) => {
  return (
    <motion.div
      initial={type === 'default' ? 'hidden' : { x: '-100%' }}
      whileInView={type === 'default' ? 'visible' : { x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
