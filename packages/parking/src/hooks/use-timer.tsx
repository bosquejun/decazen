import moment from "moment";
import { useEffect, useState } from "react";




export const useTimer = (format = "MMMM Do YYYY, h:mm:ss a") => {
    const [time, setTime] = useState(moment().format(format));

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(moment().format(format));
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return time;
}