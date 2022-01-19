import { useEffect, useState, useCallback } from 'react/index.js'

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../.././Utils/load-post'
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {

  const [posts,setPosts] = useState([]);
  const [allPosts,setAllPosts] = useState([]);
  const [page,setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue,setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLocaleLowerCase());
    })
    :posts;

   const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postAndPhotos = await loadPosts();

    setPosts(postAndPhotos.slice(page, postsPerPage));
    setAllPosts( postAndPhotos);

   }, [])

   useEffect(() => {
     console.log(new Date().toLocaleString('pt-br'))
    handleLoadPosts(0, postsPerPage);
    },
    [handleLoadPosts, postsPerPage]
  );


    const loadMorePosts = () => {
     const nextPage = page + postsPerPage;
     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage );
     posts.push(...nextPosts);

     setPosts(posts);
     setPage(nextPage);

   }

   const handleChange = (e) => {
     const {value} = e.target;
     setSearchValue(value);
   }

  return (
    <section className="container">
      <div className="search-container">
      {!!searchValue && (
        <h1>Search value: {searchValue}</h1>
      )}

      <TextInput
        searchValue = {searchValue}
        handleChange ={handleChange}
      />
      </div>

      <br />

      {filteredPosts.length > 0 &&(
        <Posts posts = {filteredPosts} />
      )}
      
      {filteredPosts.length === 0 &&(
        <>
        <br />
        <p>Não existem posts =(</p>
        </>
      )}

      <div className="button-container">
        {!searchValue && (
           <Button 
           text = 'Load more posts'
           onClick = {loadMorePosts} // apenas definindo uma props  
           disabled = {noMorePosts}
           />
        )}
     
      </div>
    </section>

  );
}


