import Card from './Card'
import SideNav from './Sidenav'

const Home = () => {
  return (
      <div className="main">
        <SideNav />
        <div className="right">
          <div>Show (all, your activity, your friends activity)</div>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    )
  }

export default Home