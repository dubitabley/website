const interestsPath = "./src/lib/interests";
const appPath = "./src/routes/(app)";

const poemsFile = "poems.json";
const booksFile = "books.json";
const mathsFile = "maths.json";
const postsFile = "posts.json";

export type Post = {
    title: string;
    description: string;
    /// Path to the page on the site
    path: string;
    /// Path to the file
    codePath: string;
    date: string;
};

async function getInterestJson(interestFile: string): Promise<any> {
    const fileString = await Deno.readTextFile(
        `${interestsPath}/${interestFile}`,
    );
    return JSON.parse(fileString);
}

async function getPoemPosts(): Promise<Post[]> {
    type Poem = {
        name: string;
        link: string;
        date: string;
    };

    const poems: Poem[] = (await getInterestJson(poemsFile)).poems;

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

async function getBookPosts(): Promise<Post[]> {
    type Book = {
        book_name: string;
        author: string;
        link?: string;
        rating?: number;
        date: string;
    };

    const books: Book[] = (await getInterestJson(booksFile)).books;

    return books
        .filter((x) => x.link)
        .map((x) => {
            return {
                title: x.book_name,
                description: `Discussion of the book ${x.book_name}`,
                path: `/interests/book/${x.link}`,
                codePath: `./src/lib/interests/books/${x.link}`,
                date: x.date,
            };
        });
}

async function getMathsPosts() {
    type MathsPost = {
        post_name: string;
        description: string;
        link: string;
        date: string;
    };

    const mathsPosts: MathsPost[] = (await getInterestJson(mathsFile))
        .maths_posts;

    return mathsPosts.map((x) => {
        return {
            title: x.post_name,
            description: x.description,
            path: `/maths/${x.link}`,
            codePath: `${appPath}/maths/${x.link}`,
            date: x.date,
        };
    });
}

async function getPosts() {
    type Post = {
        name: string;
        summary: string;
        link: string;
        date: string;
    };

    const posts: Post[] = (await getInterestJson(postsFile)).posts;

    return posts.map((x) => {
        return {
            title: x.name,
            description: x.summary,
            path: `/posts/${x.link}`,
            codePath: `${appPath}/posts/${x.link}`,
            date: x.date,
        };
    });
}

export async function getAllPosts() {
    const poemPostsPromise = getPoemPosts();
    const bookPostsPromise = getBookPosts();
    const mathsPostsPromise = getMathsPosts();
    const postsPromise = getPosts();
    return (
        await Promise.all([
            poemPostsPromise,
            bookPostsPromise,
            mathsPostsPromise,
            postsPromise,
        ])
    ).flat();
}
