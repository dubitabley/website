<script lang="ts">
    import BskyEmbed from "$lib/components/misc/bsky-embed.svelte";
    import Criticism, {
        CriticismType,
    } from "$lib/components/post/draft/criticism.svelte";
    import Draft from "$lib/components/post/draft/draft.svelte";
    import SectionCriticism from "$lib/components/post/draft/section-criticism.svelte";
    import LeavingJungle from "./images/leaving-jungle.png";
</script>

<Draft>
    <h1>The Minecraft Trading Rebalance is good, actually</h1>

    <p>
        <Criticism type={CriticismType.Bad}>
            {#snippet criticism()}
                Need a stronger intro. Perhaps make it a bit snappier/punchier?
            {/snippet}

            I've been playing a lot of Hardcore Minecraft recently, mostly as a
            way to avoid thinking about life.</Criticism
        >
        <Criticism
            >{#snippet criticism()}Awkward wording using "play" twice; also
                maybe move this section to the second paragraph instead of the
                intro.{/snippet} When I play I like to play</Criticism
        > with a few rules to make it more interesting for me, those are:
    </p>
    <ul>
        <li>No f3. i.e. no using the debug tools/coordinates.</li>
        <li>No /seed or tools like Chunkbase.</li>
        <li>
            <Criticism
                >{#snippet criticism()}
                    Maybe make this bold or something to stand out
                {/snippet} Turn on the villager trade rebalance</Criticism
            >
        </li>
    </ul>
    <p>
        The first two are primarily to support using the in game alternatives to
        those options. Coordinates are useful for keeping track of the location
        of places but I prefer to use the in game mechanics to support it. You
        can use a compass with a <a href="https://minecraft.wiki/w/Lodestone"
            >lodestone</a
        >
        to save a location that <Criticism
            >{#snippet criticism()}
                Be more specific, how do you navigate to it? This might be
                unfamiliar to casual Minecraft players.
            {/snippet} you can navigate to</Criticism
        >. Getting the seed and looking it up on a website such as Chunkbase can
        allow you to see where structures such as villages or woodland mansions
        are located without travelling randomly throughout the world which can
        take a long time and be very fruitless. It can also help to find biomes
        which is important when considering the trade rebalance changes. The in
        game method of finding these things is the cartographer villager which
        you can trade with to get maps to different structures and biomes. The
        biome map the villager can offer to is actually dependent on the type of
        villager they are.
    </p>
    <SectionCriticism>
        {#snippet criticism()}
            This game mechanic explanation goes on for ages and is probably
            overkill. It is important context though. Might be better to weave
            in through the text to be explained as required. There's so many
            mechanics that it could bog it down.
        {/snippet}
        <SectionCriticism>
            {#snippet criticism()}
                Lots of Minecraft wiki links - consider using CSS to indicate
                that. Can use a pseudo element with an icon
            {/snippet}
            <p>
                To discuss the trade rebalance I'll need to <Criticism>
                    {#snippet criticism()}
                        Consider how much and how we do this
                    {/snippet}
                    explain the basics of the relevant Minecraft mechanics</Criticism
                >; what's important for us is that you can get tools and armour
                in the game that allow us to do things such as mine blocks, kill
                enemies and survive damage. You can also enchant these items
                using an enchantment table at a cost of <Criticism
                    >{#snippet criticism()}
                        Do you need something about how the levelling system
                        works? Already pretty long though.
                    {/snippet}
                    levels
                </Criticism>
                and lapis lazuli that allow these items to be even more powerful.
                This includes making the items last a lot longer (<a
                    href="https://minecraft.wiki/w/Unbreaking">Unbreaking</a
                >), mine a lot quicker (<a
                    href="https://minecraft.wiki/w/Efficiency">Efficiency</a
                >) or gain more resources (<a
                    href="https://minecraft.wiki/w/Fortune">Fortune</a
                >
                / <a href="https://minecraft.wiki/w/Looting">Looting</a>) as
                well as
                <Criticism
                    >{#snippet criticism()}
                        Superfluous word.
                    {/snippet}other</Criticism
                > more specialised enchants. An alternative way of adding enchantments
                is applying them with an enchanted book to an item using an anvil.
                The easiest way to obtain enchanted books is finding them around naturally
                in structures in the world but these are very scattered and inconsistent.
                Instead you can get a villager to become a librarian using a lectern
                and they will sell enchanted books to you.
            </p>
        </SectionCriticism>
        <p>
            In <Criticism
                >{#snippet criticism()}
                    Probably need a better term than this one.
                {/snippet}regular Minecraft</Criticism
            >, the librarian sells books and the enchantments are completely
            random. This strongly incentivises spamming the lectern and
            refreshing the librarian trades over and over until you get the
            enchanted book trades you want. This is both really unfun and
            overpowered which is a really unhealthy combination for a game since
            <Criticism
                >{#snippet criticism()}
                    This part sounds clumsy. The whole sentence is to an extent.
                {/snippet} you don't want to do it</Criticism
            > but feel obligated to do it since it makes the game so much easier than
            the alternative options. Once you get librarians with all the trades you
            need you can <Criticism
                >{#snippet criticism()}
                    Ugh, why have this word here?
                {/snippet}just</Criticism
            > easily get all the tools and armour you would ever need at a very high
            tier. The rebalance nerfs this significantly by splitting the enchants
            into 2 categories - special and common. There's 7 special books and each
            one is offered by a different librarian villager at the highest tier depending
            on which biome the villager is associated with. The common books are distributed
            amongst the villager biomes so each librarian villager biome is associated
            with 3 common book enchants and 1 special enchants. Additionally <Criticism
                >{#snippet criticism()}
                    After checking this isn't actually true since it only offers
                    Efficiency III but the max is V. The efficiency enchant is
                    kinda weird though since you can't get V directly on diamond
                    tools. Maybe add as a footnote.
                {/snippet} the special book enchants are offered at a tier below the
                maximum tier for the enchants that have tiers.</Criticism
            > This means it's a lot more expensive to get the best books since for
            example it requires 2 Unbreaking II books together to create an Unbreaking
            III book.
        </p>
        <p>
            The seven biomes for villagers are Desert, Plains, Savanna, Snowy,
            Taiga, Jungle and Swamp. For the first five of these the villages in
            those biomes can be found naturally so the easiest method is to <Criticism
                >{#snippet criticism()}
                    Kinda colloquial, don't necessarily mind it but should
                    consider the style.
                {/snippet}nab</Criticism
            >
            them from their homes and transport them to where you want them. Ethically
            this is highly dubious but I prefer to just overlook that. However the
            final two villager types require a bit more effort. To get them you have
            to transport villagers over to the necessary biomes and setup a way to
            breed them. Villagers will breed if they have enough food and spare beds
            which necessitates building a mini-base in the biome to keep the villagers
            safe and to farm food for them. A really annoying part is that when villagers
            breed, there's a 50% chance the child's biome type is determined by the
            biome they're born into and a 50% chance it comes from one of the parents.
            <Criticism
                >{#snippet criticism()}
                    I really like this but it needs to choose a lane. Either
                    it's a funny throwaway line or it's a serious point to
                    expound upon.
                {/snippet} Perhaps this is a commentary on the cultural influence
                of the parents vs the environment on how children see the world.</Criticism
            >
            However the gameplay impact on me is a lot of hoping the parents give
            the right type of child and having to 'dispose' of the unwanted children
            which gives more ethical questions that <Criticism
                >{#snippet criticism()}
                    Maybe make this more of a running theme about the ethics in
                    Minecraft - tie it to other media about that.
                {/snippet} I will not think about</Criticism
            >.
        </p>
    </SectionCriticism>
    <p>
        <Criticism
            >{#snippet criticism()}
                When? Be more specific. This is vague and sounds waffly.
            {/snippet}A while ago</Criticism
        > I would've struggled to transport the villagers across large stretches of
        land. <Criticism
            >{#snippet criticism()}
                Switching to second person? Pick one for this paragraph at
                least.
            {/snippet}You</Criticism
        > can put them in boats and use leads to get them across water. This can be
        used on flat land as well but as soon as you need to go up inclines or through
        a forest your leads will constantly break and it will be extremely frustrating.
        You can build a minecart track across the land but that takes a long time
        to build and requires a lot of resources for a one off usage. Fortunately
        Mojang recently added <Criticism
            >{#snippet criticism()}
                Does this need to be in parentheses.
            {/snippet}(in 1.21.6 which came out in June 2025)</Criticism
        > the Happy Ghast which can be grown from a Dried Ghast acquired from the
        Nether. You can attach leashed boats to it and ride it over the hills quite
        comfortably. It is extremely slow so over water it's much quicker to travel
        by boat and leashing the Ghast to you but it's nice that Mojang are thinking
        about the painful aspects of the villager rebalance and trying to soften them
        in ways that make the game more fun.
    </p>

    <figure>
        <img
            src={LeavingJungle}
            width="100%"
            alt="My Minecraft character flying on a Happy Ghast leaving a jungle with two boats containing 2 desert villagers and 2 baby jungle villagers attached"
        />
        <figcaption>
            Me leaving my jungle mini-base with some jungle and desert villagers
            in tow.
        </figcaption>
    </figure>

    <p>
        I believe the <Criticism
            >{#snippet criticism()}
                Change to rebalance changes or rework.
            {/snippet}rebalances</Criticism
        > are great in two ways: they both reduce the effectiveness of a <Criticism
            >{#snippet criticism()}
                Rework this sentence and especially this part.
            {/snippet}mechanic that's too powerful and encourage interesting
            activities.</Criticism
        > It makes the balance between the enchantment table and the librarian books
        fairer and means the optimal way is to use them both as appropriate. This
        means using the enchantment table to try to roll most of the enchants you
        want then using the librarians to get a book for one or two extra enchants
        you want. Also moving to these biomes and building a base there for the villagers
        is engaging in its own way and provides a little mini-quest away from your
        main base.
    </p>

    <SectionCriticism>
        {#snippet criticism()}
            This might be out of scope for this post? Either I should commit
            properly or scrap it for a subsequent post.
        {/snippet}
        <p>
            The mending enchantment is probably the most powerful enchantment in
            the game, making it so items can regain their durability <Criticism
                >{#snippet criticism()}
                    Again, be specific. Make it clear that it repairs upon
                    gaining xp. Maybe also include a section on how gaining xp
                    works if we're explaining lots of game mechanics.
                {/snippet} at the cost of xp</Criticism
            >. This means you never need to replenish these tools and can just
            use the same ones over and over. The only alternative way to repair
            items is to combine them with their material on an anvil but the
            mechanics of the anvil strongly discourage this over the long term
            since the more times it's used to repair a tool the more expensive
            it becomes until the game refuses to let you. Jeb from the Mojang
            team has said the following in response to whether the anvil could
            stop incrementing the cost of anvil repairs:
        </p>

        <BskyEmbed>
            <blockquote
                class="bluesky-embed"
                data-bluesky-uri="at://did:plc:brsei7e7f2nzdwzyj52bsyqo/app.bsky.feed.post/3me4d6q52sk2h"
                data-bluesky-cid="bafyreiejter3h6vdbjf4ayxjdmaykgya6qulils2cqwy5d5arauyrqkmki"
                data-bluesky-embed-color-mode="system"
            >
                <p lang="en">
                    Not really, but I don&#x27;t know what will happen in the
                    future. The purpose of the cap is that all items are
                    intended to be impermanent. Mending is a different issue.
                </p>
                &mdash; Jens Bergensten (<a
                    href="https://bsky.app/profile/did:plc:brsei7e7f2nzdwzyj52bsyqo?ref_src=embed"
                    >@jebox.bsky.social</a
                >)
                <a
                    href="https://bsky.app/profile/did:plc:brsei7e7f2nzdwzyj52bsyqo/post/3me4d6q52sk2h?ref_src=embed"
                    >6 February 2026 at 00:51</a
                >
            </blockquote>
        </BskyEmbed>
    </SectionCriticism>
    <p>
        This indicates Mojang does have a view on their ideal game loop where
        players need to keep re-engaging with the mechanics to <Criticism
            >{#snippet criticism()}
                Used this word last paragraph, maybe use a synonym.
            {/snippet}replenish</Criticism
        > their gear but they don't know what they need to do to make <Criticism
            >{#snippet criticism()}
                Add my experience of this here.
            {/snippet} this process fun and engaging rather than a chore.</Criticism
        > They also have an issue where the game is so popular that there can be extraordinary
        backlash whenever difficult changes need to be made. They have signaled other
        changes they want to make; such as to the combat system. They already changed
        the combat system in update 1.9 which was released in 2016 and it was one
        of the most controversial <Criticism
            >{#snippet criticism()}
                Replace this word.
            {/snippet}things</Criticism
        >; ending up with many <Criticism
            >{#snippet criticism()}
                Explain words as if the person has never heard of it. Maybe a
                footnote.
            {/snippet}pvp</Criticism
        > Minecraft servers staying on 1.8 indefinitely since people didn't want to
        use the new mechanics for various reasons. Some of these reasons were valid
        and some were less so. It also caused the Java and Bedrock versions of the
        game to bifurcate <Criticism
            >{#snippet criticism()}
                Hello? Explain this please...
            {/snippet}since the combat on pc didn't translate to console or
            mobile versions of the game well.</Criticism
        > They have tried to cleanup a lot of the issues with combat in combat tests
        that they created but those have languished since 2020 and maybe some ideas
        from it will be used such as the spear being added in 2025 but it's hard to
        see them re-structuring how combat works in Minecraft fundamentally.
    </p>

    <SectionCriticism>
        {#snippet criticism()}
            Need a better conclusion that wraps things up. Also try to find more
            interesting perspectives on it.
        {/snippet}
        <p>
            There's a lot that could be said about the design decisions of
            Mojang, especially with regards to how they approach the trading
            mechanics.
            <a href="https://youtu.be/sqpRlg4eSWw"
                >Here's an interesting youtube video by DIMM4 discussing the
                trading rebalance.</a
            > I mostly agree with their perspective although it doesn't appear that
            informed from actually trying it out.
        </p>
    </SectionCriticism>
</Draft>
