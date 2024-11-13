import React from "react";
import { Box, Card, Flex, Text, Skeleton } from '@radix-ui/themes';

type ModuleCardProps = {
  title: string;
  description: string;
};

const ModuleCard: React.FC<ModuleCardProps> = ({ title, description }) => {
  return (
    <div className="w-[300px]">
      <Flex direction="column" justify='between'>
          <Box>
            <Skeleton width="100%" height="200px" />
            <Text as="div" size="5" weight="bold" wrap='pretty' className="mt-1">
              {title}
            </Text>
            <Text as="div" size="2" color="gray" wrap='pretty'>
              {description} 
            </Text>
          </Box>
        </Flex>
    </div>
  );
};

export default ModuleCard;
