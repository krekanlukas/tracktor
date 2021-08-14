import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { Dispatch, FC, SetStateAction, useState } from 'react';

import { LoadingFallback } from '@/components/Common';
import { ProjectDbRow } from '@/components/Projects';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useFetchRows } from '@/hooks/useFetchRows';

type ProjectsMenuProps = {
  setSelectedProjectId: Dispatch<SetStateAction<number | null>>;
  setIsBillable: Dispatch<SetStateAction<boolean>>;
};

export const ProjectsMenu: FC<ProjectsMenuProps> = ({ setSelectedProjectId, setIsBillable }) => {
  const { isOpen, open, close } = useDisclosure();
  const { data, isLoading } = useFetchRows('projects');
  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string>('No project');
  const [selectedProjectColor, setSelectedProjectColor] = useState<string>('gray');

  const handleProjectSelect = (
    title: string,
    id: null | number,
    color: string,
    isBillable?: boolean
  ) => {
    setSelectedProjectTitle(title);
    setSelectedProjectId(id);
    setSelectedProjectColor(color);
    if (isBillable !== undefined) setIsBillable(isBillable);
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
        <MenuItem onClick={() => handleProjectSelect('No project', null, 'gray', false)}>
          No project
        </MenuItem>
        <MenuDivider />
        {isLoading ? (
          <LoadingFallback />
        ) : (
          data?.map((project: ProjectDbRow) => (
            <MenuItem
              key={project.id}
              color={project.color_variant}
              onClick={() =>
                handleProjectSelect(
                  project.title,
                  project.id ?? null,
                  project.color_variant,
                  project.is_billable
                )
              }
            >
              <Box borderRadius="100%" w="10px" h="10px" bg={project.color_variant} mr={2} />
              {project.title}
            </MenuItem>
          ))
        )}
      </MenuList>
    </Menu>
  );
};
