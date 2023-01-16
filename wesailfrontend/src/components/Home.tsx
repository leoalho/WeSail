import { UserProps } from "../types"

const Home = ({user}: UserProps) => {
  if (user){
    return (
      <div>Welcome to weSail {user}</div>
    )
  }
  return (
    <div>Welcome to weSail</div>
  )
}

export default Home