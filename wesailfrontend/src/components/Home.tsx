import { UserProps } from "../types"

const Home = ({user}: UserProps) => {
    return (
      <div className="main">
        <div className="content">
            Welcome to weSail {user && user}
        </div>
        
      </div>
    )
  }

export default Home