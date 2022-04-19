export const LocationIcon = ({ size, color, className }) => {
    return (
        <svg
            height={size}
            width={size}
            viewBox="0 0 30 30"
            color={color}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>Location</title>
            <g fill="currentColor">
                <path d="M15,2C8.925,2,4,6.925,4,13c0,7.234,7.152,10.697,8.048,11.503c0.915,0.823,1.671,2.668,1.976,3.714 c0.148,0.508,0.564,0.765,0.976,0.776c0.413-0.012,0.828-0.269,0.976-0.776c0.305-1.046,1.061-2.89,1.976-3.714 C18.848,23.697,26,20.234,26,13C26,6.925,21.075,2,15,2z M15,16c-1.657,0-3-1.343-3-3s1.343-3,3-3s3,1.343,3,3S16.657,16,15,16z" />
            </g>
        </svg>
    );
};

export const StarIcon = ({ size, color, className }) => {
    return (
        <svg
            height={size}
            width={size}
            viewBox="0 0 30 30"
            color={color}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>Star</title>
            <g fill="currentColor">
                <path d="M15.765,2.434l2.875,8.512l8.983,0.104c0.773,0.009,1.093,0.994,0.473,1.455l-7.207,5.364l2.677,8.576 c0.23,0.738-0.607,1.346-1.238,0.899L15,22.147l-7.329,5.196c-0.63,0.447-1.468-0.162-1.238-0.899l2.677-8.576l-7.207-5.364 c-0.62-0.461-0.3-1.446,0.473-1.455l8.983-0.104l2.875-8.512C14.482,1.701,15.518,1.701,15.765,2.434z" />
            </g>
        </svg>
    );
};
