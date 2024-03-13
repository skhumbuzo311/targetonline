import React, { createContext, useEffect } from 'react';

export const CurrentUserContext = createContext<any>({})

export default function Store(props: any) {
	const [currentUser, setCurrentUser] = React.useState({});

	useEffect(() => {
		const localStorageUser = localStorage.getItem('targetOnlineUser')

		if (localStorageUser != null) setCurrentUser(JSON.parse(localStorageUser))
	}, [])

	return (
		<CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
			{props.children}
		</CurrentUserContext.Provider>
	);
};