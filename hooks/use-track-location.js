import { useState, useEffect } from 'react';

const useTrackLocation = () => {
	const [locationErrorMsg, setLocationErrorMsg] = useState('');
	const [latLong, setLatLong] = useState('');
	const [isFindingLocation, setIsFindingLocation] = useState(false);
	const getPosition = position => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;

		setLatLong(`${latitude},${longitude}`);
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
		latLong,
		locationErrorMsg,
		setLocationErrorMsg,
		isFindingLocation,
		setIsFindingLocation,
	};
};

export default useTrackLocation;
