import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type PostModel = {
  __typename?: 'PostModel';
  bodyMarkdown: Scalars['String'];
  contentPath: Scalars['String'];
  emoji?: Maybe<Scalars['String']>;
  excerpt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  publishDate?: Maybe<Scalars['DateTime']>;
  published?: Maybe<Scalars['Boolean']>;
  thumbNailUrl?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  type: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  findPost: PostModel;
  posts?: Maybe<Array<PostModel>>;
};


export type QueryFindPostArgs = {
  contentPath?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};


export type QueryPostsArgs = {
  type?: InputMaybe<Array<Scalars['String']>>;
};

export type PostFragment = { __typename?: 'PostModel', id: string, title: string, type: string, publishDate?: any | null, emoji?: string | null, contentPath: string };

export type PostIndexPageQueryVariables = Exact<{ [key: string]: never; }>;


export type PostIndexPageQuery = { __typename?: 'Query', articles?: Array<{ __typename?: 'PostModel', id: string, title: string, type: string, publishDate?: any | null, emoji?: string | null, contentPath: string }> | null, diaries?: Array<{ __typename?: 'PostModel', id: string, title: string, type: string, publishDate?: any | null, emoji?: string | null, contentPath: string }> | null };

export type PostDetailPageQueryVariables = Exact<{
  contentPath?: InputMaybe<Scalars['String']>;
}>;


export type PostDetailPageQuery = { __typename?: 'Query', post: { __typename?: 'PostModel', bodyMarkdown: string, id: string, title: string, type: string, publishDate?: any | null, emoji?: string | null, contentPath: string } };

export const PostFragmentDoc = gql`
    fragment Post on PostModel {
  id
  title
  type
  publishDate
  emoji
  contentPath
}
    `;
export const PostIndexPageDocument = gql`
    query PostIndexPage {
  articles: posts(type: ["article"]) {
    ...Post
  }
  diaries: posts(type: ["diary"]) {
    ...Post
  }
}
    ${PostFragmentDoc}`;

export function usePostIndexPageQuery(options?: Omit<Urql.UseQueryArgs<PostIndexPageQueryVariables>, 'query'>) {
  return Urql.useQuery<PostIndexPageQuery, PostIndexPageQueryVariables>({ query: PostIndexPageDocument, ...options });
};
export const PostDetailPageDocument = gql`
    query PostDetailPage($contentPath: String) {
  post: findPost(contentPath: $contentPath) {
    ...Post
    bodyMarkdown
  }
}
    ${PostFragmentDoc}`;

export function usePostDetailPageQuery(options?: Omit<Urql.UseQueryArgs<PostDetailPageQueryVariables>, 'query'>) {
  return Urql.useQuery<PostDetailPageQuery, PostDetailPageQueryVariables>({ query: PostDetailPageDocument, ...options });
};