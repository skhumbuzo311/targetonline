import { toast } from "react-toastify";

export function NotifyFailure(e: any, defaultMessage: string){
    if(e && e.data && e.data.errorMessages) {
        e.data.errorMessages.forEach((message: string) => {
            toast.error(message);
        });
    }
    else toast.error(defaultMessage)
}

export default NotifyFailure;