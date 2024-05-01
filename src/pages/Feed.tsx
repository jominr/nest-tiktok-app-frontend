import React, { useEffect } from "react"
import MainLayout from "../layouts/MainLayout"
import PostFeed from "../components/PostFeed"
import { GET_ALL_POSTS } from "../graphql/queries/getPosts"
import { useQuery } from "@apollo/client"
import { PostType } from "../gql/graphql"

const Feed = () => {
  const loadMoreRef = React.useRef<HTMLDivElement | null>(null)

  const { data, loading, fetchMore } = useQuery(GET_ALL_POSTS, {
    variables: { skip: 0, take: 2 }, // only load 2 posts
  })

  const loadMorePosts = async () => {
    try {
      await fetchMore({
        variables: {
          skip: data?.getPosts.length || 0,
          take: 2,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev
          const newPosts = fetchMoreResult.getPosts.filter(
            (newPost: PostType) => !prev.getPosts.some((post: PostType) => post.id === newPost.id)
          )
          return {
            getPosts: [...prev.getPosts, ...newPosts],
          }
        },
      })
      console.log(data)
    } catch (error) {
      console.error("Error fetching more posts:", error)
    }
  }
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("Observer triggered")
          loadMorePosts()
        }
      },
      { threshold: 1 }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
    }
  }, [loadMorePosts])

  console.log(data?.getPosts)



  return (
    <MainLayout>
      <div className="pt-[80px] w-[calc(100%-90px)] max-w-[690px] ">
        {data?.getPosts.map((post: PostType) => (
          <PostFeed key={post.id} post={post} />
        ))}
        <div className="h-20" ref={loadMoreRef}></div>
      </div>
    </MainLayout>
  );
};

export default Feed;