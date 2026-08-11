import { expect, test } from "vitest";
import {
  addStandardSiteDocument,
  fileTextHasStandardSiteDocument,
} from "./svelte-page.ts";

test("working svelte head", () => {
  const fileText = `
        <script>console.log("test");</script>
        <svelte:head>
            <link
                rel="site.standard.document"
                href="at://did:plc:your-did/site.standard.document/the-record-rkey"
            />
        </svelte:head>
        <div>
            <span>test</span>
        </div>
    `;
  expect(fileTextHasStandardSiteDocument(fileText)).toEqual(true);
});

test("no svelte head", () => {
  const fileText = `
        <script>console.log("test");</script>
        <svelte:head>
            <link
                rel="irrelevant.link"
                href="nothing"
            />
        </svelte:head>
        <div>
            <span>test</span>
        </div>
    `;
  expect(fileTextHasStandardSiteDocument(fileText)).toEqual(false);
});

test("new svelte head", () => {
  const fileText = `
        <script>console.log("test");</script>
        <div>
            <span>test</span>
        </div>
    `;
  const atRecord =
    "at://did:plc:your-did/site.standard.document/the-record-rkey";
  const newValue = addStandardSiteDocument(fileText, atRecord);
  expect(newValue).contains(atRecord);
  expect(newValue).contains('rel="site.standard.document"');
});

test("modify svelte head", () => {
  const fileText = `
        <script>console.log("test");</script>
        <svelte:head>
            <link rel="alternate"
                type="application/rss+xml"
                href="/feed.xml"
                title="RSS feed" />
        </svelte:head>
        <div>
            <span>test</span>
        </div>
    `;
  const atRecord =
    "at://did:plc:your-did/site.standard.document/the-record-rkey";
  const newValue = addStandardSiteDocument(fileText, atRecord);
  expect(newValue).contains(atRecord);
  expect(newValue).contains('rel="site.standard.document"');
});
