<script lang="ts">
    import { mount } from "svelte";
    import PipComponent from "./pip-component.svelte";

    let errorMessage: string | null = $state(null);

    function onClick() {
        if ("documentPictureInPicture" in window) {
            errorMessage = null;
            togglePictureInPicture();
        } else {
            errorMessage = "Document picture in picture API not supported";
        }
    }

    async function togglePictureInPicture() {
        // @ts-ignore
        if (window.documentPictureInPicture.window) {
            return;
        }

        // @ts-ignore
        const pipWindow = await documentPictureInPicture.requestWindow({
            width: 100,
            height: 100,
        });

        mount(PipComponent, {
            target: pipWindow.document.body,
        });
    }
</script>

<h2>Document picture in picture</h2>

<p>
    <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Picture-in-Picture_API"
    >
        MDN link for the API
    </a>
</p>

<div>
    <p>
        <button onclick={onClick}>Activate power!</button>
    </p>
    {#if errorMessage}
        <p class="error">
            {errorMessage}
        </p>
    {/if}
</div>

<style>
    .error {
        color: oklch(0.7 0.3 50);
    }
</style>
