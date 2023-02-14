import '../styles/Tag.css'

const Tag = ({title, children}) => {
    return (
        <div className = "tag">{children}</div>
    )
}

export default Tag