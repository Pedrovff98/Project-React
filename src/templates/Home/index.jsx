import { Component } from 'react/index.js'

import './styles.css';

import { Posts } from '../../components/Posts';

import { loadPosts } from '../.././Utils/load-post'

import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

 export class Home extends Component {
  state = {

    counter:0,
    posts: [],
    allPosts:[],
    page: 0,
    postsPerPage: 53,
    searchValue: ''

  };

  async componentDidMount(){

     await this.loadsPost();

  }

  loadsPost = async () => {
    const { page, postsPerPage } = this.state;

    const postAndPhotos = await loadPosts();

    this.setState({

      posts: postAndPhotos.slice(page, postsPerPage), 
      allPosts: postAndPhotos,

    });
   }

   loadMorePosts = () => {
     const {
       page,
       postsPerPage,
       allPosts,
       posts
     } = this.state;

     const nextPage = page + postsPerPage;
     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage );
     posts.push(...nextPosts);

     this.setState({posts, page: nextPage});

   }

   handleChange = (e) => {
     const {value} = e.target;
     this.setState({searchValue:value})
   }

  render() {

    const {posts, page, postsPerPage, allPosts,searchValue} = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ?

    allPosts.filter(post =>{
      return post.title.toLowerCase().includes(
        searchValue.toLocaleLowerCase());
    })
    :posts;

    return (
      <section className="container">
        {!!searchValue && (
          <>
          <h1>Search value: {searchValue}</h1>
          <br />
          <br />
          </>
        )}

        <TextInput
          searchValue = {searchValue}
          handleChange ={this.handleChange}
        />
        <br />
        <br />
        <br />

        {filteredPosts.length > 0 &&(
          <Posts posts = {filteredPosts} />
        )}
        
        {filteredPosts.length === 0 &&(
          <p>Não existem posts </p>
        )}

        <div className="button-container">
          {!searchValue && (
             <Button 
             text = 'Load more posts'
             onClick = {this.loadMorePosts} // apenas definindo uma props 
             disabled = {noMorePosts}
             />
          )}
       
        </div>
      </section>

    );
  }
}
export default Home;
