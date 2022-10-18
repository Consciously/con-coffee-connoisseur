import { useState, useEffect, useContext } from 'react';
import { ACTION_TYPES } from '../store/coffeeStore-types';
import { CoffeeStoreContext } from '../store/coffeeStore-context';
const useTrackLocation = () => {
	const { dispatch } = useContext(CoffeeStoreContext);
	const [locationErrorMsg, setLocationErrorMsg] = useState('');
	// const [latLong, setLatLong] = useState('');
	const [isFindingLocation, setIsFindingLocation] = useState(false);
	const getPosition = position => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;

		// setLatLong(`${latitude},${longitude}`);

		dispatch({
			type: ACTION_TYPES.SET_LAT_LONG,
			payload: { latLong: `${latitude},${longitude}` },
		});
	};

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getPosition);
		} else {
			setLocationErrorMsg('Geolocation is not supported by your browser');
			setIsFindingLocation(false);
		}
	}, []);

	return {
		// latLong,
		locationErrorMsg,
		setLocationErrorMsg,
		isFindingLocation,
		setIsFindingLocation,
	};
};

export default useTrackLocation;
