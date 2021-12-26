import {
	atom,
	
} from 'recoil';


const theme = atom({
	key: 'theme', // unique ID (with respect to other atoms/selectors)
	default: "light", // default value (aka initial value)
});

export {
    theme,
};