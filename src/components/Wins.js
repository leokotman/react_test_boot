import { useState, useEffect } from 'react'

const Wins = (props) => {
    const [usersByWins, setUsersByWins] = useState([]);

  useEffect(() => {
    filterByWins();
  },[props.gameOver]);

  const filterByWins = () => {
    let sortedArray = props.allUsers.sort((first, second) => second.wins - first.wins);
    setUsersByWins(sortedArray);
  }
  return (
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
  )
}

export default Wins