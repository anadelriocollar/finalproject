function Label({ forId, children }) {
    return <label className="label" htmlFor={forId}>{children}</label>
}
export default Label