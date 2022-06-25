import { toast } from 'react-toastify';

let toastOptions = {
    draggable: true,
    position: 'top-right',
};

export function toastSuccess(msg, opts) {
    toast.success(msg, Object.assign(toastOptions, { ...opts }));
}

export function toastError(msg, opts) {
    toast.error(msg, Object.assign(toastOptions, { ...opts }));
}

export function toastInfo(msg, opts) {
    toast.info(msg, Object.assign(toastOptions, { ...opts }));
}
