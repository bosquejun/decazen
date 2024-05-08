import clsx from 'clsx';

interface Props {
    color?: string;
    size?: number
    className?: string;
}

export const MotorIcon = ({ color, size = 24, className }: Props) => {
    return (
        <svg className={clsx("text-foreground stroke-current", className)} fill='currentColor' height={size + "px"} width={size + "px"} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <g>
                <g>
                    <path d="M256,345.043c-27.619,0-50.087,22.468-50.087,50.087v66.783C205.913,489.532,228.381,512,256,512
			s50.087-22.468,50.087-50.087V395.13C306.087,367.511,283.619,345.043,256,345.043z"/>
                </g>
            </g>
            <g>
                <g>
                    <path d="M422.957,66.783h-85.161C330.04,28.724,296.316,0,256,0s-74.04,28.724-81.795,66.783H89.044
			c-9.217,0-16.696,7.473-16.696,16.696s7.479,16.696,16.696,16.696h85.161c3.612,17.723,12.915,33.352,25.833,45.068
			c-54.187,22.761-92.439,76.395-92.439,138.584V404.37c0,22.521,18.315,40.848,40.836,40.848h24.087V395.13
			c0-46.032,37.446-83.478,83.478-83.478s83.478,37.446,83.478,83.478v50.087h25.935c22.521,0,40.848-18.326,40.848-40.848V283.826
			c0-62.655-38.855-116.587-93.788-139.048c12.652-11.665,21.759-27.115,25.323-44.604h85.161c9.217,0,16.696-7.473,16.696-16.696
			S432.174,66.783,422.957,66.783z M256,133.565c-27.619,0-50.087-22.468-50.087-50.087S228.381,33.391,256,33.391
			s50.087,22.468,50.087,50.087S283.619,133.565,256,133.565z"/>
                </g>
            </g>
        </svg>
    );
};
