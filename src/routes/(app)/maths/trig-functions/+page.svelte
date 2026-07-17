<script>
    import Post from "$lib/components/post/post.svelte";
    import Chord from "./chord.svelte";
    import PtolemyTheorem from "./ptolemy-theorem.svelte";
    import JacobsStaff from "./images/jacob-staff.svg";
    import TrigTables from "./images/trig-tables.jpg";
    import Radian from "./radian.svelte";
    import SimpleMaths from "$lib/components/maths/equation/simple-maths.svelte";
    import RightAngledTriangle from "./right-angled-triangle.svelte";
    import InteractiveTriangle from "./interactive-triangle.svelte";
    import Footnote from "$lib/components/post/footnote.svelte";

    const sinAngle = 1.234;
    const sinValue = Math.sin(sinAngle);
</script>

<Post>
    <h1>Trigonometric Functions</h1>
    <p>
        I've always used trigonometric functions and I understand their usage
        but never thought properly about how they're defined and their history
        so this post is my examination of that. I love maths history and the
        characters but that tends to focus on European mathematicians and number
        theory and calculus from the 16th century onwards. While I do enjoy that
        and there are many fantastic stories and people in that history I should
        expand and try to discover other stories.
    </p>

    <p>
        In this post, I'll try to go through the history of trigonometry and the
        trigonometric functions, their calculations and usages up to modern
        times. From the tables of painstakingly calculated values in ancient
        Greece and India to modern computer calculations.
    </p>

    <h3>In the beginning, there was a circle...</h3>

    <p>
        Of course angles are important, especially since the most basic shapes
        in triangles and circles require an understanding of the relationship
        between the angles and lines to be able to fully comprehend. Most
        cultures would have used angles for two main purposes: construction and
        astronomy. From what I can tell, most of the trigonometry we know about
        comes from the Indian and Islamic world which slowly filtered through to
        Europe with other mathematical inventions via trading routes. There may
        be other kinds of folk knowledge in various , when constructing
        structures but it's hard to detail when they're not written down.
    </p>
    <p>
        The chord is an important geometric construction, being two points on a
        circle connected by a straight line. The word <a
            href="https://en.wiktionary.org/wiki/chord">chord</a
        >
        originates from the Latin word
        <a href="https://en.wiktionary.org/wiki/chorda#Latin">chorda</a>
        meaning cord, indicating that you would construct it by tying a cord across
        two points on a circle. Some ancient Greeks used this to determine their measurements
        of the relationships between angles and distances. In this context they defined
        a chord function which operated on the angle of a chord from the centre of
        the circle.
        <a href="https://en.wikipedia.org/wiki/Ptolemy">Ptolemy</a>, who may be
        most famous for his geocentric model of the Solar System which was
        promoted by the Catholic Church in opposition to Galileo, created a
        table of chords so that if you measured the angle of the chord and knew
        the radius of the circle you could get the length of the chord. See the
        picture below of how a chord angle works and move the slider to see the
        angle change as the size of the chord changes.
    </p>
    <Chord />
    <p>
        Ptolemy calculated his table by using some regular polygons to find
        simple chords such as 36&deg;, 90&deg;, 120&deg;. He also used Ptolemy's
        Theorem which states that in a quadrilaterial with all the points on the
        edge of a circle (called an cyclic quadrilateral) the product of the
        diagonals is equal to the sum of the products of pairs of opposite
        sides. Drag the vertices around on the below graphic to see how that
        works. Note that when one of the diagonal lines goes through the centre
        of the circle that line is the diameter and forms a chord angle with one
        of the other lines like above.
    </p>
    <PtolemyTheorem />
    <p>
        The details of how to calculate some chords from this are interesting
        but lengthy so you can check them out <a
            href="https://hypertextbook.com/eworld/chords/">here if you want</a
        >. There's other techniques Ptolemy used to find chords from their
        angles but I want to pivot to a different question, how would he and
        others have measured angles? Both practically and what units would they
        have used?
    </p>
    <h3>How big is an angle?</h3>
    <p>
        The most natural angle we could imagine is one whole turn of a circle
        but this feels too large to use in most cases. Therefore the most common
        system is one devised by the Ancient Babylonians, degrees. This splits a
        full turn into 360 parts, denoted by the degrees symbol, &deg;. There's
        multiple possible reasons for this being the way to subdivide a turn but
        the reason I like the most is that when the triangle between a chord and
        the centre of a circle is an equilateral triangle, i.e. the length of
        the line is equal to the radius so all lines are the same length then
        the angle of a chord is 1/6th of a full turn, and the Babylonians used
        sexigesimal which is base 60. Our inheritance from that is that we still
        use minutes and seconds divided into 60s which are convenient since they
        divide nicely into many different amounts. 6 such chords split into 60
        each would give 360 degrees in total.
    </p>
    <p>
        For measuring angles in the real world, I'm most familiar with
        protractors which are useful for measuring small angles on paper. In
        antiquity the main point of measuring angles would've been for astronomy
        though, in measuring the angle to a star or planet in the sky. To do
        this you would use inclinometers of different varieties. These could
        come in many different forms since they're essentially just sticks with
        markings but one I really like is Jacob's staff which you could use as
        in the following diagram:
    </p>
    <figure>
        <img
            class="svg"
            src={JacobsStaff}
            alt="A man in medieval dress looking into a cross-like instrument using the cross axis to line up with the sun"
        />
        <figcaption>
            The above comes from <a
                href="https://commons.wikimedia.org/wiki/File:Jacobstaff.svg"
                >here on Wikimedia</a
            > and is in the public domain.
        </figcaption>
    </figure>
    <p>
        There's a plethora of known instruments and more unknown instruments for
        measuring angles. There's also other measures of angles such as a more
        'metric' angle is the gradian which splits a turn into 400 gons. This
        has the advantage of making a right angle 100 degrees which is nice
        since we use base 10 but since it doesn't divide as well, especially
        into 3, it's not that nice to use so hasn't caught on much. A more
        important angle measurement is the radian which is a more 'natural'
        measure and has some useful properties that might make sense later. One
        radian is defined as the angle when the length of the part of the circle
        is equal to the radius. See the below diagram for an illustration of an
        angle of 1 radian.
    </p>
    <Radian />

    <h3>The Indian Advancements</h3>
    <p>
        There were many important changes in the way mathematics was done that
        originated in India and slowly filtered their way through the Arabic
        world and to Europe. The most prominant of these is surely the
        Hindu-Arabic numeral system and as part of that, the digit zero which
        was so essential for the number system we use today. Pertinent to our
        needs is the work done on trigonometry though.
    </p>
    <p>
        They first came up with the definition of the sine function, being half
        of the chord function, such that <SimpleMaths
            equation="[sin] [theta]/2 = 1/2 [chord] [theta]"
        />. They used the Sanskrit word
        <a
            href="https://en.wiktionary.org/wiki/%E0%A4%9C%E0%A5%8D%E0%A4%AF%E0%A4%BE"
            >jyā</a
        >
        which means bowstring since the arc of the chord in the circle looks like
        one. However this was transliterated to Arabic as
        <a href="https://en.wiktionary.org/wiki/%D8%AC%D9%8A%D8%A8">jayb</a>.
        This would be okay except that it was translated literally to Latin as
        <a href="https://en.wiktionary.org/wiki/sinus#Latin">sinus</a>, meaning
        cavity or bosom. This clumsy translation is how we ended up with the
        name sine for the function. Cosine just comes from the Latin
        'complementi sinus', meaning "sine of the complement" while tangent
        originates from the Latin
        <a href="https://en.wiktionary.org/wiki/tangentem#Latin">tangentum</a> meaning
        touching since it relates to a tangent line which is just touching a curve.
    </p>
    <p>
        The main 3 trigonometric functions are related to the right-angled
        triangle such that you can find the ratio between two of the sides from
        using one of the functions on one of the non right-angled angles. So <SimpleMaths
            equation="[sin]([theta])=[opposite]/[hypotenuse]"
        />, <SimpleMaths equation="[cos]([theta])=[adjacent]/[hypotenuse]" />, <SimpleMaths
            equation="[tan]([theta])=[opposite]/[adjacent]"
        />. I learned these by remembering SOHCAHTOA as a short-hand which is
        strange but it does work. Normally I dislike these kinds of memorisation
        tactics since they tend to be a substitute for actually learning the
        principles of what needs to be learned but in this case it seems
        justified as that's one of the main definitions of the function. Below
        are some more triangle/trigonometric laws. You can drag the green points
        to see how it changes as the points do.
    </p>
    <div class="multiple-wrapper">
        <RightAngledTriangle />
        <InteractiveTriangle />
    </div>
    <p>
        Of course the natural next step from these functions is to have inverse
        functions for them, so we can get the angle from the line lengths. These
        are called arc versions of the functions, so arcsine, arccosine and
        arctangent. Mathematics was often written in sentences rather than in
        notation, which had a lot of advantages in being approachable to anyone
        rather than having to learn lots of notation that would be massively
        variable and difficult to maintain consistency.
    </p>
    <p>
        Madhava, who lived during the 14th century produced some incredible
        results, such as the following infinite series for the trionometric
        functions.
    </p>
    <p>
        <SimpleMaths equation="[arctan](x)=x-x^3/3+x^5/5-x^7/7+[...]" />
    </p>
    <p>
        From this one, you can derive the following series by substituting x=1.
        For x=1 the ratio between the two shorter sides is 1 so the angle is
        45&deg; or <SimpleMaths equation="[pi]/4" />rad.
    </p>
    <p>
        <SimpleMaths equation="[pi]/4=x-x^3/3+x^5/5-x^7/7+[...]" />
    </p>
    <p>
        Madhava also derived these series for sine and cosine which contain the
        factorial denoted by the exclamation mark `!`. It means to multiply all
        the whole numbers from 1 to the number together, so e.g. <SimpleMaths
            equation="3!=1*2*3"
        />, <SimpleMaths equation="5!=1*2*3*4*5" />, etc.
    </p>
    <p>
        <SimpleMaths equation="[sin](x)=x-x^3/3!+x^5/5!-x^7/7!+[...]" />
    </p>
    <p>
        <SimpleMaths equation="[cos](x)=1-x^2/2!+x^4/4!-x^6/6!+[...]" />
    </p>
    <p>
        These equations are very slow to converge to the correct value so they
        had to use adjustments that give a better approximation after
        calculating some number of terms. The way Madhava derived these isn't
        known for sure but there were written texts by subsequent mathematicians
        who would've been taught by people in the same school as him. Those text
        explained some of the ways those series might have derived. The method
        is too complicated to describe fully here but if you're interested <a
            href="https://assets.cambridge.org/97805211/14707/excerpt/9780521114707_excerpt.pdf"
            >this</a
        >
        is the best explanation I could find of the context as well as the mathematical
        reasoning. A super short version is that they split up the angle into very
        small parts and take approximations of the curve using triangles. As you take
        more and more parts and each one gets smaller and smaller the approximations
        get more accurate such that if you take it to infinity<Footnote
            >Yes this is a bit handwavy but I don't want to get into the debate
            about infinitesimals and the foundation of Calculus in detail. We're
            discussing trignometry as much as possible, even though they do
            intersect.</Footnote
        > it's equal to the value. This is actually the same as concepts behind the
        development of Calculus which was used by Leibniz and Newton in the 17th Century.
        It's unfortunate that it seems the Indian mathematicians didn't develop the
        ideas further and make it more abstract to develop Calculus to use it in other
        areas. It's still very impressive since these series wouldn't be discovered
        independently in Europe until after Calculus was developed, a few centuries
        after being known in India.
    </p>
    <h3>Trigonometric tables</h3>
    <p>
        However these series are very computation heavy and takes a long time to
        do for an arbitrary angle. It would be extremely impractical to do every
        time when marking out a building or calculating the distance to a
        faraway star. Thus it was better to precalculate tables of the values
        for the functions and look them up every time.
    </p>
    <figure>
        <img
            src={TrigTables}
            alt="Close up of a page from a table with numbers printed on it"
        />
        <figcaption>
            The above is Georg von Peurbach's trigonometric table, where Sinus
            is latin for the sine function. He was an Austrian astronomer who
            did some interesting writing. Image comes from <a
                href="https://commons.wikimedia.org/wiki/File:Tractatus_Georgi_Peurbachii_super_propositiones_Ptolemaei_de_sinubus_%26_chordis_close.agr.jpg#Licensing"
                >here on Wikimedia</a
            >
        </figcaption>
    </figure>
    <p>
        Computing these tables is useful work but doing it by hand is very slow
        and error prone. Perhaps we need some kind of automated computer to be
        able to calculate these automatically?
    </p>
    <h3>Computing Trigonometric Values</h3>
    <p>
        Charles Babbage wanted to build a machine to calculate polynomials which
        could generate trigonometric functions, among others. However his
        difference engine which was funded by the British government was quite
        expensive and was never completed as it took years to complete the parts
        that were done. The mechanical computer is always going to be expensive,
        very large and difficult to program so the digital electronic computer
        that developed during the 20th century was the holy grail for
        calculating trigonometric.
    </p>
    <p>
        What is the computation that gets carried out though. For example if I
        run the code <code>console.log(Math.sin({sinAngle}));</code> in this
        website, what does it do to get the value of
        <code>{sinValue.toFixed(4)}</code>? Note that the angle is in radians
        there. The answer is actually not that interesting since we only need an
        approximation to a certain degree. In the browser numbers have 64 bits
        so there's a lot of approximations for different cases, using pi and
        other constants. It's stored as a floating point numbers which are cool
        but definitely a topic for a different post - this is important since
        the layout of bits influences the algorithms being used. There are more
        precise calculations of sine or other trigonometric functions for niche
        usages but for most practical purposes you only need a few decimal
        places.
    </p>
    <h3>Conclusion</h3>
    <p>
        It's cool to trace the history of how words, functions, concepts were
        derived to see their origins, both to give you a deeper understanding of
        the human drive that lead to it and to bolster your comprehension by
        looking at it from first principles. Trying to follow the thought
        processes of the people that came up with the ideas might mean you learn
        them slower but more thoroughly.
    </p>
    <p>
        Really this is an encouragement to understand history to understand the
        present, which is a trite statement but what more can you expect.
    </p>
</Post>

<style>
    .svg {
        background: white;
        height: 300px;
    }

    .multiple-wrapper {
        display: flex;
        flex-direction: row;
        gap: 20px;

        @media screen and (width < 500px) {
            flex-direction: column;
        }
    }
</style>
