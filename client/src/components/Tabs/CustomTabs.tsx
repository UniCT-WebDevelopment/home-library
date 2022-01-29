import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';

export interface TabPanel {
  label: string;
  component: React.ReactNode;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanelItem = ({ children, value, index, ...other }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ paddingTop: 2 }}>{children}</Box>}
    </div>
  );
};

interface CustomTabsProps {
  tabs: TabPanel[];
}
const CustomTabs = ({ tabs }: CustomTabsProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderTabsLabel = () => {
    return tabs.map((tab: TabPanel, index: number) => {
      return <Tab label={tab.label} key={index} />;
    });
  };

  const renderTabsComponent = () => {
    return tabs.map((tab: TabPanel, index: number) => {
      return (
        <TabPanelItem value={value} index={index} key={index}>
          {tab.component}
        </TabPanelItem>
      );
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          {renderTabsLabel()}
        </Tabs>
      </Box>
      {renderTabsComponent()}
    </Box>
  );
};

export default CustomTabs;
