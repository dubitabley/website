<svelte:head>
	<link rel="site.standard.document" href="at://did:plc:fe4gbnsn7lm6kjq3behi5t2h/site.standard.document/3mssmnalev222"/>
</svelte:head>
<script lang="ts">
    import { fly } from "svelte/transition";
    import DubitableIntro from "./dubitable-intro.svelte";
    import DubitablePost from "./dubitable-post.svelte";

    const State = {
        Intro: 0,
        Post: 1,
    } as const;
    type State = (typeof State)[keyof typeof State];

    let state: State = $state(State.Intro);

    function onIntroFinish() {
        state = State.Post;
    }
</script>

<h1>Online identity</h1>

{#if state == State.Intro}
    <DubitableIntro onFinish={onIntroFinish} />
{/if}
{#if state == State.Post}
    <div in:fly={{ y: -200, duration: 1000 }}>
        <DubitablePost />
    </div>
{/if}
