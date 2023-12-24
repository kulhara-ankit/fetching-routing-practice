import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import BlogItem from '../BlogItem'
import './index.css'

// const BlogList = props => {
//   const {blogsList} = props
//   return (
//     <div className="blog-list-container">
//       <ul className="blog-list">
//         {blogsList.map(eachItem => (
//           <BlogItem details={eachItem} key={eachItem.id} />
//         ))}
//       </ul>
//     </div>
//   )
// }

class BlogList extends Component {
  state = {blogData: [], isLoading: true}

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const formattedData = data.map(eachData => ({
      id: eachData.id,
      title: eachData.title,
      imageUrl: eachData.image_url,
      avatarUrl: eachData.avatar_url,
      author: eachData.author,
      topic: eachData.topic,
    }))
    this.setState({blogData: formattedData, isLoading: false})
  }

  render() {
    const {blogData, isLoading} = this.state
    return (
      <div className="blog-list-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          <ul className="blog-list">
            {blogData.map(eachItem => (
              <BlogItem details={eachItem} key={eachItem.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}
export default BlogList
