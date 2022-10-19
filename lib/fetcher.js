export const fetcher = async url => {
	const response = await fetch(url);
	return response.json();
};
