import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Post from './components/Post';
import { Link } from 'react-router-dom';

function App() {
  const [posts, setPosts] = useState([])
  const [cover, setCover] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [idForUpdate, setIdForUpdate] = useState()

  const notifySucces = () => toast.success('Success');

  const notifyError = () => toast.error('Failed')

  const getPost = async () => {
    try {
      const post = await axios.get('https://63e65c2083c0e85a86920ae0.mockapi.io/api/v1/media')
      setPosts(post.data)
    } catch (error) {
      console.log(error)
    }

  }

  const handleChangeCoverImage = (e) => {
    setCover(e.target.value)
  }

  const handleChangeAuthor = (e) => {
    setAuthor(e.target.value)
  }

  const handleChangeContent = (e) => {
    setContent(e.target.value)
  }

  const createPost = async () => {
    try {
      const newPost = await axios.post('https://63e65c2083c0e85a86920ae0.mockapi.io/api/v1/media', {
        cover,
        content,
        author
      })
      notifySucces()
      getPost()
    } catch (error) {
      console.log(error)
      notifyError()
    }
  }

  const deletePost = async (id) => {
    try {
      const result = await axios.delete(`https://63e65c2083c0e85a86920ae0.mockapi.io/api/v1/media/${id}`)
      if(!result.data?.id){
        notifyError()
        return;
      }
      notifySucces()
      getPost()
    } catch (error) {
      console.log(error)
      notifyError()
    }
  }
  
  const handleClickUpdate = async (id) => {
    setIdForUpdate(id)
    try {
      const post = await axios.get(`https://63e65c2083c0e85a86920ae0.mockapi.io/api/v1/media/${id}`)
      setCover(post.data.cover)
      setAuthor(post.data.author)
      setContent(post.data.content)
    } catch (error) {
      console.log(error)
    }

  }

  const updatePost = async () => {
    try {
      const update = await axios.put(`https://63e65c2083c0e85a86920ae0.mockapi.io/api/v1/media/${idForUpdate}`,{
        cover,
        content,
        author
      })
      if(!update.data.id){
        notifyError()
        return;
      }

      notifySucces()
      getPost()
    } catch (error) {
      console.log(error)
      notifyError()
    }
  }

  useEffect(() => {
    getPost()
  }, [])

  return (
    <div className="App">
      <Toaster />
      <div className="list-post">
        <span>Cover image: </span>
        <input onChange={handleChangeCoverImage} type={'text'} value={cover}/>
        <span>Author: </span>
        <input onChange={handleChangeAuthor} type={'text'} value={author}/>
        <span>Content: </span>
        <textarea onChange={handleChangeContent} value={content}/>
        <button onClick={createPost}>Create</button>
        <button onClick={updatePost}>Update</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Author</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(item => {
            return <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.author}</td>
              <td><span style={{ color: 'blue', textDecoration: 'underline' }} onClick={() => handleClickUpdate(item.id)}>Update</span></td>
              <td><span style={{ color: 'blue', textDecoration: 'underline' }} onClick={() => deletePost(item.id)}>Delete</span></td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
