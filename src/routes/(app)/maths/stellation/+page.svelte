<script lang="ts">
    import SimpleMaths from "$lib/components/maths/equation/simple-maths.svelte";
    import GenericStellation from "./generic-stellation.svelte";
    import Heptagrams from "./heptagrams.svelte";
    import Hexagram from "./hexagram.svelte";
    import PentagonStellations from "./pentagon-stellations.svelte";
    import StarHeader from "./star-header.svelte";
</script>

<StarHeader>Stellation</StarHeader>

<h3>Stars! Everyone loves stars!</h3>

<p>
    This is about geometry and stellated polygons. I don't tend to love geometry
    but I will acknowledge there is a visual beauty to it that is lacking from
    other mathematics at times. There are two kinds of stellations, there is the
    typical one that everyone's familiar with such as the pentagram or 5 pointed
    star. These can be constructed from a regular pentagon in multiple ways; by
    extending non-adjacent edges to a point or connecting alternate vertices.
    Click the play button or drag the slider to view these sweet animations.
</p>
<PentagonStellations />

<p>
    This alternative vertices method was the way I learned to freehand draw
    stars, which has the advantage that you only need to estimate fifths whereas
    if you try to draw the outer line only you need to estimate tenths.
</p>
<p>
    This pentagram is denoted by the Schläfli symbol &lbrace;5/2&rbrace;. This
    notation is useful since the 5 tells you that it's based on a regular
    polygon with 5 sides and the 2 is a useful property about the polygon that
    is a little complicated to explain in detail here. It's clear why a square
    doesn't have a stellation since there's too few vertices so joining adjecent
    ones just gives diagonal lines, while extending edges wouldn't work since
    they're parallel and would never meet. Instead, let's try going up. For a
    hexagon we get the following, click the buttons underneath to get a grasp of
    it.
</p>

<Hexagram />

<p>
    Since this has an even number of vertices, joining alternating ones causes
    it to be made up from mutually exclusive regular polygons and 6 is a
    multiple of 3 so it's made up of triangles. You can also see the hexagon in
    the centre that could be extruded to form this hexagram. Fun fact, Wikipedia
    says that an alternate name for it is a sexagram which is neat. Next we may as
    well keep going to 7 sides, which is either a
    heptagon or septagon depending on whether you prefer greek or latin
    prefixes. Except since this one is larger there's actually two heptagrams!
</p>

<Heptagrams />

<p>
    As the number of edges on the polygon grows, the more distinct stellations
    there will be. The formula for the number of stellations for a regular n-gon
    is the following:
</p>
<p>If n is even: <SimpleMaths equation="(n-4)/2" /></p>
<p>If n is odd: <SimpleMaths equation="(n-3)/2" /></p>
<p>
    For an 8 sided star polygon, it's called an octogram and a 9 sided one is called an enneagram or a nonagram.
    I don't have a point here, I just think <a href="https://en.wikipedia.org/wiki/Numeral_prefix">these numerical prefixes</a> are neat
    although there's surely a fascinating linguistics story to tell.
    Finally, here's a widget for choosing what
    stellation you'd like to see:
</p>

<GenericStellation />

<p>More reading:</p>
<ul>
    <li>
        <a href="https://en.wikipedia.org/wiki/Stellation"
            >Wikipedia page on Stellation</a
        >
    </li>
    <li>
        <a href="https://en.wikipedia.org/wiki/Schl%C3%A4fli_symbol"
            >Wikipedia page on Schläfli symbols</a
        >
    </li>
</ul>
