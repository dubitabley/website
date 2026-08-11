import * as xml from "jsr:@std/xml@^0.2.0";

/**
 * Check if a file contains the standard.site link in the svelte:head
 * @param codePath
 */
export async function fileHasStandardSiteDocument(
  codePath: string,
): Promise<boolean> {
  const filePath = `${codePath}/+page.svelte`;

  const fileText = await Deno.readTextFile(filePath);

  // look for the svelte:head and parse as xml
  return fileTextHasStandardSiteDocument(fileText);
}

const svelteHeadStartText = "<svelte:head>";
const svelteHeadEndText = "</svelte:head>";
// exported for testing
export function fileTextHasStandardSiteDocument(fileText: string): boolean {
  const [svelteHeadStartIndex, svelteHeadEndIndex] = getSvelteHeadIndices(
    fileText,
  );

  if (svelteHeadStartIndex < 0 || svelteHeadEndIndex < 0) {
    return false;
  }

  let svelteHeadContents = fileText.substring(
    svelteHeadStartIndex,
    svelteHeadEndIndex + svelteHeadEndText.length - 1,
  );

  // replace svelte:head with head to avoid namespace parsing issues
  svelteHeadContents = replaceSvelteHead(svelteHeadContents);

  const document = xml.parse(svelteHeadContents);

  if (document?.root?.children) {
    for (const child of document.root.children) {
      if (
        child.type === "element" &&
        child.name.local === "link" &&
        child.attributes.rel === "site.standard.document"
      ) {
        return true;
      }
    }
  }

  return false;
}

export async function fileAddStandardSiteDocument(
  codePath: string,
  atStandardSiteDocumentId: string,
) {
  const filePath = `${codePath}/+page.svelte`;

  const fileText = await Deno.readTextFile(filePath);

  const newFileText = addStandardSiteDocument(
    fileText,
    atStandardSiteDocumentId,
  );

  await Deno.writeTextFile(filePath, newFileText);
}

export function addStandardSiteDocument(
  fileText: string,
  atStandardSiteDocumentId: string,
): string {
  const [svelteHeadStartIndex, svelteHeadEndIndex] = getSvelteHeadIndices(
    fileText,
  );

  const linkElem = {
    type: "element",
    name: { raw: "link", local: "link" },
    attributes: {
      rel: "site.standard.document",
      href: atStandardSiteDocumentId,
    },
    children: [],
  };

  if (svelteHeadStartIndex < 0 || svelteHeadEndIndex < 0) {
    // create new svelte head
    const svelteHead = {
      type: "element",
      name: { raw: "svelte:head", local: "head", prefix: "svelte" },
      attributes: {},
      children: [linkElem],
    };

    // add at top of file
    const svelteHeadString = xml.stringify(svelteHead, {
      indent: "\t",
    });
    return svelteHeadString + "\n" + fileText;
  } else {
    let svelteHeadContents = fileText.substring(
      svelteHeadStartIndex,
      svelteHeadEndIndex + svelteHeadEndText.length - 1,
    );

    // replace svelte:head with head to avoid namespace parsing issues
    svelteHeadContents = replaceSvelteHead(svelteHeadContents);

    let headDocument = xml.parse(svelteHeadContents);
    // attach to existing svelte head
    headDocument.root = {
      type: headDocument.root.type,
      name: headDocument.root.name,
      attributes: headDocument.root.attributes,
      children: [...headDocument.root.children, linkElem],
    };

    convertHeadToSvelteHead(headDocument.root);

    const documentString = xml.stringify(headDocument, {
      indent: "\t",
    });

    return (
      fileText.substring(0, svelteHeadStartIndex) +
      documentString +
      fileText.substring(
        svelteHeadEndIndex + svelteHeadEndText.length,
        fileText.length,
      )
    );
  }
}

function getSvelteHeadIndices(fileText: string): [number, number] {
  const svelteHeadStartIndex = fileText.indexOf(svelteHeadStartText);
  const svelteHeadEndIndex = fileText.indexOf(svelteHeadEndText);

  return [svelteHeadStartIndex, svelteHeadEndIndex];
}

function replaceSvelteHead(svelteHeadContents: string): string {
  return (
    "<head>" +
    svelteHeadContents.substring(
      svelteHeadStartText.length,
      svelteHeadContents.length - svelteHeadEndText.length + 1,
    ) +
    "</head>"
  );
}

function convertHeadToSvelteHead(svelteHead: any) {
  svelteHead.name.raw = "svelte:head";
  svelteHead.name.prefix = "svelte";
}
