import { SUCCESS } from "@/config/toast";
import toast from "react-hot-toast";

export const notify = (handler: string = SUCCESS, message: string) => {
    if (handler == SUCCESS) {
        toast.success(message, {
            duration: 3000,
            position: 'top-right',
        });
    }
    else {
        toast.error(message, {
            duration: 3000,
            position: 'bottom-right',
        });
    }
}