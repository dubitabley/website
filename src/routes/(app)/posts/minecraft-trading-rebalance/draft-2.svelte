<script>
    import BskyEmbed from "$lib/components/misc/bsky-embed.svelte";
    import Draft from "$lib/components/post/draft/draft.svelte";
    import Footnote from "$lib/components/post/footnote.svelte";
    import Post from "$lib/components/post/post.svelte";
    import MinecraftProgression from "./images/minecraft-progression.png";
    import LeavingJungle from "./images/leaving-jungle.png";
    import Criticism from "$lib/components/post/draft/criticism.svelte";
</script>

<Draft>
    <Post>
        <h1>The Minecraft Trading Rebalance is good, actually</h1>

        <p>
            I love Minecraft. I played it back around 2009-10 and <Criticism
                >{#snippet criticism()}
                    Fix this up a little
                {/snippet}occassionally pick it up</Criticism
            >. Recently I went for another bout to distract myself from
            <i>life</i> and have some thoughts on the game, its balancing and future.
            Minecraft is a sandbox game and there's many different ways to enjoy it
            but when I play I have a few house rules that I like to follow to keep
            it engaging.
        </p>
        <ul>
            <li>Play Hardcore mode on Java Edition</li>
            <li>No using the coordinates or other debug tools</li>
            <li>No external tools</li>
            <li>Turn on the villager trade rebalance</li>
        </ul>
        <p>
            <Criticism
                >{#snippet criticism()}
                    Maybe briefly mention Java vs Bedrock edition.
                {/snippet} I use hardcore mode</Criticism
            > since I think it makes the stakes higher and ensures I can't take undue
            risk. Plus if I do die, restarting the game from anew is still fun. I
            don't use coordinates or external tools such as Chunkbase since they tend
            to be too powerful and discourage exploration. I also enjoy using the
            in game mechanics to achieve the same ends. <Criticism
                >{#snippet criticism()}
                    This should have a sentence mentioning coordinates' usage.
                {/snippet}I setup a
                <a
                    class="mc-wiki-link"
                    href="https://minecraft.wiki/w/Lodestone">lodestone</a
                > at my base and point to it with a compass to be able to always navigate
                back to it by following the compass direction.</Criticism
            > Chunkbase is used to find structures such as villages or woodland mansions
            without travelling randomly throughout the world which can take a long
            time and be fruitless. The in game alternative is the cartographer villager
            which you can trade with to get maps to different structures and biomes.
            The biome map the villager can offer to is <Criticism
                >{#snippet criticism()}
                    Superfluous word.
                {/snippet}actually</Criticism
            > dependent on the type of villager they are such that you can find villagers
            in different biomes that will help you find the other biomes. This makes
            it feel like more of a quest compared to just looking it up online.
        </p>

        <h3>Mechanics</h3>

        <p>
            I need to explain quite a few mechanics to be able to examine the
            balance change. Minecraft is a game with many interactions coming
            from its decades of development so I'll try to only explain the ones
            that are relevant to my story. I need to collect resources and
            create tools, weapons and armour that allows you to destroy blocks,
            kill enemies and survive taking damage. Minecraft is partially
            inspired by Roguelike games so has elements from those games such as
            getting stronger gear as a form of progression.
        </p>

        <figure>
            <img
                src={MinecraftProgression}
                width="100%"
                alt="The progression of Minecraft of wood, stone, iron, diamond and netherite pickaxes and their raw tools."
            />
            <figcaption>
                The basic progression of Minecraft items <Criticism
                    >{#snippet criticism()}
                        From? Weird word usage.
                    {/snippet}from</Criticism
                > wood, stone, iron, diamond and netherite.
            </figcaption>
        </figure>

        <p>
            Orthogonal to this is the ability to enchant items with bonus powers
            that make them even more powerful. These range from making them mine
            blocks faster(<a
                class="mc-wiki-link"
                href="https://minecraft.wiki/w/Efficiency">Efficiency</a
            >) and last longer(<a
                class="mc-wiki-link"
                href="https://minecraft.wiki/w/Unbreaking">Unbreaking</a
            >) or even gain more resources (<a
                class="mc-wiki-link"
                href="https://minecraft.wiki/w/Fortune">Fortune</a
            >
            /
            <a class="mc-wiki-link" href="https://minecraft.wiki/w/Looting"
                >Looting</a
            >). To obtain these, there are two ways. The most basic way is to
            use the
            <a
                class="mc-wiki-link"
                href="https://minecraft.wiki/w/Enchanting_Table"
                >Enchanting Table</a
            > to apply an enchantment to an item as the cost of levels and lapis lazuli.
            Levels are obtained by doing various activities in the game and are earned
            naturally but slowly while lapis is another resource to be mined from
            the ground. I find that lapis is fairly abundant while levels can be an
            issue to obtain since I tend to not like building an xp farm that allows
            me to obtain lots of levels very easily. I also find the enchanting table
            fairly tedious because it's very random for getting the enchants I want.
            The alternative to the enchanting table is applying enchanted books to
            items where these books can be found randomly in the world or obtained
            by trading with villagers.
        </p>

        <p>
            <Criticism
                >{#snippet criticism()}
                    A little awkward, maybe rework.
                {/snippet}Without the trading rebalance I play with</Criticism
            >, the librarian villager sells books and the enchantments are
            completely random. This strongly incentivises spamming the lectern
            and refreshing the librarian trades over and over until you get the
            exact enchanted book trades you want. This is both really unfun and
            overpowered which is a really unhealthy combination for a game since
            it feels like an obligation as other options are just less efficient
            but it's not enjoyable at all. After this process is complete it's
            trivial to get all the tools and armour you would ever need at a
            very high tier quite cheaply. The tools, weapons and armour
            themselves are obtained from the toolsmith, weaponsmith and
            armoursmith at a diamond tier which is almost at the end of the
            progression of items in the game. I find this whole process deeply
            overpowered and unfun to engage with.
        </p>

        <h3>The Trading Rebalance</h3>

        <p>
            The rebalance changes it so librarians don't sell niche enchantments
            such as ones for the crossbow or fishing rod. It also splits the
            enchants into 2 categories - special and common. There's 7 special
            books and each one is offered by a different librarian villager at
            the highest tier depending on which biome the villager is associated
            with. The common books are distributed amongst the villager biomes
            so each librarian villager biome is associated with 3 common book
            enchants and 1 special enchants. Also the enchants are offered at
            specific tiers such as Efficiency being offered at III despite the
            highest tier being V. <Footnote
                >Efficiency is a bit of a weird case in general since you can't
                get Efficiency V directly from the enchanting table on a diamond
                tool.</Footnote
            >This means it's a lot more expensive to get the best books since
            for example it requires combining 2 Unbreaking II books together to
            create an Unbreaking III book.
        </p>

        <p>
            A villager is associated with a biome when they're born. There's a
            50% chance they will take on the biome they're born in and a 50%
            chance of adopting the biome of one of their parents. The seven
            biomes for villagers are Desert, Plains, Savanna, Snowy, Taiga,
            Jungle and Swamp. For the first five of these the villages in those
            biomes can be found naturally so the easiest way is to travel there,
            take villagers from their homes and transport them to your home.
            Ethically this is extremely dodgy; I think <a
                href="https://youtu.be/d6i5Ylu0mgM"
                >this video by Folding Ideas</a
            > has an interesting perspective on this kind of game mechanic as it pertains
            to Minecraft and other sandbox games. For the two biomes that have no
            village, Jungle and Swamp, they require more effort. You need to transport
            villagers there and 'encourage' them to breed and hope they produce one
            of the correct biome. This can be quite a tedious process since villagers
            require enough food and spare beds to breed and it can take a while. It
            also involves 'disposing' of unwanted children that aren't the right type
            which again parallels uncomfortable real life practices. The fun gameplay
            part of this is that it involves building mini-bases for the villagers
            to breed with a farm to supply them with food.
        </p>

        <p>
            I still need to transport the villagers across long distances which
            can be tricky to do. To travel across water it's fairly simple to
            put the villagers in a boat and use a lead on the boat to follow
            you. This also works on flat lands but becomes infeasible on bumpy
            land or forests as the lead will consistently break. You can build a
            minecart track but this requires a lot of time and effort for a
            track that will only be used once so isn't worth it. Fortunately for
            me, in 1.21.6 which came out in June 2025 Mojang added the <a
                class="mc-wiki-link"
                href="https://minecraft.wiki/w/Happy_Ghast">Happy Ghast</a
            > which allows me to transport leashed boats with villagers over the sky
            which is both extremely cool and convenient for this use case. It is extremely
            slow so other methods are better if they're viable but it's a useful option
            to have and shows that Mojang are thinking about the rough edges of the
            villager rebalance mechanics and how to make them more enjoyable.
        </p>

        <figure>
            <img
                src={LeavingJungle}
                width="100%"
                alt="My Minecraft character flying on a Happy Ghast leaving a jungle with two boats containing 2 desert villagers and 2 baby jungle villagers attached"
            />
            <figcaption>
                Me leaving my jungle mini-base with some jungle and desert
                villagers in tow.
            </figcaption>
        </figure>

        <p>
            I really like the direction of the rebalance changes in that they
            both reduce the effectiveness of a strategy that's too powerful and
            encourage more interesting ways of playing. It makes the balance
            between the enchanting table and the librarian books fairer and
            means you're incentivised to use them both as appropriate. This
            means using the enchantment table to try to roll most of the
            enchants you want then using the librarians to get a book for one or
            two extra enchants you want. Also moving to these biomes and
            building a base there for the villagers is engaging in its own way
            and provides a little mini-quest away from your main base.
        </p>

        <h3>Mending and Minecraft Balancing</h3>

        <p>
            There are certain enchants that are so different that they're
            designated as 'Treasure enchantments' and cannot be obtained from
            the enchanting table. These are the following:
        </p>
        <ul>
            <li>
                Curse of Binding - a detrimental effect that means you cannot
                unequip the armour piece.
            </li>
            <li>
                Curse of Vanishing - a detrimental effect that means the item is
                destroyed if you die with it.
            </li>
            <li>
                Frost Walker - special boots enchant that makes water turn to
                ice as you walk on it.
            </li>
            <li>
                Soul Speed - special boots enchant that means you travel faster
                on soul sand in the Nether.
            </li>
            <li>
                Swift Sneak - special leggings enchant that means you travel
                faster when sneaking around.
            </li>
            <li>
                Wind Burst - special mace enchant that causes a knockback effect
                to the player on attacking.
            </li>
            <li>
                Mending - enchant for all items that allows them to be repaired
                when you gain xp.
            </li>
        </ul>

        <p>
            This last one is the odd one out - it's neither a curse that you
            wouldn't want to get randomly from a table nor only for a specific
            item or only having a niche use case. Instead it's an incredibly
            powerful enchant that allows you to bypass many other mechanics in
            the game. The regular way to repair items is to combine it with
            other copies of the item or the raw material on an <a
                class="mc-wiki-link"
                href="https://minecraft.wiki/w/Anvil">Anvil</a
            >. For example, to repair a diamond pickaxe you could combine it
            with another diamond pickaxe or a piece of diamond. However the
            anvil has a mechanic that causes this process to cost more levels
            each time you do it until it eventually becomes not allowed. This
            mechanic exists because items in Minecraft are supposed to be
            transient - to be replaced every now and again. Jeb from the Mojang
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

        <p>
            I agree with this philosophy since I think it can be not too taxing
            to create new tools/armour and it's good to keep players engaging
            with the basic mechanics of the game. However, I still find it
            taxing to do, especially with the random nature of the Enchanting
            Table and the steep cost of the Anvil. It also forces you to build
            an xp farm to support the level costs which constrains the ways of
            playing the game. It also doesn't really make sense for exclusive
            items such as the Elytra or Mace which are very difficult to obtain.
            I think repairing an Elytra with Phantom Membranes instead of
            Mending would be a painful chore which shouldn't be the case for a
            post game mechanic.<Footnote
                >One could argue there is no post game in Minecraft since it
                never ends. I'm counting the end as killing the dragon and
                rolling the credits but obviously you could play forever.</Footnote
            > For regular items Mending shouldn't be necessary though so perhaps a
            way to adjust this would be to only allow Mending on specific special
            items, then to compensate there could be some improvements to the Enchanting
            Table and Anvil systems to make them more engaging and fun to play with.
            I would enjoy if there was some playing with the magic of them although
            it seems like most of the magic themes went into the brewing system.
        </p>

        <p>
            I do acknowledge that Mojang have an issue where Minecraft is simply
            too popular and there can be a backlash against any changes
            especially when changing the existing game to be less easy. <a
                href="https://youtu.be/sqpRlg4eSWw"
                >This youtube video by DIMM4 discussing the trading rebalance</a
            > has some discussion of players reacting negatively to the changes. This
            explains why Mojang often ship uncontroversial changes such as adding
            new blocks and mobs which aren't going to cause people issues. However
            the main mechanics of the game do often require changes and the toughest
            battles yield the greatest reward.
        </p>

        <h3>The Future</h3>

        <p>
            Perhaps the most controversial change Mojang made was in 1.9 in
            February 2016. It overhauled the combat system by changing it to
            have a delay instead of being able to spam the attack as often as
            possible. I think this system is generally more interesting to play
            with but most PvP or player vs player servers refused to update such
            that even to this day they're stuck on 1.8 combat indefinitely. It
            also didn't translate to mobile or other devices so wasn't ported to
            Bedrock Edition, leading to some splitting of the playerbase.
            Minecraft is a big enough game to able to have that to some extent
            but not too much. Mojang recognised some of the problems and created
            a combat test version of the game with many changes to the mechanics
            but there hasn't been any updates to this since 2020 so it seems
            like they're not sure how to proceed with these changes.
        </p>

        <p>
            I believe this bodes poorly for the villager trade rebalance
            changes, inertia is very difficult to overcome and the easiest route
            for Mojang is to focus on other changes. However that would be
            disappointing as these changes are broadly in the correct direction.
            There's definitely more work for Mojang to do but they could signal
            how Mojang can make changes to Minecraft in the future. More broadly
            the same trends replicate themselves in other popular systems so the
            lessons could be applicable to other fields. Here's hoping they
            succeed.
        </p>
    </Post>
</Draft>

<style>
    .mc-wiki-link::before {
        content: url("./images/mc-wiki-icon.png") / "Minecraft Wiki";
    }
</style>
