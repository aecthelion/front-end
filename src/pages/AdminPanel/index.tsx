import { Tabs, Tab, Paper } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import Layout from './../../layout/index';
import CoursesTab from './Courses';
import UsersTab from './Users';

const tabs = ['Users', 'Courses'];

const tabsComponents = [<UsersTab />, <CoursesTab />];

const AdminPanel = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <Container maxWidth={'xl'}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            marginBottom: '15px',
          }}
        >
          {tabs.map((tab) => (
            <Tab
              sx={{
                fontWeight: 'bold',
              }}
              key={tab}
              label={tab}
            />
          ))}
        </Tabs>
        <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '12px' }}>
          {tabsComponents[value]}
        </Paper>
      </Container>
    </Layout>
  );
};

export default AdminPanel;
