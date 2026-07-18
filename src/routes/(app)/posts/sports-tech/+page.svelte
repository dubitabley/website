<script>
    import Footnote from "$lib/components/post/footnote.svelte";
    import Post from "$lib/components/post/post.svelte";
</script>

<Post>
    <h1>DRS and VAR and TMO, oh my!</h1>
    <p>
        Watching the Football World Cup put some thoughts into my head about how
        technology is used to officiate sports matches so I thought I would
        indulge in some sports-posting.
    </p>

    <h3>Rugby, Football and the TMO/VAR</h3>
    <p>
        I don't follow rugby very extensively but I still think it's mentioning
        as a sports that is similar to football<Footnote
            >Note for Americans, I will not call it soccer.</Footnote
        > in many ways. It's free-flowing and can be quite a quick game, although
        similar to football when the ball goes out of play or there are fouls it can
        really grind to a halt. This is especially true for the TMO which stands for
        Television Match Official which is for a referee watching the television screens
        and angles to look for infringements, especially when leading up to important
        moments such as tries. This is very similar to how it works in football for
        VAR (Video Assistant Referee) where it checks moments leading up to goals
        for infringements such as offside. However in football it's even more impactful,
        since a try is worth 5 points + 2 if you score the conversion and average
        scores in rugby are around 20-30 but in football there's only a few goals
        each game. Therefore a goal being disallowed on review or a penalty being
        given can completely change the course of a match. Thus it's important that
        the decisions are fair and correct, which brings up how decisions are made.
    </p>

    <p>
        In these games there's rules but they're often not defined in ways that
        are objective, leaving some of the enforcement up to the discretion of
        the referees. This is a good thing since it would be impossible to set
        out specifically what behaviour is allowed or not. Also if there was an
        objective line people would try to skirt as close to it without crossing
        it which is frustrating since you want the game to be played fairly.
        Instead it has to be a judgement call based on how the referee thinks
        the game should be played. This is a big problem with the video referee
        where they can refer events to the main referee for fouls where people
        can dispute what the correct decision should be.
    </p>

    <h3>Contrasting with Cricket</h3>

    <p>
        However, cricket is a different kind of sport since it's a bat and ball
        sport with breaks between each time the ball is bowled. This makes it
        feel different with the DRS (Decision Review System) since it doesn't
        break up the flow of the game. Additionally cricket as a sport has laws
        instead of rules, with umpires instead of referees. This might just
        sound like quibbling over terminology but it means that their decision
        carries more weight and is decided more objectively based on the laws.
        Also there's very careful decisions around what kinds of things the
        third umpire (terminology for the television umpire) reviews. They
        review things like runouts or stumpings which are just a case of
        checking whether bats cross a line before a ball hits the stumps first,
        these are typically simple and uncontroversial decisions in slow motion.
    </p>
    <p>
        More complicated decision making in cricket utilises some sophisticated
        technology. In cricket you're out if you hit the ball and it's caught by
        a fielder before hitting the ground. However it's often difficult to
        determine if the ball has actually hit the bat when it's a very faint
        hit. There may not be much deflection but there's typically some kind of
        sound. Thus there's technology used where a camera is synced up with
        audio technology to work out if there's a sound at the same time as the
        ball is next to the bat on the camera. There's also LBWs in cricket
        which stands for 'Leg Before Wicket' and means the ball hits the
        batter's leg and was going on to hit the stumps. However the umpire has
        to predict whether it was going to hit the stumps which can often be a
        difficult thing to judge and this rule has been a frequent source of
        controversy. In cricket they use a technology called <a
            href="https://en.wikipedia.org/wiki/Hawk-Eye">Hawk-Eye</a
        > to project where the ball was going to go if it was unimpeded to decide
        if an LBW decision was correct. This is really cool technology and is used
        in other sports but it does require many cameras from different angles to
        be able to correctly model the trajectory of the ball. In football and rugby
        there is some sophisticated technology used; just in this world cup there
        was some buzz about using similar audio technology as cricket to work out
        if there was a deflection of the ball, however most of the time it's just
        looking at different camera angles to work out what happened which isn't very
        objective and tends to just reinforce the first impression the umpire gets.
    </p>

    <p>
        Also in cricket for many decisions it takes a while to load the
        technology and check so to dissuade it from consuming time they require
        it to be up to the teams to review the decision, hence the name Decision
        Review System, they only get 2 or 3 reviews per innings and if you
        review a decision and are wrong you lose one. If you review correctly
        you keep the review so if you think you're correct and the umpire's made
        a poor decision you should check it with the technology. This has the
        advantage of making it more part of the game and more agency in the
        hands of the players instead of it being more random and up to the
        referees. This might be a slightly unfair dynamic since it means that
        fans will blame their team rather than the officials.
    </p>

    <h3>Human Factor</h3>

    <p>
        Sports is about people, flawed as they are. It's ok for decisions to be
        made that are wrong occasionally. Of course you want decisions to be
        correct and fair as much as possible but there's always going to be
        mistakes, whether by the players or by the referees. The pursuit of a
        kind of perfection in decisions can be debilitating to the sports
        experience in my opinion. To reflect this human element, cricket has a
        concept called umpire's call in LBW decisions. Since there's some margin
        of error on the Hawk-Eye decision, if the result is close it defers back
        to the umpire on the field and what they decided. Additionally if the
        footage is inconclusive the television umpire tends to just go with what
        the umpire thought live. This keeps the part on the field relevant which
        makes it feel more enclosed and important. In contrast with football, it
        feels like when the referee goes over to view the screen and watches it
        in slow motion they're inevitably going to overturn their decision made
        previously. Additionally it feels silly to call offsides via VAR when
        they're only offside by a minuscule margin even if it's technically the
        correct call. In my view this cheapens the relevance of the onfield
        decision making.
    </p>

    <p>
        One of the controversies in DRS being introduced in cricket was that one
        of the tenets of cricket is to respect the umpire and their decision.
        The `Gentleman's game` label is a little mythological; many of the great
        cricketers in the past have been liars and cheats just as much as any
        other sport, but there is something to be said for respecting the
        officials even if you disagree with the decision. The kind of disrespect
        of the referees that you see in football is frustrating and it leads to
        things like diving or exaggerating injuries in order to get favourable
        calls which is very frustrating to view as a spectator. As long as the
        officials aren't corrupt abuse is way over the line for the things that
        they do.
    </p>

    <h3>Cost of the technology</h3>

    <p>
        The technology can be quite expensive to install and operate<Footnote
            >I heard an estimate of $10-20k per day in cricket, which I'm not
            sure about but seems about the right amount.</Footnote
        >, since in some cases it needs quite powerful technology and additional
        staff. Obviously this isn't a major issue for events like the Football
        World Cup but it does lead to a divide where the technology can actually
        affect the way the game is played. As a concrete example from cricket,
        you're more likely to be given out LBW when reviews exist since it can
        be difficult for umpires to predict them live so it requires a different
        technique to try to avoid it from happening. That's not ideal since you
        want the game to be mostly the same across levels of the game.
    </p>

    <h3>The drama</h3>

    <p>
        In these sports the technology actually becomes part of the drama,
        although it can detract from it as well. Waiting for the technology to
        load or to view the replays can be nerve testing, especially when it
        comes at a point when the game is on the line. However I think it also
        detracts from the spontaneity of the live sport. This is more important
        for a sport like football in my opinion because goals are so important.
        The act of celebrating a goal only for it to be disallowed after half a
        minute due to a tiny offside or minor foul earlier can be very
        deflating. In my view fans generally will accept it if there's a clear
        mistake, for example a clear handball like Maradona's Hand of God. When
        it's debatable or marginal it feels pointless though; it also invites
        accusations of inconsistency since it's very difficult to judge
        everything the same way when there's a high amount of discretion
        involved.
    </p>

    <h3>Conclusion</h3>

    <p>
        Like most of my opinions, I actually don't have a strong, clear
        conviction on these systems. I do tend to believe it works better in
        cricket than in other sports but that's more of a consequence of the
        nature of the game rather than more competent administration. I think
        there's a lot of issues with them but also some advantages and I tend to
        be able to see different people's positions. I don't have a clear grasp
        on public opinion but given Andy Burnham<Footnote
            >As of this post, the soon to be prime minister of the UK</Footnote
        > has said in interviews that they should stop using VAR in football<Footnote
            ><a
                href="https://bsky.app/profile/politicsuk.com/post/3mlykvfumvn2p"
                >Source</a
            ></Footnote
        >, I suspect that's a popular opinion. Either way, remember to be
        cordial and understanding, which is a much sappier ending than I
        expected for this post but I really just wanted to get this rant out
        there.
    </p>
</Post>
