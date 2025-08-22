import './index.css'

const LanguageFilterItem = props => {
  const {total, idactive, thetabclick} = props
  const {id, language} = total

  const ontabclick = () => {
    thetabclick(id)
  }

  const rendertab = () => (
    <button type="button" className="tabbutton" onClick={ontabclick}>
      <li className="tabcont">{language}</li>
    </button>
  )

  const rendertabcolor = () => (
    <button type="button" className="tabbutton">
      <li className="tabcontcolor" onClick={ontabclick}>
        {language}
      </li>
    </button>
  )

  if (id === idactive) {
    return rendertabcolor()
  }
  return rendertab()
}

export default LanguageFilterItem
