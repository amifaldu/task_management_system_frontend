import TaskList from '../components/TaskList';
import CreateTask from '../components/CreateTask';
import EditTask from '../components/EditTask';

export const routes = [
  { path: '/', element: <TaskList /> },
  { path: '/create', element: <CreateTask /> },
  { path: '/edit/:id', element: <EditTask /> },
];