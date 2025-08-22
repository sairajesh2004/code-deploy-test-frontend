import './index.css'

const RepositoryItem = props => {
  const {total1} = props
  const {name, id, issuesCount, forksCount, starsCount, avatarUrl} = total1

  return (
    <div className="repocont">
      <img src={avatarUrl} alt={name} className="repoimg" />
      <h1 className="reponame">{name}</h1>
      <div className="repostats">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="repostatimg"
        />
        <p className="repostatpara">{starsCount} stars</p>
      </div>
      <div className="repostats">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="repostatimg"
        />
        <p className="repostatpara">{forksCount} forks</p>
      </div>
      <div className="repostats">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="repostatimg"
        />
        <p className="repostatpara">{issuesCount} open issues</p>
      </div>
    </div>
  )
}

export default RepositoryItem
