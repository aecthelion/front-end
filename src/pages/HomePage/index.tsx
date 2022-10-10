import { Container } from '@mui/material';
import React from 'react';
import Header from './header';
import JobHelpSection from './jobHelpSection';
import MainSection from './mainSection';
import BenefitsSection from './benefitsSections';
import CoursesSection from './coursesSection';
import SalarySection from './salarySection';
import { AnimatePresence, motion } from 'framer-motion';
import QuestionsSection from './questionsSection';
import Footer from './footer';

const HomePage: React.FC = () => {
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          overflow: 'hidden',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
          >
            <header>
              <Header />
            </header>
            <MainSection />
            <BenefitsSection />
            <CoursesSection />
            <JobHelpSection />
            <SalarySection />
            <QuestionsSection />
          </motion.div>
        </AnimatePresence>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
