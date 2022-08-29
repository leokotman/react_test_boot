// import db from "./firebase";
import { useState, useEffect } from "react";
import "./App.css";
import LeaderBoard from "./components/LeaderBoard";
import TheHeader from "./components/TheHeader";

function App() {
	const [user1, setUser1] = useState({
		name: "",
		points: 0,
		wins: 0
	});
	const [user2, setUser2] = useState({
		name: "",
		points: 0,
		wins: 0
	});

	const [allUsers, setAllUsers] = useState([]);
	const [currentUsers, setCurrentUsers] = useState([]);

	const [gameOn, setGameOn] = useState(false);
	const [gameOver, setGameOver] = useState(false);

	const [serverChoice, setServerChoice] = useState(false);
	const [userToServe, setUserToServe] = useState(0);

	useEffect(() => {
		if (user1.points !== 0 || user2.points !== 0) {
			if ((user1.points + user2.points) % 2 === 0) {
				setUserToServe((prev) => {
					if (prev == 0) {
						return "1";
					} else {
						return "0";
					}
				});
			}
			if (user1.points >= 11 || user2.points >= 11) {
				findWinner();
			}
		}
	}, [user1.points, user2.points]);

  useEffect(() => {
    if(gameOver === true) {
      setCurrentUsers(prevState => prevState);
    }
  }, [gameOver]);

  const addToCurrentUsers = (user) => {
    setCurrentUsers(users =>{ return [...users, user]});
  };

	const findUserInDB = (currentUser) => {
		let userFromDB = allUsers.find((user) => user.name === currentUser.name);
		let userFromCurrentGame = currentUsers.find((user) => user.name === currentUser.name);

		if (userFromDB !== undefined) {
			setCurrentUsers((currentUsers) => {
				return [
					...currentUsers,
          Object.assign(userFromCurrentGame, {
						name: currentUser.name,
						wins: userFromDB.wins
					})
				];
			});
		} else if (userFromDB === undefined) {
      addToCurrentUsers(currentUser);
			setAllUsers((allUsers) => {
				return [
					...allUsers,
					{
						name: currentUser.name,
						wins: currentUser.wins,
						points: currentUser.points
					}
				];
			});
		}
	};

	const addUsers = () => {
    if(user1.name !== "" && user2.name !== "") {
      findUserInDB(user1);
		  findUserInDB(user2);
		  showServerChoice(true);
    };
	};

  const resetCurrentUsers = () => {
    setUser1(prevUser => { return {...prevUser, name: ""}});
    setUser2(prevUser => { return {...prevUser, name: ""}});
  }

	const startTheGame = () => {
		gameOnOff(true);
		setGameOver(false);
		clearPoints();
		showServerChoice(false);
	};

	const gameOnOff = (bool) => {
		setGameOn(bool);
	};

	const showServerChoice = (bool) => {
		setServerChoice(bool);
	};

	const clearPoints = () => {
		setUser1((prev) => {
			return {
				...prev,
				points: 0
			};
		});
		setUser2((prev) => {
			return {
				...prev,
				points: 0
			};
		});
	};

	const addPointUser1 = () => {
		setUser1((user1) => {
			return {
				...user1,
				points: user1.points++
			};
		});
	};
	const addPointUser2 = () => {
		setUser2((user2) => {
			return {
				...user2,
				points: user2.points++
			};
		});
	};
	const chooseUserToServe = (e) => {
		setUserToServe(e.target.value);
	};

	const findWinner = () => {
		if (user1.points >= 11 && user1.points - user2.points >= 2) {
			console.log(user1.name, " wins!");
			gameOnOff(false);
			setGameOver(true);
      updateLeaderBoard(user1);
      resetCurrentUsers();
		} else if (user2.points >= 11 && user2.points - user1.points >= 2) {
			console.log(user2.name, " wins!");
			gameOnOff(false);
			setGameOver(true);
      updateLeaderBoard(user2);
      resetCurrentUsers();
		}
	};

	const findUserInputClass = () => {
		if (currentUsers.length > 0 && gameOver === false) {
			return "hidden";
		} else if (currentUsers.length > 0 && gameOver === true) {
			return "shown";
		}
	};

	const updateLeaderBoard = (userWinner) => {
		const winnerIndex = allUsers.findIndex(user => user.name === userWinner.name);
    setAllUsers((allUsers) => {
      return [
        ...allUsers.slice(0, winnerIndex),
        {
          name: userWinner.name,
          wins: allUsers[winnerIndex].wins + 1,
          points: allUsers[winnerIndex].points + userWinner.points
        },
        ...allUsers.slice(winnerIndex + 1)
      ];
    });
	};

	return (
		<div className="App">
			<h1>PING PONG points manager</h1>

			<TheHeader user1={user1} user2={user2} userToServe={userToServe} />

			<section>
				<div className={findUserInputClass()}>
					<p>Enter your names:</p>
					<input
						type="text"
						aria-label="user_input"
						value={user1.name}
						onChange={(e) =>
							setUser1((user1) => {
								return { ...user1, name: e.target.value };
							})
						}
					/>
					<input
						type="text"
						aria-label="user_input"
						value={user2.name}
						onChange={(e) =>
							setUser2((user2) => {
								return { ...user2, name: e.target.value };
							})
						}
					/>
					<button type="submit" onClick={addUsers}>
						Add Users
					</button>
				</div>

				<div className={serverChoice ? "shown" : "hidden"}>
					<p>Who will start the game?</p>
					<select value={userToServe} onChange={chooseUserToServe}>
						<option value="0">{user1.name}</option>
						<option value="1">{user2.name}</option>
					</select>
					<button onClick={() => startTheGame()}>START the game</button>
				</div>
			</section>

			<section className={gameOn ? "shown" : "hidden"}>
				<h2>Add point</h2>
				<button onClick={() => addPointUser1()}>{user1.name} + 1</button>
				<button onClick={() => addPointUser2()}>{user2.name} + 1</button>
				<button onClick={() => (gameOnOff(false), setGameOver(true))}>STOP THE GAME</button>
			</section>

			<LeaderBoard allUsers={allUsers} gameOver={gameOver} />
		</div>
	);
}

export default App;
