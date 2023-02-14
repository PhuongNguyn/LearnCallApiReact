

const Post = ({author, cover}) => {
    return (
        <div className="post">
            <img src={cover}/>
            <p>Author: {author}</p>
        </div>
    )
}

export default Post