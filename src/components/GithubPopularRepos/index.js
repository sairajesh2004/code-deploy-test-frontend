import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activetab: languageFiltersData[0].id,
    activedata: [],
    isloading: true,
    error: false,
    statusnow: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getrepos()
  }

  thesuccess = updated => {
    this.setState({
      activedata: updated,
      isloading: false,
      statusnow: apiStatusConstants.success,
    })
  }

  thefailure = () => (
    <div className="failurecont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failureimg"
      />
      <h1 className="failurehead">Something Went Wrong</h1>
    </div>
  )

  thetabclick = theid => {
    console.log(theid)
    this.setState(
      {activetab: languageFiltersData.find(each => each.id === theid).id},
      this.getrepos,
    )
    console.log(languageFiltersData.find(each => each.id === theid).id)
  }

  getrepos = async () => {
    this.setState({
      isloading: true,
      error: false,
      statusnow: apiStatusConstants.inProgress,
    })
    const {activetab, activedata, isloading} = this.state
    const theurl = `https://apis.ccbp.in/popular-repos?language=${activetab}`
    console.log(theurl)
    const response = await fetch(theurl)
    const data = await response.json()
    if (response.ok === true) {
      const updated = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.thesuccess(updated)
    } else {
      this.setState({
        isloading: false,
        error: true,
        statusnow: apiStatusConstants.failure,
      })
    }
  }

  rendersomething = statusnow1 => {
    const {activetab, activedata, isloading, error, statusnow} = this.state

    switch (statusnow1) {
      case 'INTIAL':
        return (
          <div className="reposcont">
            {activedata.map(eachone => (
              <RepositoryItem total1={eachone} key={eachone.id} />
            ))}
          </div>
        )
      case 'SUCCESS':
        return (
          <div className="reposcont">
            {activedata.map(eachone => (
              <RepositoryItem total1={eachone} key={eachone.id} />
            ))}
          </div>
        )
      case 'FAILURE':
        return (
          <div className="failurecont">
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="failure view"
              className="failureimg"
            />
            <h1 className="failurehead">Something Went Wrong</h1>
          </div>
        )
      case 'IN_PROGRESS':
        return (
          <div className="theloader" data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        )
    }
  }

  render() {
    const {activetab, activedata, isloading, error, statusnow} = this.state
    return (
      <div className="maincont">
        <h1 className="mainhead">Popular</h1>
        <br />
        <div className="headercont">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              total={each}
              idactive={activetab}
              thetabclick={this.thetabclick}
              key={each.id}
            />
          ))}
        </div>
        <br />
        {this.rendersomething(statusnow)}
      </div>
    )
  }
}

export default GithubPopularRepos
