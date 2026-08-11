const interestsPath = "./src/lib/interests";
const appPath = "./src/routes/(app)";

const poemsFile = "poems.json";

export type Post = {
  title: string;
  description: string;
  /// Path to the page on the site
  path: string;
  /// Path to the file
  codePath: string;
  date: string;
};

export async function getPoemPosts(): Promise<Post[]> {
  type Poem = {
    name: string;
    link: string;
    date: string;
  };

  const poemsString = await Deno.readTextFile(
    `${interestsPath}/${poemsFile}`,
  );
  const poems: Poem[] = JSON.parse(poemsString).poems;

  return poems.map((x) => {
    return {
      title: x.name,
      description: `Discussion of the poem ${x.name}`,
      path: `/poems/${x.link}`,
      codePath: `${appPath}/poems/${x.link}`,
      date: x.date,
    };
  });
}
