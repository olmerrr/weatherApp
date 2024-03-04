const Input = ({ location, handleLocation }) => {
  return <> <input
    type="text"
    placeholder="Location"
    className="location"
    value={location}
    onChange={(e) => handleLocation(e)}
  />
  </>
}

export default Input;