const userStore = (state = [], action) => {
	switch (action.type) {
		case "LOGGED_IN":
			return [...state];
		case "LOGGED_OUT":
			return [];
		default:
			return state;
	}
};

export default userStore;


