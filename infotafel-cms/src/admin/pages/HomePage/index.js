import React from 'react';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Typography } from '@strapi/design-system/Typography';

const HomePage = () => {
  return (
    <HeaderLayout title="Custom Dashboard">
      <ContentLayout>
        <Typography variant="beta">Welcome to the Custom Dashboard</Typography>
        <Typography variant="epsilon">
          Here you can manage your data effectively!
        </Typography>
        {/* Add more components or content as needed */}
      </ContentLayout>
    </HeaderLayout>
  );
};

export default HomePage;
