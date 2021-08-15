import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { Dispatch, FC, SetStateAction } from 'react';

import { ProjectDbRow } from '@/components/Projects';
import { useColorModeString } from '@/hooks/useColorModeString';
import { useDisclosure } from '@/hooks/useDisclosure';

type ProjectsMenuProps = {
  setSelectedProjectId: Dispatch<SetStateAction<number | null>>;
  selectedProjectColor: string;
  selectedProjectTitle: string;
  projects: ProjectDbRow[] | null | undefined;
};

export const ProjectsMenu: FC<ProjectsMenuProps> = ({
  setSelectedProjectId,
  selectedProjectTitle,
  selectedProjectColor,
  projects,
}) => {
  const { isOpen, open, close } = useDisclosure();
  const formatColor = useColorModeString();

  const handleProjectSelect = (id: null | number) => {
    setSelectedProjectId(id);
  };

  console.log('ProjectsMenu render');
  return (
    <Menu isLazy isOpen={isOpen} onClose={close}>
      <MenuButton
        as={Button}
        colorScheme={selectedProjectColor}
        rightIcon={<ChevronDownIcon />}
        onClick={open}
      >
        {selectedProjectTitle}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => handleProjectSelect(null)}>No project</MenuItem>
        <MenuDivider />
        {projects?.map((project: ProjectDbRow) => (
          <MenuItem
            key={project.id}
            color={formatColor(project.color_variant)}
            onClick={() => handleProjectSelect(project.id ?? null)}
          >
            <Box
              borderRadius="100%"
              w="10px"
              h="10px"
              bg={formatColor(project.color_variant)}
              mr={2}
            />
            {project.title}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
