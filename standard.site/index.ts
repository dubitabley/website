// helpful resource - https://piccalil.li/blog/publishing-on-the-atmosphere-with-standardsite/

import { AtpAgent } from "@atproto/api";
import {
    createPublicationRecord,
    getAgent,
    Publication,
    PublicationResultType,
} from "./atproto.ts";
import { getAllPosts, Post } from "./posts.ts";
import {
    fileAddStandardSiteDocument,
    fileHasStandardSiteDocument,
} from "./svelte-page.ts";

const PostResultType = {
    AlreadySetup: "already_setup",
    AddedSuccessfully: "added_successfully",
    ErrorOccurred: "error_occurred",
} as const;
type PostResultType = (typeof PostResultType)[keyof typeof PostResultType];

console.log("Setting atproto records for standard.site!");

const result = await collectPosts();

console.log(`Already had ${result.AlreadySetupNum} posts setup`);
console.log(`Setup ${result.AddedSuccessfully} posts successfully`);
console.log(`Failed to configure ${result.ErrorOccurred} posts`);

type CollectPostsResult = {
    AlreadySetupNum: number;
    AddedSuccessfully: number;
    ErrorOccurred: number;
};

async function collectPosts(): Promise<CollectPostsResult> {
    const posts = await getAllPosts();

    const agent = await getAgent();

    const allResults = await Promise.all(
        posts.map(async (x) => await checkPost(agent, x)),
    );

    const collectedResults = allResults.reduce(
        (prev: CollectPostsResult, current) => {
            if (current === PostResultType.AlreadySetup) {
                prev.AlreadySetupNum += 1;
            } else if (current === PostResultType.AddedSuccessfully) {
                prev.AddedSuccessfully += 1;
            } else if (current === PostResultType.ErrorOccurred) {
                prev.ErrorOccurred += 1;
            }
            return prev;
        },
        {
            AlreadySetupNum: 0,
            AddedSuccessfully: 0,
            ErrorOccurred: 0,
        },
    );

    return collectedResults;
}

async function checkPost(agent: AtpAgent, post: Post): Promise<PostResultType> {
    if (await fileHasStandardSiteDocument(post.codePath)) {
        return PostResultType.AlreadySetup;
    }

    const publication = postToPublication(post);
    const publicationResult = await createPublicationRecord(agent, publication);

    if (publicationResult.resultType === PublicationResultType.Success) {
        // setup on the page
        await fileAddStandardSiteDocument(
            post.codePath,
            publicationResult.successUri,
        );

        return PostResultType.AddedSuccessfully;
    } else {
        return PostResultType.ErrorOccurred;
    }
}

function postToPublication(post: Post): Publication {
    return {
        title: post.title,
        description: post.description,
        path: post.path,
        publishedAt: post.date,
    };
}
