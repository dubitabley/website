import { AtpAgent } from "@atproto/api";

async function getAppPassword(): Promise<string> {
    return (await Deno.readTextFile("./standard.site/app-password.txt")).trim();
}

export async function getAgent() {
    // initialise agent
    const agent = new AtpAgent({ service: "https://bsky.social" });

    const appPassword = await getAppPassword();

    await agent.login({
        identifier: "dubitable.xyz",
        password: appPassword,
    });

    return agent;
}

const siteRecord =
    "at://did:plc:fe4gbnsn7lm6kjq3behi5t2h/site.standard.publication/3mspyhnkjyx2a";

export type Publication = {
    title: string;
    path: string;
    description: string;
    publishedAt: string;
};

export const PublicationResultType = {
    Success: "success",
    Error: "error",
} as const;
export type PublicationResultType =
    (typeof PublicationResultType)[keyof typeof PublicationResultType];

type SuccessResult = {
    resultType: typeof PublicationResultType.Success;
    successUri: string;
};

type ErrorResult = {
    resultType: typeof PublicationResultType.Error;
    errorMessage: string;
};

type PublicationResult = SuccessResult | ErrorResult;

export async function createPublicationRecord(
    agent: AtpAgent,
    publication: Publication,
): Promise<PublicationResult> {
    if (!agent.session) {
        return {
            resultType: PublicationResultType.Error,
            errorMessage: "Agent session not created yet",
        };
    }
    const did = agent.session.did;

    const publicationRecord = {
        $type: "site.standard.document",
        site: siteRecord,
        title: publication.title,
        path: publication.path,
        description: publication.description,
        publishedAt: publication.publishedAt,
    };

    try {
        const response = await agent.com.atproto.repo.createRecord({
            repo: did,
            collection: "site.standard.document",
            record: publicationRecord,
        });

        return {
            resultType: PublicationResultType.Success,
            successUri: response.data.uri,
        };
    } catch (error) {
        return {
            resultType: PublicationResultType.Error,
            errorMessage: `Failed to create record for ${publication.path}`,
        };
    }
}
