<!--
    @component
    A way to display a timeline of events that scrolls down

    Usage:
    ```svelte
    <Timeline>
        <TimelineEvent date="1963-11-22">
            JFK is assassinated in Dallas, Texas
        </TimelineEvent>
        <TimelineEvent date="1963-11-23">
            The first episode of Doctor Who is broadcast
        </TimelineEvent>
    </Timeline>
    ````
-->

<script lang="ts">
    import type { Snippet } from "svelte";
    import { setTimelineContext, type TimelineContext } from "./timeline-types";

    type Props = {
        children: Snippet;
    };
    let { children }: Props = $props();

    let timelineContext: TimelineContext = {
        events: [],
    };
    setTimelineContext(timelineContext);
</script>

<div class="timeline-wrapper">
    <div class="timeline">
        {@render children()}
    </div>
    <div class="timeline-sidebar">
        <h4 class="timeline-title">Timeline</h4>
        {#each timelineContext.events as timelineEventClosure}
            {@const timelineEvent = timelineEventClosure()}
            <div>
                <a class="timeline-link" href="#{timelineEvent.id}">
                    <svg class="timeline-circle" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="20"
                            stroke="var(--primary-color)"
                            stroke-width="10px"
                            fill="var(--background-color)"
                        />
                    </svg>
                    <div class="timeline-info">
                        <div class="timeline-date">{timelineEvent.date}</div>
                        <div>{timelineEvent.title}</div>
                    </div>
                </a>
            </div>
        {/each}
    </div>
</div>

<style>
    .timeline-wrapper {
        display: flex;
        flex-direction: row;
    }

    .timeline-sidebar {
        display: flex;
        position: sticky;
        top: 50px;
        height: 100%;
        flex-direction: column;
        gap: 10px;
        width: 200px;
    }

    .timeline-circle {
        width: 50px;
        height: 50px;
        flex-shrink: 0;
    }

    .timeline-link {
        display: flex;
        flex-direction: row;
        color: var(--primary-color);
        text-decoration: none;
        font-size: 14px;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        border: 1px solid var(--primary-color);
    }

    .timeline-info {
        flex-grow: 1;
    }

    .timeline-date {
        font-size: 11px;
    }

    .timeline-title {
        text-align: center;
        margin: 5px;
        flex-grow: 0;
    }
</style>
