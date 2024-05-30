import toast, { DefaultToastOptions, Renderable, ToastOptions, ValueOrFunction } from "react-hot-toast";

export const useToast = () => {

    return {
        notify: (message: string, opt: ToastOptions = {}) => toast(message, opt),
        promise<T>(promise: Promise<T>, msgs: {
            loading: Renderable;
            success: ValueOrFunction<Renderable, T>;
            error: ValueOrFunction<Renderable, any>;
        }, opts?: DefaultToastOptions) {
            return toast.promise(promise, msgs, opts)
        }
    }
}