
   
import Lottie from 'react-lottie-player';
import loading from './lottieFiles/loading.json';
import done from './lottieFiles/done.json';

export const Loading = ({size}) => {
    return (
        <Lottie
            loop
            animationData={loading}
            play
            style={{ height: (size ? size : "25px"), width: (size ? size : "25px") }}
            speed={1}
        />
    );
};

export const Done = ({size}) => {
    return (
        <Lottie
            animationData={done}
            style={{ height: (size ? size : "25px"), width: (size ? size : "25px") }}
            speed={0.5}
            play={true}
            loop={false}
        />
    );
};