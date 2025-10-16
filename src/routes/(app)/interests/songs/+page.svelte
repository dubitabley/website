<script lang="ts">
    import type { PageProps } from './$types';
    import Songs from "$lib/interests/songs.json";

    let { data }: PageProps = $props();
</script>

<style>
    .song-info {
        background-color: var(--background-color-2);
        display: block;
        padding: 20px;
        max-width: 400px;
        margin: 20px;

    }

    .song-name {
        font-size: 30px;
    }

    .song-written {
        font-size: 13px;
    }

    .link-list {
        /* en dash (longer than hyphen, shorter than em dash) */
        list-style-type: "\02013   ";
    }
</style>

<h2 class="songs-header">
    Songs I've liked
</h2>

<div>
    These are often songs that I've listened to over and over until
    I get sick of them.
</div>

<div class="songs-wrapper">
    {#each Songs.songs as song}
        <div class="song-info">
            <div class="">
                <span class="song-name">{song.song_name}</span>
                <span class="song-written">by {song.written}</span>
            </div>
            <a href={song.rendition}>Link to song</a>
            <span>performed by {song.singer}</span>
            {#if song.links.length > 0}
                <div>
                    <h4>Related links</h4>
                    <ul class="link-list">
                        {#each song.links as link}
                        <li><a href={link}>{link}</a></li>
                        {/each}
                    </ul>
                </div>
            {/if}
        </div>
    {/each}
</div>