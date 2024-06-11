import moment from "moment";
import { useEffect, useState } from "react";


type userTimerProps = {
    format?: string,
    isPaused?: boolean
}

export const useTimer = (props: userTimerProps) => {
    const { format, isPaused } = {
        ...props,
        format: "MMMM Do YYYY, h:mm:ss a",
    }
    const [time, setTime] = useState(moment().format(format));


    useEffect(() => {
        const timer = setInterval(() => {
            if (!isPaused) {
                setTime(moment().format(format));
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [isPaused]);

    return time;
}