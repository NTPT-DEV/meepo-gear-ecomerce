import {useTaskStore } from '@/app/test-code/taskStoreTest'
const TaskList = () => {
 const tasks = useTaskStore((state) => state.tasks)
 const addTask = useTaskStore((state) => state.addTask)
 const removeTask = useTaskStore((state) => state.removeTask)
 const toggleTask = useTaskStore((state) => state.toggleTask)
 console.log(tasks , addTask , removeTask , toggleTask);
  return (
    <div>TaskList</div>
  )
}
export default TaskList