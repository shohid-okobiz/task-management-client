import CreateTaskPage from "@/app/(UserLayout)/user-dashboard/create-task/page";
import TaskListPage from "@/components/task-list/TaskList";
import NavIllustrationBg from "@/components/ui/NavIllustrationBg";

const UserDashboard = () => {
    return (
        <div className="w-full">

            <TaskListPage />
        </div>
    )
}
export default UserDashboard;