import { Box, BoxEditorConfig } from "@/components/Box";
import { HeadingEditorConfig } from "@/components/Heading";
import { TextEditorConfig } from "@/components/Text";
import { pageService } from "@/services/pageService";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";

import { Config, Puck, Render } from "@measured/puck";
import "@measured/puck/puck.css";
import { PageData } from "@/types/pageData.type";


const config: Config = {
  components: {
    Title: HeadingEditorConfig,
    Text: TextEditorConfig,
    Box: BoxEditorConfig,
  },
};

const initialData = {
  root: { props: {} },
  content: [
    {
      type: "Title",
      props: {
        children: "Hello, world",
        level: 1,
        id: "Title-737521bd-7bbb-4a2d-a991-e13ec884c4a5",
      },
    },
    {
      type: "Text",
      props: {
        children:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        variant: "body",
        id: "Text-d6187dd3-97b3-425c-b31e-018d32f367e5",
      },
    },
    {
      type: "Box",
      props: {
        direction: "row",
        align: "start",
        justify: "start",
        gap: 0,
        wrap: true,
        fullWidth: true,
        id: "Box-99332bc6-2a6f-4a17-bd86-2914b6b017cf",
      },
    },
  ],
  zones: {
    "Box-99332bc6-2a6f-4a17-bd86-2914b6b017cf:my-content": [
      {
        type: "Text",
        props: {
          children:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          variant: "body",
          id: "Text-4db1fe0c-5680-43f7-a946-2d4ebc9a06b5",
        },
      },
    ],
  },
};

const save = (data: unknown) => {
  console.log(JSON.stringify(data));
};

export const getStaticPaths = (async () => {
  const pages = await pageService.findAll();

  return {
    paths: pages.map((page) => ({
      params: {
        page: page.slug,
      },
    })),
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const { params } = context as { params: { page: string } };

  const page = await pageService.findBySlug(params?.page);

  const data = {
    name: page?.name,
    displayName: page?.displayName,
    blocks: page?.blocks.map((block) => ({
      id: block.id,
      name: block.name,
      content: block.content,
    })),
  };

  if (!page) {
    return {
      notFound: true,
    };
  }
  return { props: { data } };
}) satisfies GetStaticProps<PageData>;

export default function Page({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(data);
  return (
    <Box direction="column">
      <Render config={config} data={initialData} />
      <Puck config={config} data={initialData} onPublish={save} />;
    </Box>
  );
}
