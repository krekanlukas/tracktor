import { useToast } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';

import { ContentTopbar, LoadingFallback } from '@/components/Common';
import { ProjectDbRow } from '@/components/Projects';
import { NewTimeEntry, Timer, ProjectsMenu, getFormattedDistance } from '@/components/Timer';
import { useLanguage } from '@/context/LanguageContext';
import { useActiveTimeEntry } from '@/hooks/useActiveTimeEntry';
import { useFetchRows } from '@/hooks/useFetchRows';
import { TimeEntryDbRow, useInsertRow } from '@/hooks/useInsertRow';
import { useUpdateRow } from '@/hooks/useUpdateRow';

export const TimerActions: FC = () => {
  const { data: projects, isLoading: isProjectsLoading } = useFetchRows('projects');
  const { data: activeTimeEntry, isLoading: isActiveProjectLoading } = useActiveTimeEntry();
  const { t } = useLanguage();
  // TODO: Maybe refactor to one state with 'time entry row' object.
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    activeTimeEntry?.project_id ?? null
  );
  const [selectedProjectColor, setSelectedProjectColor] = useState('gray');
  const [selectedProjectTitle, setSelectedProjectTitle] = useState(t('No project'));
  const [isBillable, setIsBillable] = useState(activeTimeEntry?.is_billable ?? false);
  const [taskDescription, setTaskDescription] = useState(activeTimeEntry?.description ?? '');
  const addTimeEntry = useInsertRow('time_entries', 'active_time_entry');
  const editTimeEntry = useUpdateRow('time_entries', ['active_time_entry', 'time_entries']);
  const toast = useToast();

  const filterProjectById = useCallback(
    (id: number | null): ProjectDbRow | undefined => {
      return projects?.filter((project: ProjectDbRow) => project.id === id)[0];
    },
    [projects]
  );

  const handleCreateTimeEntry = async () => {
    const mutateObject = {
      start: new Date(),
      project_id: selectedProjectId,
      description: taskDescription,
      is_billable: isBillable,
      stop: null,
      duration: null,
    };
    try {
      await addTimeEntry.mutateAsync(mutateObject);
      toast({
        status: 'success',
        duration: 9000,
        isClosable: true,
        title: t('Time entry started'),
      });
    } catch (error) {
      toast({
        status: 'error',
        duration: 9000,
        isClosable: true,
        title: t('Error starting time entry'),
        description: error?.message,
      });
    }
  };

  const handleEditTimeEntry = async () => {
    if (activeTimeEntry?.id) {
      const duration = new Date().getTime() - new Date(activeTimeEntry.start).getTime();
      const mutationObject: TimeEntryDbRow = {
        ...activeTimeEntry,
        start: activeTimeEntry.start,
        project_id: selectedProjectId,
        description: taskDescription,
        is_billable: isBillable,
        stop: new Date(),
        duration: duration,
      };
      try {
        await editTimeEntry.mutateAsync({
          updatedRow: mutationObject,
          idValue: activeTimeEntry?.id,
        });
        toast({
          status: 'success',
          duration: 9000,
          isClosable: true,
          title: t('Time entry stopped'),
        });
        setSelectedProjectId(null);
        setTaskDescription('');
      } catch (error) {
        toast({
          status: 'error',
          duration: 9000,
          isClosable: true,
          title: t('Error stopping time entry'),
          description: error.message,
        });
      }
    } else {
      toast({
        status: 'error',
        duration: 9000,
        isClosable: true,
        title: t('Error stopping time entry'),
      });
    }
  };

  const isLoading = isActiveProjectLoading || addTimeEntry.isLoading || editTimeEntry.isLoading;

  useEffect(() => {
    const selectedProject = filterProjectById(selectedProjectId);
    setSelectedProjectColor(selectedProject?.color_variant ?? 'gray');
    setSelectedProjectTitle(selectedProject?.title ?? 'No project');
    setIsBillable(selectedProject?.is_billable ?? false);
    console.log('TimerActions commit');
  }, [filterProjectById, selectedProjectId]);

  useEffect(() => {
    const timerId =
      activeTimeEntry &&
      setInterval(() => {
        document.title = getFormattedDistance(new Date(activeTimeEntry.start)) + ' | Tractor';
      }, 1000);
    console.log('TimerActions interval commit');
    return () => {
      if (timerId) clearInterval(timerId);
      document.title = 'Tractor';
      console.log('TimerActions interval unmnount');
    };
  }, [activeTimeEntry]);

  console.log('TimerActions render', activeTimeEntry);
  return (
    <>
      <ContentTopbar>
        {isLoading ? (
          <LoadingFallback />
        ) : (
          <NewTimeEntry
            isBillable={isBillable}
            setIsBillable={setIsBillable}
            taskDescription={taskDescription}
            setTaskDescription={setTaskDescription}
            isActiveTimeEntry={Boolean(activeTimeEntry)}
            handleCreateTimeEntry={handleCreateTimeEntry}
            handleEditTimeEntry={handleEditTimeEntry}
          >
            {isProjectsLoading ? (
              <LoadingFallback />
            ) : (
              <ProjectsMenu
                setSelectedProjectId={setSelectedProjectId}
                selectedProjectColor={selectedProjectColor}
                selectedProjectTitle={selectedProjectTitle}
                projects={projects}
              />
            )}
          </NewTimeEntry>
        )}
      </ContentTopbar>
      <Timer
        description={taskDescription}
        projectTitle={selectedProjectTitle}
        colorVariant={selectedProjectColor}
        isLoading={isLoading}
        start={activeTimeEntry?.start}
      />
      {/* <ProgressBar
        projects={[{ percentage: 50, title: 'polovica', colorVariant: 'green', duration: 15000 }]}
      /> */}
    </>
  );
};
