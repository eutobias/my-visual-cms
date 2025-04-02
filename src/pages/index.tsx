import { Heading, HeadingEditorConfig } from "@/components/Heading";
import { Text, TextEditorConfig } from "@/components/Text";

import { Config, Puck } from "@measured/puck";
import "@measured/puck/puck.css";

const config: Config = {
  components: {
    Title: HeadingEditorConfig,
    Text: TextEditorConfig
  },
};

const initialData = {};

const save = (data: unknown) => {
  console.log(data);
};

export function Editor() {
  return <Puck config={config} data={initialData} onPublish={save} />;
}

export default function Home() {
  return (
    <div>
      <Heading level={1}>Hello World</Heading>
      <Text variant="body">This is a test page.</Text>
      <Text variant="caption">This is a test page.</Text>
      <Text variant="large">This is a test page.</Text>
      <Text variant="small">This is a test page.</Text>

      <Editor />
    </div>
  );
}
