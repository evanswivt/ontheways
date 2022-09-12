import {toast, ToastOptions, ToastPosition} from "react-toastify";

export type toastPositionType = {
    BOTTOM_RIGHT: ToastPosition,
    BOTTOM_LEFT: ToastPosition,
}
const POSITIONS: toastPositionType = {
    'BOTTOM_RIGHT': toast.POSITION.BOTTOM_RIGHT,
    'BOTTOM_LEFT': toast.POSITION.BOTTOM_LEFT,
}

const Notification = {
    success: (message: string, position?: ('BOTTOM_RIGHT' | 'BOTTOM_LEFT'), options?: ToastOptions<{}> | undefined) =>{
        toast.success(message,{
            position: position? POSITIONS[position] : toast.POSITION.BOTTOM_RIGHT,
                ...options
        })
    },

    error: (message: string, position?: ('BOTTOM_RIGHT' | 'BOTTOM_LEFT' | undefined)) =>{
        toast.error(message,{
            position: position? POSITIONS[position] : toast.POSITION.BOTTOM_RIGHT
        })
    },

    info: (message: string, position?: ('BOTTOM_RIGHT' | 'BOTTOM_LEFT' | undefined)) =>{
        toast.info(message,{
            position: position? POSITIONS[position] : toast.POSITION.BOTTOM_RIGHT
        })
    }
}

export default Notification;