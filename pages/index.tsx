import gql from "graphql-tag";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { PostIndexPageDocument, PostModel } from "../src/graphql/generated.graphql";
import { urqlClient } from "../src/libs/gql-requests";
import styles from "../styles/Home.module.css";
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

type Props = {
  articles: PostModel[];
  diaries: PostModel[];
};

const Home: NextPage<Props> = (props) => {
  return (
    <Stack
      sx={{
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4">Articles</Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {props.articles.map((post) => (
          <ListItem key={post.id}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: grey[300] }}> {post.emoji} </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={post.title}
              secondary={
                <Stack direction="row" spacing={2}>
                  <Chip size="small" color="warning" label={post.type} />
                  <Typography>{isoStringToJstDate(post.publishDate)}</Typography>
                </Stack>
              }
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h4">Diaries</Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {props.diaries.map((post) => (
          <ListItem key={post.id}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: grey[300] }}> {post.emoji} </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={post.title}
              secondary={
                <Stack direction="row" spacing={2}>
                  <Chip size="small" color="warning" label={post.type} />
                  <Typography>{isoStringToJstDate(post.publishDate)}</Typography>
                </Stack>
              }
            />
          </ListItem>
        ))}
      </List>
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
