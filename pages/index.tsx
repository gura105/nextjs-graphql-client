import gql from "graphql-tag";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { PostIndexPageDocument, PostModel } from "../src/graphql/generated.graphql";
import { urqlClient } from "@pb-libs/gql-requests";
import styles from "@pb-styles/Home.module.css";
import { grey } from "@mui/material/colors";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Chip,
  Typography
} from "@mui/material";
import { isoStringToJstDate } from "@pb-libs/date";
import { PostFragment } from "@pb-graphql/generated.graphql"
import { PostListView } from "./component/PostListView";

type Props = {
  articles: PostFragment[];
  diaries: PostFragment[];
};

const Home: NextPage<Props> = (props) => {
  return (
    <Stack
      sx={{
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4">Articles</Typography>
        <PostListView posts={props.articles} />
      <Typography variant="h4">Diaries</Typography>
        <PostListView posts={props.diaries} />
      <Box
        sx={{
          bgColor: "palette.primary.dark",
          backgroundColor: (theme) => theme.palette.primary.dark,
          color: (theme) =>
            theme.palette.getContrastText(theme.palette.primary.dark),
          py: 3,
          textAlign: "center",
          marginTop: "auto",
        }}
      >
        <footer>
          <a
            href="http://devcon.hakoika.jp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by Hakodate
          </a>
        </footer>
      </Box>
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const client = await urqlClient();

    const result = await client.query(PostIndexPageDocument, {}).toPromise();
    console.error(result.data)

    return {
      props: {
        articles: result.data.articles,
        diaries: result.data.diaries,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
};

export default Home
