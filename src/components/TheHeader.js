import "./TheHeader.css";

const TheHeader = (props) => {
	return (
		<header>
			<h2>GAME points</h2>
			<div className="game_points">
				<div className={props.userToServe == 0 ? `serving user_points` : `user_points`}>
					<span>{props.user1.name}</span>
					<span>{props.user1.points}</span>
				</div>
				<div className={props.userToServe == 1 ? `serving user_points` : `user_points`}>
					<span>{props.user2.name}</span>
					<span>{props.user2.points}</span>
				</div>
			</div>

			{/* <button>Start the game</button> */}
		</header>
	);
};

export default TheHeader;
