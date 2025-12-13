<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTimelineContext } from "./timeline-types";

    type Props = {
        children: Snippet;
        summary?: Snippet;
        title: string;
        date: string;
        id: string;
    };
    let { date, children, summary, title, id }: Props = $props();

    let timelineContext = getTimelineContext();
    timelineContext.events.push({
        id,
        date,
        title,
    });
</script>

<div {id}>
    <h2>
        {date} - {title}
    </h2>
    <h4>
        {@render summary?.()}
    </h4>

    <div>
        {@render children()}
    </div>
</div>
