import { PostDetailPageDocument } from "@pb-graphql/generated.graphql";
import { urqlClient } from "@pb-libs/gql-requests";
import { contentPath } from "@pb-libs/site";
import { GetServerSideProps, NextPage } from "next";
import { PostFragment } from "@pb-graphql/generated.graphql"

type ExPostFragment = PostFragment & {
    bodyMarkdown: string
}

type Props = {
    post: ExPostFragment
}

const Page: NextPage<Props> = (props) => {
    return props.post.bodyMarkdown
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
    params,
  }) => {
    try {
      // slug 配列を 検索用の contentPath に変換する
      const resolvedSlug = ["posts"].concat(params!.slug as string[]); // エラーなら404なので!使っちゃう
      const client = await urqlClient();
      const result = await client
        .query(PostDetailPageDocument, {
          contentPath: contentPath(resolvedSlug.join("/")),
        })
        .toPromise();

      const post = result.data.post;
      console.log(post);

      return {
        props: {
          post: result.data.post,
        },
      };
    } catch (e) {
      console.error(e);
      return {
        notFound: true,
      };
    }
  };
export default Page;