// hooks/useApolloCache.js
import { GET_TASKS } from '../graphql/queries';

/**
 * Custom hook for Apollo cache operations
 * @returns {Object} - Cache utility functions
 */
export const useApolloCache = () => {
  /**
   * Add a new task to the cache
   * @param {Object} cache - Apollo cache instance
   * @param {Object} newTask - The task to add
   */
  const addTaskToCache = (cache, newTask) => {
    try {
      const existingTasks = cache.readQuery({ query: GET_TASKS });
      cache.writeQuery({
        query: GET_TASKS,
        data: {
          tasks: [...(existingTasks?.tasks || []), newTask]
        }
      });
    } catch (error) {
      console.error('Error adding task to cache:', error);
    }
  };

  /**
   * Update an existing task in the cache
   * @param {Object} cache - Apollo cache instance
   * @param {Object} updatedTask - The updated task
   */
  const updateTaskInCache = (cache, updatedTask) => {
    try {
      const existingTasks = cache.readQuery({ query: GET_TASKS });
      if (existingTasks?.tasks) {
        cache.writeQuery({
          query: GET_TASKS,
          data: {
            tasks: existingTasks.tasks.map(task =>
              task.id === updatedTask.id ? updatedTask : task
            )
          }
        });
      }
    } catch (error) {
      console.error('Error updating task in cache:', error);
    }
  };

  /**
   * Remove a task from the cache
   * @param {Object} cache - Apollo cache instance
   * @param {string} taskId - The ID of the task to remove
   */
  const removeTaskFromCache = (cache, taskId) => {
    try {
      const existingTasks = cache.readQuery({ query: GET_TASKS });
      if (existingTasks?.tasks) {
        cache.writeQuery({
          query: GET_TASKS,
          data: {
            tasks: existingTasks.tasks.filter(task => task.id !== taskId)
          }
        });
      }
    } catch (error) {
      console.error('Error removing task from cache:', error);
    }
  };

  return {
    addTaskToCache,
    updateTaskInCache,
    removeTaskFromCache
  };
};