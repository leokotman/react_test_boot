import { useState, useEffect } from "react";

const Points = (props) => {
	const [usersByPoints, setUsersByPoints] = useState([]);

	useEffect(() => {
		filterByPoints();
	}, [props.gameOver]);

	const filterByPoints = () => {
		let sortedArray = props.allUsers.sort((first, second) => first.points - second.points);
		setUsersByPoints(sortedArray);
	};

	return (
		<article>
			<h3>Winners by points:</h3>
			{usersByPoints.map((user) => {
				return (
					<div key={user.name}>
						<span>{user.name}</span> - <span>{user.points}</span>
					</div>
				);
			})}
		</article>
	);
};

export default Points;