import CreateTaskPage from "@/components/create-task/CreateTask";
import TaskListPage from "@/components/task-list/TaskList";
import NavIllustrationBg from "@/components/ui/NavIllustrationBg";

const UserDashboard = () => {
    return (
        <div className="w-full">
           {/* <CreateTaskPage /> */}
           <TaskListPage />
        </div>
    )
}
export default UserDashboard;