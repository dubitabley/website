<script lang="ts">
    import { onMount } from "svelte";
    import RockUrl from "$lib/assets/weird25/02/rock.webp";
    import BushUrl from "$lib/assets/weird25/02/bush.webp";

    let objects: Object[] = $state([]);

    const ObjectType = {
        Rock: 0,
        Bush: 1
    } as const;
    type ObjectType = (typeof ObjectType)[keyof typeof ObjectType];

    function getUrlFromType(objectType: ObjectType): string {
        switch (objectType) {
            case ObjectType.Rock:
                return RockUrl;
            case ObjectType.Bush:
                return BushUrl;
        }
    }

    class Object {
        type: ObjectType;
        x: number;
        y: number;
        width: number;
        height: number;

        constructor(type: ObjectType) {
            this.type = type;
            const mapElement = document.getElementsByClassName("main-map")[0];
            const mapSize = mapElement.getBoundingClientRect();
            this.x = Math.random() * (mapSize.width - 400) + 200;
            this.y = Math.random() * (mapSize.height - 200) + 100;
            this.width = 200;
            this.height = 200;
        }
    }

    onMount(() => {
        const ROCK_NUM = 2;
        const BUSH_NUM = 2;
        
        for (let i = 0; i < ROCK_NUM; i++) {
            objects.push(new Object(ObjectType.Rock));
        }
        for (let i = 0; i < BUSH_NUM; i++) {
            objects.push(new Object(ObjectType.Bush));
        }
    }); 

</script>
<style>

	header {
		display: block;
		background-image: url("$lib/assets/weird25/02/map_top.webp");
        background-size: 100% 100px;
		width: 100%;
		height: 100px;
	}
	footer {
		display: block;
		background-image: url("$lib/assets/weird25/02/map_bottom.webp");
		background-size: 100% 100px;
		width: 100%;
		height: 100px;
	}

	.all {
		background-color: rgb(37, 37, 37);
        width: 100vw;
        height: 100vh;
	}

    .main-map {
        height: calc(100% - 200px);
        background-color: #d3cbbf;
        margin-left: 100px;
        margin-right: 100px;
        border-left: 10px solid black;
        border-right: 10px solid black;
    }

    .map-object {
        position: absolute;
    }

    :global {
        html, body {
            box-sizing: border-box;
            margin: 0;
        }
    }

</style>

<svelte:head>
	<title>02 - Maps</title>
</svelte:head>

<div class="all">
    <header>
    </header>
    
    <div class="main-map">
        {#each objects as object}
            <img src={getUrlFromType(object.type)} 
                class="map-object"
                style:left="{object.x}px" 
                style:top="{object.y}px" 
                style:width="{object.width}px" 
                style:height="{object.height}px" 
                alt="map element"
                />
        {/each}
    </div>
    
    <footer>
    </footer>
</div>