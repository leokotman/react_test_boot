import { useState, useEffect } from "react"

const LeaderBoard = (props) => {
  const [usersByWins, setUsersByWins] = useState([]);
  const [usersByPoints, setUsersByPoints] = useState([]);

  useEffect(() => {
    filterByWins();
    filterByPoints();
  },[props.gameOver]);

  const filterByWins = () => {
    let sortedArray = props.allUsers.sort((first, second) => second.wins - first.wins);
    setUsersByWins(sortedArray);
  }
  const filterByPoints = () => {
    let sortedArray = props.allUsers.sort((first, second) => first.points - second.points);
    setUsersByPoints(sortedArray);
  }

  return (
    <section>
        <h2>Leaderboard</h2>
        <article>
          <h3>Winners by wins:</h3>
          {usersByWins.map((user) => {
            return (
               <div key={user.name}>
              <span>{user.name}</span> - <span>{user.wins}</span>
            </div>
            )
          })}
          
        </article>
        <article>
          <h3>Winners by points:</h3>
          {usersByPoints.map((user) => {
            return (
               <div key={user.name}>
              <span>{user.name}</span> - <span>{user.points}</span>
            </div>
            )
          })}
        </article>

      </section>
  )
}

export default LeaderBoard