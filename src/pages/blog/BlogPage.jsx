/* eslint-disable @next/next/no-img-element */
import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './BlogPage.module.scss';

import { MyPZButton, MyPZContainer, MyPZPagination } from '../../mypzkit';
import NavBar from '../../components/navbar/navbar';

const BlogPage = (props) => {
  const {
    posts,
    paginationData,
    baseUrl,
    title,
  } = props;
  const router = useRouter();

  const renderPost = (post) => {
    return (
      <div className={styles['page-blog__post']} key={post.id}>
        <Link href={`${baseUrl}${post.slug}`} passHref>
          <a>
            <div className={styles['page-blog__post-header']}>
              <img src={post.miniatureImageUrl} />
            </div>
            <div className={styles['page-blog__post-content']}>
              <div className={styles['page-blog__post-title']}>{post.title}</div>
              <div className={styles['page-blog__post-short-description']} title={post.shortDescription}>{post.shortDescription}</div>
              <div>
                <div className={styles['page-blog__post-minute-to-read']}>{post.minutesToRead} minutes</div>
                <div className={styles['page-blog__post-action']}>
                  <div className={styles['page-blog__post-published-at']}>{moment(post.publishedAt).format('DD MMMM YYYY')}</div>
                  <div><MyPZButton>Read more</MyPZButton></div>
                </div>
              </div>
            </div>
          </a>
        </Link>
      </div>
    );
  };

  const renderPosts = () => {
    return (<div className={styles['page-blog__posts']}>
      {posts.map(renderPost)}
    </div>);
  };

  return (<div className={styles['page-blog']}>
    <MyPZContainer>
      <h1>{title}</h1>
      {NavBar({ Paths: [
        { Path: 'Home', Url: '/' },
        { Path: title, Url: '/en/' + title },
      ] })}
      {renderPosts()}
      <div className={styles['page-blog__pagination']}>
        <MyPZPagination
          maxPage={paginationData.totalPages}
          currentPage={paginationData.currentPage}
          baseUrl={router.asPath}
        />
      </div>
    </MyPZContainer>
  </div>);
};
  
export default BlogPage;