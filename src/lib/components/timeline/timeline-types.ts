import { createContext } from "svelte";

export type TimelineContext = {
    events: TimelineEvent[];
};

export type TimelineEvent = {
    id: string;
    date: string;
    title: string;
};

export const [getTimelineContext, setTimelineContext] =
    createContext<TimelineContext>();
